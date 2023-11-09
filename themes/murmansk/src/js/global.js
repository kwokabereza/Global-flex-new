import './jquery';
import './menu';
import './lazyload';
import './mask';
import './jquery.colorbox-min';
import simpleParallax from 'simple-parallax-js';

var image = document.getElementsByClassName('thumbnail');
new simpleParallax(image, {
    overflow: true,
    delay: 4.6,
    transition: 'cubic-bezier(0,0,0,5)'
});
$(document).ready(function(){
    jQuery("a.colorbox-main").colorbox();
});
// Адаптивный ColorBox

jQuery.colorbox.settings.maxWidth = '95%';
jQuery.colorbox.settings.maxHeight = '95%';

/*
Функция ресайза ColorBox
*/

var resizeTimer;
function resizeColorBox() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (jQuery('#cboxOverlay').is(':visible')) {
            jQuery.colorbox.load(true);
        }
    }, 300);
}
