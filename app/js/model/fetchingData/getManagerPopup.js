import fetch from './fetchingDataClass'
import ManagerPopup from '../Components/Employer/ManagerPopup'
import {list, mount} from '../../../libs/libs'

const managersPopup = document.querySelector('#managers-popup')
const popup = list("form", ManagerPopup, 'id')
if(managersPopup) {

	mount(document.querySelector('#managers-popup'), popup)
}
const getManagerPopup = async () => {
if(managersPopup) {
		try {
				const data = await fetch.getResourse('/employers/get_other/?s=1')
				let managers = data.data.managers

			
			
				if(sessionStorage.getItem('managerFilter')) { 
						managers = managers.map(manager => {
						let checked = !!~JSON.parse(sessionStorage.getItem('managerFilter')).split(',').indexOf(manager.id)
						return {
							id: manager.id,
							name: manager.name,
							color: manager.color,
							checked
						}
					})
				} else {
					managers = managers.map(manager=> {
						return {
							id: manager.id,
							name: manager.name,
							color: manager.color,
						}
					})
				}

				localStorage.setItem('managers', JSON.stringify(managers))

				popup.update(managers);
		} catch (e) {
			console.error(e)
		}
	}

}




export default getManagerPopup