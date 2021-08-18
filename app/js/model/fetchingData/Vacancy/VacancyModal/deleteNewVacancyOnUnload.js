import fetch from '../../fetchingDataClass'

function unloadHandler(id, e) {
    e.preventDefault()
    fetch.getResourse(`/vacancies/delete/?id=${id}`)
    e.returnValue = ''
}


export default unloadHandler