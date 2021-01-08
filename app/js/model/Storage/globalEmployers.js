class StorageGlobalEmployers {
	constructor(){
		this.state = []
	}



	initState(data){
		this.state = data
		return this.state
	}


	setState(data, id, direction = 'bottom'){
		if(direction === 'bottom') {
			this.state = this.uniq([...this.state, ...data], id)
		}

		if(direction === 'top') {
			this.state = this.uniq([...data, ...this.state], id)
		}
		
		return this.state
	}

	getState(){
		return this.state
	}


	getPartialState(id, key, prop){
		// console.log(this.getState())
		let res
		this.getState().every(el => {
			// console.log(el)
			if(el[key] === id) {
				console.log(el[prop])
				res = el[prop]
				return false
			} else {
				return true
			}
		})
		return res
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
	

	uniq(xs, id) {
    let seen = {};
    let res = xs.filter(function(x) {
        let key = JSON.stringify(x[id]);
        // console.log(seen)
        return !(key in seen) && (seen[key] = x[id]);
    });
    return res
  }

}



const storage = new StorageGlobalEmployers()


export default storage