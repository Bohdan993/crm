import ManagerPopupList from '../../Components/Employer/ManagerPopup'
import GetManagers from '../getManagersClass'



const managersObj = new GetManagers('vacancies', '.managers-popup-vacancy form', ManagerPopupList, 'vacancy')

const getManagerVacancyPopup = function (){
	// console.log(managersObj)
	managersObj.fetchData('managerFilterVacancy','managersVacancy')
}




export default getManagerVacancyPopup