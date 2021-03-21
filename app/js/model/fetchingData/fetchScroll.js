import fetch from './fetchingDataClass'
import {StickyLoader} from '../Components/Loader'
import getEmployersList from './Employer/getEmployersList'
import getVacancyList from './Vacancy/getVacancyList'
import {place, mount} from '../../../libs/libs'
import {throttle, sleep} from '../helper'

const HEIGHT = 10
const DATA_LENGTH = 50
const loader = place(StickyLoader)
// let count = +JSON.parse(sessionStorage.getItem('page')) || 2
// let countVacancy = +JSON.parse(sessionStorage.getItem('pageVacancy')) || 2
let count = 2
let countVacancy = 2
let data = {}
let flag = false



const fetchScroll = (elem, type) => {
	//@param elem - HTML node <div class="employer-rows-wrapper"></div>

	mount(elem, loader)




		if(type === 'employer') {
		
			data.success = true
			document.addEventListener('employerlistnotfiltered', function(e){
				console.log("EVENT NOT FILTERD")
				count = 2
				data.success = true
			})
			// data = JSON.parse(sessionStorage.getItem('pageDataLength')) && Array(JSON.parse(sessionStorage.getItem('pageDataLength'))) || Array(DATA_LENGTH)
		} else {
			data = Array(DATA_LENGTH)
			// data = JSON.parse(sessionStorage.getItem('pageVacancyDataLength')) && Array(JSON.parse(sessionStorage.getItem('pageVacancyDataLength'))) || Array(DATA_LENGTH)
		}

		// console.log(data)
	async function ajaxData(e){


	if(type === 'employer') {
  		if(count <= 2 && data.success || !JSON.parse(sessionStorage.getItem('employersFiltered')) && data.success) {
				loader.update(true)
			} else {
				loader.update(false)
			}
		}	
	// console.log(flag)
  let vertical = e.target.scrollTop

    if(vertical) {


		// console.log(this.scrollTop + this.clientHeight)
		// console.log(this.scrollHeight - (HEIGHT * Math.max(count, countVacancy)))
			if (this.scrollTop + this.clientHeight >= this.scrollHeight - (HEIGHT * Math.max(count, countVacancy)) && data.success && !flag) {
						flag = true

						// console.log('FLAG', flag)
						// console.log(this.scrollTop + this.clientHeight)
	      	if(type === 'employer') {
	      			// await sleep(10000)
	      			// console.log(JSON.parse(sessionStorage.getItem('employersFiltered')))
	      			// if(!JSON.parse(sessionStorage.getItem('employersFiltered'))) {
	      				// mount(elem, loader)

								loader.update(true)
								// await sleep(100000)
				        data = await getEmployersList({t: DATA_LENGTH, p: count, scroll: true}).then((data)=> {flag = false; return data} )
				        sessionStorage.setItem('page', JSON.stringify(count))
				      	count++
			      	// } else {
			      		flag = false
			      	// }

			      	console.log(!data.success)

			      	if(!data.success) {
			      		loader.update(false)
			      	}

	      	} else {
	      			// await sleep(1000)
			        data = await getVacancyList({t: DATA_LENGTH, p: countVacancy, scroll: true}).then((data)=> {flag = false; return data} )
			        // sessionStorage.setItem('pageVacancy', JSON.stringify(countVacancy))
			        // sessionStorage.setItem('pageVacancyDataLength', JSON.stringify(data.length))
			      	countVacancy++
	      	}
	      		loader.update(false)
	    }
    }
	}

	ajaxData = throttle(ajaxData, 250)
	elem.addEventListener('scroll', ajaxData)


}



export default fetchScroll // to ../index.js

