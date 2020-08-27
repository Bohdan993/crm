

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
			let slider = el.querySelector('.cell-status__slider')

			slider.addEventListener('click', function(){
				let instance = this._tippy
				let instanseStatuses = instance.popper.querySelectorAll('.status')

				instanseStatuses.forEach(status=> {
					status.addEventListener('click', forEachStatus)
				})
			})
			// // console.log(slider)
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
		              <p class="del-status delete">Исключить из вакансии</p>
		            </div>
		          </form>
		        </div>`);
						if(arr[ind].classList.contains('choosen')) {
							if(!table.classList.contains('choosen')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__choosen').appendChild(oldChild)
								this.parentNode.classList.remove('ready')
								this.parentNode.classList.add('choosen')
							}
						} else if(arr[ind].classList.contains('ready')) {
							if(!table.classList.contains('ready')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__ready').appendChild(oldChild)
								this.parentNode.classList.remove('wait')
								this.parentNode.classList.add('ready')
							}
						} else if(arr[ind].classList.contains('wait')) {
							if(!table.classList.contains('wait')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__wait').appendChild(oldChild)
								this.parentNode.classList.remove('department')
								this.parentNode.classList.add('wait')
							}
						} else if(arr[ind].classList.contains('department')) {
							if(!table.classList.contains('department')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__department').appendChild(oldChild)
								this.parentNode.classList.remove('busy')
								this.parentNode.classList.add('department')
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
						// console.log(arr[ind])
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
		              <p class="del-status delete">Исключить из вакансии</p>
		            </div>
		          </form>
		        </div>`);
						if(arr[ind].classList.contains('choosen')) {
							if(!table.classList.contains('choosen')) {
								console.log(arr[ind].textContent)
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__choosen').appendChild(oldChild)
								this.parentNode.classList.add('choosen')
							}
						} else if(arr[ind].classList.contains('ready')) {
							if(!table.classList.contains('ready')) {
								console.log(arr[ind].textContent)
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__ready').appendChild(oldChild)
								this.parentNode.classList.remove('choosen')
								this.parentNode.classList.add('ready')
							}
						} else if(arr[ind].classList.contains('wait')) {
							if(!table.classList.contains('wait')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__wait').appendChild(oldChild)
								this.parentNode.classList.remove('ready')
								this.parentNode.classList.add('wait')
							}
						} else if(arr[ind].classList.contains('department')) {
							if(!table.classList.contains('department')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__department').appendChild(oldChild)
								this.parentNode.classList.remove('wait')
								this.parentNode.classList.add('department')
							}
						} else if(arr[ind].classList.contains('busy')) {
							if(!table.classList.contains('busy')) {
								let oldChild = table.removeChild(row)
								tableParent.querySelector('.table-full__busy').appendChild(oldChild)
								this.parentNode.classList.remove('department')
								this.parentNode.classList.add('busy')
							}
						}

						
						// let oldChild = table.removeChild(row)

						// if(arr[ind].textContent === 'Подготовка CV') {

						// 	this.parentNode.classList.add('choosen')
						// 	tableParent.querySelector('.table-full__choosen').appendChild(oldChild)

						// }else if(arr[ind].textContent === 'CV отправлено') {

						// 	this.parentNode.classList.add('choosen')
						// 	let node = tableParent.querySelector('.table-full__choosen').querySelector('[data-count="2"]:last-child')
						// 	oldChild.after(node)

						// }else if(arr[ind].textContent === 'Утвержден') {

						// 	this.parentNode.classList.remove('choosen')
						// 	this.parentNode.classList.add('ready')

						// }else if(arr[ind].textContent === 'Контракт подписан') {

						// 	this.parentNode.classList.remove('choosen')
						// 	this.parentNode.classList.add('ready')

						// }else if(arr[ind].textContent === 'Подан в визовый центр') {

						// 	this.parentNode.classList.remove('ready')
						// 	this.parentNode.classList.add('wait')

						// }else if(arr[ind].textContent === 'Получил разрешение') {

						// 	this.parentNode.classList.remove('wait')
						// 	this.parentNode.classList.add('department')

						// }else if(arr[ind].textContent === 'Забрал разрешение') {

						// 	this.parentNode.classList.remove('wait')
						// 	this.parentNode.classList.add('department')

						// }else if(arr[ind].textContent === 'Билеты куплены') {

						// 	this.parentNode.classList.remove('wait')
						// 	this.parentNode.classList.add('department')

						// }else if(arr[ind].textContent === 'Трудоустроен') {

						// 	this.parentNode.classList.remove('department')
						// 	this.parentNode.classList.add('busy')

						// }

			
						flag = true
					}
				})

			})

		})
}


function forEachStatus() {
	let tippy = this.closest('.tippy-box').parentNode._tippy
	let row = tippy.reference.closest('.table-full__row')
	let parentRow = row.parentNode
	let parentTable = parentRow.parentNode

	let statuses = row.querySelectorAll('.status')
	let controls = row.querySelector('.cell-status__controls')


// Убираем второй класс у стрелочок переключателей статуса
controls.classList.remove(controls.classList[1])


//Устанавливаем активный статус в строке
	statuses.forEach(el=> {
		el.classList.remove('active')

		if(this.textContent === el.textContent) {
			el.classList.add('active')
		}
	})

//Добавляем дату утановки статуса в попапе
	this.nextElementSibling.textContent = new Date().toLocaleDateString()

	if(this.classList.contains('choosen') && !parentRow.classList.contains('choosen')){
			let oldChild = parentRow.removeChild(row)
			parentTable.querySelector('.table-full__choosen').appendChild(oldChild)
			controls.classList.add('choosen')
	}else if(this.classList.contains('ready') && !parentRow.classList.contains('ready')) {
			let oldChild = parentRow.removeChild(row)
			parentTable.querySelector('.table-full__ready').appendChild(oldChild)
			controls.classList.add('ready')
	}else if(this.classList.contains('wait') && !parentRow.classList.contains('wait')) {
			let oldChild = parentRow.removeChild(row)
			parentTable.querySelector('.table-full__wait').appendChild(oldChild)
			controls.classList.add('wait')
	}else if(this.classList.contains('department') && !parentRow.classList.contains('department')) {
			let oldChild = parentRow.removeChild(row)
			parentTable.querySelector('.table-full__department').appendChild(oldChild)
			controls.classList.add('department')
	}else if(this.classList.contains('busy') && !parentRow.classList.contains('busy')) {
			let oldChild = parentRow.removeChild(row)
			parentTable.querySelector('.table-full__busy').appendChild(oldChild)
			controls.classList.add('busy')
	}
}
export default switchRowStatuses