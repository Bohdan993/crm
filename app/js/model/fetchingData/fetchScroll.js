import fetch from './fetchingDataClass'
import {StickyLoader} from '../Components/Loader'
import getEmployersList from './getEmployersList'
import getVacancyList from './Vacancy/getVacancyList'
import {place, mount} from '../../../libs/libs'
import {throttle, sleep} from '../helper'

const HEIGHT = 150
const DATA_LENGTH = 50
const loader = place(StickyLoader)
// let count = +JSON.parse(sessionStorage.getItem('page')) || 2
// let countVacancy = +JSON.parse(sessionStorage.getItem('pageVacancy')) || 2
let count = 2
let countVacancy = 2
let data
let flag = false



const fetchScroll = (elem, type) => {
	//@param elem - HTML node <div class="employer-rows-wrapper"></div>

		if(type === 'employer') {
			data = Array(DATA_LENGTH)
			// data = JSON.parse(sessionStorage.getItem('pageDataLength')) && Array(JSON.parse(sessionStorage.getItem('pageDataLength'))) || Array(DATA_LENGTH)
		} else {
			data = Array(DATA_LENGTH)
			// data = JSON.parse(sessionStorage.getItem('pageVacancyDataLength')) && Array(JSON.parse(sessionStorage.getItem('pageVacancyDataLength'))) || Array(DATA_LENGTH)
		}

		// console.log(data)
	async function ajaxData(e){
	// console.log(flag)
  let vertical = e.target.scrollTop

    if(vertical) {
		// console.log(this.scrollTop + this.clientHeight)
		// console.log(this.scrollHeight - (HEIGHT * Math.max(count, countVacancy)))
			if (this.scrollTop + this.clientHeight >= this.scrollHeight - (HEIGHT * Math.max(count, countVacancy)) && data.length === DATA_LENGTH && !flag) {
						flag = true
						console.log(this.scrollTop + this.clientHeight)
	      	if(type === 'employer') {
	      			// await sleep(10000)
	      			// console.log(JSON.parse(sessionStorage.getItem('employersFiltered')))
	      			if(!JSON.parse(sessionStorage.getItem('employersFiltered'))) {
	      				mount(elem, loader)
								loader.update(true)
								// await sleep(100000)
				        data = await getEmployersList({t: DATA_LENGTH, p: count, scroll: true}).then((data)=> {flag = false; return data} )
				        sessionStorage.setItem('page', JSON.stringify(count))
				      	count++
			      	} else {
			      		flag = false
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


















































// import fetch from './fetchingDataClass'
// import {StickyLoader} from '../Components/Loader'
// import getEmployersList from './getEmployersList'
// import getVacancyList from './Vacancy/getVacancyList'
// import {place, mount} from '../../../libs/libs'
// import {throttle} from '../helper'

// const HEIGHT = 300
// const DATA_LENGTH = 50
// const loader = place(StickyLoader)
// // let count = +JSON.parse(sessionStorage.getItem('page')) || 2
// // let countVacancy = +JSON.parse(sessionStorage.getItem('pageVacancy')) || 2
// let count = 2
// let countVacancy = 2
// let data
// let flag = false

// // const sleep = (ms) => {
// // 	return new Promise(res => {
// // 		setTimeout(function(){
// // 			res('ok')
// // 		}, ms)
// // 	})
// // }

// const fetchScroll = (elem, type) => {
// 	//@param elem - HTML node <div class="employer-rows-wrapper"></div>

// 		if(type === 'employer') {
// 			data = Array(DATA_LENGTH)
// 			// data = JSON.parse(sessionStorage.getItem('pageDataLength')) && Array(JSON.parse(sessionStorage.getItem('pageDataLength'))) || Array(DATA_LENGTH)
// 		} else {
// 			data = Array(DATA_LENGTH)
// 			// data = JSON.parse(sessionStorage.getItem('pageVacancyDataLength')) && Array(JSON.parse(sessionStorage.getItem('pageVacancyDataLength'))) || Array(DATA_LENGTH)
// 		}

// 		// console.log(data)
// 	async function ajaxData(){
// 		if (this.scrollTop + this.clientHeight >= this.scrollHeight - HEIGHT && data.length === DATA_LENGTH && !flag) {
// 					flag = true
// 					mount(elem, loader)
// 					loader.update(true)

//       	if(type === 'employer') {
//       				console.log('dfdfejjewnnwnwqnnqnqqqqqqqqqqqqqqqqq')
// 		        data = await getEmployersList({t: DATA_LENGTH, p: count, scroll: true}).then((data)=> {flag = false; return data} )
// 		        // console.log(data)
// 		        // sessionStorage.setItem('page', JSON.stringify(count))
// 		        // sessionStorage.setItem('pageDataLength', JSON.stringify(data.length))
// 		      	count++
//       	} else {
//       			// await sleep(2500)
// 		        data = await getVacancyList({t: DATA_LENGTH, p: countVacancy, scroll: true}).then((data)=> {flag = false; return data} )
// 		        // sessionStorage.setItem('pageVacancy', JSON.stringify(countVacancy))
// 		        // console.log(data)
// 		        // sessionStorage.setItem('pageVacancyDataLength', JSON.stringify(data.length))
// 		      	countVacancy++
//       	}
//       		loader.update(false)
//     }
// 	}

// 	ajaxData = throttle(ajaxData, 1000)
// 	elem.addEventListener('scroll', ajaxData)
	
// }



// export default fetchScroll // to ../index.js