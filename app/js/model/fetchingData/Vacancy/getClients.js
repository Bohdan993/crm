import fetch from '../fetchingDataClass'

const getClientsVacancy = async () => {
	if(true) {
		try{
			const data = await fetch.getResourse('/vacancies/get_other/?s=4')
			let clients = data.data.client
			// console.log(typeContact)
			localStorage.setItem('clientsVacancy', JSON.stringify(clients))
		}catch(e) {
			console.error(e)
		}
	}
}

export default getClientsVacancy // to ../../index.js