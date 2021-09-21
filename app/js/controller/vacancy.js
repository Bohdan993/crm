import {
    initOverlayScrollbars,
    initTooltips,
    initToastr,
    initWorkModalSelect,
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
    checkIfAddNewVacancy,
    mountClientDeleteReasonModalComponent
} from '../model'

import {
    sidebarLayout,
    workModalRows,
    workModalSidebar,
    workModalManagerSelect,
    modal2ManagerSelect,
    modal2ContactSelect,
    modalParts,
    modalSwitchers,
    editBtns,
    workModalFeedback,
    vacancyRowsWrapper

} from '../view'

const app = {
    init() {
        this.mvl()
        this.initOSB()
        this.it()
        this.iwms()
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
        this.mcdrmc()
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
    },
    mcdrmc(){
        mountClientDeleteReasonModalComponent()
    }

}


export {
    app
}