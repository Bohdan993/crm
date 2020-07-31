
const addManufacturyType = (btn, block) => {
	let wrapper = block.querySelector('.modal-row__layer')
	let html = `<div class="modal-row__manufactury-type-row">
                        <div class="input-group modal-row__manufactury-type-select native-select"> 
                          <select class="info-area" name="">
                            <option value="" disabled="" selected="">Выбрать</option>
                            <option value="">Коровы</option>
                            <option value="">Цветы</option>
                          </select>
                        </div>
                        <div class="input-group">
                          <input class="info-area" type="text" name="">
                        </div>
                      </div>`

	btn.addEventListener('click', function(){
		wrapper.insertAdjacentHTML('beforeend', html)
	})


	// document.querySelector('body').addEventListener('click', function(e){
	// 	console.log(e.target)
	// 	if(e.target.classList.contains('modal-row__manufactury-type-row')) {
	// 		console.log(e.target);
	// 	}
	// })

	
}

export default addManufacturyType