import fetch from '../fetchingDataClass'
import getEmployersList from '../Employer/getEmployersList'
import {
	sidebarEmployer
} from '../../../view'
import {
	toastr
} from '../../../../libs/libs'
import {
	addMouseUpTrigger,
	closeModal
} from '../../helper'
import getWorkModalInfo from '../../fetchingData/Employer/WorkModal/getWorkModalInfo'
import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'

let flag = false

const addNewEmployer = () => {
	if (sidebarEmployer) {


		sidebarEmployer.addEventListener('click', async function () {

			try {
				const employer = await fetch.getResourse('/employers/create')

				if (employer.success === true) {

					const instance = MicroModal.show('modal-1', {
						onClose: async modal => {
							const data = await fetch.getResourse(`/employers/get/?id=${employer.id}&section=0`)
							if (data.data.main.id_country !== '0' && data.data.other.production.length !== 0) {
								toastr.success(`ID работодателя ${employer.id}`, 'Успешно создан работодатель', {
									closeButton: false
								})
								getEmployersList({
									added: true,
									// filtered: JSON.parse(sessionStorage.getItem('employersFiltered'))
								})
							} else {
								fetch.getResourse(`/employers/delete/?id=${employer.id}`)
							}
						},
						onShow: (modal) => {
							const wrapper = modal.querySelector('.my-modal-wrapper')
							const modalClose = modal.querySelector('.modal__close')

							if (!flag) {
								setTimeout(() => {
									wrapper.addEventListener('mouseup', addMouseUpTrigger, {
										once: true
									})
									wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id, instance))
									modalClose.addEventListener('click', function () {
										MicroModal.close(modal.id)
									})
								}, 0)

								flag = true
							}
						}
					})

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

				} else {
					throw new Error('Не возможно cоздать работодателя')
				}

			} catch (e) {
				toastr.error(e.message, 'Возникла ошибка', {
					closeButton: true
				})
			}

		})
	}
}


export default addNewEmployer