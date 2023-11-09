<?php namespace Backend;

use Backend;
use System\Classes\MailManager;
use System\Classes\SettingsManager;
use Backend\Models\UserRole;
use Backend\Models\BrandSetting;
use October\Rain\Support\ModuleServiceProvider;

/**
 * ServiceProvider for Backend module
 */
class ServiceProvider extends ModuleServiceProvider
{
    /**
     * register the service provider.
     */
    public function register()
    {
        parent::register('backend');

        $this->registerSingletons();
        $this->registerMailer();
    }

    /**
     * boot the module events.
     */
    public function boot()
    {
        parent::boot('backend');
    }

    /**
     * registerSingletons
     */
    protected function registerSingletons()
    {
        // See notes in \System\ServiceProvider::registerSingletons
        // this had to be moved kept there so it is available before
        // plugins. The load order is system, plugins, modules.
    }

    /**
     * registerMailer templates
     */
    protected function registerMailer()
    {
        MailManager::registerCallback(function ($manager) {
            $manager->registerMailTemplates([
                'backend::mail.invite',
                'backend::mail.restore',
            ]);
        });
    }

    /**
     * registerNavigation
     */
    public function registerNavigation()
    {
        return [
            'dashboard' => [
                'label' => 'backend::lang.dashboard.menu_label',
                'icon' => 'icon-dashboard',
                'iconSvg' => 'modules/backend/assets/images/dashboard-icon.svg',
                'url' => Backend::url('backend'),
                'permissions' => ['dashboard'],
                'order' => 10
            ]
        ];
    }

    /**
     * registerReportWidgets
     */
    public function registerReportWidgets()
    {
        return [
            \Backend\ReportWidgets\Welcome::class => [
                'label' => 'backend::lang.dashboard.welcome.widget_title_default',
                'context' => 'dashboard'
            ],
        ];
    }

    /**
     * registerPermissions
     */
    public function registerPermissions()
    {
        return [
            // General
            'general.backend' => [
                'label' => 'Access the Backend Panel',
                'tab' => 'General',
                'order' => 200
            ],
            'general.backend.view_offline' => [
                'label' => 'View Backend During Maintenance',
                'tab' => 'General',
                'order' => 300
            ],
            'general.backend.perform_updates' => [
                'label' => 'Perform Software Updates',
                'tab' => 'General',
                'roles' => UserRole::CODE_DEVELOPER,
                'order' => 300
            ],

            // Dashboard
            'dashboard' => [
                'label' => 'View the Dashboard',
                'tab' => 'Dashboard',
                'order' => 200
            ],
            'dashboard.create' => [
                'label' => 'Create Widgets',
                'tab' => 'Dashboard',
                'order' => 300,
            ],
            'dashboard.manage' => [
                'label' => 'Manage Widgets',
                'tab' => 'Dashboard',
                'order' => 400,
            ],
            'dashboard.defaults' => [
                'label' => 'Set the Default Dashboard',
                'tab' => 'Dashboard',
                'order' => 500,
                'roles' => UserRole::CODE_DEVELOPER,
            ],

            // Administrators
            'admins.manage' => [
                'label' => 'Manage Admins',
                'tab' => 'Administrators',
                'order' => 200
            ],
            'admins.manage.create' => [
                'label' => 'Create Admins',
                'tab' => 'Administrators',
                'order' => 300
            ],
            // 'admins.manage.moderate' => [
            //     'label' => 'Moderate Admins',
            //     'comment' => 'Manage account suspension and ban admin accounts',
            //     'tab' => 'Administrators',
            //     'order' => 400
            // ],
            'admins.manage.other_admins' => [
                'label' => 'Manage Other Admins',
                'comment' => 'Allow users to reset passwords and update emails.',
                'tab' => 'Administrators',
                'order' => 700
            ],
            'admins.manage.delete' => [
                'label' => 'Delete Admins',
                'tab' => 'Administrators',
                'order' => 800
            ],
            'admins.roles' => [
                'label' => 'Manage Roles',
                'comment' => 'Allow users to create new roles and manage roles lower than their highest role.',
                'tab' => 'Administrators',
                'order' => 500
            ],
            'admins.groups' => [
                'label' => 'Manage Groups',
                'tab' => 'Administrators',
                'order' => 600
            ],

            // Preferences
            'preferences' => [
                'label' => "Manage Backend Preferences",
                'tab' => 'Preferences',
                'order' => 400
            ],
            'preferences.code_editor' => [
                'label' => "Manage Code Editor Preferences",
                'tab' => 'Preferences',
                'order' => 500
            ],

            // Settings
            'settings.customize_backend' => [
                'label' => "Customize Backend Styles",
                'tab' => 'Settings',
                'order' => 400
            ],
            'settings.editor_settings' => [
                'label' => 'Global Editor Settings',
                'comment' => "Change the global editor preferences.",
                'tab' => 'Settings',
                'order' => 500
            ]
        ];
    }

