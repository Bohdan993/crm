import DemandComponent from '../../../Components/Vacancy/VacancyModal/DemandsComponent'
import {el, mount} from '../../../../../libs/libs'
import { demandsRow } from '../../../../view'

const mountDemandsComponent = () => {

	const demand = new DemandComponent()

	if(demandsRow) {
		mount(demandsRow, demand)
	}
	
}


export default mountDemandsComponent // to ../../index.js