

const switchRowStatuses = (statuses) => {

	// class StatusSwitcher {
	// 	constructor(selector){

	// 		this.timeArray = Array(9).fill({text: '', date: ''})
	// 		this.prevArrow = selector.querySelector('.cell-status__control-left')
	// 		this.rightArrow = selector.querySelector('.cell-status__control-right')

	// 	}


	// 	clickNextBtn() {
	// 		this.rightArrow.addEventListener('click', function(){

	// 		})
	// 	}


	// 	clickPrevBtn() {

	// 	}

	// }

		// console.log(statuses)
		statuses.forEach(el => {
			let timeArray = Array(9).fill({text: '', date: ''})
			let leftArrow = el.querySelector('.cell-status__control-left')
			let rightArrow = el.querySelector('.cell-status__control-right')

			// console.log(slider)
			leftArrow.addEventListener('click', function(){
				
				let parent = this.parentNode.parentNode
				let sliderWpar = parent.querySelector('.cell-status__slider')
				let instance = sliderWpar._tippy;
				let slider = parent.querySelectorAll('.status')
				let flag = false
				let row = parent.parentNode.parentNode
				let table = row.parentNode
				let tableParent = table.parentNode.parentNode
				// console.log(row)
				// console.log(table)

				slider.forEach((elem, ind, arr) => {
	
					if(elem.classList.contains('active') && !flag) {
		
						elem.classList.remove('active')
						ind = ind === 0 ? 0 : ind - 1
						arr[ind].classList.add('active')
						timeArray[ind] = {
							text: arr[ind].textContent,
							date: new Date().toLocaleDateString()
						}
						instance.setContent(`<div class="row-popup" id="status-change-popup">
		          <form>
		            <div class="input-group">
		              <p class="status choosen">Подготовка CV</p>
		              <time>${timeArray[ind].text === 'Подготовка CV' ? timeArray[ind].date : timeArray[0].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status choosen">CV отправлено</p>
		              <time>${timeArray[ind].text === 'CV отправлено' ? timeArray[ind].date : timeArray[1].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status ready">Утвержден</p>
		              <time>${timeArray[ind].text === 'Утвержден' ? timeArray[ind].date : timeArray[2].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status ready">Контракт подписан</p>
		              <time>${timeArray[ind].text === 'Контракт подписан' ? timeArray[ind].date : timeArray[3].date}</time>
		            </div>
		            <div class="input-group">
		             <p class="status wait">Подан в визовый центр</p>
		             <time>${timeArray[ind].text === 'Подан в визовый центр' ? timeArray[ind].date : timeArray[4].date}</time>
		            </div>
		           	<div class="input-group">
		              <p class="status department">Получил разрешение</p>
		              <time>${timeArray[ind].text === 'Получил разрешение' ? timeArray[ind].date : timeArray[5].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status department">Забрал разрешение</p>
		              <time>${timeArray[ind].text === 'Забрал разрешение' ? timeArray[ind].date : timeArray[6].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status department">Билеты куплены</p>
		              <time>${timeArray[ind].text === 'Билеты куплены' ? timeArray[ind].date : timeArray[7].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status busy">Трудоустроен</p>
		              <time>${timeArray[ind].text === 'Трудоустроен' ? timeArray[ind].date : timeArray[8].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status delete">Исключить из вакансии</p>
		            </div>
		          </form>
		        </div>`);
						if(arr[ind].classList.contains('choosen')) {
							if(!table.classList.contains('choosen')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__choosen').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('ready')) {
							if(!table.classList.contains('ready')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__ready').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('wait')) {
							if(!table.classList.contains('wait')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__wait').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('department')) {
							if(!table.classList.contains('department')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__department').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('busy')) {
							if(!table.classList.contains('busy')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__busy').appendChild(oldChild)
							}
						}

						// arr[ind].dispatchEvent(new CustomEvent("date", {
					 //    detail: { date: new Date().toLocaleDateString() }
					 //  }));

					 //  arr[ind].addEventListener("date", function(event) {
				  //   	alert(event.detail.date)
				  // 	});

						flag = true
					}
				})

				// if(table.children.length === 1) {
				// 	table.style.display = 'none'
				// }

				// if(table.children.length > 1) {
				// 	table.style.display = 'block'
				// }

			})
		



			rightArrow.addEventListener('click', function(){

				let parent = this.parentNode.parentNode
				let sliderWpar = parent.querySelector('.cell-status__slider')
				let instance = sliderWpar._tippy;
				let slider = parent.querySelectorAll('.status')
				let flag = false
				let row = parent.parentNode.parentNode
				let table = row.parentNode
				let tableParent = table.parentNode.parentNode
				// console.log(row)
				// console.log(table)
			
				slider.forEach((elem, ind, arr) => {

					if(elem.classList.contains('active') && !flag) {

						elem.classList.remove('active')
						
						ind = ind === arr.length - 1 ? arr.length - 1 : ind + 1
						arr[ind].classList.add('active')
						timeArray[ind] = {
							text: arr[ind].textContent,
							date: new Date().toLocaleDateString()
						}
						instance.setContent(`<div class="row-popup" id="status-change-popup">
		          <form>
		            <div class="input-group">
		              <p class="status choosen">Подготовка CV</p>
		              <time>${timeArray[ind].text === 'Подготовка CV' ? timeArray[ind].date : timeArray[0].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status choosen">CV отправлено</p>
		              <time>${timeArray[ind].text === 'CV отправлено' ? timeArray[ind].date : timeArray[1].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status ready">Утвержден</p>
		              <time>${timeArray[ind].text === 'Утвержден' ? timeArray[ind].date : timeArray[2].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status ready">Контракт подписан</p>
		              <time>${timeArray[ind].text === 'Контракт подписан' ? timeArray[ind].date : timeArray[3].date}</time>
		            </div>
		            <div class="input-group">
		             <p class="status wait">Подан в визовый центр</p>
		             <time>${timeArray[ind].text === 'Подан в визовый центр' ? timeArray[ind].date : timeArray[4].date}</time>
		            </div>
		           	<div class="input-group">
		              <p class="status department">Получил разрешение</p>
		              <time>${timeArray[ind].text === 'Получил разрешение' ? timeArray[ind].date : timeArray[5].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status department">Забрал разрешение</p>
		              <time>${timeArray[ind].text === 'Забрал разрешение' ? timeArray[ind].date : timeArray[6].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status department">Билеты куплены</p>
		              <time>${timeArray[ind].text === 'Билеты куплены' ? timeArray[ind].date : timeArray[7].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status busy">Трудоустроен</p>
		              <time>${timeArray[ind].text === 'Трудоустроен' ? timeArray[ind].date : timeArray[8].date}</time>
		            </div>
		            <div class="input-group">
		              <p class="status delete">Исключить из вакансии</p>
		            </div>
		          </form>
		        </div>`);
						if(arr[ind].classList.contains('choosen')) {
							if(!table.classList.contains('choosen')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__choosen').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('ready')) {
							if(!table.classList.contains('ready')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__ready').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('wait')) {
							if(!table.classList.contains('wait')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__wait').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('department')) {
							if(!table.classList.contains('department')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__department').appendChild(oldChild)
							}
						} else if(arr[ind].classList.contains('busy')) {
							if(!table.classList.contains('busy')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__busy').appendChild(oldChild)
							}
						}

						// arr[ind].dispatchEvent(new CustomEvent("date", {
					 //    detail: { date: new Date().toLocaleDateString() }
					 //  }));

					 //  arr[ind].addEventListener("date", function(event) {
				  //   	alert(event.detail.date)
				  // 	});

						flag = true
					}
				})

				// console.log(table.children.length	)
				// if(table.children.length === 1) {
				// 	table.style.display = 'none'
				// }

				// if(table.children.length > 1) {
				// 	table.style.display = 'block'
				// }
			})

		})
}

export default switchRowStatuses