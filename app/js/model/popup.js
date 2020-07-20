class PopupMD {
    constructor(element, data = {}) {
        //модальное окно
        this.modal = '<div class="modal_short">\n' +
            '    <svg>\n' +
            '        <polygon points="0 10 10 0 10 20"></polygon>\n' +
            '    </svg>\n' +
            '</div>';

        //--------------------------------------------------------setting popup (поля модального окна)

        //контейнер для содержимого (контент )
        this.contents = '';
        //позиция указателя. Возможные варианты: left, right, center.
        this.pointer_position = 'center';
        //размер отступа пипки от края. По умолчанию 0 //center
        this.size_pointer_position = 0;
        //размер отступа модального окна. По умолчанию 0
        this.size_position = 0;
        //сторона указателя. Возможные варианты: left, right, top, bottom.
        this.modal_side = 'right';
        //закрывать ли модальное окно, после вызова другого. Возможные варианты: true, false.
        this.only_one = true;
        //дополнительные елементы при клике на которые не закрывать модальное окно. Передавать нужно название класса
        this.element_off_close = [];
        //отображение попап окна. Возможные варианты: true, false.
        this.view = false;
        //елемент по клику на который будет вылазить модальное окно
        this.element = undefined;
        //стили елемента
        this.style = '';
        //отступ от позиционируемого елемента
        this.margin_element = 0;
        //клонировать содержимое для модального окна или вырезать. Возможные варианты: true, false.
        this.clone_contents = true;
        //уникальный атрибут елемента, при клике на который будет закрываться модальное окно. Не сработает без контента.
        this.close_button = '.modal_close';
        //закрывать ли модальное окно при кликах вне его границы. Возможные варианты: true, false.
        this.close_auto = true;

        //-------------------------------------------------------начало работы

        let indexOldElement = PopupMD.checkIndex(element);
        if (indexOldElement === -1) {
            //Метод преобразования строки в объект DOM
            let DOMElement = document.createElement('div');
            DOMElement.innerHTML = this.modal;
            this.modal = DOMElement.children[0];

            // console.log(DOMElement.innerHTML)

            //вызов базовой настройки
            this.firstSetting(data);

            //вызов метода проверки на то, стоит ли закрывать предыдущее модальное окно. Объязательный вызов перед методом setListObject()
            PopupMD.checkPreviousModal();

            //вызов отображение модального окна
            if (this.view) {
                this.popupView(element);
            }

            //вызов метода который прицепит событие закрытия модального окна на кнопку
            this.closeButton(element);

            //вызов добавления в список только что созданых объектов
            this.setListObject(element);

            //вызов автозакрытия модального окна, при мисскликах или же спецом вне окна
            if (this.close_auto) {
                this.addEventDocument(element);
            }

        } else {
            //console.log('This object isset ' + indexOldElement);
            //console.log(PopupMD.list_object);
            PopupMD.closeModal(indexOldElement);
        }
    }

    //Базовая настройка
    firstSetting(data) {
        if (data['pointerPosition'] !== undefined) {
            if (['left', 'right', 'center'].indexOf(data['pointerPosition']) !== -1) {
                this.pointer_position = data['pointerPosition'];
            }
        }
        if (data['sizePointerPosition'] !== undefined) {
            this.size_pointer_position = data['sizePointerPosition'];
        }
        if (data['modalSide'] !== undefined) {
            if (['left', 'right', 'top', 'bottom'].indexOf(data['modalSide']) !== -1) {
                this.modal_side = data['modalSide'];
            }
        }
        if (data['onlyOne'] !== undefined) {
            if (typeof (data['onlyOne']) === 'boolean') {
                this.only_one = data['onlyOne'];
            }
        }
        if (data['elementOffClose'] !== undefined) {
            if (typeof (data['elementOffClose']) === 'object') {
                this.element_off_close = data['elementOffClose'];
            }
        }

        if (data['view'] !== undefined) {
            if (typeof (data['view']) === 'boolean') {
                this.view = data['view'];
            }
        }
        if (data['contents'] !== undefined) {
            this.contents = data['contents'];
        }
        if (data['cloneContents'] !== undefined) {
            if (typeof (data['cloneContents']) === 'boolean') {
                this.clone_contents = data['cloneContents'];
            }
        }
        if (data['style'] !== undefined) {
            if (typeof (data['style']) === 'object') {
                this.style = data['style'];
            }
        }
        if (data['marginElement'] !== undefined) {
            this.margin_element = data['marginElement'];
        }
        if (data['sizePosition'] !== undefined) {
            this.size_position = data['sizePosition'];
        }
        if (data['closeButton'] !== undefined) {
            this.close_button = data['closeButton'];
        }
        if (data['closeAuto'] !== undefined) {
            if (typeof (data['closeAuto']) === 'boolean') {
                this.close_auto = data['closeAuto'];
            }
        }
    }

    //Отображение модального окна
    popupView(element) {
        this.element = document.querySelector(element);
        let parent = this.element.parentElement; //так как мы передали елемент на который нам нужно кликать, мы должны рядом с ним впихнуть модальное окно.
        parent.style.position = 'relative';
        parent.append(this.modal);
        //this.element = document.querySelector(element); //определяю елемент на который нужно ориентироваться, делаю это второй раз, потому что добавление через innerHTML ломает указатель
        this.modal = parent.children[parent.children.length - 1];
        if (this.modal.style.display === 'none') {
            this.modal.style.display = 'block';
        }

        //вызываем функцию добавления содержимого в модальное окно
        this.cloneContents();

        //присваиваем стили
        if (this.style !== '') {
            this.setStyleModal();
        }

        //позиция модального окна
        this.savePositionModal();
    }

    //функция вырезания или клонирования содержимого (контента) в модальное окно
    cloneContents() {
        if (this.contents !== '') {
            let content = '';
            let div_content = document.querySelector(this.contents);
            if (div_content !== null) {
                if (this.clone_contents) {
                    content = div_content.cloneNode(true);
                } else {
                    content = div_content;
                }
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                }
                this.modal.append(content);
            }
        }
    }

    //Вычисляем положение модального окна и соответствующей ему пипки
    pointerSide() {
        let top, left, svgRotate, svgLeft, svgTop, svgTranslateX, svgTranslateY;
        switch (this.modal_side) {
            case 'top':
                this.pointerPosition(this.modal.offsetWidth);
                top = (this.element.offsetTop - this.modal.offsetHeight - 8) - this.margin_element;
                left = (this.element.offsetLeft - (this.modal.offsetWidth - this.element.offsetWidth) / 2) + this.size_pointer_position;
                svgRotate = 270;
                svgLeft = this.size_pointer_position;
                svgTop = this.modal.offsetHeight;
                svgTranslateX = 50;
                svgTranslateY = 40;
                break;
            case 'right':
                console.log(this.modal.offsetHeight)
                this.pointerPosition(this.modal.offsetHeight);
                top = (this.element.offsetTop + this.element.offsetHeight / 2 - this.modal.offsetHeight / 2) + this.size_pointer_position;
                // top = -this.modal.offsetHeight / 2;
                left = (this.element.offsetLeft + this.element.offsetWidth + 19) + this.margin_element;
                svgRotate = 0;
                svgLeft = 0;
                svgTop = this.size_pointer_position;
                svgTranslateX = 70;
                svgTranslateY = 50;
                break;
            case 'bottom':
                this.pointerPosition(this.modal.offsetWidth);
                top = (this.element.offsetTop + this.element.offsetHeight + 8) + this.margin_element;
                left = (this.element.offsetLeft - (this.modal.offsetWidth - this.element.offsetWidth) / 2) + this.size_position; //+ this.size_pointer_position
                svgRotate = 90;
                svgLeft = this.size_pointer_position;
                svgTop = 0;
                svgTranslateX = 50;
                svgTranslateY = 60;
                break;
            case 'left':
                this.pointerPosition(this.modal.offsetHeight);
                top = (this.element.offsetTop + this.element.offsetHeight / 2 - this.modal.offsetHeight / 2) + this.size_pointer_position;
                left = (this.element.offsetLeft - this.modal.offsetWidth - 8) - this.margin_element;
                svgRotate = 180;
                svgLeft = this.modal.offsetWidth;
                svgTop = this.size_pointer_position;
                svgTranslateX = 30;
                svgTranslateY = 50;
                break;
        }
        return {
            'top': top,
            'left': left,
            'svgRotate': svgRotate,
            'svgLeft': svgLeft,
            'svgTop': svgTop,
            'svgTranslateX': svgTranslateX,
            'svgTranslateY': svgTranslateY,
        }
    }

    //сохраняем позицию модального окна
    savePositionModal() {
        let pointer_side = this.pointerSide();
        this.modal.style.top = pointer_side['top'] + 'px';
        this.modal.style.left = pointer_side['left'] + 'px';
        this.modal.children[0].style.transform = 'translate(-' + pointer_side['svgTranslateX'] + '%,-' + pointer_side['svgTranslateY'] + '%) rotate(' + pointer_side['svgRotate'] + 'deg)';
        this.modal.children[0].style.top = pointer_side['svgTop'] + 'px';
        this.modal.children[0].style.left = pointer_side['svgLeft'] + 'px';
    }

    //функция которая автоматически разсчитывает позицию пипки модального окна, в случае если его позиция не задана пользователем.
    pointerPosition(size) {
        if (['left', 'right'].indexOf(this.pointer_position) !== -1) {
            if (this.size_pointer_position === 0) { // проверяем задавал ли позицию пользователь
                this.size_pointer_position = (size * 0.20) > 10 ? (size / 4) : 0; // это если размер окажется меньше 10px, то проигнорировать отступ
            }
            if (this.pointer_position === 'left') { // реверс
                this.size_pointer_position = -this.size_pointer_position;
            }
        }
        else{
            this.size_pointer_position = (size / 2) - this.size_pointer_position;
        }
    }

    //присваиваем стили модальному окну
    setStyleModal() {
        if (this.style['color'] !== undefined) {
            this.modal.style.color = this.style['color'];
        }
        if (this.style['backgroundColor'] !== undefined) {
            this.modal.style.backgroundColor = this.style['backgroundColor'];
            this.modal.children[0].children[0].style.stroke = this.style['backgroundColor'];
            this.modal.children[0].children[0].style.fill = this.style['backgroundColor'];
        }
        if (this.style['borderRadius'] !== undefined) {
            this.modal.style.borderRadius = this.style['borderRadius'];
        }
        if (this.style['padding'] !== undefined) {
            this.modal.style.padding = this.style['padding'];
        }
    }

    //автозакрытие модального окна, при мисскликах или же спецом вне окна addEventDocument(),removeEventDocument(),checkEventClick(,)
    //добавления события клика к документу
    addEventDocument(element) {
        let main = this;
        document.querySelector(element).onmousedown = function (e) {
            // console.log('This is I');
            e.stopPropagation();
        };

        document.onmousedown = function (e) {
            main.checkEventClick(e, element);
        };
    }

    //удаление события клика к документу
    static removeEventDocument() {
        document.onmousedown = null;
    }

    //проверка клика. Если клик вне модального окна, тогда вызываем метод закрытия модального окна closeModal().
    checkEventClick(event, target) {
        let index = PopupMD.checkIndex(target);
        if (index !== -1) {
            let data_number = PopupMD.list_object.data_number[index];
            let element = event.target;
            while (true) {
                if(this.element_off_close.length) {
                    let temp = false;
                    for(let i = 0; i < this.element_off_close.length; i++){
                        if(element.classList.contains(this.element_off_close[i])){
                            temp = true;
                            break;
                        }
                    }
                    if(temp){
                        break;
                    }
                }
                if (element.getAttribute('data-number') === data_number.toString()) {
                    break;
                }
                if (element.nodeName !== 'HTML') {
                    element = element.parentElement;
                } else {
                    PopupMD.closeModal(index);
                    break;
                }
            }

        }
    }

    //закрытие модального окна
    static closeModal(index) {
        let target = PopupMD.list_object.data_number[index];
        let modal = document.querySelector('[data-number="' + target + '"]');

        //вызов проверки на дочерние модальные окна. Если модальные окна будут обнаружены, мы создадим рекурсию.
        PopupMD.checkChildrenModal(target);

        if (!PopupMD.list_object.clone_contents[index]) {
            let body = document.body;
            modal.children[1].style.display = 'none';
            for (let i = body.children.length - 1; i >= 0; i--) {
                if (body.children[i].nodeName !== 'SCRIPT') {
                    body.children[i].after(modal.children[1]);
                    break;
                }
                if (i === 0) {
                    body.append(modal.children[1]);
                }
            }
        }

        //проверяем не висит ли событие на документе (оно нужно для того что бы закрывать окна вне их клика)
        if (PopupMD.list_object.close_auto[index]) {
            if (document.onmousedown !== null) {
                PopupMD.removeEventDocument();
            }
        }

        PopupMD.list_object.element.splice(index, 1);
        PopupMD.list_object.data_number.splice(index, 1);
        PopupMD.list_object.only_one.splice(index, 1);
        PopupMD.list_object.clone_contents.splice(index, 1);
        PopupMD.list_object.close_auto.splice(index, 1);
        PopupMD.list_object.this.splice(index, 1);
        modal.remove();
    }

    //проверяем есть ли у модального окна, дочерние модальные окна, это избавит нас от потери данных.
    static checkChildrenModal(target) {
        let modalChildren = document.querySelector('[data-number="' + target + '"]' + ' ' + '[data-modal="PopupMD"]');
        if (modalChildren !== null) {
            let number = modalChildren.getAttribute('data-number');
            if (number !== null) {
                PopupMD.closeModal(PopupMD.checkIndexOnNumber(number));
            }
        }
    }

    //закрытие модального окна по клике на кнопку, для более точного определения елемента, используется так же идентификатор контента, если контента не будет, работать также не будет.
    closeButton(element) {
        let button = document.querySelector(this.contents + ' ' + this.close_button);
        if (button !== null) {
            if (!button.hasAttribute('onclick')) {
                button.setAttribute('onclick', 'PopupMD.closeModal(PopupMD.checkIndex(\'' + element + '\'))');
            }
        }
    }

    //проверка на то, нужно ли закрывать ранее созданное модальное окно (only_one)
    static checkPreviousModal() {
        let index = PopupMD.list_object.only_one.length - 1;
        for (let i = index; i >= 0; i--) {
            //console.log(PopupMD.list_object.only_one[i] + i);
            if (PopupMD.list_object.only_one[i]) {
                PopupMD.closeModal(i);
            } else {
                //break; //тут возможен баг, когда у родительського модального окна будет параметр only_one=true, а у дочерних наоборот, тогда и родительський елемент останется висеть.
            }
        }
    }

    //определения индекса модального окна в масиве, по названию атрибута, для дальнейшей работы с ним
    static checkIndex(element) {
        //console.log(element);
        return PopupMD.list_object.element.indexOf(element);
    }

    //определения индекса модального окна в масиве, по номеру модального окна, для дальнейшей работы с ним
    static checkIndexOnNumber(number) {
        return PopupMD.list_object.data_number.indexOf(parseInt(number));
    }

    //добавления в список только что созданых объектов
    setListObject(element) {
        let number = 0;
        if (PopupMD.list_object.data_number.length !== 0) {
            number = PopupMD.list_object.data_number[PopupMD.list_object.data_number.length - 1];
        }
        this.modal.setAttribute('data-number', number + 1);
        this.modal.setAttribute('data-modal', 'PopupMD');

        PopupMD.list_object.element.push(element);
        PopupMD.list_object.data_number.push(number + 1);
        PopupMD.list_object.only_one.push(this.only_one);
        PopupMD.list_object.clone_contents.push(this.clone_contents);
        PopupMD.list_object.close_auto.push(this.close_auto);
        PopupMD.list_object.this.push(this);
        //console.log('new object');
    }

    //Уничтожение класса. Вызывается после добавление модального окна.
    destroy() {
        delete this;
    }
}

PopupMD.list_object = {
    "element": [], //атрибут который затриггерил объект
    "data_number": [], //атрибут по которому можно идентифицировать модально окно
    "only_one": [], //значение что обозначает состояние модального окна, после вызова второго. Закрывать или нет.
    "clone_contents": [], //клонирован ли контент, если нет, то нужно его вернуть по закрытию.
    "close_auto": [], //автозакрытие модального окна
    "this": [], //пока не знаю, пригодится ли этот параметр
};

// Я закончил на том, что обнаружил баг с настройкой "only_one", не правильно закрывать только последне открытое модальное окно, нужно закрывать сразу все, так как могут быть вложения.
// Короче нужно переделать функцию checkPreviousModal()


// export default PopupMD