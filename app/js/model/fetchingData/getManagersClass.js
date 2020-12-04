import fetch from './fetchingDataClass'
import {list, mount} from '../../../libs/libs'


export default class GetManagers {
	constructor(type, selector, clazz, str = 'employer'){
		this.type = type
		this.selector = this.__getDOMNode(selector)
		this.element = this.__createElement(clazz, str)
		this.__mountElement(this.selector, this.element)

		// console.log(selector)
		// console.log(this.element)
	}




	__getDOMNode(str){

			return document.querySelector(str)

	}

	__createElement(clazz, str){
		return list('form', clazz, 'id', str)
	}

	__mountElement(selector, el){
		// console.log(selector)
		if(selector) {
			console.log(selector)
			mount(selector, el)
		}
	}


	async fetchData(filter, key) {
		// console.log(this.selector)
		if(this.selector) {

			try{
				const data = await fetch.getResourse(`/${this.type}/get_other/?s=1`)
				let managers = data.data.managers

				if(sessionStorage.getItem(filter)) { 
						managers = managers.map(manager => {
						let checked = !!~JSON.parse(sessionStorage.getItem(filter)).split(',').indexOf(manager.id)
						return {
							id: manager.id,
							name: manager.name,
							color: manager.color,
							checked
						}
					})
				} else {
					managers = managers.map(manager=> {
						return {
							id: manager.id,
							name: manager.name,
							color: manager.color,
						}
					})
				}

				localStorage.setItem(key, JSON.stringify(managers))
				this.element.update(managers)

			}catch(e) {
				console.error(e)
			}
		}
	}

}