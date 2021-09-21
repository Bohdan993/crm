import ManagerPopupList from '../../Components/Employer/ManagerPopupComponent'
import GetManagers from '../getManagersClass'


const managersObj = new GetManagers('employers', '.managers-popup-employer form', ManagerPopupList)

const getManagerPopup = function () {
    managersObj.fetchData('managerFilter', 'managers')
}


export default getManagerPopup