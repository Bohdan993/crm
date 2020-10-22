import fetch from '../fetchingDataClass'

const getClients = async () => {
	if(true) {
		try{
			const data = await fetch.getResourse('/employers/get_other/?s=7')
			let clients = data.data.client
			// console.log(typeContact)
			localStorage.setItem('clients', JSON.stringify(clients))
		}catch(e) {
			console.error(e)
		}
	}
}

export default getClients // to ../../index.js