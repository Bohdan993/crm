import LastContactPopup from '../../Components/Employer/LastContactPopup'
import {list, mount, tippy} from '../../../../libs/libs'

const lastContactPopup = document.querySelector('#last-contact-popup')
let contacts = [
    {
        id: '1',
        name: 'більше 1 міс назад'
    }, {
        id: '3',
        name: 'більше 3 міс назад'
    }, {
        id: '6',
        name: 'більше 6 міс назад'
    }, {
        id: '0',
        name: 'ніколи'
    }
]


const popup = list("form", LastContactPopup, 'id')

if (lastContactPopup) {
    mount(lastContactPopup, popup)
}


const mountLastContactPopup = () => {
    if (lastContactPopup) {


        if (sessionStorage.getItem('lastContactFilter')) {
            contacts = contacts.map(contact => {
                let checked = JSON.parse(sessionStorage.getItem('lastContactFilter')) === contact.id

                return {
                    id: contact.id,
                    name: contact.name,
                    prefix: 'last-contact-',
                    checked
                }
            })
        } else {
            contacts = contacts.map(contact => {
                return {
                    id: contact.id,
                    name: contact.name,
                    prefix: 'last-contact-'
                }
            })
        }


        popup.update(contacts);
    }
}


export default mountLastContactPopup // to ../../index.js