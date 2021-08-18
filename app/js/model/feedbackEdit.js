const feedbackEdit = (btns) => {
    //@parametr btns = кнопки редактирования отзыва


    btns.forEach(el => {

        el.addEventListener('click', function () {
            const row = this.closest('.modal-row__feedback-row')
            const textValue = row.querySelector('.modal-row__feedback-text p').textContent
            const template = `<form class="modal-row__feedback-row add-feedback-form" style="display: block;">
                          <div class="modal-row__feedback-speakers"><i class="modal-row__feedback-ico" >
                              <svg>
                                <use xlink:href="img/sprites/svg/symbol/sprite.svg#pos-feedback-white"></use>
                              </svg></i><a class="modal-row__feedback-choise" >Вибрати</a><i class="modal-row__feedback-direction change-direction">
                              <svg>
                                <use xlink:href="img/sprites/svg/symbol/sprite.svg#arrow-white"></use>
                              </svg></i>
                            <p class="modal-row__feedback-to">Thompson Equestrian Partners</p>
                          </div>
                          <div class="modal-row__feedback-date">
                            <input type="text">
                          </div>
                          <div class="modal-row__feedback-text">
                            <textarea name="" rows="3">${textValue}</textarea>
                          </div>
                          <div class="modal-row__feedback-controls">
                            <div class="modal-row__feedback-controls_left">
                              <button class="modal-row__feedback-cancel feedback-btn">Відмінити</button>
                              <button class="modal-row__feedback-save feedback-btn">Зберегти</button>
                            </div>
                            <div class="modal-row__feedback-controls_right">
                              <button class="modal-row__feedback-delete delete-btn">Видалити</button>
                            </div>
                          </div>
                        </form>`

            row.insertAdjacentHTML('afterend', template)
            row.remove()
        })
    })
}


export default feedbackEdit