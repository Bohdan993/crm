  const checkIfWrapperIsEmpty = (wrapper)=> {
      //@param wrapper - HTML <div> c классом .modal-row__layer
  		if(wrapper.innerHTML === '') {
        wrapper.closest('.modal-row__layer').classList.add('empty-layer')
  			
  		} else {
        wrapper.closest('.modal-row__layer').classList.remove('empty-layer')
  		}



  }


  export default checkIfWrapperIsEmpty // to  ./Components/Employer/WorkModal/WorkModalManufacturyType