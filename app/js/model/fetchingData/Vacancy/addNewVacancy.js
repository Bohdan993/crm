import fetch from '../fetchingDataClass'
import {
	sidebarVacancy
} from '../../../view'

import {
	wantToClose,
	wantToCloseModal
} from '../../helper'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import {

	toastr
} from '../../../../libs/libs'
import vacancyListUpdateFetchEvent from '../../CustomEvents/vacancyListUpdateFetchEvent'


let listeners = []



async function onAddVacancy(id = null) {
	try {
		const vacancy = await fetch.getResourse('/vacancies/create')

		if (vacancy.success === true) {

			const instance = MicroModal.show('modal-3', {
				onClose: modal => {
					sessionStorage.setItem('addNewVacancyMode', '0')
					const wrapper = modal.querySelector('.my-modal-wrapper')
					const modalClose = modal.querySelector('.modal__close')

					wrapper.removeEventListener('click', listeners[0])
					modalClose.removeEventListener('click', listeners[1])
					window.removeEventListener('keydown', listeners[1])

					document.dispatchEvent(vacancyListUpdateFetchEvent)
				},
				onShow: (modal, node) => {
					sessionStorage.setItem('addNewVacancyMode', '1')
					listeners = []
					const wrapper = modal.querySelector('.my-modal-wrapper')
					const modalClose = modal.querySelector('.modal__close')


					setTimeout(() => {
						const wantToCloseModalBinded = wantToCloseModal.bind(wrapper, instance, vacancy.id)
						const wantToCloseBinded = wantToClose.bind(modalClose, instance, vacancy.id)


						wrapper.addEventListener('click', wantToCloseModalBinded)
						modalClose.addEventListener('click', wantToCloseBinded)
						window.addEventListener('keydown', wantToCloseBinded, true)

						listeners.push(wantToCloseModalBinded)
						listeners.push(wantToCloseBinded)

					}, 0)


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
				}
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