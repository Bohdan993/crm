import {el, setAttr, svg} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/getEmployersList'
import sidebarSearchInput from '../../sidebarSearchInput'



  export default class SearchInput {
  	constructor(){

      this.el = el('div.sidebar__input-layer.hidden', 
        this.search = el('input.sidebar__search-input', {
          type: 'text',
          placeholder: 'поиск'
        }),
        el('i.search-icon', 
          svg('svg', svg('use', {
            xlink: {href: "img/sprites/svg/symbol/sprite.svg#search" }
          }))
          ),
        el('i.remove-icon.hidden')
        )
      this.searchFunc = this.searchFunc.bind(this)
      this.searchFunc()
  	}


  	update(data, index, items) {
  		
  	}

    searchFunc(){
      this.search.addEventListener('change', seachFunc)

      function seachFunc(e){
        let val = e.target.value.trim()
        getEmployersList({search: val})
      }

      sidebarSearchInput(this.search)
    }

    removeHiddenClass(){
      this.el.classList.remove('hidden')
    }

  }