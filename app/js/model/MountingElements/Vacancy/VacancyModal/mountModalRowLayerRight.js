import  ModalRowLayerRight from '../../../Components/Vacancy/VacancyModal/ModalRowLayerRight'
import { modalLayerRight } from '../../../../view/vacancy'
import {mount} from '../../../../../libs/libs'


const mrlr = new ModalRowLayerRight()


const mountModalRowLayerRight = () => {
if(modalLayerRight) {
	mount(modalLayerRight, mrlr)
	}
}




export default  mountModalRowLayerRight // to ../../../index.js