import {isChildOf} from '../helper'

const showFullRow = (row, event) => {
    slideToggle(row, event)
}


function slideToggle(linkToggle, event) {

    let container = linkToggle.querySelector('.table-full')

    if (event.target.classList.contains('no-open')) {
        return
    }

    if (isChildOf(event.target, container)) {
        return
    }


    if (container && !container.classList.contains('active')) {


        container.classList.add('active')
        container.style.height = 'auto'

        container.style.height = '0px'

        setTimeout(function () {
            container.style.height = 'auto'
        }, 0)

    } else {
        container.style.height = '0px'
        container.classList.remove('active')


    }
}

export default showFullRow