import {
	el,
	MicroModal,
	setAttr
} from '../../../../../libs/libs'
import archiveVacancy from '../../../fetchingData/Vacancy/VacancyModal/archiveVacancy'
import copyVacancy from '../../../fetchingData/Vacancy/VacancyModal/copyVacancy'
import getVacancyModalInfo from '../../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import vacancyListUpdateFetchEvent from './../../../CustomEvents/vacancyListUpdateFetchEvent'





export default class ArchiveCopyVacancyComponent {
	constructor(type) {
		this.type = type
		this.el = el('div.sidebar__filter-wrapper',
			this.text = el('p', `${type === 'copy' ? 'Создать копию вакансии' : 'Архивировать вакансию'}`))


		this.el.addEventListener('click', e => {
			if (type === 'copy') {
				copyVacancy({
						vacancy: this.data
					})
					.then(res => {
						if (res !== 'fail') {
							MicroModal.close('modal-3')
							document.dispatchEvent(vacancyListUpdateFetchEvent)
							setTimeout(() => {
								getVacancyModalInfo(res).then(r => MicroModal.show('modal-3'))
							}, 1500)
						} else {
							return
						}
					})
			} else {
				archiveVacancy({
						vacancy: this.data,
						type: this.context === '0' ? 0 : 1
					})
					.then(res => {
						if (res === 'ok') {
							MicroModal.close('modal-3')
							document.dispatchEvent(vacancyListUpdateFetchEvent)
						} else {
							return
						}
					})
			}

		})
	}


	update(data, context) {

		if (this.type === 'archive') {
			if (context === '0') {
				setAttr(this.text, {
					innerText: 'Архивировать вакансию'
				})
			} else {
				setAttr(this.text, {
					innerText: 'Перенести в текущие'
				})
			}
		}

		this.data = data
		this.context = context
	}
}