let hiddenClassMixin = {
  setHiddenClass(){
		this.el.classList.add('hidden')
		return this
	},

	removeHiddenClass(){
		this.el.classList.remove('hidden')
		return this
	},

	setEmptyLayer(){
		// if(this.__proto__.constructor.name !== 'WorkModalMedia') {
  		// this.modalLayer.classList.add('empty-layer')
  	// } else {
  		// this.modalLayer.classList.add('empty-layer')
  		this.modalRowWrapper.classList.add('empty-layer')
  	// }
		return this
	}
};


export default hiddenClassMixin