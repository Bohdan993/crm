import TermsComponent from '../../../Components/Vacancy/VacancyModal/TermsComponent'
import {el, mount} from '../../../../../libs/libs'
import { termsRow } from '../../../../view'

const mountTermsComponent = () => {
	const terms = new TermsComponent()

	if(termsRow) {
		mount(termsRow, terms)
	}
}


export default mountTermsComponent // to ../../index.js