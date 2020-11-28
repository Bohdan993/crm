import  ArchiveActive from '../../Components/Vacancy/ActiveArchiveComponent'
import { archiveActive } from '../../../view/vacancy'
import {list, mount} from '../../../../libs/libs'


const arcAct = new ArchiveActive()


const mountActiveArchive = () => {
if(archiveActive) {
	mount(archiveActive, arcAct)
	}
}




export default  mountActiveArchive // to ../../index.js