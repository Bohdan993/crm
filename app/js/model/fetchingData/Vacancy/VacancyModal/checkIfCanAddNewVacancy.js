import fetch from '../../fetchingDataClass'
import {
    toastr,
    hideAll
} from '../../../../../libs/libs'

const checkIfAddNewVacancy = () => {

    const wanttoclosemodaleventHandler = async (e) => {
        const {
            instance,
            id
        } = e.detail
        const errorArr = []

        try {
            const data = await fetch.getResourse(`/vacancies/get/?id=${id}&section=1`)
            const {main} = data.data


            if (main.id_employer === '0') {
                errorArr.push('Роботодавця.')
            }

            if (main.type_vacancy === '0') {
                errorArr.push('Тип візи.')
            }

            if (main.type_production === '') {
                errorArr.push('Типи продукції.')
            }

            if (main.total_client === '0') {
                errorArr.push('Кількість клієнтів.')
            }

            if (main.start_work === '') {
                errorArr.push('Дату початку роботи.')
            }

            if (main.period === '') {
                errorArr.push('Період (міс).')
            }


            if (errorArr.length) {
                throw new Error(`${errorArr.map((el, i) => '' + (i + 1) + '. ' + el).join('\n')}`)
            }


            instance.closeModal()
            toastr.success(`ID вакансії ${id}`, 'Успішно створена вакансія', {
                closeButton: false
            })

        } catch (e) {
            const {message} = e

            const agree = confirm(`Ви не заповнили необхідні дані. Потрібно вибрати/заповнити: ${'\n' + message + '\n'} Продовжити заповнення даних?`)


            if (!agree) {
                await fetch.getResourse(`/vacancies/delete/?id=${id}`)
                instance.closeModal()
                hideAll()
                return
            }

        }

    }

    document.addEventListener('wanttoclosemodalevent', wanttoclosemodaleventHandler)

}


export default checkIfAddNewVacancy