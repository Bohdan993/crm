const switchModalParts = (switchers, parts) => {
	function addActiveClass() {
		let id = this.dataset.part
		
		switchers.forEach(el=> {
			el.classList.remove('active')
		})

		this.classList.add('active')

		parts.forEach(el => {
			el.classList.remove('active')

			if(el.id === id) {
				el.classList.add('active')
			}
		})
	}


	// if(permission) {
		switchers.forEach(el => {
			el.addEventListener('click', addActiveClass,  {once: true})
		})
	// }



	function changeActiveClass(targetPart, targetSwither) {
		switchers.forEach(el=> {
			el.classList.remove('active')
		})

		document.querySelector(targetSwither).classList.add('active')


		parts.forEach(el => {
			el.classList.remove('active')
		})

		// console.log(targetPart)

		document.querySelector(targetPart).classList.add('active')
	}

	return changeActiveClass
}

export default switchModalParts // to ../controller/index.js