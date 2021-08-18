import fetch from '../fetchingDataClass'
import {
    toastr
} from '../../../../libs/libs'

const getTypeContact = async () => {
    if (true) {
        try {
            const data = await fetch.getResourse('/employers/get_other/?s=6')
            if (data.success === true) {
                let typeContact = data.data.type_contact
                localStorage.setItem('type_contact', JSON.stringify(typeContact))
            } else {
                throw new Error('Помилка завантаження списку контактів')
            }

        } catch (e) {
            toastr.error(e.message, 'Помилка', {
                closeButton: false
            })
        }
    }
}

export default getTypeContact // to ../../index.js