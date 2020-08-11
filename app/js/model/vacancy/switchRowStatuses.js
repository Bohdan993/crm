

const switchRowStatuses = (statuses) => {

		// console.log(statuses)
		statuses.forEach(el => {
			let leftArrow = el.querySelector('.cell-status__control-left')
			let rightArrow = el.querySelector('.cell-status__control-right')

			// console.log(slider)
			leftArrow.addEventListener('click', function(){
				let parent = this.parentNode.parentNode
				let slider = parent.querySelectorAll('.status')
				let flag = false
				let row = parent.parentNode.parentNode
				let table = row.parentNode
				let tableParent = table.parentNode.parentNode
				console.log(row)
				console.log(table)

				slider.forEach((elem, ind, arr) => {
					if(elem.classList.contains('active') && !flag) {

						elem.classList.remove('active')
						ind = ind === 0 ? 0 : ind - 1
						arr[ind].classList.add('active')

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
				let slider = parent.querySelectorAll('.status')
				let flag = false
				let row = parent.parentNode.parentNode
				let table = row.parentNode
				let tableParent = table.parentNode.parentNode
				console.log(row)
				console.log(table)
			
				slider.forEach((elem, ind, arr) => {

					if(elem.classList.contains('active') && !flag) {
						elem.classList.remove('active')
						ind = ind === arr.length - 1 ? arr.length - 1 : ind + 1
						arr[ind].classList.add('active')

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