import 'lazysizes';
import "lazysizes/plugins/unveilhooks/ls.unveilhooks";
import 'lazysizes/plugins/parent-fit/ls.parent-fit';



document.addEventListener('lazybeforeunveil', function(e){

    var bg = e.target.getAttribute('data-bg');
    if(bg){
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});
