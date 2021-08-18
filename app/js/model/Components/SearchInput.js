import {el, setAttr, svg} from '../../../libs/libs'
import getEmployersList from '../fetchingData/Employer/getEmployersList'
import getVacancyList from '../fetchingData/Vacancy/getVacancyList'
import sidebarSearchInput from '../sidebarSearchInput'


export default class SearchInput {
    constructor(type = 'employer') {
        this.type = type
        this.el = el('div.sidebar__input-layer.hidden',
            this.search = el('input.sidebar__search-input', {
                type: 'text',
                placeholder: 'пошук'
            }),
            el('i.search-icon',
                svg('svg', svg('use', {
                    xlink: {href: "img/sprites/svg/symbol/sprite.svg#search"}
                }))
            ),
            el('i.remove-icon.hidden')
        )
        this.searchFunc = this.searchFunc.bind(this)
        this.searchFunc()
    }


    update(data, index, items) {

    }

    searchFunc() {
        this.search.addEventListener('change', seachFunc)
        const type = this.type
        if (type === 'employer') {
            this.search.value = JSON.parse(sessionStorage.getItem('search'))
        } else {
            this.search.value = JSON.parse(sessionStorage.getItem('searchVacancy'))
        }

        function seachFunc(e) {
            let val = e.target.value.trim()

            if (type === 'employer') {
                getEmployersList({search: val, filtered: true})
                sessionStorage.setItem('search', JSON.stringify(val))
            } else {
                getVacancyList({search: val, filtered: true})
                sessionStorage.setItem('searchVacancy', JSON.stringify(val))
            }

        }

        sidebarSearchInput(this.search)
        this.search.dispatchEvent(new Event('input'))
    }

    removeHiddenClass() {
        this.el.classList.remove('hidden')
    }

}