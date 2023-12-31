<?php namespace October\Rain\Database\Relations;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany as MorphManyBase;
use October\Rain\Database\Attach\File as FileModel;

/**
 * AttachMany
 *
 * @package october\database
 * @author Alexey Bobkov, Samuel Georges
 */
class AttachMany extends MorphManyBase
{
    use AttachOneOrMany;
    use DefinedConstraints;

    /**
     * __construct a new has many relationship instance.
     */
    public function __construct(Builder $query, Model $parent, $type, $id, $isPublic, $localKey, $relationName = null)
    {
        $this->relationName = $relationName;

        $this->public = $isPublic;

        parent::__construct($query, $parent, $type, $id, $localKey);

        $this->addDefinedConstraints();
    }

    /**
     * setSimpleValue helper for setting this relationship using various expected
     * values. For example, $model->relation = $value;
     * @param mixed $value
     * @return void
     */
    public function setSimpleValue($value)
    {
        // Newly uploaded file(s)
        if ($this->isValidFileData($value)) {
            $this->parent->bindEventOnce('model.afterSave', function () use ($value) {
                $this->create(['data' => $value]);
            });
        }
        elseif (is_array($value)) {
            $files = [];
            foreach ($value as $_value) {
                if ($this->isValidFileData($_value)) {
                    $files[] = $_value;
                }
            }
            $this->parent->bindEventOnce('model.afterSave', function () use ($files) {
                foreach ($files as $file) {
                    $this->create(['data' => $file]);
                }
            });
        }
        // Existing File model
        elseif ($value instanceof FileModel) {
            $this->parent->bindEventOnce('model.afterSave', function () use ($value) {
                $this->add($value);
            });
        }
    }

    /**
     * getSimpleValue helper for getting this relationship simple value,
     * generally useful with form values.
     * @return array|null
     */
    public function getSimpleValue()
    {
        $value = null;
        $relationName = $this->relationName;

        if ($this->parent->relationLoaded($relationName)) {
            $files = $this->parent->getRelation($relationName);
        }
        else {
            $files = $this->getResults();
        }

        if ($files) {
            $value = [];
            foreach ($files as $file) {
                $value[] = $file->getPath();
            }
        }

        return $value;
    }

    /**
     * @deprecated this method is removed in October CMS v4
     */
    public function getValidationValue()
    {
        if ($value = $this->getSimpleValueInternal()) {
            $files = [];
            foreach ($value as $file) {
                $files[] = $this->makeValidationFile($file);
            }

            return $files;
        }

        return null;
    }

    /**
     * @deprecated this method is removed in October CMS v4
     */
    protected function getSimpleValueInternal()
    {
        $value = null;

        $files = ($sessionKey = $this->parent->sessionKey)
            ? $this->withDeferred($sessionKey)->get()
            : $this->parent->{$this->relationName};

        if ($files) {
            $value = [];
            $files->each(function ($file) use (&$value) {
                $value[] = $file;
            });
        }

        return $value;
    }
}
