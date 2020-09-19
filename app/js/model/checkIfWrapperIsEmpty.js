  const checkIfWrapperIsEmpty = (wrapper)=> {
      //@param wrapper - HTML <div> c классом .modal-row__layer
  		if(wrapper.innerHTML === '') {
  			wrapper.classList.add('empty-layer')
  			
  		} else {
  			wrapper.classList.remove('empty-layer')
  
  		}



  }


  export default checkIfWrapperIsEmpty // to  ./Components/Employer/WorkModal/WorkModalManufacturyType