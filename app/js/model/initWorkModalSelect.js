import {Choices} from '../../libs/libs'



let defaultValue = [
	{
			value: 'Отсутствует',
			label: '<span>Отсутствует</span>',
			selected:true,
		  disabled: false,
		}
]


const initWorkModalSelect = (elem, { countries } = {}) => {
 if(elem.classList.contains('manager-select')) {
 	 const choices = new Choices(elem, {
		choices: [
		{
			value: 'Отсутствует',
			label: '<span>Отсутствует</span>',
			selected:true,
		  disabled: false,
		},
		
		{
			value: 'Алексей',
		  label: `<i class="tag manager-tag dark-blue-tag">AK</i><span>Алексей</span>`,
		  selected: false,
		  disabled: false,
		},
		{
		  value: 'Светлана',
		  label: '<i class="tag manager-tag light-green-tag">СК</i><span>Светлана</span>',
		  selected: false,
		  disabled: false,
		},
	

		],
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
 	 const choices = new Choices(elem, {
		choices: [
		{
			value: 'Отсутствует',
			label: '<span>Отсутствует</span>',
			selected:true,
		  disabled: false,
		},
		{
			value: 'Почтовое письмо',
		  label: `<i class="contact-ico">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#letter"></use>
                </svg></i><span>Почтовое письмо</span>`,
		  selected: false,
		  disabled: false,
		},
		{
		  value: 'Телефонный звонок',
		  label: `<i class="contact-ico">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#phone"></use>
                </svg></i><span>Телефонный звонок</span>`,
		  selected: false,
		  disabled: false,
		},

		{
		  value: 'SMS или мессенджер',
		  label: `<i class="contact-ico">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#message"></use>
                </svg></i><span>SMS или мессенджер</span>`,
		  selected: false,
		  disabled: false,
		},

		{
		  value: 'Электронная почта',
		  label: `<i class="contact-ico">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#mail"></use>
                </svg></i><span>Электронная почта</span>`,
		  selected: false,
		  disabled: false,
		},

		{
		  value: 'Факс',
		  label: `<i class="contact-ico">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#fax"></use>
                </svg></i><span>Факс</span>`,
		  selected: false,
		  disabled: false,
		},

	

		],
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