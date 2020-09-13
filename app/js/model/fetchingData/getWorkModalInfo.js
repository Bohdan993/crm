import fetch from './fetchingDataClass'


const getWorkModalInfo = async (id = '1') => {

	const data = await fetch.getResourse(`/employers/get/?id=${id}&section=all`)
	console.log(data.data.main)

}


export default getWorkModalInfo