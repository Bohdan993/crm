


const show5Rows = (btn, block) => {
	let rows = block.querySelectorAll('.hidden-row')

	if(rows.length) {
		btn.style.display = 'flex'
	}

	btn.addEventListener('click', function(){
		let rows = block.querySelectorAll('.hidden-row')
		rows.forEach((row, i, arr)=> {
			if(i < 5) {
				row.classList.remove('hidden-row')
			}
	
		})
		// console.log(rows)
		if(rows.length < 5) {
			btn.style.display = 'none'
		}

	})
}


export default show5Rows