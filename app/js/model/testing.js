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



}


export default test