    /**
     * registerFormWidgets
     */
    public function registerFormWidgets()
    {
        return [
            \Backend\FormWidgets\CodeEditor::class => 'codeeditor',
            \Backend\FormWidgets\RichEditor::class => 'richeditor',
            \Backend\FormWidgets\MarkdownEditor::class => 'markdown',
            \Backend\FormWidgets\FileUpload::class => 'fileupload',
            \Backend\FormWidgets\Relation::class => 'relation',
            \Backend\FormWidgets\DatePicker::class => 'datepicker',
            \Backend\FormWidgets\ColorPicker::class => 'colorpicker',
            \Backend\FormWidgets\DataTable::class => 'datatable',
            \Backend\FormWidgets\RecordFinder::class => 'recordfinder',
            \Backend\FormWidgets\Repeater::class => 'repeater',
            \Backend\FormWidgets\TagList::class => 'taglist',
            \Backend\FormWidgets\NestedForm::class => 'nestedform',
            \Backend\FormWidgets\Sensitive::class => 'sensitive',
        ];
    }

    /**
     * registerFilterWidgets
     */
    public function registerFilterWidgets()
    {
        return [
            \Backend\FilterWidgets\Group::class => 'group',
            \Backend\FilterWidgets\Date::class => 'date',
            \Backend\FilterWidgets\Text::class => 'text',
            \Backend\FilterWidgets\Number::class => 'number',
        ];
    }

    /**
     * registerSettings
     */
    public function registerSettings()
    {
        return [
            'administrators' => [
                'label' => "Administrators",
                'description' => "Manage back-end administrator users, groups and permissions.",
                'category' => SettingsManager::CATEGORY_TEAM,
                'icon' => 'octo-icon-users',
                'url' => Backend::url('backend/users'),
                'permissions' => ['admins.manage'],
                'order' => 400
            ],
            'adminroles' => [
                'label' => "Manage Roles",
                'description' => "Define permissions for administrators based on their role.",
                'category' => SettingsManager::CATEGORY_TEAM,
                'icon' => 'octo-icon-id-card-1',
                'url' => Backend::url('backend/userroles'),
                'permissions' => ['admins.roles'],
                'order' => 410
            ],
            'admingroups' => [
                'label' => "Manage Groups",
                'description' => "Add administrators to groups used for notifications and features.",
                'category' => SettingsManager::CATEGORY_TEAM,
                'icon' => 'octo-icon-user-group',
                'url' => Backend::url('backend/usergroups'),
                'permissions' => ['admins.groups'],
                'order' => 420
            ],
            'branding' => [
                'label' => "Customize Backend",
                'description' => "Customize the administration area such as name, colors and logo.",
                'category' => SettingsManager::CATEGORY_SYSTEM,
                'icon' => 'octo-icon-paint-brush-1',
                'class' => \Backend\Models\BrandSetting::class,
                'permissions' => ['settings.customize_backend'],
                'order' => 500,
                'keywords' => 'brand style'
            ],
            'editor' => [
                'label' => "Editor Settings",
                'description' => "Change the global editor preferences.",
                'category' => SettingsManager::CATEGORY_SYSTEM,
                'icon' => 'icon-code',
                'class' => \Backend\Models\EditorSetting::class,
                'permissions' => ['settings.editor_settings'],
                'order' => 500,
                'keywords' => 'html code class style'
            ],
            'myaccount' => [
                'label' => "My Account",
                'description' => "Update your account details such as name, email address and password.",
                'category' => SettingsManager::CATEGORY_MYSETTINGS,
                'icon' => 'octo-icon-user-account',
                'url' => Backend::url('backend/users/myaccount'),
                'order' => 500,
                'context' => 'mysettings',
                'keywords' => "security login"
            ],
            'preferences' => [
                'label' => "Backend Preferences",
                'description' => "Manage your account preferences such as desired language.",
                'category' => SettingsManager::CATEGORY_MYSETTINGS,
                'icon' => 'octo-icon-app-window',
                'url' => Backend::url('backend/preferences'),
                'permissions' => ['preferences'],
                'order' => 510,
                'context' => 'mysettings'
            ],
            'color_mode' => !BrandSetting::get('show_light_switch') ? null : [
                'label' => "Color Mode",
                'category' => SettingsManager::CATEGORY_MYSETTINGS,
                'icon' => 'icon-adjust',
                'url' => 'javascript:;',
                'permissions' => ['preferences'],
                'attributes' => [
                    'data-control' => 'color-mode-switcher',
                    'data-lang-light-mode' => __("Light Mode"),
                    'data-lang-dark-mode' => __("Dark Mode")
                ],
                'order' => 520,
                'context' => 'mysettings'
            ],
            'access_logs' => [
                'label' => 'Access Log',
                'description' => 'View a list of successful back-end user sign ins.',
                'category' => SettingsManager::CATEGORY_LOGS,
                'icon' => 'octo-icon-lock',
                'url' => Backend::url('backend/accesslogs'),
                'permissions' => ['utilities.logs'],
                'order' => 920
            ]
        ];
    }
}
