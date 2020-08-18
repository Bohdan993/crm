
const showChooseBlockFullInfo = (popup, {
	prev, 
	next,
	block
} = {}) => {
	const confirmBtn = popup.querySelector('.confirm-bnt')
	const topGroup = popup.querySelectorAll('.top-group input')
	const bottomGroup = popup.querySelectorAll('.bottom-group input')
	

	confirmBtn.addEventListener('click', function(e){
		const arr = []
		e.preventDefault()
		topGroup.forEach(el => {
			if(el.checked) {
				switch (el.value) {
					  case "Сезонная":
					   	block.querySelector('.products').classList.add('season');
					    break;
					  case "Практика":
					    block.querySelector('.products').classList.add('practics')
					    break;
					  case "Рабочая":
					    block.querySelector('.products').classList.add('working')
					    break;
					  default:
					    console.error('error')
					}
					block.querySelector('.visa-type').textContent = el.value + " - "
			}
		})

		bottomGroup.forEach(el => {
			if(el.checked) {
				arr.push(el.value)
				block.querySelector('.types').textContent = arr.join(', ')
			}
		})

		prev.style.display = 'none'
		next.style.display = 'flex'
	})
}

export default showChooseBlockFullInfo