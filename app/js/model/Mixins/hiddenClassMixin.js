let hiddenClassMixin = {
    setHiddenClass() {

        this.el.classList.add('hidden')
        this.el.parentNode.classList.add('loading')

        return this
    },

    removeHiddenClass() {

        this.el.classList.remove('hidden')
        this.el.parentNode.classList.remove('loading')

        return this
    },

    setEmptyLayer() {

        this.modalLayer.classList.add('empty-layer')

        return this
    }
};


export default hiddenClassMixin