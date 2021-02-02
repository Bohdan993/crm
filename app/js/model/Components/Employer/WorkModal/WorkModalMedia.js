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

import {
	modalRowMediaWrapper, // this.modalRowWrapper(class WorkModalMedia)
	modalRowMedia, // this.el (class WorkModalMediaRow)
	mediaShowMore,
	body
} from '../../../../view'


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
			deleteMedia({idimg: this.data.id, idemp: this.employerID, w: 0})
		})
	}


	update(data, index, items, context) {
		// console.log(data)
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
				addMedia({id: this.data.id, data, w: 0})
			} catch (e) {
				toastr.error(`${e.message}`, 'Ошибка!', {
					timeOut: 0,
					extendedTimeOut: 0,
					closeButton: true
				})
			}
		})

		this.pageShow = 2
		this.flag = false
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
			this.pageShow++
		}

		if (loading || showingLess) {
			this.pageShow = 2
		}

		if (adding) {}

		if (deleating) {}

		// console.log(this.pageDel)
		// console.log(data.data)
		this.list.update(data.data, {
			employerID: data.id
		})


		//Пагинация
		if (data.data.length < data.total) {
			this.showMore.update(true, 'показать еще')
			this.showLess.update(false)

			if (!this.flag) {
				this.showMore.el.addEventListener('click', () => {
					getWorkModalMedia({
						id: this.data.id,
						showing: true,
						w: 0
					})

					this.flag = true
				})

				
			}


		} else {
			this.showMore.update(false)

			if(this.flag) {
				this.showLess.update(true, 'скрыть')
			}

			this.showLess.el.addEventListener('click', () => {
					getWorkModalMedia({
						id: this.data.id,
						showingLess: true,
						w: 1000
					})

					this.flag = false

				}, {once: true})

			
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

let show = false
let flagMedia = false