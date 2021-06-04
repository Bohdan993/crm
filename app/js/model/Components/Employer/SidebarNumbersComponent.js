import {
	el,
	setAttr
} from '../../../../libs/libs'


export default class Numbers {
	constructor() {
		this.el = el('div.sidebar-stat-nums__wrap',
			el('p.sidebar__choosed', 'Отобрано: ',
				this.totalR = el('span')),
			el('p.sidebar__full-number', 'Общее количество: ',
				this.total = el('span'))
		)
	}

	update(data) {

		setAttr(this.total, {
			innerText: data.total
		})


		setAttr(this.totalR, {
			innerText: data.totalR
		})

	}
}