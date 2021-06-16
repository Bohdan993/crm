import fetch from '../../fetchingDataClass'
import {
    toastr
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


            if(main.id_employer === '0') {
                errorArr.push('Работодателя.')
            }

            if(main.type_vacancy === '0') {
                errorArr.push('Тип визы.')
            }

            if(main.type_production === '') {
                errorArr.push('Типы продукции.')
            }

            if(main.total_client === '0') {
                errorArr.push('Количество клиентов.')
            }

            if(main.start_work === '') {
                errorArr.push('Дату начала работы.')
            }


            if(errorArr.length) {
                throw new Error(`${errorArr.map((el, i) => '' + (i + 1) + '. ' + el).join('\n')}`)
            }


            instance.closeModal()
            toastr.success(`ID вакансии ${id}`, 'Успешно создана вакансия', {
                closeButton: false
            })

        } catch (e) {
            const {message} = e

            const agree = confirm(`Вы не заполнили необходимые данные. Нужно выбрать/заполнить: ${'\n' + message + '\n' } Продолжить заполнение данных?`)
            

            if(!agree) {
                fetch.getResourse(`/vacancies/delete/?id=${id}`)
                instance.closeModal()
                return
            }

        }

    }

    document.addEventListener('wanttoclosemodalevent', wanttoclosemodaleventHandler)
}


export default checkIfAddNewVacancy