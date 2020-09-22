import fetch from '../fetchingDataClass'
import SearchInput from '../../Components/Employer/SearchInput'
import {list, mount} from '../../../../libs/libs'

// 
const getTextSearch = async (string = '') => {

		try {
				const data = await fetch.getResourse(`/employers/get_all/?search=вапрвавапв`)
				console.log(data)
				// const managers = data.data.managers

				// localStorage.setItem('managers', JSON.stringify(managers))

				// popup.update(managers);
		} catch (e) {
			console.error(e)
		}
	

}




export default getTextSearch