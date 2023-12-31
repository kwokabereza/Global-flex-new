/*
 * Side Navigation
 *
 * Data attributes:
 * - data-control="sidenav" - enables the side navigation plugin
 *
 * JavaScript API:
 * $('#nav').sideNav()
 * $.oc.sideNav.setCounter('cms/partials', 5); - sets the counter value for a particular menu item
 * $.oc.sideNav.increaseCounter('cms/partials', 5); - increases the counter value for a particular menu item
 * $.oc.sideNav.dropCounter('cms/partials'); - drops the counter value for a particular menu item
 *
 * Dependencies:
 * - Drag Scroll (october.dragscroll.js)
 */

+function ($) { "use strict";
    if ($.oc === undefined)
        $.oc = {}

    // SIDENAV CLASS DEFINITION
    // ============================

    var SideNav = function(element, options) {
        this.options   = options
        this.$el       = $(element)
        this.$list     = $('ul', this.$el)
        this.$items    = $('li', this.$list)

        this.init();
        this.initResponsive();
    }

    SideNav.DEFAULTS = {
        activeClass: 'active'
    }

    SideNav.prototype.init = function (){
        var self = this

        this.$list.dragScroll({
            vertical: true,
            useNative: false,
            useDrag: true,
            start: function() { self.$list.addClass('drag') },
            stop: function() { self.$list.removeClass('drag') },
            scrollClassContainer: self.$el,
            scrollMarkerContainer: self.$el
        })

        this.$list.on('click', function() {
            /* Do not handle menu item clicks while dragging */
            if (self.$list.hasClass('drag')) {
                return false
            }
        })
    }

    // Proxy responsive menu to desktop menu
    SideNav.prototype.initResponsive = function (){
        var $sideNav = $('#layout-sidenav-responsive'),
            $items = $('ul li', $sideNav),
            self = this;

        $items.click(function() {
            var itemId = $(this).data('menu-item');
            if (!itemId) {
                return;
            }

            if ($(this).data('no-side-panel')) {
                return
            }

            $items
                .removeClass(self.options.activeClass)
                .filter('[data-menu-item='+itemId+']')
                .addClass(self.options.activeClass);

            $('[data-menu-item='+itemId+']:first', self.$list).trigger('click');
        });
    };

    SideNav.prototype.unsetActiveItem = function (itemId){
        this.$items.removeClass(this.options.activeClass)
    }

    SideNav.prototype.setActiveItem = function (itemId){
        if (!itemId) {
            return
        }

        this.$items
            .removeClass(this.options.activeClass)
            .filter('[data-menu-item='+itemId+']')
            .addClass(this.options.activeClass)
    }

    function setCounterValue($counter, value){
        $counter.toggleClass('empty', value == 0)
        $counter.text(value)
    }

    function setCountersValue(itemId, $el, value) {
        setCounterValue($('span.counter[data-menu-id="'+itemId+'"]', $el), value)
        setCounterValue($('span.counter[data-menu-id="'+itemId+'"]', '#layout-sidenav-responsive'), value)
        setCounterValue($('span.counter[data-menu-id="'+itemId+'"]', '#layout-mainmenu'), value)
    }

    SideNav.prototype.setCounter = function (itemId, value){
        setCountersValue(itemId, this.$el, value)

        return this
    }

    SideNav.prototype.increaseCounter = function (itemId, value){
        var $counter = $('span.counter[data-menu-id="'+itemId+'"]', this.$el)

        var originalValue = parseInt($counter.text())
        if (isNaN(originalValue))
            originalValue = 0

        var newValue = value + originalValue

        setCountersValue(itemId, this.$el, newValue)
        return this
    }

    SideNav.prototype.dropCounter = function (itemId){
        this.setCounter(itemId, 0)

        return this
    }

    // SIDENAV PLUGIN DEFINITION
    // ============================

    var old = $.fn.sideNav;

    $.fn.sideNav = function (option) {
        var args = Array.prototype.slice.call(arguments, 1), result
        this.each(function () {
            var $this   = $(this)
            var data    = $this.data('oc.sideNav')
            var options = $.extend({}, SideNav.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('oc.sideNav', (data = new SideNav(this, options)))
            if (typeof option == 'string') result = data[option].apply(data, args)
            if (typeof result != 'undefined') return false

            if ($.oc.sideNav === undefined)
                $.oc.sideNav = data
        })

        return result ? result : this
    }

    $.fn.sideNav.Constructor = SideNav;

    // SIDENAV NO CONFLICT
    // =================

    $.fn.sideNav.noConflict = function () {
        $.fn.sideNav = old
        return this
    }

    // SIDENAV DATA-API
    // ===============

    $(document).ready(function(){
        $('[data-control="sidenav"]').sideNav();
    });

}(window.jQuery);
