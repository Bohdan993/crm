import changeClientStatus from '../fetchingData/Vacancy/changeClientStatus'
import storage from '../Storage'
import vacancyStorage from '../Storage/globalVacancies'
import clientUpdateInVacancyEvent from '../CustomEvents/clientUpdateInVacancyEvent'
import {
    modal
} from '../../model/MountingElements/Vacancy/mountClientDeleteReasonModalComponent'
import {
    calculate
} from './../calculate'
import {
    addMouseUpTrigger,
    closeModal,
    close
} from '../helper'

export const switchRowStatusesTip = function (client_id, vacancy_id) {
    let instance = this._tippy
    let instanseStatuses = instance.popper.querySelectorAll('.status')

    instanseStatuses.forEach(status => {
        let bindedHandler = forEachStatus.bind(status, instance, client_id, vacancy_id, storage)
        status.addEventListener('click', bindedHandler)
    })
}


function changeClientsStatusAndUpdateUI(status_id, vacancy_id, client_id, sliderClazz) {
    changeClientStatus({
        id: client_id,
        status: status_id
    }).then(res => {
        storage.setAndUpdatePartialState(vacancy_id, status_id, 'data', client_id)
        clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
        clientUpdateInVacancyEvent.detail.clientId = String(client_id)
        clientUpdateInVacancyEvent.detail.statusId = status_id
        clientUpdateInVacancyEvent.detail.clazz = sliderClazz
        const {
            indicators,
            statuses
        } = calculate(vacancy_id, 'update', storage, vacancyStorage)
        clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
        clientUpdateInVacancyEvent.detail.statusesArr = statuses

        document.dispatchEvent(clientUpdateInVacancyEvent)
    })

}


const switchRowStatuses = function (el, client_id, vacancy_id) {
    let leftArrow = el.querySelector('.cell-status__control-left')
    let rightArrow = el.querySelector('.cell-status__control-right')
    let slider = el.querySelector('.cell-status__slider')

    leftArrow.addEventListener('click', leftArrowClickHandler.bind(leftArrow, client_id, vacancy_id))
    rightArrow.addEventListener('click', rightArrowClickHandler.bind(rightArrow, client_id, vacancy_id))
}


export default switchRowStatuses // to ../Components/Vacancy/VacancyClientsRow


