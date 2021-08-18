const deleteTask = (body) => {
    body.addEventListener('click', function (e) {
        let btn = e.target
        let mainParent = btn.parentNode.parentNode
        let parent = btn.parentNode
        if (btn.classList.contains('delete-task-item')) {
            mainParent.removeChild(parent)
        }
    })
}

export default deleteTask