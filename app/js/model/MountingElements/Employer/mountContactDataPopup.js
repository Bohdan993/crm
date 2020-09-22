import ContactDataPopup from '../../Components/Employer/ContactDataPopup'
import {list, mount, tippy} from '../../../../libs/libs'

const contactPopup = document.querySelector('#contact-popup')
let contacts = [
	{
		id: 'phone',
		name: 'Телефон'
	},{
		id: 'email',
		name: 'E-mail'
	},{
		id: 'address',
		name: 'Почтовый адрес'
	},{
		id: 'site',
		name: 'Сайт'
	},{
		id: 'facebook',
		name: 'Facebook',
	},{
		id: 'instagram',
		name: 'Instagram'
	},
]


const popup = list("form", ContactDataPopup, 'id')

if(contactPopup) {
	mount(contactPopup, popup)
}


const mountContactDataPopup = () => {
if(contactPopup) {
				if(sessionStorage.getItem('contactDataFilter')) { 
						contacts = contacts.map(contact => {
						let checked = !!~JSON.parse(sessionStorage.getItem('contactDataFilter')).split(',').indexOf(contact.id)
						return {
							id: contact.id,
							name: contact.name,
							checked
						}
					})
				}
				popup.update(contacts);
	}
}




export default mountContactDataPopup