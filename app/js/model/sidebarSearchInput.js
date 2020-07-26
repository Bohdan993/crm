

const sidebarSearchInput = (input)=> {
	let parent = input.parentNode,
	searchIcon = parent.querySelector('.search-icon'),
	removeIcon = parent.querySelector('.remove-icon');

	input.addEventListener('click', function(e){
		if(this.value !== '') {
			this.select()
		}
	})
	input.addEventListener('input', function(e){
			if(this.value !== '') {
				searchIcon.classList.add('hidden')
				removeIcon.classList.remove('hidden')
			} else {
				searchIcon.classList.remove('hidden')
				removeIcon.classList.add('hidden')
			}
	})

	removeIcon.addEventListener('click', function(e){
		input.value = ''
		searchIcon.classList.remove('hidden')
		removeIcon.classList.add('hidden')
	})
}


export default sidebarSearchInput