import SearchInput from '../../Components/SearchInput'
import {el, mount, place} from '../../../../libs/libs'


const mountSearchInput = () => {
    const inputWrapper = document.querySelector('#employer-search-input-wrapper')
    const searchInput = place(SearchInput, 'employer')

    if (inputWrapper) {
        mount(inputWrapper, searchInput)
        searchInput.update(true)

        setTimeout(function () {
            searchInput.view.removeHiddenClass()
        }, 0)

    }
}


export default mountSearchInput // to ../../index.js