function leftArrowClickHandler(client_id, vacancy_id) {

    let parent = this.parentNode.parentNode
    let sliderWpar = parent.querySelector('.cell-status__slider')
    let instance = sliderWpar._tippy;
    let slider = parent.querySelectorAll('.status')
    let flag = false
    let sliderClazz = instance.reference.classList[2]


    slider.forEach((elem, ind, arr) => {
        if (elem.classList.contains('active') && !flag) {
            elem.classList.remove('active')
            ind = ind === 0 ? 0 : ind - 1
            arr[ind].classList.add('active')
            if (arr[ind].textContent === 'Підготовка CV') {
                changeClientsStatusAndUpdateUI('1', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'CV відправлено') {
                changeClientsStatusAndUpdateUI('2', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Затверджений') {
                changeClientsStatusAndUpdateUI('3', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Контракт підписаний') {
                changeClientsStatusAndUpdateUI('4', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Поданий в ВА') {
                changeClientsStatusAndUpdateUI('5', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Рішення ВА отримано') {
                changeClientsStatusAndUpdateUI('6', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Документи подані') {
                changeClientsStatusAndUpdateUI('7', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Отримав рішення') {
                changeClientsStatusAndUpdateUI('8', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Забрав дозвіл') {
                changeClientsStatusAndUpdateUI('9', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Готуємо виїзд') {
                changeClientsStatusAndUpdateUI('10', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Білети куплені') {
                changeClientsStatusAndUpdateUI('11', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Забрав документи') {
                changeClientsStatusAndUpdateUI('12', vacancy_id, client_id, sliderClazz)
            }
            flag = true
        }
    })
}

function rightArrowClickHandler(client_id, vacancy_id) {

    let parent = this.parentNode.parentNode
    let sliderWpar = parent.querySelector('.cell-status__slider')
    let instance = sliderWpar._tippy;
    let slider = parent.querySelectorAll('.status')
    let flag = false
    let sliderClazz = instance.reference.classList[2]

    slider.forEach((elem, ind, arr) => {

        if (elem.classList.contains('active') && !flag) {

            elem.classList.remove('active')

            ind = ind === arr.length - 1 ? arr.length - 1 : ind + 1
            arr[ind].classList.add('active')

            if (arr[ind].textContent === 'CV відправлено') {
                changeClientsStatusAndUpdateUI('2', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Затверджений') {
                changeClientsStatusAndUpdateUI('3', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Контракт підписаний') {
                changeClientsStatusAndUpdateUI('4', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Поданий в ВА') {
                changeClientsStatusAndUpdateUI('5', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Рішення ВА отримано') {
                changeClientsStatusAndUpdateUI('6', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Документи подані') {
                changeClientsStatusAndUpdateUI('7', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Отримав рішення') {
                changeClientsStatusAndUpdateUI('8', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Забрав дозвіл') {
                changeClientsStatusAndUpdateUI('9', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Готуємо виїзд') {
                changeClientsStatusAndUpdateUI('10', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Білети куплені') {
                changeClientsStatusAndUpdateUI('11', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Забрав документи') {
                changeClientsStatusAndUpdateUI('12', vacancy_id, client_id, sliderClazz)
            } else if (arr[ind].textContent === 'Працевлаштований') {
                changeClientsStatusAndUpdateUI('13', vacancy_id, client_id, sliderClazz)
            }

            flag = true
        }
    })
}


function forEachStatus(tippy, client_id, vacancy_id, storage) {

    let sliderClazz = tippy.reference.classList[2]
    let row = tippy.reference.closest('.table-full__row')
    let statuses = row.querySelectorAll('.status')
    let controls = row.querySelector('.cell-status__controls')


    if (!this.classList.contains('del-status')) {

        // Убираем второй класс у стрелочок переключателей статуса
        controls.classList.remove(controls.classList[1])


        //Устанавливаем активный статус в строке
        statuses.forEach((el, ind) => {
            el.classList.remove('active')

            if (this.textContent === el.textContent) {
                el.classList.add('active')
            }
        })


        if (this.textContent === 'Підготовка CV') {
            changeClientsStatusAndUpdateUI('1', vacancy_id, client_id, sliderClazz)
            // Присваиваем класс родительскому элементу стрелки переключения
            controls.classList.add('choosen')
        } else if (this.textContent === 'CV відправлено') {
            changeClientsStatusAndUpdateUI('2', vacancy_id, client_id, sliderClazz)
            controls.classList.add('choosen')
        } else if (this.textContent === 'Затверджений') {
            changeClientsStatusAndUpdateUI('3', vacancy_id, client_id, sliderClazz)
            controls.classList.add('ready')
        } else if (this.textContent === 'Контракт підписаний') {
            changeClientsStatusAndUpdateUI('4', vacancy_id, client_id, sliderClazz)
            controls.classList.add('ready')
        } else if (this.textContent === 'Поданий в ВА') {
            changeClientsStatusAndUpdateUI('5', vacancy_id, client_id, sliderClazz)
            controls.classList.add('wait')
        } else if (this.textContent === 'Рішення ВА отримано') {
            changeClientsStatusAndUpdateUI('6', vacancy_id, client_id, sliderClazz)
            controls.classList.add('wait')
        } else if (this.textContent === 'Документи подані') {
            changeClientsStatusAndUpdateUI('7', vacancy_id, client_id, sliderClazz)
            controls.classList.add('wait')
        } else if (this.textContent === 'Отримав рішення') {
            changeClientsStatusAndUpdateUI('8', vacancy_id, client_id, sliderClazz)
            controls.classList.add('department')
        } else if (this.textContent === 'Забрав дозвіл') {
            changeClientsStatusAndUpdateUI('9', vacancy_id, client_id, sliderClazz)
            controls.classList.add('department')
        } else if (this.textContent === 'Готуємо виїзд') {
            changeClientsStatusAndUpdateUI('10', vacancy_id, client_id, sliderClazz)
            controls.classList.add('department')
        } else if (this.textContent === 'Білети куплені') {
            changeClientsStatusAndUpdateUI('11', vacancy_id, client_id, sliderClazz)
            controls.classList.add('department')
        } else if (this.textContent === 'Забрав документи') {
            changeClientsStatusAndUpdateUI('12', vacancy_id, client_id, sliderClazz)
            controls.classList.add('department')
        } else if (this.textContent === 'Працевлаштований') {
            changeClientsStatusAndUpdateUI('13', vacancy_id, client_id, sliderClazz)
            controls.classList.add('busy')
        }
    } else {
        const instance = MicroModal.show('modal-4', {
            onClose: (modal) => {
                const wrapper = modal.querySelector('.my-modal-wrapper')
                const modalClose = modal.querySelector('.modal__close')

                wrapper.removeEventListener('mouseup', this.addMouseUpTrigger)
                wrapper.removeEventListener('mousedown', this.closeModal)
                modalClose.removeEventListener('click', this.close)
            },
            onShow: (modal) => {
                const wrapper = modal.querySelector('.my-modal-wrapper')
                const modalClose = modal.querySelector('.modal__close')


                setTimeout(
                    () => {

                        this.addMouseUpTrigger = addMouseUpTrigger
                        this.closeModal = closeModal.bind(null, modal.id, instance)
                        this.close = close.bind(null, modal.id, instance)

                        wrapper.addEventListener('mouseup', this.addMouseUpTrigger)
                        wrapper.addEventListener('mousedown', this.closeModal)
                        modalClose.addEventListener('click', this.close)
                    }, 0)
            }
        })

        modal.update({
            client_id,
            vacancy_id,
            tippy
        })

        tippy.hide()
        return

    }

    tippy.destroy()
}