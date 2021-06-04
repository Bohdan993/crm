class StorageClients {
	constructor() {
		this.state = {}
	}

	setState(id, data) {
		this.state[id] = data
		return this.state
	}


	setPartialState(id, data, key) {
		this.getState(id)[key].push(data)
		return this.state

	}


	updateStatePartialData({
		id,
		data,
		key,
		field,
		fieldKey,
		targetKey,
		prop
	}) {
		this.getState(id)[key].forEach(el => {
			if (el[field][fieldKey] === prop) {
				el[field][targetKey] = data
			}
		})

		return this.state
	}


	setAndUpdatePartialState(id, data, key, prop) {
		this.getState(id)[key].forEach(el => {
			if (el.vacancy.id === prop) {
				el.vacancy.id_status = data
			}
		})

		return this.state
	}


	deletePartialState(id, key, prop) {
		let arr = this.getState(id)[key].filter(el => el.vacancy.id !== prop)
		return this.state[id][key] = arr

	}

	getState(id) {
		const data = this.state[id]
		return data
	}

	isSet(id) {
		return this.getState(id) !== undefined
	}
}



const storage = new StorageClients()


export default storage