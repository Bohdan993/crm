  const checkIfWrapperIsEmpty = (wrappers)=> {
  	wrappers.forEach(el=> {
  		// console.log(el.innerHTML)
  		if(el.innerHTML === '') {
  			el.classList.add('empty-layer')
  		} else {
  			el.classList.remove('empty-layer')
  		}
  	})
  }


  export default checkIfWrapperIsEmpty