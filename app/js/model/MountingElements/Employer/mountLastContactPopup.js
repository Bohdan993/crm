import  LastContactPopup from '../../Components/Employer/LastContactPopup'
import {list, mount, tippy} from '../../../../libs/libs'

const lastContactPopup = document.querySelector('#last-contact-popup')
let contacts = [
	{
		id: '1',
		name: 'более 1 мес назад'
	},{
		id: '3',
		name: 'более 3 мес назад'
	},{
		id: '6',
		name: 'более 6 мес назад'
	},{
		id: '0',
		name: 'никогда'
	}
]


const popup = list("form", LastContactPopup, 'id')

if(lastContactPopup) {
	mount(lastContactPopup, popup)
}


const mountLastContactPopup = () => {
if(lastContactPopup) {

				

				if(sessionStorage.getItem('lastContactFilter')) { 
						contacts = contacts.map(contact => {
						let checked = JSON.parse(sessionStorage.getItem('lastContactFilter')) === contact.id
	
						return {
							id: contact.id,
							name: contact.name,
							prefix: 'last-contact-',
							checked
						}
					})
				} else {
					contacts = contacts.map(contact => {
					return {
								id: contact.id,
								name: contact.name,
								prefix: 'last-contact-'
							}
					})
				}


			


				popup.update(contacts);
	}
}




export default mountLastContactPopup // to ../../index.js