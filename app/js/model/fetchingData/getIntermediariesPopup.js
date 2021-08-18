import fetch from './fetchingDataClass'
import IntermediariesPopup from '../Components/Employer/IntermediariesPopup'
import {list, mount} from '../../../libs/libs'

// if(managersTemplate) {
// 		managersTemplate.style.display = 'block';
// }

const intermediariesPopup = document.querySelector('#intermediaries-popup')


let radioGroupData = [{
    id: '1',
    label: 'Показати',
    'data-id': 'show-rbtn'
}, {
    id: '0',
    label: 'Виключити',
    'data-id': 'remove-rbtn'
}]

// const radioGroup = list(".input-group.radio-group-type-1", RadioGroup, 'id')
const popup = new IntermediariesPopup()


if (intermediariesPopup) {
    // mount(intermediariesPopup, radioGroup)
    mount(intermediariesPopup, popup)
}

const getIntermediariesPopup = async () => {
    if (intermediariesPopup) {

        try {
            const data = await fetch.getResourse('/employers/get_other/?s=2')
            let intermediaries = data.data.intermediaries


            if (sessionStorage.getItem('intermediariesFilter')) {
                intermediaries = intermediaries.map(intermediary => {
                    let checked = !!~JSON.parse(sessionStorage.getItem('intermediariesFilter')).split(',').indexOf(intermediary.id)
                    return {
                        id: intermediary.id,
                        name: intermediary.name,
                        checked
                    }
                })
            } else {
                intermediaries = intermediaries.map(intermediary => {
                    return {
                        id: intermediary.id,
                        name: intermediary.name,
                    }
                })
            }


            if (sessionStorage.getItem('intermediaryFilter')) {
                radioGroupData = radioGroupData.map(data => {
                    let checked = JSON.parse(sessionStorage.getItem('intermediaryFilter')) === data.id
                    return {
                        id: data.id,
                        label: data.label,
                        'data-id': data['data-id'],
                        checked
                    }
                })
            } else {
                radioGroupData = radioGroupData.map(data => {
                    return {
                        id: data.id,
                        label: data.label,
                        'data-id': data['data-id'],
                    }
                })
            }


            const popupData = {
                intermediaries,
                radioGroupData
            }

            localStorage.setItem('intermediaries', JSON.stringify(intermediaries))

            popup.update(popupData)
            // radioGroup.update(radioGroupData)
        } catch (e) {
            console.error(e)
        }

    }
}


export default getIntermediariesPopup