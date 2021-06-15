import fetch from '../fetchingDataClass'
import {
	sidebarEmployer
} from '../../../view'
import {
	toastr
} from '../../../../libs/libs'
import {
	wantToClose,
	wantToCloseModal
} from '../../helper'
import getWorkModalInfo from '../../fetchingData/Employer/WorkModal/getWorkModalInfo'
import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'


let listeners = []


const addNewEmployer = () => {
	if (sidebarEmployer) {

		sidebarEmployer.addEventListener('click', loadData)

		async function loadData() {

			try {
				const employer = await fetch.getResourse('/employers/create')

				if (employer.success === true) {

					const instance = MicroModal.show('modal-1', {
						onClose: modal => {
							const wrapper = modal.querySelector('.my-modal-wrapper')
							const modalClose = modal.querySelector('.modal__close')
							console.log(listeners)
							wrapper.removeEventListener('mousedown', listeners[0])
							modalClose.removeEventListener('mousedown', listeners[1])
							window.removeEventListener('keydown', listeners[1])
						},
						onShow: (modal) => {
							listeners = []
							const wrapper = modal.querySelector('.my-modal-wrapper')
							const modalClose = modal.querySelector('.modal__close')


							setTimeout(() => {

								const wantToCloseModalBinded = wantToCloseModal.bind(wrapper, instance, employer.id)
								const wantToCloseBinded = wantToClose.bind(modalClose, instance, employer.id)

								wrapper.addEventListener('mousedown', wantToCloseModalBinded)
								modalClose.addEventListener('mousedown', wantToCloseBinded)
								window.addEventListener('keydown', wantToCloseBinded, true)

								listeners.push(wantToCloseModalBinded)
								listeners.push(wantToCloseBinded)

							}, 0)


							getWorkModalInfo(employer.id)
							getWorkModalManufacturyType(employer.id)
							getWorkModalMedia({
								id: employer.id,
								loading: true
							})
							getWorkModalContactHistory({
								id: employer.id,
								loading: true
							})
							getWorkModalVacancyHistory({
								id: employer.id,
								loading: true
							})
							getWorkModalFeedback({
								id: employer.id,
								loading: true,
								other: 5,
								str: 'employers'
							})
							getWorkModalTasks({
								id: employer.id
							})
						}
					})

				} else {
					throw new Error('Не возможно cоздать работодателя')
				}

			} catch (e) {
				toastr.error(e.message, 'Возникла ошибка', {
					closeButton: true
				})
			}

		}
	}
}


export default addNewEmployer