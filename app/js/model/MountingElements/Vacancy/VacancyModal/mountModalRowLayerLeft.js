import  ModalRowLayerLeft from '../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft'
import { modalLayerLeft } from '../../../../view/vacancy'
import {list, mount} from '../../../../../libs/libs'


const mrll = new ModalRowLayerLeft()


const mountModalRowLayerLeft = () => {
if(modalLayerLeft) {
	mount(modalLayerLeft, mrll)
	}
}




export default  mountModalRowLayerLeft // to ../../../index.js