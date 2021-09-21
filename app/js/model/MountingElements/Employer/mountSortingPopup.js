import SortingPopup from '../../Components/SortingPopupComponent'
import {
    list,
    mount
} from '../../../../libs/libs'

const sortPopup = document.querySelector('#sorting-popup')
let filters = [{
    id: 'date',
    name: 'По додаванню'
}, {
    id: 'name',
    name: 'По імені'
}, {
    id: 'contact',
    name: 'По контактах'
}, {
    id: 'vacancy',
    name: 'По вакансіях'
}]


const popup = list("form", SortingPopup, 'id', 'employer')

if (sortPopup) {
    mount(sortPopup, popup)
}


const mountSortingPopup = () => {

    if (sortPopup) {


        if (sessionStorage.getItem('sortFilter')) {
            filters = filters.map(filter => {
                let checked = JSON.parse(sessionStorage.getItem('sortFilter')) === filter.id
                return {
                    id: filter.id,
                    name: filter.name,
                    prefix: 'sorting-',
                    checked
                }
            })
        } else {
            filters = filters.map(filter => {
                return {
                    id: filter.id,
                    name: filter.name,
                    prefix: 'sorting-'
                }
            })
        }


        popup.update(filters);
    }
}


export default mountSortingPopup // to ../../index.js