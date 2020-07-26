import {Choices} from '../../libs/libs'

const initWorkModalSelect = (elem) => {
 if(elem.classList.contains('manager-select')) {
 	 const choices = new Choices(elem, {
		choices: [
		{
			value: 'Отсутствует',
			label: '<span>Отсутствует</span>',
			selected:true,
		  disabled: true,
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
		}],
		classNames: {
			containerOuter: 'choices sidebar-select-modal',
			containerInner: 'choices__inner sidebar-select-modal_inner',
			itemSelectable: 'sidebar-select-item_selectable',
			list: 'sidebar-select-modal__list',
		}

 }); 
 } else if (elem.classList.contains('country-select')) {
 	 const choices = new Choices(elem, {
		choices: [
		{
			value: 'Отсутствует',
			label: '<span>Отсутствует</span>',
			selected:true,
		  disabled: true,
		},
		{
			value: 'Норвегия',
		  label: `<i class="row__flag">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#flag-norway"></use>
                </svg></i><span>Норвегия</span>`,
		  selected: false,
		  disabled: false,
		},
		{
		  value: 'Норвегия',
		  label: `<i class="row__flag">
                <svg>
                  <use xlink:href="img/sprites/svg/symbol/sprite.svg#flag-norway"></use>
                </svg></i><span>Норвегия</span>`,
		  selected: false,
		  disabled: false,
		}],
		classNames: {
			containerOuter: 'choices common-info-select-modal',
			containerInner: 'choices__inner common-info-select-modal_inner',
			itemSelectable: 'common-info-select-item_selectable',
			list: 'common-info-select-modal__list',
		}

 }); 
 }
 
}


export default initWorkModalSelect