import fetch from '../fetchingDataClass'
// import getVacancyList from './getVacancyList'
import {
	sidebarVacancy
} from '../../../view'

import {
	addMouseUpTrigger,
	closeModal
} from '../../helper'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import {
	toastr
} from '../../../../libs/libs'
// import vacancyListAddEvent from '../../CustomEvents/vacancyListAddEvent'

let flag = false


async function onAddVacancy(id = null) {
	try {
		const vacancy = await fetch.getResourse('/vacancies/create')

		if (vacancy.success === true) {

			const instance = MicroModal.show('modal-3', {
				onClose: async modal => {
					const data = await fetch.getResourse(`/vacancies/get/?id=${vacancy.id}&section=0`)

					if (data.data.main.id_employer !== '0') {
						toastr.success(`ID вакансии ${vacancy.id}`, 'Успешно создана вакансия', {
							closeButton: false
						})
						// getVacancyList({
						// 	added: true
						// })

						// vacancyListAddEvent.detail.id = String(vacancy.id)
						// document.dispatchEvent(vacancyListAddEvent)
					} else {
						fetch.getResourse(`/vacancies/delete/?id=${vacancy.id}`)
					}

				},
				onShow: (modal, node) => {
					const wrapper = modal.querySelector('.my-modal-wrapper')
					const modalClose = modal.querySelector('.modal__close')

					if (!flag) {
						setTimeout(() => {
							wrapper.addEventListener('mouseup', addMouseUpTrigger)
							wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id, instance))
							modalClose.addEventListener('click', function () {
								MicroModal.close(modal.id)
							})
						}, 0)

						flag = true
					}
				}
			})


			getVacancyModalInfo(vacancy.id, true).then(res => {
				getWorkModalFeedback({
					id: id || JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id,
					loading: true,
					str: 'vacancies',
					other: 1
				})


				getWorkModalTasks({
					id: id || JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id
				})
			})


			return vacancy.id
		} else {
			throw new Error('Не возможно cоздать вакансию')
		}




	} catch (e) {
		toastr.error(e.message, 'Возникла ошибка', {
			closeButton: true
		})
	}
}

const addNewVacancy = () => {
	if (sidebarVacancy) {
		sidebarVacancy.addEventListener('click', onAddVacancy.bind(null, null))
	}
}


export default addNewVacancy


export {
	onAddVacancy
}