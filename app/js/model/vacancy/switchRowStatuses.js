import changeClientStatus from '../fetchingData/Vacancy/changeClientStatus'
import deleteClientFromVacancy from '../fetchingData/Vacancy/deleteClientFromVacancy'
import storage from '../Storage'
import vacancyStorage from '../Storage/globalVacancies'
import clientUpdateInVacancyEvent from '../CustomEvents/clientUpdateInVacancyEvent'
import clientDeleteFromVacancyEvent from '../CustomEvents/clientDeleteFromVacancyEvent'



const switchRowStatusesTip = function (client_id, vacancy_id) {



    let instance = this._tippy
    let instanseStatuses = instance.popper.querySelectorAll('.status')

    instanseStatuses.forEach(status => {
        let bindedHandler = forEachStatus.bind(status, instance, client_id, vacancy_id, storage)
        status.addEventListener('click', bindedHandler, {
            'once': true
        })
    })
}


export {
    switchRowStatusesTip
}



const switchRowStatuses = function (el, client_id, vacancy_id) {


    let leftArrow = el.querySelector('.cell-status__control-left')
    let rightArrow = el.querySelector('.cell-status__control-right')
    let slider = el.querySelector('.cell-status__slider')

    leftArrow.addEventListener('click', leftArrowClickHandler.bind(leftArrow, client_id, vacancy_id))
    rightArrow.addEventListener('click', rightArrowClickHandler.bind(rightArrow, client_id, vacancy_id))

}


export default switchRowStatuses // to ../Components/Vacancy/VacancyClientsRow


