import VacancyList from '../../Components/Vacancy/VacancyListComponent'
import Loader from '../../Components/LoaderComponent'
import {
    mount,
    place
} from '../../../../libs/libs'


const vacancyList = new VacancyList()
const loader = place(Loader)


const mountVacancyList = () => {
    const vacanciesWrapper = document.querySelector('.vacancy-rows-wrapper')

    if (vacanciesWrapper) {
        mount(vacanciesWrapper, vacancyList)
        mount(vacanciesWrapper, loader)
    }
}


export {
    vacancyList,
    loader
}

export default mountVacancyList // to ../../index.js