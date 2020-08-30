


const show1Row = (btn, block) => {

	const rows = block.querySelectorAll('.hidden-row')

	console.log(rows)

	if(rows.length) {
		btn.style.display = 'flex'
	}

		btn.addEventListener('click', function(){
			let rows = block.querySelectorAll('.hidden-row')
			rows.forEach((row, i, arr)=> {
				if(i < 4) {
					row.classList.remove('hidden-row')
				}
		
			})
			// console.log(rows)
			if(rows.length < 4) {
				btn.style.display = 'none'
			}

		})
}


export default show1Row