import {mount} from '../../../../libs/libs'
import ClientDeleteReasonModal from './../../Components/Vacancy/ClientDeleteReasonModalComponent';

const clientModal = document.querySelector('#modal-4')
const modal = new ClientDeleteReasonModal()


const mountClientDeleteReasonModalComponent = () => {
    if (clientModal) {
        mount(clientModal, modal)
    }
}


export default  mountClientDeleteReasonModalComponent // to ../../../index.js
export {
    modal // to ../../../Components/Employer/WorkModal/WorkModalContactHistory
}