

import {MicroModal} from '../../libs/libs'

import {modalRowMediaWrapper,modalRowMedia,mediaShowMore, body} from '../view'

import getEmployersList from './fetchingData/getEmployersList'


function addMouseUpTrigger(e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    return
  }

}


function closeModal(id, e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    MicroModal.close(id)
  }
}



let flag = false
let flagMedia = false

const initWorkPopup = (count) => {

	let show = false
	let modal = MicroModal.init({
  onShow: (modal, node) => {
    // console.log(`${modal.id} is shown`)
    const wrapper = modal.querySelector('.my-modal-wrapper')

    if(!flag) {
      wrapper.addEventListener('mouseup', addMouseUpTrigger)
      wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
      flag = true
    }

  },
  onClose: modal => {
    getEmployersList()
    console.log(`${modal.id} is hidden`) // [2]
  },
  openTrigger: 'data-custom'+ count +'-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open'
});



}


export default initWorkPopup // to Components/Employer/EmployerList.js