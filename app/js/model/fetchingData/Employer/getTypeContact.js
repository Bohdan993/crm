import fetch from '../fetchingDataClass'

const getTypeContact = async () => {
	if(true) {
		try{
			const data = await fetch.getResourse('/employers/get_other/?s=6')
			let typeContact = data.data.type_contact
			// console.log(typeContact)
			localStorage.setItem('type_contact', JSON.stringify(typeContact))
		}catch(e) {
			console.erroe(e)
		}
	}
}

export default getTypeContact // to ../../index.js