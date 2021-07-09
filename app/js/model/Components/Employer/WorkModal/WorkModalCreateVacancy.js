import {
	el,
	setAttr
} from '../../../../../libs/libs'



export default class WorkModalCreateVacancy {
	constructor() {
		this.data = {}
		this.el = el('div.sidebar__filter-wrapper',
			this.link = el('a', {
				href: '#',
			}, 'Создать вакансию'),
		)
	}


	update(data) {

		setAttr(this.link, {
			target: '_blank',
			href: `vacancies#createvacancy=true&id_employer=${data.id}${data.lastIdVacancy ? ('&id_vacancy=' + data.lastIdVacancy) : ''}`
		})

		this.data = data
	}
}