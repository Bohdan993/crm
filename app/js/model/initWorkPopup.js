

import {MicroModal} from '../../libs/libs'

import {modalRowMediaWrapper,modalRowMedia,mediaShowMore, body} from '../view'

import getEmployersList from './fetchingData/getEmployersList'
import getVacancyList from './fetchingData/Vacancy/getVacancyList'



const initWorkPopup = (count) => {
	let modal = MicroModal.init({
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open'
});



}


export default initWorkPopup // to Components/Employer/EmployerList.js