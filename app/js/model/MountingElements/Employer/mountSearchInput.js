import SearchInput from '../../Components/Employer/SearchInput'
import {el, mount, place} from '../../../../libs/libs'


const mountSearchInput = () => {
	const inputWrapper = document.querySelector('.sidebar__input-wrapper')
	const searchInput = place(SearchInput)

	if(inputWrapper) {
		mount(inputWrapper, searchInput)
		searchInput.update(true)
		// console.log(searchInput)
		setTimeout(function(){
			searchInput.view.removeHiddenClass()
		}, 0)
		
	}
}


export default mountSearchInput