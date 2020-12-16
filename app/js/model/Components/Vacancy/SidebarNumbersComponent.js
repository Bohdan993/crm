import {el, setAttr} from '../../../../libs/libs'


export default class Numbers {
	constructor(){
		this.el = el('div.sidebar__info', 
			el('p.sidebar__needed', 'Требуется работников: ',
				this.totalN = el('span')),
			el('p.sidebar__full-number', 'Общее количество: ', 
				this.total = el('span')),
			el('p.sidebar__current', 'Текущих вакансий: ', 
				this.totalC = el('span'))
			)
	}

	update(data){

		setAttr(this.total, {
			innerText: data.total
		})


		setAttr(this.totalN, {
			innerText: data.totalN
		})


		setAttr(this.totalC, {
			innerText: data.totalC
		})

	}
}