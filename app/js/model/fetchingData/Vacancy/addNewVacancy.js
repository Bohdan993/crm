import fetch from '../fetchingDataClass'
import getVacancyList from './getVacancyList'
import {
	sidebarVacancy
} from '../../../view'

import {
	addMouseUpTrigger,
	closeModal
} from '../../helper'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import {
	toastr
} from '../../../../libs/libs'
import vacancyListAddEvent from '../../CustomEvents/VacancyListAddEvent'

let flag = false


async function onAddVacancy(id = null) {
	try {
		const vacancy = await fetch.getResourse('/vacancies/create')

		if (vacancy.success === true) {
			toastr.success(`ID вакансии ${vacancy.id}`, 'Успешно создана вакансия', {
				closeButton: false
			})
			await getVacancyList({
				added: true
			})

			MicroModal.show('modal-3', {
				onClose: modal => {
					getVacancyList()
				},
				onShow: (modal, node) => {
					const wrapper = modal.querySelector('.my-modal-wrapper')
					const modalClose = modal.querySelector('.modal__close')

					if (!flag) {
						wrapper.addEventListener('mouseup', addMouseUpTrigger)
						wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
						modalClose.addEventListener('click', function () {
							MicroModal.close(modal.id)
						})
						flag = true
					}
				}
			})


			getVacancyModalInfo(vacancy.id).then(res => {
				getWorkModalFeedback({
					id: id || JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id,
					loading: true,
					str: 'vacancies',
					other: 1
				})
			})


			return vacancy.id
		} else {
			throw new Error('Не возможно cоздать вакансию')
		}


		vacancyListAddEvent.detail.id = String(vacancy.id)
		document.dispatchEvent(vacancyListAddEvent)

	} catch (e) {
		toastr.error(e.message, 'Возникла ошибка', {
			closeButton: true
		})
	}
}

const addNewVacancy = () => {
	if (sidebarVacancy) {
		sidebarVacancy.addEventListener('click', onAddVacancy.bind(null))
	}
}


export default addNewVacancy


export {
	onAddVacancy
}