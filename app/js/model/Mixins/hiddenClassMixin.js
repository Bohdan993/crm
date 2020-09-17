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
		this.modalLayer.classList.add('empty-layer')
		return this
	}
};


export default hiddenClassMixin