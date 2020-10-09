

const changeDirection = (arrow) => {
	//@parametr arrow - стрелки смены направления отзыва

		arrow.addEventListener('click', function(){
			this.classList.toggle('rotate')
		})
	
}

export default changeDirection // to Components/Employer/WorkModal/WorkModalContactHistory.js