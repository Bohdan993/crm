export const calculate = function (vacancy_id, type = 'update', storage, vacancyStorage) {

    const indicatorsClasses = ['decline', 'choosen', 'ready', 'wait', 'department', 'busy']
    const data = storage.getState(vacancy_id)
    let declineCount = +vacancyStorage.getPartialState(vacancy_id, 'id_vacancy', 'status')[0]

    const countObj = {
        decline: type === 'delete' ? ++declineCount : declineCount,
        choose: 0,
        ready: 0,
        wait: 0,
        department: 0,
        busy: 0
    }


    const statusesArr = data.data.map(el => {
        return el.vacancy.id_status
    })

    statusesArr.forEach(el => {
        if (el === '1' || el === '2') {
            countObj.choose++
        } else if (el === '3' || el === '4') {
            countObj.ready++
        } else if (el === '5' || el === '6' || el === '7') {
            countObj.wait++
        } else if (el === '8' || el === '9' || el === '10' || el === '11' || el === '12') {
            countObj.department++
        } else if (el === '13') {
            countObj.busy++
        }
    })

    const statuses = Object.values(countObj)

    const indicatorsArr = statuses.map((el, i) => {
        return {
            number: el,
            class: indicatorsClasses[i]
        }
    })

    vacancyStorage.setPartialState(vacancy_id, 'id_vacancy', 'status', statuses)


    return {
        indicators: indicatorsArr,
        statuses
    }
}