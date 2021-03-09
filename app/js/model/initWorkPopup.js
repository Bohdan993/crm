import {MicroModal} from '../../libs/libs'




const initWorkPopup = (count) => {
	let modal = MicroModal.init({
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open'
});



}


export default initWorkPopup // to Components/Employer/EmployerList.js