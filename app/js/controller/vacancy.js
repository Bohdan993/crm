import {
    initOverlayScrollbars,
    initTooltips,
    initToastr,
    initWorkModalSelect,
    addNewTask,
    setFeedbackDate,
    addFeedbackForm,
    // autocompleteInput,
    showChooseBlockFullInfo,
    switchModalParts,
    feedbackEdit,
    getManagerPopup,
    getManagerVacancyPopup,
    getIntermediariesPopup,
    getCountryPopup,
    getManufacturyTypePopup,
    getTypeContact,
    getClients,
    vacancyFetchScroll,
    mountSearchInput,
    mountContactDataPopup,
    mountLastContactPopup,
    mountSortingPopup,
    mountVacancyPopup,
    mountContactHistoryModal,
    mountSearchInputVacancy,
    getVacancyList,
    getCountryVacancyPopup,
    mountSortingVacancyPopup,
    getVacancyWorkType,
    getStatusesVacancyPopup,
    mountDateAndTermsPopup,
    getClientsVacancy,
    getVacancyEmployers,
    addNewVacancy,
    mountActiveArchive,
    mountVacancyStatusesPopup,
    mountVacancyList,
    checkIfAddNewVacancy
} from '../model'

import {
    sidebarLayout,
    workModalRows,
    workModalSidebar,
    workModalManagerSelect,
    workModalAddTask,
    workModalFeedbackDate,
    modal2ManagerSelect,
    modal2ContactSelect,
    modal2ContactDate,
    feedbackAddItem,
    addfeedbackForm,
    sliders,
    findEmployer,
    findEmployer2,
    chooseEmployer,
    chooseProductType,
    workTypeTemplate,
    chooseFullInfo,
    mainInfoChooseBlock,
    chooseEmployer2,
    chooseProductType2,
    modalParts,
    modalSwitchers,
    editBtns,
    workModalFeedback,
    // employerRowsWrapper,
    vacancyRowsWrapper

} from '../view'

const app = {
    init() {
        this.mvl()
        this.initOSB()
        this.it()
        this.iwms()
        this.ant()
        this.sfd()
        this.aff()
        // this.ai()
        this.scbfi()
        this.smp()
        this.fe()
        this.gmp()
        this.gip()
        this.gcp()
        this.itstr()
        this.gmtp()
        this.msi()
        this.msdp()
        this.mlcp()
        this.msp()
        this.mvp()
        this.fs()
        this.mchm()
        this.gtc()
        this.gc()
        this.gvl()
        this.gcvp()
        this.msvp()
        this.gvwt()
        this.gmvp()
        this.gsvp()
        this.msiv()
        this.mdatp()
        this.gcv()
        this.maa()
        this.anv()
        this.gve()
        this.mvsp()
        this.cianv()
    },
    mvl() {
        mountVacancyList()
    },
    initOSB() {
        initOverlayScrollbars(sidebarLayout)
        initOverlayScrollbars(workModalRows)
        initOverlayScrollbars(workModalSidebar)
        initOverlayScrollbars(workModalFeedback)
    },

    it() {
        initTooltips()
    },
    itstr() {
        initToastr()
    },
    iwms() {
        if (workModalManagerSelect) {
            initWorkModalSelect(workModalManagerSelect)
        }


        if (modal2ManagerSelect) {
            initWorkModalSelect(modal2ManagerSelect)
        }


        if (modal2ContactSelect) {
            initWorkModalSelect(modal2ContactSelect)
        }
    },
    ant() {
        if (workModalAddTask) {
            addNewTask(workModalAddTask)
        }

    },
    sfd() {
        if (workModalFeedbackDate) {
            setFeedbackDate(workModalFeedbackDate)
        }

        if (modal2ContactDate) {
            setFeedbackDate(modal2ContactDate)
        }


    },
    aff() {
        if (addfeedbackForm) {
            addFeedbackForm(feedbackAddItem, addfeedbackForm)
        }

    },
    // ai() {
    // 	if (findEmployer) {
    // 		autocompleteInput(findEmployer, chooseEmployer, chooseProductType)
    // 	}

    // 	if (findEmployer2) {
    // 		autocompleteInput(findEmployer2, chooseEmployer2, chooseProductType2)
    // 	}

    // },

    scbfi() {
        if (workTypeTemplate) {
            showChooseBlockFullInfo(workTypeTemplate, {
                prev: chooseProductType,
                next: chooseFullInfo,
                block: mainInfoChooseBlock
            })
        }

    },
    smp() {
        switchModalParts(modalSwitchers, modalParts)
    },
    fe() {
        feedbackEdit(editBtns)
    },

    gmp() {
        getManagerPopup()
    },
    gmvp() {
        getManagerVacancyPopup()
    },
    gip() {
        getIntermediariesPopup()
    },
    gcp() {
        getCountryPopup()
    },
    gmtp() {
        getManufacturyTypePopup()
    },
    gtc() {
        getTypeContact()
    },
    gc() {
        getClients()
    },
    msi() {
        mountSearchInput()
    },
    msdp() {
        mountContactDataPopup()
    },
    mlcp() {
        mountLastContactPopup()
    },
    msp() {
        mountSortingPopup()
    },
    mvp() {
        mountVacancyPopup()
    },
    fs() {
        vacancyFetchScroll(vacancyRowsWrapper)
    },
    mchm() {
        mountContactHistoryModal()
    },
    gvl() {
        getVacancyList()
    },
    gcvp() {
        getCountryVacancyPopup()
    },
    msvp() {
        mountSortingVacancyPopup()
    },
    gvwt() {
        getVacancyWorkType()
    },
    gsvp() {
        getStatusesVacancyPopup()
    },
    msiv() {
        mountSearchInputVacancy()
    },
    mdatp() {
        mountDateAndTermsPopup()
    },
    gcv() {
        getClientsVacancy()
    },
    maa() {
        mountActiveArchive()
    },
    anv() {
        addNewVacancy()
    },
    gve() {
        getVacancyEmployers()
    },
    mvsp() {
        mountVacancyStatusesPopup()
    },
    cianv() {
        checkIfAddNewVacancy()
    }

}


export {
    app
}