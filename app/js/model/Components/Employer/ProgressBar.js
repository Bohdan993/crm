import {el, setAttr} from '../../../../libs/libs'

export default class ProgressBar {
	constructor(){
		this.el = el('div.progress-bar#progress-info', el('div.progress-bar__fill.progress-bar__fill--info'), el('span.progress-bar__text', "Загрузка изображения..."))
	}

	update(data){
		console.log(data)
	}
}
