import SearchInput from '../../Components/SearchInput'
import {el, mount, place} from '../../../../libs/libs'


const mountSearchInputVacancy = () => {
	const inputWrapper = document.querySelector('#vacancy-search-input-wrapper')
	const searchInput = place(SearchInput, 'vacancy')

	if(inputWrapper) {
		mount(inputWrapper, searchInput)
		searchInput.update(true)

		setTimeout(function(){
			searchInput.view.removeHiddenClass()
		}, 0)
		
	}
}


export default mountSearchInputVacancy // to ../../index.js