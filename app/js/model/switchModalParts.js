

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

	switchers.forEach(el => {
		
		el.addEventListener('click', addActiveClass)
	})
}

export default switchModalParts