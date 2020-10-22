


import ManagerSelect from '../../../Components/ManagerSelectComponent'
import {list, mount} from '../../../../../libs/libs'
import {sidebarEmployerForm} from '../../../../view'

console.log(sidebarEmployerForm)

const select = new ManagerSelect()


const mountManagerSelect = () => {
	if(sidebarEmployerForm) {
		mount(sidebarEmployerForm, select)
	}
}




export default mountManagerSelect // to ../../../index.js