import ClientsComponent from '../../../Components/Vacancy/VacancyModal/ClientsComponent'
import {list, mount} from '../../../../../libs/libs'
import  { clientsRow } from '../../../../view'

const clients = new ClientsComponent()


const mountClientsVacancy = () => {
	if(clientsRow) {
		mount(clientsRow, clients)
	}
}




export default mountClientsVacancy // to ../../../index.js