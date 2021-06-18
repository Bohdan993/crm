import saveFieldsData from '../fetchingData/saveFieldsData'
import {
    el,
    setAttr
} from '../../../libs/libs'
import initElasticArea from '../initElasticArea'




export default class Note { // to ../fetchingData/Employer/WorkModal
    constructor(type) {
        this.type = type
        this.el = el('div.input-group',
            el('p', 'Заметки'),
            this.textArea = el('textarea.sidebar__area-notes', {
                rows: 5
            })
        )

        this.textArea.addEventListener('change', e => {
            if (type === 'employer') {
                saveFieldsData({
                    str: 'employers',
                    id: this.data.id,
                    value: encodeURIComponent(this.textArea.value),
                    field: 'note',
                    target: 'main',
                    id_target: ''
                })
            } else {

                saveFieldsData({
                    str: 'vacancies',
                    id: this.data.id,
                    value: encodeURIComponent(this.textArea.value),
                    field: 'note',
                    target: 'employer',
                    id_target: ''
                })
            }

        })

        this.textArea.addEventListener('input', e => {
            initElasticArea(this.textArea)
        })

    }
    update(data) {

        setAttr(this.textArea, {
            value: data && data.note === '' || data && data.note === null ? "" : data.note
        })


        initElasticArea(this.textArea)


        this.data = data
    }

    onmount() {
        document.addEventListener('storageemployeradd', (e) => {

            const {
                vacancyEmployerData: employer,
                employerId
            } = e.detail

            const noteData = {
                note: employer.employer.note,
                id: employerId
            }

            this.update(noteData)
        })
    }
}