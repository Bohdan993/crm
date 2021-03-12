
const initElasticArea = (elem) => {
	
			let heightLimit = 30000;
			elem.style.height = "";
  		elem.style.height = Math.min(elem.scrollHeight, heightLimit) + "px";
}


export default initElasticArea