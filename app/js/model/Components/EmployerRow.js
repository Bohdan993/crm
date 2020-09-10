import {el, setAttr, svg, place} from '../../../libs/libs'

export default class RowEmployer {
	constructor(){
		this.attentionTag = place(el('i.attention-tag', svg('svg', svg('use', {
							xlink: { href: "img/sprites/svg/symbol/sprite.svg#attention"}
						}))))
		this.managerTag = place(el('i.tag.manager-tag'))
		this.el = el("div.row", 
			el(".f-container", 
				this.country = el(".row__country.row__cell", 
					this.flag = el("i.row__flag", 
						this.svg = svg('svg', svg('use', {
									xlink: { href: "img/sprites/svg/symbol/sprite.svg#flag-norway"}
								}), 
							)
						),
					this.abbr = el('p.row__abbr', 'NO')
					),
				this.company = el(".row__company.row__cell", this.companyText = el("p")
					),
				this.name = el('.row__name.row__cell', 
					this.fullname = el("p.row__fullname"),
					this.tags = el('span.row__tags',
						this.attentionTag,
						this.managerTag
						)
					),
				this.phone = el('.row__phone.row__cell', 
					el('i', 
						svg('svg', svg('use', {
							xlink: { href: "img/sprites/svg/symbol/sprite.svg#phone"}
						}))),
					el('p', this.phoneLink = el('a', {
						href: 'tel:#'
					}))
					),
				this.address = el('.row__address.row__cell', this.addressText = el('p')),
				this.jobs = el('.row__jobs.row__cell', this.jobsText = el('p')),
				this.labels = el('.row__labels.row__cell', 
					el('i.label', el('span', 'NO'), el('span', '211-8'))
					) 
				)
			)
	}

	update(data, index, items, context){
		this.data = data;
    this.data.index = index;
		setAttr(this.el, {
			"data-id_employer": data.id_employer,
			'data-custom-open': `modal-1`
		})
		this.abbr.innerText = data.addr
		this.companyText.innerText = data.enterprise
		this.fullname.innerText = data.name
		data.task ? this.attentionTag.update(true) : this.attentionTag.update(false)
		data.manager ? (this.managerTag.update(true), 
		setAttr(this.managerTag,{
						style: {"background-color": "#" + data.manager_color}, 
						innerText: data.manager.split(/\s+/).map(word => word[0].toUpperCase()).join('')
					}
				)
			) : this.managerTag.update(false)
		setAttr(this.phoneLink , {
			href: 'tel:' + data.phone,
			innerText: data.phone
		})
		this.addressText.innerText = data.address
		this.jobsText.innerText = data.production ? data.production.join(', ') : ""
	}
}