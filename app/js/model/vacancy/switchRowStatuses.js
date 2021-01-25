import changeClientStatus from '../fetchingData/Vacancy/changeClientStatus'
import deleteClientFromVacancy from '../fetchingData/Vacancy/deleteClientFromVacancy'
import storage from '../Storage'
import storageVacancyClientsUpdate from '../CustomEvents/storageVacancyClientsUpdate'
import storageVacancyClientDelete from '../CustomEvents/storageVacancyClientDelete'

const switchRowStatuses = function (el, client_id, vacancy_id) {
    // console.log(client_id)

    let timeArray = Array(9).fill({
        text: '',
        date: ''
    })


    let leftArrow = el.querySelector('.cell-status__control-left')
    let rightArrow = el.querySelector('.cell-status__control-right')
    let slider = el.querySelector('.cell-status__slider')
    let instance = this._tippy
    let instanseStatuses = instance.popper.querySelectorAll('.status')

    instanseStatuses.forEach(status => {
        status.addEventListener('click', forEachStatus.bind(status, timeArray, instance, client_id, vacancy_id, storage))
    })

    leftArrow.addEventListener('click', function () {
        // console.log(storage, client_id)
        let parent = this.parentNode.parentNode
        let sliderWpar = parent.querySelector('.cell-status__slider')
        let instance = sliderWpar._tippy;
        let slider = parent.querySelectorAll('.status')
        let flag = false
        let row = parent.parentNode.parentNode
        let table = row.parentNode
        let tableParent = table.parentNode.parentNode


        let sliderClazz = instance.reference.classList[2]


        console.log(instance)
        // console.log(row)
        // console.log(table)

        slider.forEach((elem, ind, arr) => {
            // console.log(elem)
            if (elem.classList.contains('active') && !flag) {

                elem.classList.remove('active')
                ind = ind === 0 ? 0 : ind - 1
                arr[ind].classList.add('active')

                timeArray[ind] = {
                    text: arr[ind].textContent,
                    date: new Date().toLocaleDateString()
                }
                // console.log(arr[ind])
                // setNewContent(instance, timeArray, ind)


                let oldChild = table.removeChild(row)

                if (arr[ind].textContent === 'Подготовка CV') {

                    console.log(instance.popper.querySelector('.status.choosen'))


                    changeClientStatus({
                        id: client_id,
                        status: '1'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '1', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    // storage.setPartialState()
                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__choosen').querySelectorAll('[data-count="1"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '1'

                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let node = tableParent.querySelector('.table-full__choosen').querySelector('.table-full__layer')
                        node.prepend(oldChild)
                    }

                } else if (arr[ind].textContent === 'CV отправлено') {
                    changeClientStatus({
                        id: client_id,
                        status: '2'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '2', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    // Присваиваем класс родительскому элементу стрелки переключения
                    this.parentNode.classList.remove('ready')
                    this.parentNode.classList.add('choosen')
                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__choosen').querySelectorAll('[data-count="2"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '2'

                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let nodes = tableParent.querySelector('.table-full__choosen').querySelectorAll('[data-count="1"]')
                        let node = nodes[nodes.length - 1]
                        if (node) {
                            node.after(oldChild)
                        } else {
                            let node = tableParent.querySelector('.table-full__choosen').querySelector('.table-full__layer')
                            node.prepend(oldChild)
                        }

                    }


                } else if (arr[ind].textContent === 'Утвержден') {

                    changeClientStatus({
                        id: client_id,
                        status: '3'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '3', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })


                    let nodes = tableParent.querySelector('.table-full__ready').querySelectorAll('[data-count="1"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '1'

                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let node = tableParent.querySelector('.table-full__ready').querySelector('.table-full__layer')
                        node.prepend(oldChild)
                    }

                } else if (arr[ind].textContent === 'Контракт подписан') {

                    changeClientStatus({
                        id: client_id,
                        status: '4'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '4', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })


                    this.parentNode.classList.remove('wait')
                    this.parentNode.classList.add('ready')

                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__ready').querySelectorAll('[data-count="2"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '2'

                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let nodes = tableParent.querySelector('.table-full__ready').querySelectorAll('[data-count="1"]')
                        let node = nodes[nodes.length - 1]
                        if (node) {
                            node.after(oldChild)
                        } else {
                            let node = tableParent.querySelector('.table-full__ready').querySelector('.table-full__layer')
                            node.prepend(oldChild)
                        }

                    }

                } else if (arr[ind].textContent === 'Подан в визовый центр') {


                    changeClientStatus({
                        id: client_id,
                        status: '5'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '5', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })


                    this.parentNode.classList.remove('department')
                    this.parentNode.classList.add('wait')

                    oldChild.dataset.count = '1'
                    tableParent.querySelector('.table-full__wait').querySelector('.table-full__layer').append(oldChild)
                } else if (arr[ind].textContent === 'Получил разрешение') {

                    let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '1'

                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let node = tableParent.querySelector('.table-full__department').querySelector('.table-full__layer')
                        node.prepend(oldChild)
                    }

                } else if (arr[ind].textContent === 'Забрал разрешение') {

                    changeClientStatus({
                        id: client_id,
                        status: '7'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '7', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })

                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="2"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '2'

                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                        let node = nodes[nodes.length - 1]
                        if (node) {
                            node.after(oldChild)
                        } else {
                            let node = tableParent.querySelector('.table-full__department').querySelector('.table-full__layer')
                            node.prepend(oldChild)
                        }

                    }

                } else if (arr[ind].textContent === 'Билеты куплены') {

                    changeClientStatus({
                        id: client_id,
                        status: '8'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '8', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })

                    this.parentNode.classList.remove('busy')
                    this.parentNode.classList.add('department')
                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="3"]')
                    let node = nodes[nodes.length - 1]

                    oldChild.dataset.count = '3'

                    if (node) {
                        node.after(oldChild)
                    } else {
                        let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="2"]')
                        let node = nodes[nodes.length - 1]

                        if (node) {
                            node.after(oldChild)
                        } else {
                            let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                            let node = nodes[nodes.length - 1]
                            if (node) {
                                node.after(oldChild)
                            } else {
                                let node = tableParent.querySelector('.table-full__department').querySelector('.table-full__layer')
                                node.prepend(oldChild)
                            }

                        }

                    }

                }

                flag = true
            }
        })


    })


    rightArrow.addEventListener('click', function () {

        let parent = this.parentNode.parentNode
        let sliderWpar = parent.querySelector('.cell-status__slider')
        let instance = sliderWpar._tippy;
        let slider = parent.querySelectorAll('.status')
        let flag = false
        let row = parent.parentNode.parentNode
        let table = row.parentNode
        let tableParent = table.parentNode.parentNode
        // console.log(row)
        // console.log(table)

        let sliderClazz = instance.reference.classList[2]

        slider.forEach((elem, ind, arr) => {

            if (elem.classList.contains('active') && !flag) {

                elem.classList.remove('active')

                ind = ind === arr.length - 1 ? arr.length - 1 : ind + 1
                arr[ind].classList.add('active')
                timeArray[ind] = {
                    text: arr[ind].textContent,
                    date: new Date().toLocaleDateString()
                }
                // console.log(arr[ind])
                // setNewContent(instance, timeArray, ind)
                //Получаем строку, позицию которой будем менять
                let oldChild = table.removeChild(row)


                if (arr[ind].textContent === 'CV отправлено') {
                    changeClientStatus({
                        id: client_id,
                        status: '2'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '2', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    // Присваиваем класс родительскому элементу стрелки переключения
                    this.parentNode.classList.add('choosen')
                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__choosen').querySelectorAll('[data-count="2"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '2'
                    //Вставляем строку в DOM
                    // node.after(oldChild)

                    if (node) {
                        node.after(oldChild)
                    } else {
                        let node = tableParent.querySelector('.table-full__choosen').querySelector('.table-full__layer')
                        node.prepend(oldChild)
                    }

                } else if (arr[ind].textContent === 'Утвержден') {
                    changeClientStatus({
                        id: client_id,
                        status: '3'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '3', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    // Присваиваем класс родительскому элементу стрелки переключения
                    this.parentNode.classList.remove('choosen')
                    this.parentNode.classList.add('ready')

                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__ready').querySelectorAll('[data-count="1"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '1'
                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let node = tableParent.querySelector('.table-full__ready').querySelector('.table-full__layer')
                        node.prepend(oldChild)
                    }

                } else if (arr[ind].textContent === 'Контракт подписан') {

                    changeClientStatus({
                        id: client_id,
                        status: '4'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '4', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__ready').querySelectorAll('[data-count="2"]')
                    let node = nodes[nodes.length - 1]

                    oldChild.dataset.count = '2'

                    if (node) {
                        node.after(oldChild)
                    } else {
                        let nodes = tableParent.querySelector('.table-full__ready').querySelectorAll('[data-count="1"]')
                        let node = nodes[nodes.length - 1]


                        if (node) {
                            node.after(oldChild)
                        } else {
                            let node = tableParent.querySelector('.table-full__ready').querySelector('.table-full__layer')
                            node.prepend(oldChild)
                        }
                    }

                } else if (arr[ind].textContent === 'Подан в визовый центр') {
                    changeClientStatus({
                        id: client_id,
                        status: '5'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '5', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    this.parentNode.classList.remove('ready')
                    this.parentNode.classList.add('wait')

                    oldChild.dataset.count = '1'
                    tableParent.querySelector('.table-full__wait').querySelector('.table-full__layer').append(oldChild)
                } else if (arr[ind].textContent === 'Получил разрешение') {
                    changeClientStatus({
                        id: client_id,
                        status: '6'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '6', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    // Присваиваем класс родительскому элементу стрелки переключения
                    this.parentNode.classList.remove('wait')
                    this.parentNode.classList.add('department')

                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                    let node = nodes[nodes.length - 1]

                    //Меняем селектор для строки
                    oldChild.dataset.count = '1'
                    //Вставляем строку в DOM
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let node = tableParent.querySelector('.table-full__department').querySelector('.table-full__layer')
                        node.prepend(oldChild)
                    }

                } else if (arr[ind].textContent === 'Забрал разрешение') {
                    changeClientStatus({
                        id: client_id,
                        status: '7'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '7', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="2"]')
                    let node = nodes[nodes.length - 1]

                    oldChild.dataset.count = '2'

                    if (node) {
                        node.after(oldChild)
                    } else {
                        let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                        let node = nodes[nodes.length - 1]


                        if (node) {
                            node.after(oldChild)
                        } else {
                            let node = tableParent.querySelector('.table-full__department').querySelector('.table-full__layer')
                            node.prepend(oldChild)
                        }
                    }

                } else if (arr[ind].textContent === 'Билеты куплены') {
                    changeClientStatus({
                        id: client_id,
                        status: '8'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '8', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    //Получаем все елементы после которого будем вставлять строку
                    let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="3"]')
                    let node = nodes[nodes.length - 1]

                    oldChild.dataset.count = '3'

                    if (node) {
                        node.after(oldChild)
                    } else {
                        let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="2"]')
                        let node = nodes[nodes.length - 1]

                        if (node) {
                            node.after(oldChild)
                        } else {
                            let nodes = tableParent.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                            let node = nodes[nodes.length - 1]

                            if (node) {
                                node.after(oldChild)
                            } else {
                                let node = tableParent.querySelector('.table-full__department').querySelector('.table-full__layer')
                                node.prepend(oldChild)
                            }

                        }

                    }

                } else if (arr[ind].textContent === 'Трудоустроен') {
                    changeClientStatus({
                        id: client_id,
                        status: '9'
                    }).then(res => {
                        // console.log(res)
                        storage.setAndUpdatePartialState(vacancy_id, '9', 'data', client_id)
                        storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                        storageVacancyClientsUpdate.detail.clazz = sliderClazz
                        document.dispatchEvent(storageVacancyClientsUpdate)
                    })
                    this.parentNode.classList.remove('department')
                    this.parentNode.classList.add('busy')


                    oldChild.dataset.count = '1'
                    tableParent.querySelector('.table-full__busy').querySelector('.table-full__layer').append(oldChild)

                }

                flag = true
            }
        })

    })

    // })
}


function forEachStatus(timeArray, tippy, client_id, vacancy_id, storage) {


    console.log(timeArray)
    console.log(tippy)


    let sliderClazz = tippy.reference.classList[2]
 

    let row = tippy.reference.closest('.table-full__row')
    let parentRow = row.parentNode
    let mainParentRow = parentRow.parentNode
    let parentTable = parentRow.parentNode.parentNode

    console.log(parentTable)

    let statuses = row.querySelectorAll('.status')
    let controls = row.querySelector('.cell-status__controls')
    let delStatus = row.querySelector('.del-status')

    tippy.unmount()

    if (!this.classList.contains('del-status')) {

        // Убираем второй класс у стрелочок переключателей статуса
        controls.classList.remove(controls.classList[1])


        //Устанавливаем активный статус в строке
        statuses.forEach((el, ind) => {
            el.classList.remove('active')

            if (this.textContent === el.textContent) {
                el.classList.add('active')

                timeArray[ind] = {
                    text: this.textContent,
                    date: new Date().toLocaleDateString()
                }

                //Добавляем дату утановки статуса в попапе
                this.nextElementSibling.textContent = timeArray[ind].date
            }
        })


        let oldChild = parentRow.removeChild(row)

        if (this.textContent === 'Подготовка CV') {
            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__choosen').classList.remove('hidden')

            changeClientStatus({
                id: client_id,
                status: '1'
            }).then(res => {
                // console.log(res)
                storage.setAndUpdatePartialState(vacancy_id, '1', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            // Присваиваем класс родительскому элементу стрелки переключения
            controls.classList.add('choosen')
            // console.log(parentTable)
            //Получаем все елементы после которого будем вставлять строку
            let nodes = parentTable.querySelector('.table-full__choosen').querySelectorAll('[data-count="1"]')
            let node = nodes[nodes.length - 1]

            //Меняем селектор для строки
            oldChild.dataset.count = '1'
            //Вставляем строку в DOM
            if (node) {
                node.after(oldChild)
            } else {
                let node = parentTable.querySelector('.table-full__choosen').querySelector('.table-full__layer')
                node.prepend(oldChild)
            }

        } else if (this.textContent === 'CV отправлено') {
            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__choosen').classList.remove('hidden')

            changeClientStatus({
                id: client_id,
                status: '2'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '2', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            controls.classList.add('choosen')
            //Получаем все елементы после которого будем вставлять строку
            let nodes = parentTable.querySelector('.table-full__choosen').querySelectorAll('[data-count="2"]')
            let node = nodes[nodes.length - 1]

            oldChild.dataset.count = '2'

            if (node) {
                node.after(oldChild)
            } else {
                let nodes = parentTable.querySelector('.table-full__choosen').querySelectorAll('[data-count="1"]')
                let node = nodes[nodes.length - 1]
                if (node) {
                    node.after(oldChild)
                } else {
                    let node = parentTable.querySelector('.table-full__choosen').querySelector('.table-full__layer')
                    node.prepend(oldChild)
                }
            }
        } else if (this.textContent === 'Утвержден') {

            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__ready').classList.remove('hidden')

            changeClientStatus({
                id: client_id,
                status: '3'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '3', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            // Присваиваем класс родительскому элементу стрелки переключения
            controls.classList.add('ready')

            //Получаем все елементы после которого будем вставлять строку
            let nodes = parentTable.querySelector('.table-full__ready').querySelectorAll('[data-count="1"]')
            let node = nodes[nodes.length - 1]

            //Меняем селектор для строки
            oldChild.dataset.count = '1'
            //Вставляем строку в DOM
            if (node) {
                node.after(oldChild)
            } else {

                let node = parentTable.querySelector('.table-full__ready').querySelector('.table-full__layer')
                node.prepend(oldChild)
            }

        } else if (this.textContent === 'Контракт подписан') {
            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__ready').classList.remove('hidden')

            changeClientStatus({
                id: client_id,
                status: '4'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '4', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            controls.classList.add('ready')
            //Получаем все елементы после которого будем вставлять строку
            let nodes = parentTable.querySelector('.table-full__ready').querySelectorAll('[data-count="2"]')
            let node = nodes[nodes.length - 1]

            oldChild.dataset.count = '2'

            if (node) {
                node.after(oldChild)
            } else {
                let nodes = parentTable.querySelector('.table-full__ready').querySelectorAll('[data-count="1"]')
                let node = nodes[nodes.length - 1]
                if (node) {
                    node.after(oldChild)
                } else {
                    let node = parentTable.querySelector('.table-full__ready').querySelector('.table-full__layer')
                    node.prepend(oldChild)
                }
            }

        } else if (this.textContent === 'Подан в визовый центр') {
            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__wait').classList.remove('hidden')

            changeClientStatus({
                id: client_id,
                status: '5'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '5', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })

            controls.classList.add('wait')
            oldChild.dataset.count = '1'
            parentTable.querySelector('.table-full__wait').querySelector('.table-full__layer').append(oldChild)

        } else if (this.textContent === 'Получил разрешение') {
            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__department').classList.remove('hidden')

            changeClientStatus({
                id: client_id,
                status: '6'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '6', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            controls.classList.add('department')

            //Получаем все елементы после которого будем вставлять строку
            let nodes = parentTable.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
            let node = nodes[nodes.length - 1]
            // console.log(node)
            //Меняем селектор для строки
            oldChild.dataset.count = '1'
            //Вставляем строку в DOM

            if (node) {
                node.after(oldChild)
            } else {
                let node = parentTable.querySelector('.table-full__department').querySelector('.table-full__layer')
                node.prepend(oldChild)
            }

        } else if (this.textContent === 'Забрал разрешение') {
            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__department').classList.remove('hidden')


            changeClientStatus({
                id: client_id,
                status: '7'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '7', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            controls.classList.add('department')
            //Получаем все елементы после которого будем вставлять строку
            let nodes = parentTable.querySelector('.table-full__department').querySelectorAll('[data-count="2"]') || []
            let node = nodes[nodes.length - 1]

            oldChild.dataset.count = '2'

            if (node) {
                node.after(oldChild)
            } else {
                let nodes = parentTable.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                let node = nodes[nodes.length - 1]
                if (node) {
                    node.after(oldChild)
                } else {
                    let node = parentTable.querySelector('.table-full__department').querySelector('.table-full__layer')
                    node.prepend(oldChild)
                }

            }

        } else if (this.textContent === 'Билеты куплены') {

            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__department').classList.remove('hidden')


            changeClientStatus({
                id: client_id,
                status: '8'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '8', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            controls.classList.add('department')
            //Получаем все елементы после которого будем вставлять строку
            let nodes = parentTable.querySelector('.table-full__department').querySelectorAll('[data-count="3"]')
            let node = nodes[nodes.length - 1]

            oldChild.dataset.count = '3'

            if (node) {
                node.after(oldChild)
            } else {
                let nodes = parentTable.querySelector('.table-full__department').querySelectorAll('[data-count="2"]')
                let node = nodes[nodes.length - 1]

                if (node) {
                    node.after(oldChild)
                } else {
                    let nodes = parentTable.querySelector('.table-full__department').querySelectorAll('[data-count="1"]')
                    let node = nodes[nodes.length - 1]
                    if (node) {
                        node.after(oldChild)
                    } else {
                        let node = parentTable.querySelector('.table-full__department').querySelector('.table-full__layer')
                        node.prepend(oldChild)
                    }
                }
            }

        } else if (this.textContent === 'Трудоустроен') {
            // Делаем раздел с клиентами видимым
            // parentTable.querySelector('.table-full__busy').classList.remove('hidden')

            changeClientStatus({
                id: client_id,
                status: '9'
            }).then(res => {
                storage.setAndUpdatePartialState(vacancy_id, '9', 'data', client_id)
                storageVacancyClientsUpdate.detail.id = String(vacancy_id)
                storageVacancyClientsUpdate.detail.clazz = sliderClazz
                document.dispatchEvent(storageVacancyClientsUpdate)
            })
            controls.classList.add('busy')
            oldChild.dataset.count = '1'
            parentTable.querySelector('.table-full__busy').querySelector('.table-full__layer').append(oldChild)
        }
    } else {

        deleteClientFromVacancy({
            id: client_id,
        }).then(res => {
            if (res !== 'fail') {
                storage.deletePartialState(vacancy_id, 'data', client_id)
                storageVacancyClientDelete.detail.id = String(vacancy_id)
                document.dispatchEvent(storageVacancyClientDelete)
                tippy.unmount()
            } else {
                return
            }
        })
    }


}

// function setNewContent(instance, timeArray, ind){
//      instance.setContent(`<div class="row-popup" id="status-change-popup">
//                   <form>
//                     <div class="input-group">
//                       <p class="status choosen"><span>Подготовка CV</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'Подготовка CV' ? timeArray[ind].date : timeArray[0].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="status choosen"><span>CV отправлено</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'CV отправлено' ? timeArray[ind].date : timeArray[1].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="status ready"><span>Утвержден</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'Утвержден' ? timeArray[ind].date : timeArray[2].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="status ready"><span>Контракт подписан</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'Контракт подписан' ? timeArray[ind].date : timeArray[3].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                      <p class="status wait"><span>Подан в визовый центр</span></p>
//                      <time>
//                      ${timeArray[ind].text === 'Подан в визовый центр' ? timeArray[ind].date : timeArray[4].date}
//                      </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="status department"><span>Получил разрешение</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'Получил разрешение' ? timeArray[ind].date : timeArray[5].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="status department"><span>Забрал разрешение</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'Забрал разрешение' ? timeArray[ind].date : timeArray[6].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="status department"><span>Билеты куплены</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'Билеты куплены' ? timeArray[ind].date : timeArray[7].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="status busy"><span>Трудоустроен</span></p>
//                       <time>
//                       ${timeArray[ind].text === 'Трудоустроен' ? timeArray[ind].date : timeArray[8].date}
//                       </time>
//                     </div>
//                     <div class="input-group">
//                       <p class="del-status status delete"><span>Исключить из вакансии</span></p>
//                     </div>
//                   </form>
//                 </div>`)

//      return
// }
export default switchRowStatuses // to ../Components/Vacancy/VacancyClientsRow