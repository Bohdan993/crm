  const checkIfWrapperIsEmpty = (wrapper)=> {
      //@param wrapper - HTML <div> c классом .modal-row__layer
      let parent = wrapper.closest('.modal-row__layer')
      
  		if(parent.innerHTML.includes('add-feedback-form')){
        parent.classList.remove('empty-layer')
        return 'not empty'
      } else if(wrapper.innerHTML !== '') {
        parent.classList.remove('empty-layer')
        return 'not empty'
  		} else {
        parent.classList.add('empty-layer')
        return 'empty'
      }



  }


  export default checkIfWrapperIsEmpty // to  ./Components/Employer/WorkModal/WorkModalManufacturyType