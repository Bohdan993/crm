import fetch from '../fetchingDataClass'
import {StickyLoader} from '../../Components/LoaderComponent'
import getVacancyList from '../Vacancy/getVacancyList'
import {place, mount} from '../../../../libs/libs'
import {throttle} from '../../helper'

const HEIGHT = 10
const DATA_LENGTH = 50
const loader = place(StickyLoader)
let count = 2
let data = {}
let flag = false


const fetchScroll = (elem, type) => {
    //@param elem - HTML node <div class="employer-rows-wrapper"></div>

    mount(elem, loader)

    data.hasNextPage = 0
    document.addEventListener('vacancieslistnotfiltered', function (e) {
        count = 2
        data.hasNextPage = e.detail.hasNextPage ? 1 : 0
    })

    async function ajaxData(e) {

        if (!!data.hasNextPage) {
            loader.update(true)
        } else {
            loader.update(false)
        }

        let vertical = e.target.scrollTop


        if (vertical) {
            if (this.scrollTop + this.clientHeight >= this.scrollHeight - (HEIGHT * count) && !!data.hasNextPage && !flag) {
                flag = true

                loader.update(true)

                data = await getVacancyList({t: DATA_LENGTH, p: count, scroll: true})
                    .then((data) => {
                        flag = false
                        return data
                    })

                sessionStorage.setItem('page', JSON.stringify(count))
                count++
                flag = false

                if (!!data.hasNextPage) {
                    loader.update(false)
                }
            }
        }
    }

    ajaxData = throttle(ajaxData, 250)
    elem.addEventListener('scroll', ajaxData)


}


export default fetchScroll // to ../index.js

