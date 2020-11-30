class Storage {
	constructor(){
		this.state = {}
	}

	setState(id, data){
		this.state[id] = data
		return
	}

	getState(id){
		const data  = this.state[id]
		return data
	}

	isSet(id){
		return this.getState(id) !== undefined
	}
}



const storage = new Storage()


export default storage