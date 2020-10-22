


import {el, setAttr, place, list} from '../../../../libs/libs'



const dataArr = [
{
	class: 'choosen',
	text: 'Подготовка CV'
},
{
	class: 'choosen',
	text: 'CV отправлено'
},
{
	class: 'ready',
	text: 'Утвержден'
},
{
	class: 'ready',
	text: 'Контракт подписан'
},
{
	class: 'wait',
	text: 'Подан в визовый центр'
},
{
	class: 'department',
	text: 'Получил разрешение'
},
{
	class: 'department',
	text: 'Забрал разрешение'
},
{
	class: 'department',
	text: 'Билеты куплены'
},
{
	class: 'busy',
	text: 'Трудоустроен'
}]


class CellStatusSlider {
	constructor(){
		this.el = el('p.status')
	}

	update(data){
		setAttr(this.el, {
			classList: `status ${data.class}`,
			innerText: data.text
		})
	}
}

export default class RowVacancyClient {
	constructor(){
		this.data = {}
		this.el = el("div.table-full__row.f-container",
				el('div.table-full__cell.row__cell.cell-names', 
					el('a', {
						href: '#'
					}),
					el('span.row__indicator.indicator.department', 
						el('span'))),
				el('div.table-full__cell.row__cell.cell-status', 
					el('div.cell-status__left', 
						this.statusSlider = list('div.cell-status__slider', CellStatusSlider)),
						el('div.cell-status__controls.choosen',
							el('div.cell-status__control-left', 
								el('i.ico.rotate-left')),
							el('div.cell-status__control-right',
								el('i.ico'))
							),
					el('div.cell-status__right',
						el('i.ico'),
						el('i.ico'),
						el('i.ico'),
						el('div.tag.manager-tag.purple-tag'))),
				el('div.table-full__cell.row__cell.cell-exp', 
					el('i.label.hot__label',
						el('span')),
					el('p')),
				el('div.table-full__cell.row__cell.cell-notes', 
					el('input', {
						type: 'text'
					}))
			)



	}

	update(data, index, items, context){

		this.statusSlider.update(dataArr)
		this.data = data
	}

}