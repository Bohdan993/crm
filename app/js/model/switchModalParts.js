const switchModalParts = (switchers, parts) => {
    function addActiveClass() {
        let id = this.dataset.part

        switchers.forEach(el => {
            el.classList.remove('active')
        })

        this.classList.add('active')

        parts.forEach(el => {
            el.classList.remove('active')

            if (el.id === id) {
                el.classList.add('active')
            }
        })
    }


    switchers.forEach(el => {
        el.addEventListener('click', addActiveClass)
    })


}

export default switchModalParts // to ../controller/index.js


function changeActiveClass(switchers, parts, targetPart, targetSwither) {
    switchers.forEach(el => {
        el.classList.remove('active')
    })

    document.querySelector(targetSwither).classList.add('active')


    parts.forEach(el => {
        el.classList.remove('active')
    })

    document.querySelector(targetPart).classList.add('active')
}


export {
    changeActiveClass
}