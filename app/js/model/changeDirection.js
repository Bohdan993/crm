

const changeDirection = (arrows) => {
	//@parametr arrows - стрелки смены направления отзыва

	arrows.forEach(arrow => {
		arrow.addEventListener('click', function(){
			this.classList.toggle('rotate')
		})
	})
}

export default changeDirection