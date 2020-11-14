import fetch from '../fetchingDataClass'
import ManagerPopup from '../../Components/Employer/ManagerPopup'
import {list, mount} from '../../../../libs/libs'
import GetManagers from '../getManagersClass'



const managersObj = new GetManagers('employers', '.managers-popup-employer', ManagerPopup)

const getManagerPopup = function (){
	managersObj.fetchData('managerFilter','managers')
}




export default getManagerPopup