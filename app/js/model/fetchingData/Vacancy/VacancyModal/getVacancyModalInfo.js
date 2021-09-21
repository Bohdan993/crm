import fetch from '../../fetchingDataClass'
import getVacancyClients from '../getVacancyClients'
import ModalRowLayerLeft from '../../../Components/Vacancy/VacancyModal/ModalRowLayerLeftComponent'
import ModalRowLayerRight from '../../../Components/Vacancy/VacancyModal/ModalRowLayerRightComponent'
import Note from '../../../Components/ModalSidebarNoteComponent'
import Delete from '../../../Components/DeleteComponent'
import ManagerSelect from '../../../Components/ManagerSelectComponent'
import Loader from '../../../Components/LoaderComponent'
import ClientsComponent from '../../../Components/Vacancy/VacancyModal/ClientsComponent'
import TermsComponent from '../../../Components/Vacancy/VacancyModal/TermsComponent'
import DemandComponent from '../../../Components/Vacancy/VacancyModal/DemandsComponent'
import ArchiveCopyVacancyComponent from '../../../Components/Vacancy/VacancyModal/ArchiveCopyVacancyComponent'
import {
    mount,
    place
} from '../../../../../libs/libs'
import {
    vacancyCopy,
    vacancyArchive,
    modalLayerRight,
    modalLayerLeft,
    demandsRow,
    termsRow,
    sidebarVacancyForm,
    vacancyModalSidebarNotes,
    clientsRow,
    vacancyDelete,
    modalSwitchers,
    modalParts
} from '../../../../view'
import storage from '../../../Storage'
import vacancyStorage from '../../../Storage/globalVacancies'
import {
    changeActiveClass
} from '../../../switchModalParts'

const state = {}

const managerSelectWrap = sidebarVacancyForm ? sidebarVacancyForm.querySelector('.manager-select-wrap') : null

const loader = place(Loader)


const demand = new DemandComponent()
const terms = new TermsComponent()
const noteEl = new Note('vacancy')
const select = new ManagerSelect('vacancy')
const deleteComponent = new Delete('vacancy')
const clients = new ClientsComponent()
const mrll = new ModalRowLayerLeft()
const mrlr = new ModalRowLayerRight()
const acvccop = new ArchiveCopyVacancyComponent('copy')
const acvcarc = new ArchiveCopyVacancyComponent('archive')

if (demandsRow) {
    mount(demandsRow, demand)
}

if (termsRow) {
    mount(termsRow, terms)
}

if (managerSelectWrap) {
    mount(managerSelectWrap, select)
}


if (clientsRow) {
    mount(clientsRow, clients)
}


if (vacancyModalSidebarNotes) {
    mount(vacancyModalSidebarNotes, noteEl)
}

if (modalLayerLeft) {
    mount(modalLayerLeft, mrll)
}

if (modalLayerRight) {
    mount(modalLayerRight, mrlr)
}

if (vacancyDelete) {
    mount(vacancyDelete, deleteComponent)
}

if (vacancyCopy) {
    mount(vacancyCopy, acvccop)
}

if (vacancyArchive) {
    mount(vacancyArchive, acvcarc)
}


const getVacancyModalInfo = async (id = '1', isNewVacancy = false) => {

    changeActiveClass(modalSwitchers, modalParts, '#vacancy-data', '[data-part="vacancy-data"]')


    try {
        const data = await fetch.getResourse(`/vacancies/get/?id=${id}&section=1`)

        const mainPart = data.data ? data.data.main : []
        const note = mainPart.employer ? mainPart.employer.note : ''
        const id_manager = mainPart.employer ? mainPart.employer.id_manager : '0'
        const employer = mainPart.employer ? mainPart.employer : {}
        const employerContext = mainPart.employer ? 'employer' : 'nulledEmployer'
        const id_employer = mainPart.id_employer
        const date = mainPart.date
        const type_production = mainPart.type_production
        const type_vacancy = mainPart.type_vacancy
        const production = mainPart.production || []
        const isArchive = mainPart.archive
        const closedVacancies = vacancyStorage.getPartialState(id, 'id_vacancy', 'status')


        const demandsData = {
            id,
            clients: mainPart.total_client,
            men: mainPart.total_man,
            women: mainPart.total_woman,
            languageSkill: mainPart.language_skill,
            workExp: mainPart.experience_work,
            specialReq: mainPart.special_requirement
        }


        const termsData = {
            id,
            startWork: mainPart.start_work,
            period: mainPart.period,
            period_day: mainPart.period_day,
            salary: mainPart.salary,
            residency: mainPart.residency,
            feeding: mainPart.feeding,
            taxes: mainPart.tax,
            workResp: mainPart.responsibilities_work,
            workTime: mainPart.work_time
        }


        const vacancyEmployerData = {
            id: id_employer,
            data: employer
        }

        const employerData = {
            idVac: id,
            type_production,
            type_vacancy,
            production,
            closedVacancies,
            vacancyName: mainPart.name,
            period: mainPart.period,
            period_day: mainPart.period_day,
            clients: mainPart.total_client,
            men: mainPart.total_man,
            women: mainPart.total_woman,
            startWork: mainPart.start_work,
            isArchive,
            date,
            employer
        }

        const employerData2 = {
            idVac: id,
            employer
        }

        const notesData = {
            note,
            id: id_employer
        }

        const managersData = {
            id_manager,
            id_vacancy: id,
            id: id_employer
        }

        const deleteData = {
            date,
            id
        }


        demand.update(demandsData, mrll)
        terms.update(termsData, mrll)
        mrll.update(employerData, employerContext)
        mrlr.update(employerData2, employerContext)
        select.update(managersData)
        noteEl.update(notesData)
        deleteComponent.update(deleteData)
        acvccop.update(id)
        acvcarc.update(id, isArchive)

        if (storage.isSet(id)) {
            clients.update(storage.getState(id))
        }


        if (!storage.isSet(id)) {
            getVacancyClients(id, isNewVacancy)
                .then(res => {
                    if (res) {
                        storage.setState(id, {
                            id,
                            data: res
                        })
                        clients.update({
                            id,
                            data: res
                        })

                    } else {
                        storage.setState(id, {
                            id,
                            data: []
                        })
                        clients.update({
                            id,
                            data: []
                        })
                    }
                })
        }


        loader.update(false)


        sessionStorage.setItem('currVacancyName', JSON.stringify(mainPart.name))
        sessionStorage.setItem('currVacancyEmployer', JSON.stringify(vacancyEmployerData))

        state.id = id
    } catch (e) {
        console.error(e)
    }


}


export default getVacancyModalInfo //to ../Components/Vacancy/VacancyRow.js