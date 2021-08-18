const addNewTask = (btn) => {
    let html = `<div class="add-task-item"><i class="ico">
              <svg>
                <use xlink:href="img/sprites/svg/symbol/sprite.svg#attention"></use>
              </svg></i>
            <textarea class="sidebar__task-input" type="text" rows="1" data-elastic="true"></textarea><span class="delete-task-item"></span>
          </div>`
    btn.addEventListener('click', function () {
        this.closest('.add-task-group').querySelector('.tasks-layer').insertAdjacentHTML('beforeend', html)
    })
}

export default addNewTask