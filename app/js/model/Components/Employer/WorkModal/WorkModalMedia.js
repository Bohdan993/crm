import {
	el,
	setAttr,
	list,
	toastr,
	place,
	OverlayScrollbars
} from '../../../../../libs/libs'

import ProgressBar from '../ProgressBar'
import ShowMoreBtn from './ShowMoreBtn'
import ShowLessBtn from './ShowLessBtn'
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'

import addMedia from '../../../fetchingData/Employer/WorkModal/addMedia'
import deleteMedia from '../../../fetchingData/Employer/WorkModal/deleteMedia'
import getWorkModalMedia from '../../../fetchingData/Employer/WorkModal/getWorkModalMedia'


const URL = 'https://crm.unicorn-exp.com/images/employer/media'


class WorkModalMediaRow {
	constructor() {

		this.data = {}
		this.el = el('div.modal-row__media',
			this.link = el('a.modal-row__media-link', {
					href: '#',
					target: '_blank',
					rel: 'noopen nofollow'
				},
				this.img = el('img', {
					src: 'img/1.png',
					alt: 'Картинка'
				})),
			this.delete = el('span.modal-row__media-remove')
		)

		this.delete.addEventListener('click', (e) => {
			deleteMedia({
				idimg: this.data.id,
				idemp: this.employerID,
				w: 0
			})
		})
	}


	update(data, index, items, context) {

		setAttr(this.link, {
			href: URL + '/' + data.name
		})

		setAttr(this.img, {
			src: URL + '/' + data.name,
			alt: data.name
		})

		this.data = data
		this.employerID = context.employerID


	}
}


export default class WorkModalMedia {
	constructor() {
		this.data = {}
		this.open = false
		this.controls = el('div.modal-row__controls',
			el('p', 'Медиа'),
			el('div.add-item',
				el('label.choose', {
					'for': 'add-media'
				}, el('span', '+'), 'добавить'),
				this.addItem = el('input.add-media#add-media', {
					type: 'file',
					name: '',
				})
			)
		)

		this.modalRowWrapper = el('div.modal-row__media-wrapper.modal-row__wrapper')
		this.modalLayer = el('div.modal-row__layer.empty-layer',
			this.list = list(this.modalRowWrapper, WorkModalMediaRow, 'id'),
			this.progress = place(ProgressBar),
		)


		this.el = el('div.media__layer.modal-row__inner-layer',
			this.controls,
			this.modalLayer,
			this.showMore = place(ShowMoreBtn),
			this.showLess = place(ShowLessBtn)
		)

		this.addItem.addEventListener('click', function (e) {
			this.value = null;
		})

		this.addItem.addEventListener('change', (e) => {
			// console.log(e.target.files)
			let files = e.target.files
			if (typeof files === undefined) return;

			let data = new FormData();
			try {
				for (let i = 0; i < files.length; i++) {
					const str = files[i].type.split('/')
					if (/\jpe?g|png$/i.test(str[1]) === false) {
						throw new Error("Загружаемый файл должен быть картинкой")
						return
					}
					data.append('file', files[i])
				}
				addMedia({
					id: this.data.id,
					data,
					w: 0
				})
			} catch (e) {
				toastr.error(`${e.message}`, 'Ошибка!', {
					timeOut: 0,
					extendedTimeOut: 0,
					closeButton: true
				})
			}
		})

		this.showMoreHandler = () => {
			this.open = true
			getWorkModalMedia({
				id: this.data.id,
				showing: true,
				w: 0
			})
		}


		this.showLessHandler = () => {
			this.open = false
			getWorkModalMedia({
				id: this.data.id,
				showingLess: true,
				w: 1000
			})

		}

		// this.pageShow = 2
		initOverlayScrollbars(this.modalLayer)
		this.scrollInstance = OverlayScrollbars(this.modalLayer)
	}

	update(data, index, items, context) {
		let {
			loading,
			deleating,
			adding,
			showing,
			showingLess
		} = data

		if (showing) {
		}

		if (loading || showingLess) {
		}

		if (adding) {}

		if (deleating) {}


		this.list.update(data.data, {
			employerID: data.id
		})

		if (this.data.id !== data.id) this.open = false



		//Пагинация
		if (data.data.length < data.total) {

			this.showMore.update(true, 'показать еще')
			this.showLess.update(false)
			this.showMore.el.addEventListener('click', this.showMoreHandler)

		} else {

			this.showMore.update(false)

			if (this.open) {
				this.showLess.update(true, 'скрыть')
			} else {
				this.showLess.update(false)
			}

			this.showLess.el.addEventListener('click', this.showLessHandler)

		}

		//Вызов функций которые зависят от инстанса класса
		checkIfWrapperIsEmpty(this.modalRowWrapper)
		this.scrollInstance.update()
		//


		this.data = data
		this.data.index = index

	}


}

Object.assign(WorkModalMedia.prototype, hiddenClassMixin)
