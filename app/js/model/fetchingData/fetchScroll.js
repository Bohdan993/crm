import fetch from './fetchingDataClass'
import {StickyLoader} from '../Components/Employer/Loader'
import getEmployersList from './getEmployersList'
import {place, mount} from '../../../libs/libs'
import {throttle} from '../helper'

const HEIGHT = 300
const DATA_LENGTH = 50
const loader = place(StickyLoader)
// let count = +JSON.parse(sessionStorage.getItem('page')) || 2
let count = 2
let data = Array(50)
let flag = false



const fetchScroll = (elem) => {
	//@param elem - HTML node <div class="employer-rows-wrapper"></div>
	
	async function ajaxEmployers(){
		if (this.scrollTop + this.clientHeight >= this.scrollHeight - HEIGHT && data.length === DATA_LENGTH && !flag) {
				flag = true
				mount(elem, loader)
				loader.update(true)
        data = await getEmployersList({p: count}).then((data)=> {flag = false; return data} )
        loader.update(false)
        sessionStorage.setItem('page', JSON.stringify(count))
      	count++

    }
	}

	ajaxEmployers = throttle(ajaxEmployers, 1000)
	elem.addEventListener('scroll', ajaxEmployers)
	
}



export default fetchScroll // to ../index.js