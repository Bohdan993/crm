import ContactHistoryModal from '../../../Components/Employer/WorkModal/ContactHistoryModalComponent'
import {list, mount} from '../../../../../libs/libs'

const contactModal = document.querySelector('#modal-2')
const modal = new ContactHistoryModal()


const mountContactHistoryModal = () => {
    if (contactModal) {
        mount(contactModal, modal)
    }
}


export default mountContactHistoryModal // to ../../../index.js
export {
    modal // to ../../../Components/Employer/WorkModal/WorkModalContactHistory
}