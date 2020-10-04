import {Choices} from '../../libs/libs'



let defaultValue = [
	{
			value: 'Отсутствует',
			label: '<span>Отсутствует</span>',
			selected:true,
		  disabled: false,
		}
]


const initWorkModalSelect = (elem, { countries, managers, contacts } = {}) => {
 if(elem.classList.contains('manager-select')) {
 	// console.log(managers)
 	let choisesManagers = managers ? managers.map(manager => {
 			return {
 				value: manager.name,
 				label: `<i class="tag manager-tag" style="background-color:#${manager.color}">${manager.name.split(/\s+/).map(word => word[0].toUpperCase()).join('')}</i><span>${manager.name}</span>`,
        selected: false,
        disabled: false
 			}
 		}) : []


 	let resultArray = defaultValue.concat(choisesManagers)
 	 const choices = new Choices(elem, {
		choices: resultArray,
		searchEnabled: false,
		shouldSort: false,
		classNames: {
			containerOuter: 'choices sidebar-select-modal',
			containerInner: 'choices__inner sidebar-select-modal_inner',
			itemSelectable: 'sidebar-select-item_selectable',
			list: 'sidebar-select-modal__list',
		}

 }); 
 } else if (elem.classList.contains('country-select')) {
 		let choisesCountries = countries.map(country => {
 			return {
 				value: country.name,
 				label: `<i class="row__flag">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#${country.icon}"></use>
                </svg></i><span>${country.name}</span>`,
        selected: false,
        disabled: false
 			}
 		})


 		let resultArray = defaultValue.concat(choisesCountries)

 		// console.log(countries)
 	 const choices = new Choices(elem, {
		choices: resultArray,
		searchEnabled: false,
		shouldSort: false,
		classNames: {
			containerOuter: 'choices common-info-select-modal',
			containerInner: 'choices__inner common-info-select-modal_inner',
			itemSelectable: 'common-info-select-item_selectable',
			list: 'common-info-select-modal__list',
		}

 }); 
 } else if (elem.classList.contains('contact-select')) {
 	console.log(contacts)
 	let choisesContacts = contacts ? contacts.map(contact => {
 			return {
 				value: contact.name,
		  	label: `<i class="contact-ico">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#${contact.icon}"></use>
                </svg></i><span>${contact.name}</span>`,
		  	selected: false,
		  	disabled: false,
 			}
 		}) : []


 	let resultArray = defaultValue.concat(choisesContacts)
 	 const choices = new Choices(elem, {
		choices: resultArray,
		searchEnabled: false,
		shouldSort: false,
		classNames: {
			containerOuter: 'choices contact-select-modal',
			containerInner: 'choices__inner contact-select-modal_inner',
			itemSelectable: 'contact-select-item_selectable',
			list: 'contact-select-modal__list',
		}

 }); 
 }
 
}


export default initWorkModalSelect