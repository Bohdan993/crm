import {OverlayScrollbars} from '../../libs/libs'


const show5Rows = (btn, block) => {
	// let globals = OverlayScrollbars.globals();
	// console.log(globals)
	btn.addEventListener('click', function(){
		let rows = block.querySelectorAll('.hidden-row')
		// console.log(rows)
		rows.forEach((row, i, arr)=> {
			if(i < 5) {
				row.classList.remove('hidden-row')
			}
	
		})
		console.log(rows)
		if(rows.length < 5) {
			btn.style.display = 'none'
		}

	})
}


export default show5Rows