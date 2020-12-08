import fetch from './fetchingDataClass'
import {StickyLoader} from '../Components/Loader'
import getEmployersList from './getEmployersList'
import getVacancyList from './Vacancy/getVacancyList'
import {place, mount} from '../../../libs/libs'
import {throttle} from '../helper'

const HEIGHT = 300
const DATA_LENGTH = 50
const loader = place(StickyLoader)
let count = +JSON.parse(sessionStorage.getItem('page')) || 2
let data = Array(DATA_LENGTH)
let flag = false



const fetchScroll = (elem, type) => {
	//@param elem - HTML node <div class="employer-rows-wrapper"></div>

// let count = +JSON.parse(sessionStorage.getItem('page')) || 2
// let data = Array(DATA_LENGTH)
// let flag = false
		
	async function ajaxData(){
		if (this.scrollTop + this.clientHeight >= this.scrollHeight - HEIGHT && data.length === DATA_LENGTH && !flag) {
					flag = true
					mount(elem, loader)
					loader.update(true)

      	if(type === 'employer') {
      			// let count = +JSON.parse(sessionStorage.getItem('page')) || 2
		        data = await getEmployersList({t: DATA_LENGTH, p: count, scroll: true}).then((data)=> {flag = false; return data} )
		        sessionStorage.setItem('page', JSON.stringify(count))
		        console.log(count)
		      	count++
      	} else {
      				// let count = +JSON.parse(sessionStorage.getItem('pageVacancy')) || 2
			        data = await getVacancyList({t: DATA_LENGTH, p: count, scroll: true}).then((data)=> {flag = false; return data} )
			        sessionStorage.setItem('pageVacancy', JSON.stringify(count))
			      	count++
      	}
      		loader.update(false)
    }
	}

	ajaxData = throttle(ajaxData, 1000)
	elem.addEventListener('scroll', ajaxData)
	
}



export default fetchScroll // to ../index.js