import {
    MicroModal
} from '../../../../libs/libs'
import clientsStorage from '../../Storage'
import getVacancyClients from './getVacancyClients'
import vacancyStorage from '../../Storage/globalVacancies'
import archiveVacancy from './VacancyModal/archiveVacancy'
import vacancyListUpdateFetchEvent from '../../CustomEvents/vacancyListUpdateFetchEvent'

const checkIfAllVacancyClientsReady = (id) => {
    if (!clientsStorage.isSet(id)) {
        getVacancyClients(id, false)
            .then(res => {
                if (res) {

                }
            })
        return
    }

    if (clientsStorage.isSet(id)) {

        const clients = clientsStorage.getState(id).data
        const flag = clients.every(client => {
            return client.vacancy.id_status === "9"
        })

        if (flag) {
            const vacancy = vacancyStorage.getState().filter(x => x.id_vacancy === id)[0]
            let {
                status,
                total_client: totalClients
            } = vacancy
            let [firstStatus, ...restStatuses] = status
            const sumOfStatuses = restStatuses.reduce((a, b) => {
                return a + b
            }, 0)

            if (sumOfStatuses === +totalClients) {
                archiveVacancy({
                    vacancy: id,
                    type: 0
                }).then(res => {
                    if (res === 'ok') {
                        MicroModal.close('modal-3')
                        document.dispatchEvent(vacancyListUpdateFetchEvent)
                    } else {
                        return
                    }
                })
            }

        }

        return
    }
}


export default checkIfAllVacancyClientsReady