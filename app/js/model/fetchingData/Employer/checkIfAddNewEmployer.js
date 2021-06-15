import fetch from '../fetchingDataClass'
import {
    toastr
} from '../../../../libs/libs'

const checkIfAddNewEmployer = () => {
    const wanttoclosemodaleventHandler = async (e) => {
        const {
            instance,
            id
        } = e.detail
        const errorArr = []

        try {
            const data = await fetch.getResourse(`/employers/get/?id=${id}&section=0&other=1`)
            const {main, other} = data.data


            if(main.id_country === '0') {
                errorArr.push('Страну.')
            }

            if(!main.enterprise) {
                errorArr.push('Предприятие.')
            }


            if(!other.production.length) {
                errorArr.push('Типы продукции.')
            }
     

            if(errorArr.length) {
                throw new Error(`${errorArr.map((el, i) => '' + (i + 1) + '. ' + el).join('\n')}`)
            }


            instance.closeModal()
            toastr.success(`ID вакансии ${id}`, 'Успешно создан работодатель', {
                closeButton: false
            })

        } catch (e) {
            const {message} = e

            const agree = confirm(`Вы не заполнили необходимые данные. Нужно выбрать/заполнить: ${'\n' + message + '\n' } Хотите прервать заполнение?`)
            

            if(agree) {
                await fetch.getResourse(`/employers/delete/?id=${id}`)
                instance.closeModal()
                return
            }

        }

    }

    document.addEventListener('wanttoclosemodalevent', wanttoclosemodaleventHandler)
}


export default checkIfAddNewEmployer