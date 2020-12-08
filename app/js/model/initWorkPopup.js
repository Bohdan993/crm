

import {MicroModal} from '../../libs/libs'

import {modalRowMediaWrapper,modalRowMedia,mediaShowMore, body} from '../view'

import getEmployersList from './fetchingData/getEmployersList'
import getVacancyList from './fetchingData/Vacancy/getVacancyList'


function addMouseUpTrigger(e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    return
  }

}


function closeModal(id, e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    MicroModal.close(id)
    getEmployersList()
    getVacancyList()
  }
}



let flag = false
let flagMedia = false

const initWorkPopup = (count) => {

	let show = false
	let modal = MicroModal.init({
  onShow: (modal, node) => {
    console.log(`${modal.id} is shown`)
    const wrapper = modal.querySelector('.my-modal-wrapper')

    if(!flag) {
      wrapper.addEventListener('mouseup', addMouseUpTrigger)
      wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
      flag = true
    }

  },
  onClose: modal => {
    getEmployersList()
    getVacancyList()
    console.log(count)
    console.log(`${modal.id} is hidden`) // [2]
  },
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open'
});



}


export default initWorkPopup // to Components/Employer/EmployerList.js