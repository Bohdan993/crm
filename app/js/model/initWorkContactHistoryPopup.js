import {MicroModal} from '../../libs/libs'


const initWorkContactHistoryPopup = () => {
	let modal = MicroModal.init({
  onShow: (modal, node) => {
    console.log(`${modal.id} is shown`)
  },
  onClose: modal => {
    console.log(`${modal.id} is hidden`) // [2]
  },
  openTrigger: 'data-contact-history-open', // [3]
  closeTrigger: 'data-contact-history-close', // [4]
  openClass: 'is-open'
});

}


export default initWorkContactHistoryPopup