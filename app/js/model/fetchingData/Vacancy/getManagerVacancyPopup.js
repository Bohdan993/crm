import fetch from '../fetchingDataClass'
import ManagerPopup from '../../Components/Employer/ManagerPopup'
import {list, mount} from '../../../../libs/libs'
import GetManagers from '../getManagersClass'



const managersObj = new GetManagers('vacancies', '.managers-popup-vacancy', ManagerPopup, 'vacancy')

const getManagerVacancyPopup = function (){
	console.log(managersObj)
	managersObj.fetchData('managerFilterVacancy','managersVacancy')
}




export default getManagerVacancyPopup