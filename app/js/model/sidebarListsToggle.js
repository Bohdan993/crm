// import {OverlayScrollbars} from '../../libs/libs'
// import {sidebarWrapper} from '../view'


const sidebarListsToggle = (items)=> {
	items.forEach((item, i, arr)=> {
		
		item.addEventListener('click', function () {
			arr.forEach(a=> {
				a.classList.remove('active')
			})
			this.classList.add('active')
		})
	})
}




export default sidebarListsToggle