const calculate = function (vacancy_id, type = 'update') {

    const indicatorsClasses = ['decline', 'choosen', 'ready', 'wait', 'department', 'busy']
    const data = storage.getState(vacancy_id)
    let declineCount = +vacancyStorage.getPartialState(vacancy_id, 'id_vacancy', 'status')[0]

    const countObj = {
        decline: type === 'delete' ? ++declineCount : declineCount,
        choose: 0,
        ready: 0,
        wait: 0,
        department: 0,
        busy: 0
    }

    const statusesArr = data.data.map(el => {
        return el.vacancy.id_status
    })

    statusesArr.forEach(el => {
        if (el === '1' || el === '2') {
            countObj.choose++
        } else if (el === '3' || el === '4') {
            countObj.ready++
        } else if (el === '5') {
            countObj.wait++
        } else if (el === '6' || el === '7' || el === '8') {
            countObj.department++
        } else if (el === '9') {
            countObj.busy++
        }
    })

    const statuses = Object.values(countObj)

    const indicatorsArr = statuses.map((el, i) => {
        return {
            number: el,
            class: indicatorsClasses[i]
        }
    })

    vacancyStorage.setPartialState(vacancy_id, 'id_vacancy', 'status', statuses)


    return {
        indicators: indicatorsArr,
        statuses
    }
}


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

            if (arr[ind].textContent === 'Подготовка CV') {

                changeClientStatus({
                    id: client_id,
                    status: '1'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '1', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '1'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'CV отправлено') {
                changeClientStatus({
                    id: client_id,
                    status: '2'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '2', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '2'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Утвержден') {

                changeClientStatus({
                    id: client_id,
                    status: '3'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '3', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '3'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Контракт подписан') {

                changeClientStatus({
                    id: client_id,
                    status: '4'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '4', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '4'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Подан в визовый центр') {


                changeClientStatus({
                    id: client_id,
                    status: '5'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '5', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '5'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Получил разрешение') {

                changeClientStatus({
                    id: client_id,
                    status: '6'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '6', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '6'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Забрал разрешение') {

                changeClientStatus({
                    id: client_id,
                    status: '7'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '7', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '7'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Билеты куплены') {

                changeClientStatus({
                    id: client_id,
                    status: '8'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '8', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '8'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })
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

            if (arr[ind].textContent === 'CV отправлено') {
                changeClientStatus({
                    id: client_id,
                    status: '2'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '2', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '2'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })
            } else if (arr[ind].textContent === 'Утвержден') {
                changeClientStatus({
                    id: client_id,
                    status: '3'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '3', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '3'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Контракт подписан') {

                changeClientStatus({
                    id: client_id,
                    status: '4'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '4', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '4'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Подан в визовый центр') {
                changeClientStatus({
                    id: client_id,
                    status: '5'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '5', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '5'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })
            } else if (arr[ind].textContent === 'Получил разрешение') {
                changeClientStatus({
                    id: client_id,
                    status: '6'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '6', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '6'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Забрал разрешение') {

                changeClientStatus({
                    id: client_id,
                    status: '7'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '7', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '7'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Билеты куплены') {

                changeClientStatus({
                    id: client_id,
                    status: '8'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '8', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '8'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

            } else if (arr[ind].textContent === 'Трудоустроен') {

                changeClientStatus({
                    id: client_id,
                    status: '9'
                }).then(res => {
                    storage.setAndUpdatePartialState(vacancy_id, '9', 'data', client_id)
                    clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                    clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                    clientUpdateInVacancyEvent.detail.statusId = '9'
                    clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                    const {
                        indicators,
                        statuses
                    } = calculate(vacancy_id)
                    clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                    clientUpdateInVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientUpdateInVacancyEvent)
                })

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


        if (this.textContent === 'Подготовка CV') {

            changeClientStatus({
                id: client_id,
                status: '1'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '1', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '1'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })
            // Присваиваем класс родительскому элементу стрелки переключения
            controls.classList.add('choosen')
        } else if (this.textContent === 'CV отправлено') {

            changeClientStatus({
                id: client_id,
                status: '2'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '2', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '2'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })
            controls.classList.add('choosen')

        } else if (this.textContent === 'Утвержден') {
            changeClientStatus({
                id: client_id,
                status: '3'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '3', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '3'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })
            // Присваиваем класс родительскому элементу стрелки переключения
            controls.classList.add('ready')

        } else if (this.textContent === 'Контракт подписан') {

            changeClientStatus({
                id: client_id,
                status: '4'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '4', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '4'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })
            controls.classList.add('ready')

        } else if (this.textContent === 'Подан в визовый центр') {

            changeClientStatus({
                id: client_id,
                status: '5'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '5', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '5'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })

        } else if (this.textContent === 'Получил разрешение') {

            changeClientStatus({
                id: client_id,
                status: '6'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '6', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '6'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })
            controls.classList.add('department')

        } else if (this.textContent === 'Забрал разрешение') {

            changeClientStatus({
                id: client_id,
                status: '7'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '7', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '7'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })
            controls.classList.add('department')

        } else if (this.textContent === 'Билеты куплены') {

            changeClientStatus({
                id: client_id,
                status: '8'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '8', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '8'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })
            controls.classList.add('department')

        } else if (this.textContent === 'Трудоустроен') {

            changeClientStatus({
                id: client_id,
                status: '9'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '9', 'data', client_id)
                clientUpdateInVacancyEvent.detail.id = String(vacancy_id)
                clientUpdateInVacancyEvent.detail.clientId = String(client_id)
                clientUpdateInVacancyEvent.detail.statusId = '9'
                clientUpdateInVacancyEvent.detail.clazz = sliderClazz
                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id)
                clientUpdateInVacancyEvent.detail.indicatorsArr = indicators
                clientUpdateInVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientUpdateInVacancyEvent)
            })

            controls.classList.add('busy')
        }
    } else {

        deleteClientFromVacancy({
            id: client_id,
        }).then(res => {
            if (res !== 'fail') {
                storage.deletePartialState(vacancy_id, 'data', client_id)
                clientDeleteFromVacancyEvent.detail.id = String(vacancy_id)

                const {
                    indicators,
                    statuses
                } = calculate(vacancy_id, 'delete')
                clientDeleteFromVacancyEvent.detail.indicatorsArr = indicators
                clientDeleteFromVacancyEvent.detail.statusesArr = statuses

                document.dispatchEvent(clientDeleteFromVacancyEvent)
                tippy.destroy()
            } else {
                return
            }
        })
    }

    tippy.destroy()
}