import {
    el,
    setAttr,
    list
} from '../../../../../libs/libs'
import linkToSocial from '../../../linkToSocial'
import initWorkModalSelect from '../../../initWorkModalSelect'
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
// import saveFieldsData from '../../../fetchingData/saveFieldsData'
import {
    save
} from '../../../helper'
import Option from '../../OptionComponent'
import storage from '../../../Storage/globalEmployers'
import employerListUpdateEvent from '../../../CustomEvents/employerListUpdateEvent'


function checkIfEmployerNameIsEmpty() {
    return this.comInfName.value === ''
}


function printFeedbackName() {

    this.feedback.list.views.forEach(view => {
        if (view.data.data.type_arrow === '0') {

            setAttr(view.to, {
                //Если пустое имя работодателя, тогда в отзывах выводим название организации
                innerText: !checkIfEmployerNameIsEmpty.call(this) ? this.comInfName.value : this.comManufacturyArea.value
            })
        } else {
            setAttr(view.from, {
                //Если пустое имя работодателя, тогда в отзывах выводим название организации
                innerText: !checkIfEmployerNameIsEmpty.call(this) ? this.comInfName.value : this.comManufacturyArea.value
            })
        }

    })
}


export default class WorkModal {
    constructor() {
        this.data = {}
        this.countriesData = this.getItemsFromLocalStorage().countries
        this.save = save.bind(this)
        this.comInfLeft = el('div.common-info__left',
            el('div.common-info__company.info-block',
                el('p', 'Підприємство'),
                el('div.input-group',
                    this.comManufacturyArea = el('textarea.info-area.common-info__manufactury-area', {
                        name: '',
                        rows: 3
                    }))
            ),
            el('div.common-info__country.info-block',
                el('p', 'Країна'),
                el('div.input-group',
                    this.comCountrySelect = el('select.info-area.country-select', {
                        name: ''
                    }))
            ),
            el('div.common-info__address.info-block',
                el('p', 'Адреса'),
                el('div.input-group',
                    this.comMapArea = el('textarea.info-area', {
                        name: '',
                        value: '',
                        rows: 2
                    }),
                    el('div', {
                            style: {
                                overflow: 'hidden',
                                width: '100%',
                                position: 'relative'
                            }
                        },
                        this.comIframe = el('iframe', {
                            width: '100%',
                            height: '200',
                            src: '',
                            frameborder: '0',
                            scrolling: 'no',
                            marginheight: '0',
                            marginwidth: '0'
                        }),
                        el('style', '#gmap_canvas img{max-width:none!important;background:none!important}')
                    )
                )
            ),
        )
        this.comInfRight = el('div.common-info__right',
            el('div.common-info__contact-person.common-info__group',
                el('div.common-info__contact-person_curr.common-info__group_small.info-block',
                    el('p', 'Контактна особа'),
                    el('div.input-group',
                        this.comInfName = el('input.info-area.common-info__contact-person-area', {
                            type: 'text'
                        }))
                ),
                el('div.common-info__contact-person_other.common-info__group_big.info-block',
                    el('p', 'Інші контактні особи'),
                    el('div.input-group',
                        this.comInfOtherNames = el('input.info-area.common-info__other-contacts-area', {
                            type: 'text'
                        }))
                )
            ),
            el('div.common-info__contact-info.common-info__group',
                el('div.common-info__contact-info_curr.common-info__group_small.info-block',
                    el('p', 'Контактна інформація'),
                    el('div.input-group.info-group-ico.phone-group',
                        el('i.ico.s-phone',
                            // svg('svg', svg('use', {
                            // 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#phone"}
                            // }))
                        ),
                        this.comInfPhone = el('input.info-area#common-info-phone', {
                            type: 'text'
                        })
                    ),
                    el('div.input-group.info-group-ico.mail-group',
                        this.comInfMailLink = el('a.social-link.mail-link', {
                                href: '#',
                                rel: 'nofollow noopener noreferrer',
                                target: "_blank"
                            },
                            el('i.ico.s-email',
                                // svg('svg', svg('use', {
                                // 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#email.svg"}
                                // }))
                            )
                        ),
                        this.comInfEmail = el('input.info-area#common-info-email', {
                            type: 'text',
                            value: ''
                        })
                    )
                ),
                el('div.common-info__contact-info_other.common-info__group_big.info-block',
                    el('p', 'Додаткові контакти'),
                    el('div.input-group',
                        this.comInfPhoneOthers = el('input.info-area', {
                            type: 'text'
                        })),
                    el('div.input-group',
                        this.comInfMailOthers = el('input.info-area', {
                            type: 'text'
                        }))
                )
            ),
            el('div.common-info__social.info-block',
                el('p', 'Сайт та соціальні мережі'),
                el('div.input-group.info-group-ico.web-group',
                    this.comInfSiteLink = el('a.social-link', {
                            href: '',
                            rel: 'nofollow noreferrer noopener',
                            target: '_blank'
                        },
                        el('i.ico.s-web',
                            // 	svg('svg', svg('use', {
                            // 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#web"}
                            // }))
                        )),
                    this.comInfSite = el('input.info-area', {
                        type: 'text'
                    })
                ),
                el('div.input-group.info-group-ico.fb-group',
                    this.comInfFacebookLink = el('a.social-link', {
                            href: '',
                            rel: 'nofollow noreferrer noopener',
                            target: '_blank'
                        },
                        el('i.ico.s-fb',
                            // 	svg('svg', svg('use', {
                            // 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#facebook"}
                            // }))
                        )),
                    this.comInfFacebook = el('input.info-area', {
                        type: 'text'
                    })),
                el('div.input-group.info-group-ico.instagram-group',
                    this.comInfInstagramLink = el('a.social-link', {
                            href: '',
                            rel: 'nofollow noreferrer noopener',
                            target: '_blank'
                        },
                        el('i.ico.s-inst')),
                    this.comInfInstagram = el('input.info-area', {
                        type: 'text'
                    })),
            ),
            el('div.common-info__more-info.common-info__group',
                el('div.common-info__more-info_inner-right',
                    el('div.input-group.info-group-ico.whatsapp-group',
                    this.comInfWhatsappLink = el('a.social-link.whatsapp-link', {
                            href: '',
                            rel: 'nofollow noreferrer noopener',
                            target: '_blank'
                        },
                        el('i.ico.s-wtsp')),
                    this.comInfWhatsapp = el('input.info-area', {
                        type: 'text'
                    })),
                    el('div.common-info__more-info-mediator.info-block',
                        el('p', 'Посередник'),
                        el('div.input-group.native-select',
                            this.intermadiariesSelect = list('select.info-area.mediator-select', Option)
                        )),
                    // el('div.common-info__more-info-source.info-block',
                    //     el('p', 'Джерело'),
                    //     el('div.input-group.native-select',
                    //         this.sourceSelect = list('select.info-area.source-select', Option)
                    //     ))
                ),
                el('div.common-info__more-info_inner-left',
                    el('div.common-info__more-info-about.info-block',
                        el('p', 'Додаткова інформація'),
                        el('div.input-group',
                            this.comInfNotes = el('textarea.info-area', {
                                rows: 6
                            }))
                    ),
                ),

            )
        )
        this.el = el('div.common-info__layer.modal-row__inner-layer',
            this.comInfLeft,
            this.comInfRight
        )

        this.comManufacturyArea.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: this.comManufacturyArea.value.trim(),
                field: 'enterprise',
                str: 'employers'
            })

            storage.setPartialState(this.data.id_employer, 'id_employer', 'enterprise', this.comManufacturyArea.value)
            printFeedbackName.call(this)
            employerListUpdateEvent.detail.id = this.data.id_employer
            document.dispatchEvent(employerListUpdateEvent)

        })

        this.comCountrySelect.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: this.comCountrySelect.value.trim(),
                field: 'id_country',
                str: 'employers'
            })

            let currCountry = this.countriesData.filter(el => el.id === this.comCountrySelect.value)[0]

            storage.setPartialState(this.data.id_employer, 'id_employer', 'country_name', currCountry.name)
            storage.setPartialState(this.data.id_employer, 'id_employer', 'addr', currCountry.icon.split('.')[0].toUpperCase())
            storage.setPartialState(this.data.id_employer, 'id_employer', 'icon', currCountry.icon)
            employerListUpdateEvent.detail.id = this.data.id_employer
            document.dispatchEvent(employerListUpdateEvent)
        })

        this.comMapArea.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comMapArea.value),
                field: 'address',
                str: 'employers'
            })
            this.comIframe.src = `https://maps.google.com/maps?width=100%&height=200&hl=en&q=${this.comMapArea.value}&ie=UTF8&t=&z=11&iwloc=B&output=embed`

            storage.setPartialState(this.data.id_employer, 'id_employer', 'address', this.comMapArea.value)
            employerListUpdateEvent.detail.id = this.data.id_employer
            document.dispatchEvent(employerListUpdateEvent)
        })


        this.comInfName.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfName.value),
                field: 'name',
                str: 'employers'
            })

            storage.setPartialState(this.data.id_employer, 'id_employer', 'name', this.comInfName.value)

            printFeedbackName.call(this)
            employerListUpdateEvent.detail.id = this.data.id_employer
            document.dispatchEvent(employerListUpdateEvent)
        })

        this.comInfOtherNames.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfOtherNames.value),
                field: 'other_name',
                str: 'employers'
            })
        })

        this.comInfPhone.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfPhone.value),
                field: 'phone',
                str: 'employers'
            })

            storage.setPartialState(this.data.id_employer, 'id_employer', 'phone', this.comInfPhone.value)
            employerListUpdateEvent.detail.id = this.data.id_employer
            document.dispatchEvent(employerListUpdateEvent)
        })

        this.comInfEmail.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfEmail.value),
                field: 'email',
                str: 'employers'
            })
        })

        this.comInfPhoneOthers.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfPhoneOthers.value),
                field: 'other_phone',
                str: 'employers'
            })
        })

        this.comInfMailOthers.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfMailOthers.value),
                field: 'other_email',
                str: 'employers'
            })
        })

        this.comInfSite.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfSite.value),
                field: 'site',
                str: 'employers'
            })
        })

        this.comInfFacebook.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfFacebook.value),
                field: 'social_media_facebook',
                str: 'employers'
            })

        })

        this.comInfInstagram.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfInstagram.value),
                field: 'social_media_instagram',
                str: 'employers'
            })
        })

        this.comInfWhatsapp.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfWhatsapp.value),
                field: 'social_media_whatsapp',
                str: 'employers'
            })
        })

        this.comInfNotes.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: encodeURIComponent(this.comInfNotes.value),
                field: 'other_information',
                str: 'employers'
            })
        })

        this.intermadiariesSelect.el.addEventListener('change', async (e) => {
            await this.save({
                id: this.data.id_employer,
                value: this.intermadiariesSelect.el.value,
                field: 'id_employer_intermediator_list',
                str: 'employers'
            })
        })


        // this.sourceSelect.el.addEventListener('change', async (e) => {
        //     await this.save({
        //         id: this.data.id_employer,
        //         value: this.sourceSelect.el.value,
        //         field: 'id_employer_source_list',
        //         str: 'employers'
        //     })
        // })


        this.countryChoices = initWorkModalSelect(this.comCountrySelect, {
            countries: this.getItemsFromLocalStorage().countries
        })
    }

    update(data, context) {
        const {
            id_employer
        } = data


        if (id_employer !== this.data.id_employer) {
            const arrLinks = []
            this.comManufacturyArea.value = data.enterprise
            this.comMapArea.value = data.address
            this.comIframe.src = `https://maps.google.com/maps?width=100%&height=200&hl=en&q=${data.address}&ie=UTF8&t=&z=11&iwloc=B&output=embed`
            this.comInfName.value = data.name.toLowerCase().startsWith('новый') ? '' : data.name
            this.comInfOtherNames.value = data.other_name
            this.comInfPhone.value = data.phone
            this.countryChoices.countryChoices.setChoiceByValue(data.id_country)
            this.comInfEmail.value = data.email
            this.comInfPhoneOthers.value = data.other_phone
            this.comInfMailOthers.value = data.other_email
            this.comInfSite.value = data.site
            this.comInfFacebook.value = data.social_media_facebook
            this.comInfInstagram.value = data.social_media_instagram
            this.comInfWhatsapp.value = data.social_media_whatsapp
            this.comInfNotes.value = data.other_information
            this.intermadiariesSelect.update(this.getItemsFromLocalStorage().intermediaries)
            this.intermadiariesSelect.el.value = data.id_employer_intermediator_list
            // this.sourceSelect.update(data.source)
            // this.sourceSelect.el.value = data.id_employer_source_list


            //Получаем все элементы внутри инстанса которые содержат класс 'social-link'
            for (let key in this) {
                let isOwn = this.hasOwnProperty(key);
                if (isOwn && this[key] instanceof HTMLElement) {
                    if (this[key].classList.contains('social-link')) {
                        arrLinks.push(this[key])
                    }
                }
            }
            //


            //Вызов функций которые зависят от HTML элементов внутри инстанса
            linkToSocial(arrLinks)

            this.el.classList.remove('hidden')
        }

        this.data = data
        // this.data.index = index
        this.feedback = context
    }

    getItemsFromLocalStorage() {

        let intermediaries = JSON.parse(localStorage.getItem('intermediaries')) || []
        intermediaries.unshift({
            id: 0,
            name: 'Відсутній'
        })
        let countries = JSON.parse(localStorage.getItem('countries')) || []

        return {
            intermediaries,
            countries
        }
    }

}


Object.assign(WorkModal.prototype, hiddenClassMixin)