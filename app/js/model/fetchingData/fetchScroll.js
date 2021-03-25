import fetch from './fetchingDataClass'
import {StickyLoader} from '../Components/Loader'
import getEmployersList from './Employer/getEmployersList'
import getVacancyList from './Vacancy/getVacancyList'
import {place, mount} from '../../../libs/libs'
import {throttle, sleep} from '../helper'

const HEIGHT = 10
const DATA_LENGTH = 50
const loader = place(StickyLoader)
let count = 2
let countVacancy = 2
let data = {}
let flag = false



const fetchScroll = (elem, type) => {
	//@param elem - HTML node <div class="employer-rows-wrapper"></div>

	mount(elem, loader)

		if(type === 'employer') {
			data.hasNextPage = 0
			document.addEventListener('employerlistnotfiltered', function(e){
				// console.log('filtered')

				// console.log(e)
				count = 2
				data.hasNextPage = e.detail.hasNextPage ? 1 : 0
			})
		} else {
	
		}
	async function ajaxData(e){


	if(type === 'employer') {

		console.log('data.hasNextPage', data.hasNextPage)

		if(!!data.hasNextPage) {
			loader.update(true)
		} else {
			loader.update(false)
		}
	}	

	let vertical = e.target.scrollTop

		console.log(data.hasNextPage)

		if(vertical) {
			if (this.scrollTop + this.clientHeight >= this.scrollHeight - (HEIGHT * Math.max(count, countVacancy)) && !!data.hasNextPage && !flag) {
						flag = true

					if(type === 'employer') {

								loader.update(true)
								// await sleep(100000)
								data = await getEmployersList({t: DATA_LENGTH, p: count, scroll: true}).then((data)=> {flag = false; return data} )
								sessionStorage.setItem('page', JSON.stringify(count))
								console.log(count)
								count++
								flag = false
								
								if(!!data.hasNextPage) {
									loader.update(false)
								}

					} else {
							// await sleep(1000)
							data = await getVacancyList({t: DATA_LENGTH, p: countVacancy, scroll: true}).then((data)=> {flag = false; return data} )
							countVacancy++
					}
			}
		}
	}

	ajaxData = throttle(ajaxData, 250)
	elem.addEventListener('scroll', ajaxData)


}



export default fetchScroll // to ../index.js

