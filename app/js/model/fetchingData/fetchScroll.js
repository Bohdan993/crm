import fetch from './fetchingDataClass'
import Loader from '../Components/Employer/Loader'
import getEmployersList from './getEmployersList'
import {debounce} from '../helper'


const fetchScroll = (elem) => {
	//@param elem - HTML node <div class="employer-rows-wrapper"></div>
	
	async function ajaxEmployers(){
		const data = await getEmployersList({p: '3'})
		console.log(data)
	}

	ajaxEmployers = debounce(ajaxEmployers, 800)
	elem.addEventListener('scroll', ajaxEmployers)
	
}



export default fetchScroll // to ../index.js