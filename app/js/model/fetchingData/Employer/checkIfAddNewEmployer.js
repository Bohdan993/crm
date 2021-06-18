import fetch from '../fetchingDataClass'
import {
    toastr,
    hideAll
} from '../../../../libs/libs'

const checkIfAddNewEmployer = () => {
    const wanttoclosemodaleventHandler = async (e) => {
        const {
            instance,
            id
        } = e.detail
        const errorArr = []

        const email = document.querySelector('#common-info-email')
        const phone = document.querySelector('#common-info-phone')
        const name = document.querySelector('.common-info__contact-person-area')
        const company = document.querySelector('.common-info__manufactury-area')

        try {
            const data = await fetch.getResourse(`/employers/get/?id=${id}&section=0&other=1`)
            const {
                main,
                other
            } = data.data

            if (main.id_country === '0') {
                errorArr.push('Страну.')
            }



            if ((!main.enterprise ||
                    !main.enterprise.trim() ||
                    !company.value.trim()) &&
                (!main.name ||
                    !main.name.trim() ||
                    !name.value.trim()
                )) {
                errorArr.push('Предприятие или контактное лицо.')
            }


            if ((!main.phone ||
                    !main.phone.trim() ||
                    !phone.value.trim()) &&
                (!main.email ||
                    !main.email.trim() ||
                    !email.value.trim()
                )) {
                errorArr.push('Основной номер телефона или основной адрес эл. почты.')
            }


            if (!other.production.length) {
                errorArr.push('Типы производства.')
            }


            if (errorArr.length) {
                throw new Error(`${errorArr.map((el, i) => '' + (i + 1) + '. ' + el).join('\n')}`)
            }


            instance.closeModal()
            toastr.success(`ID вакансии ${id}`, 'Успешно создан работодатель', {
                closeButton: false
            })

        } catch (e) {
            const {
                message
            } = e

            const agree = confirm(`Вы не заполнили необходимые данные. Нужно выбрать/заполнить: ${'\n' + message + '\n' } Продолжить заполнение данных?`)


            if (!agree) {
                await fetch.getResourse(`/employers/delete/?id=${id}`)
                instance.closeModal()
                hideAll()
                return
            }

        }

    }

    document.addEventListener('wanttoclosemodalevent', wanttoclosemodaleventHandler)
}


export default checkIfAddNewEmployer