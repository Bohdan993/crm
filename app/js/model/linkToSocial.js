

const linkToSocial = (links) => {
	//@parametr links - ссылки на социальные сети в окне Работодателя

	function setHref(el) {
		//value инпута
		const value = el.nextElementSibling.value
		//Если инпут содержит какое то значение
		if(value) {
			el.setAttribute('target', '_blank')
			if(el.classList.contains('mail-link')){
				el.setAttribute('href', 'mailto:' + value)
			} else {
				const result = value.match(/^(https?:\/\/)/)
				if(result && result.input) {
					el.setAttribute('href', value)
				} else {
					el.setAttribute('href', 'http://' + value)
				}
			}
		} else {
			el.removeAttribute('target')
		}
	}

	links.forEach(el=> {
		const input = el.nextElementSibling
		setHref(el)
		input.addEventListener('change', setHref.bind(null, el))
	})
}

export default linkToSocial