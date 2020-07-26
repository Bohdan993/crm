 import {body} from '../view'

 const test = ()=>{


body.addEventListener('input', some)
body.addEventListener('change', some)



function some(e){
		if(e.target.dataset.elastic === 'true') {

			let elem = e.target,
			heightLimit = 30000;

			elem.style.height = "";
  		elem.style.height = Math.min(elem.scrollHeight, heightLimit) + "px";

	}
}




  // function elasticArea() {
  //   $('.js-elasticArea').each(function(index, element) {
  //      var elasticElement = element,
  //         $elasticElement = $(element),
  //         initialHeight = initialHeight || $elasticElement.height(),
  //         delta = parseInt( $elasticElement.css('paddingBottom') ) + parseInt( $elasticElement.css('paddingTop') ) || 0,
  //         resize = function() {
  //           $elasticElement.height(initialHeight);
  //           $elasticElement.height( elasticElement.scrollHeight - delta );
  //       };
      
  //     $elasticElement.on('input change keyup', resize);
  //     resize();
  //   });
    
  // };

  //Init function in the view
  // elasticArea();
  



}


export default test