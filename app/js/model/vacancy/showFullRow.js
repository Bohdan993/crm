

const showFullRow = (rows) => {

	rows.forEach(row=> {
		row.addEventListener('click', function(e){
			if(e.target.classList.contains('no-open')) {
				return
			}

			console.log(e.target)

			let fullRow = row.querySelector('.table-full');
				fullRow.classList.toggle('open')
		})
	})
}

export default showFullRow