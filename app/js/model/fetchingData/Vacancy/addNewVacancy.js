import fetch from '../fetchingDataClass'
import {
    sidebarVacancy
} from '../../../view'

import {
    wantToClose,
    wantToCloseModal,
    debounce,
    updateURL
} from '../../helper'
import unloadHandler from './VacancyModal/deleteNewVacancyOnUnload'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import {

    toastr
} from '../../../../libs/libs'
import vacancyListUpdateFetchEvent from '../../CustomEvents/vacancyListUpdateFetchEvent'

import vacancyStorage from '../../Storage/globalVacancies'


let listeners = []


async function onAddVacancy(id = null) {
    try {
        const vacancy = await fetch.getResourse('/vacancies/create')

        if (vacancy.success === true) {

            vacancyStorage.setState([vacancy.data.main], 'id_vacancy')

            const promise = new Promise(function (res, rej) {
                const instance = MicroModal.show('modal-3', {
                    onClose: modal => {
                        updateURL(window.location.pathname)
                        sessionStorage.setItem('addNewVacancyMode', '0')
                        const wrapper = modal.querySelector('.my-modal-wrapper')
                        const modalClose = modal.querySelector('.modal__close')

                        wrapper.removeEventListener('mousedown', listeners[0])
                        modalClose.removeEventListener('mousedown', listeners[1])
                        window.removeEventListener('keydown', listeners[2], true)
                        window.removeEventListener('beforeunload', listeners[3])


                        document.dispatchEvent(vacancyListUpdateFetchEvent)
                    },
                    onShow: async (modal, node) => {
                        sessionStorage.setItem('addNewVacancyMode', '1')
                        listeners = []
                        const wrapper = modal.querySelector('.my-modal-wrapper')
                        const modalClose = modal.querySelector('.modal__close')


                        setTimeout(() => {
                            const wantToCloseModalBinded = wantToCloseModal.bind(wrapper, instance, vacancy.data.main.id_vacancy)
                            const wantToCloseBinded = wantToClose.bind(modalClose, instance, vacancy.data.main.id_vacancy)
                            const wantToCloseWindowBinded = debounce(wantToClose.bind(window, instance, vacancy.data.main.id_vacancy), 1000)
                            const unloadHandlerBinded = unloadHandler.bind(window, vacancy.data.main.id_vacancy)


                            wrapper.addEventListener('mousedown', wantToCloseModalBinded)
                            modalClose.addEventListener('mousedown', wantToCloseBinded)
                            window.addEventListener('keydown', wantToCloseWindowBinded, true)
                            window.addEventListener('beforeunload', unloadHandlerBinded)

                            listeners.push(wantToCloseModalBinded)
                            listeners.push(wantToCloseBinded)
                            listeners.push(wantToCloseWindowBinded)
                            listeners.push(unloadHandlerBinded)


                        }, 0)


                        await getVacancyModalInfo(vacancy.data.main.id_vacancy, true)


                        await getWorkModalFeedback({
                            id: id || JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id,
                            loading: true,
                            str: 'vacancies',
                            other: 1
                        })

                        await getWorkModalTasks({
                            id: id || JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id
                        })

                        res()

                    }
                })
            })


            await promise

            return vacancy.data.main.id_vacancy
        } else {
            throw new Error('Не можливо створити вакансію')
        }

    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {
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