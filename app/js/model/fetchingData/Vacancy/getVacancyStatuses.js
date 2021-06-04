import fetch from '../fetchingDataClass'


const getStatusesVacancyPopup = async () => {
	try {
		const data = await fetch.getResourse('/vacancies/get_other/?s=5')
		let statuses = data.data.status
		localStorage.setItem('statusesVacancy', JSON.stringify(statuses))

	} catch (e) {
		console.error(e)
	}

}




export default getStatusesVacancyPopup // to ../index.js