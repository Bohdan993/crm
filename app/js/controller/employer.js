import {
    initOverlayScrollbars,
    initTooltips,
    initToastr,
    initWorkModalSelect,
    switchModalParts,
    feedbackEdit,
    getEmployersList,
    getManagerPopup,
    getIntermediariesPopup,
    getCountryPopup,
    getManufacturyTypePopup,
    getTypeContact,
    getClients,
    employerFetchScroll,
    addNewEmployer,
    mountSearchInput,
    mountContactDataPopup,
    mountLastContactPopup,
    mountSortingPopup,
    mountVacancyPopup,
    mountContactHistoryModal,
    mountStringsPopup,
    checkIfAddNewEmployer
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
    employerRowsWrapper,

} from '../view'

const app = {
    init() {
        this.initOSB()
        this.it()
        this.iwms()
        this.smp()
        this.fe()
        this.gel()
        this.gmp()
        this.gip()
        this.gcp()
        this.ane()
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
        this.mssp()
        this.ciane()
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

    gel() {
        getEmployersList()
    },

    gmp() {
        getManagerPopup()
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
    ane() {
        addNewEmployer()
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
        employerFetchScroll(employerRowsWrapper)
    },
    mchm() {
        mountContactHistoryModal()
    },
    mssp() {
        mountStringsPopup()
    },
    ciane() {
        checkIfAddNewEmployer()
    }

}


export {
    app
}