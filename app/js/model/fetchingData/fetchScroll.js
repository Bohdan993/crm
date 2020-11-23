import fetch from './fetchingDataClass'
import {StickyLoader} from '../Components/Employer/Loader'
import getEmployersList from './getEmployersList'
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
        data = await getEmployersList({t: DATA_LENGTH, p: count, scroll: true}).then((data)=> {flag = false; return data} )
        loader.update(false)
        sessionStorage.setItem('page', JSON.stringify(count))
      	count++


      	// if(type === 'employer') {

      	// } else {
      		
      	// }

    }
	}

	ajaxData = throttle(ajaxData, 1000)
	elem.addEventListener('scroll', ajaxData)
	
}



export default fetchScroll // to ../index.js