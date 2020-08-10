

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
				let row = parent.parentNode.parentNode.parentNode
				let table = row.parentNode
				let tableParent = table.parentNode
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
								console.log(oldChild)
							}
						} else if(arr[ind].classList.contains('ready')) {
							if(!table.classList.contains('ready')) {
								console.log('needed to replace2')
							}
						} else if(arr[ind].classList.contains('wait')) {
							if(!table.classList.contains('wait')) {
								console.log('needed to replace3')
							}
						} else if(arr[ind].classList.contains('department')) {
							if(!table.classList.contains('department')) {
								console.log('needed to replace4')
							}
						} else if(arr[ind].classList.contains('busy')) {
							if(!table.classList.contains('busy')) {
								console.log('needed to replace5')
							}
						}

						flag = true


					}

					// if(elem.classList.contains('active')) {
					// 	console.log(elem.classList)
					// }

				})

			})


			rightArrow.addEventListener('click', function(){
				let parent = this.parentNode.parentNode
				let slider = parent.querySelectorAll('.status')
				let flag = false
				let row = parent.parentNode.parentNode.parentNode
				let table = row.parentNode
				let tableParent = table.parentNode

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
								console.log('needed to replace2')
							}
						} else if(arr[ind].classList.contains('wait')) {
							if(!table.classList.contains('wait')) {
								console.log('needed to replace3')
							}
						} else if(arr[ind].classList.contains('department')) {
							if(!table.classList.contains('department')) {
								console.log('needed to replace4')
							}
						} else if(arr[ind].classList.contains('busy')) {
							if(!table.classList.contains('busy')) {
								console.log('needed to replace5')
							}
						}

						flag = true
					}
				})

			})

		})
}

export default switchRowStatuses