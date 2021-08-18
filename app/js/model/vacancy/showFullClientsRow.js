const showFullClientsRow = (switcher, row) => {
    let container = row.querySelector('.table-full')
    let names = row.querySelector('.modal-row__clients-row')

    function toggleRow() {
        if (container && !container.classList.contains('active')) {

            container.classList.add('active');
            container.style.height = 'auto';

            let height = container.clientHeight + 'px';

            container.style.height = '0px';

            setTimeout(function () {
                container.style.height = height;
            }, 0);

        } else {

            container.style.height = '0px';

            container.addEventListener('transitionend', function () {
                container.classList.remove('active');
            }, {
                once: true
            });

        }
    }

    switcher.addEventListener('click', function () {
        this.classList.toggle('rotate')
        names.classList.toggle('active')
        container.classList.toggle('active')
        // toggleRow()
    })
    names.addEventListener('click', function () {
        switcher.classList.toggle('rotate')
        this.classList.toggle('active')
        container.classList.toggle('active');
        // toggleRow()
    })
}

export default showFullClientsRow