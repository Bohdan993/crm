import ManagerPopupList from '../../Components/Employer/ManagerPopupComponent'
import GetManagers from '../getManagersClass'


const managersObj = new GetManagers('vacancies', '.managers-popup-vacancy form', ManagerPopupList, 'vacancy')

const getManagerVacancyPopup = function () {

    managersObj.fetchData('managerFilterVacancy', 'managersVacancy')
}


export default getManagerVacancyPopup