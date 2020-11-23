import {el, setAttr} from '../../../libs/libs'
import getVacancyList from '../fetchingData/Vacancy/getVacancyList'





export default class ArchiveActive {
	constructor(){
		this.el = el('div.input-group.radio-group-type-2.blue', 
			el('div.group',
				this.activeBtn = el('input', {
					type: 'checkbox',
					id: 'current-chbx',
					name: 'current-chbx',
					cheched: true
				}),
				el('label', {
					for: 'current-chbx',
					innerText: "Текущие"
				}),
				this.archiveBtn = el('input', {
					type: 'checkbox',
					id: 'archive-chbx',
					name: 'archive-chbx'
				}),
				el('label', {
					for: 'archive-chbx',
					innerText: "Архивные"
				})
				)
			)


		this.activeBtn.addEventListener('click', (e) => {

		})

		this.archiveBtn.addEventListener('click', (e) => {
			
		})
	}


	update(data){

	}
}
