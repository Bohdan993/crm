class StorageGlobalEmployers {
	constructor(){
		this.state = []
	}

	setState(data){
		this.state = [...this.state, ...data]
		return this.state
	}


	getState(){
		return this.state
	}


	setPartialState(id, key, prop, data){
		this.getState().every(el => {
			if(el[key] === id) {
				 el[prop] = data
				 return false
			} else {
				return true
			}
		})
		return this.state
	}


	deletePartialState(id, key){
		this.state = this.getState().filter(el => el[key] !== id)
		return this.state
	}

}



const storage = new StorageGlobalEmployers()


export default storage