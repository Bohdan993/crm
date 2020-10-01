import ContactHistoryModal from '../../../Components/Employer/WorkModal/ContactHistoryModal'
import {list, mount} from '../../../../../libs/libs'

const contactModal = document.querySelector('.contact-history-modal')
const modal = new ContactHistoryModal();


const mountContactHistoryModal = () => {
	if(contactModal) {
		mount(contactModal, modal)
	}
}




export default mountContactHistoryModal // to ../../../index.js