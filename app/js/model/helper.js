import saveFieldsData from './fetchingData/saveFieldsData'


function throttle(f, ms){
	
	let isThrottled = false,
	t, a

	function d(){
		
		if (isThrottled) {
			t = this;
			a = arguments;
			return
		}

		f.apply(this, arguments)

		isThrottled = true;

		setTimeout(function(){
			isThrottled = false;
			if(a) {
				d.apply(t, a);
				t = a = null;
			}
		}, ms)
	}

	return d
}



function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}



  function isChildOf(child, parent) {
      var node = child.parentNode;
      while (node != null) {
          if (node == parent) {
              return true;
          }
          node = node.parentNode;
      }
      return false;
  }





function come(elem) {
  let docViewTop = window.scrollTop,
    docViewBottom = docViewTop + window.innerHeight,
    elemTop = elem.offsetTop,
    elemBottom = elemTop + elem.innerHeight;

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}



  let save = function ({
    id, 
    value, 
    field, 
    target = 'main', 
    str = 'vacancies',
    id_target = ''
  } = {}) {
      return saveFieldsData({
        str,
        id,
        value, 
        field, 
        target, 
        id_target
      })
    }


function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear();
  // if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}



let uniq = function(xs, id, arr) {
    let seen = {};

    let res = xs.filter(function(x) {
        let key = JSON.stringify(x[id]);
        // console.log(seen)
        return !(key in seen) && (seen[key] = x[id]);
    });

    return res
  }




class EmptyError extends Error {
  constructor(message) {
    super(message)
    this.name = 'EmptyError'
  }
}



function addMouseUpTrigger(e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    return
  }

}


function closeModal(id, e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    MicroModal.close(id)
  }
}


function close (id) {
  MicroModal.close(id)
}


// function onKeyPressClose (e) {
//  if(e.keyCode === 27) {
//     console.log(e)
//    MicroModal.close()
//  }
// }


const sleep = (ms) => {
  return new Promise(res => {
    setTimeout(function(){
      res('ok')
    }, ms)
  })
}

function getAllUrlParams(url) {

  // извлекаем строку из URL или объекта window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
 
  // объект для хранения параметров
  var obj = {};
 
  // если есть строка запроса
  if (queryString) {
 
    // данные после знака # будут опущены
    queryString = queryString.split('#')[0];
 
    // разделяем параметры
    var arr = queryString.split('&');
 
    for (var i=0; i<arr.length; i++) {
      // разделяем параметр на ключ => значение
      var a = arr[i].split('=');
 
      // обработка данных вида: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });
      // передача значения параметра ('true' если значение не задано)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];
      // преобразование регистра
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();
      // если ключ параметра уже задан
      if (obj[paramName]) {
        // преобразуем текущее значение в массив
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // если не задан индекс...
        if (typeof paramNum === 'undefined') {
          // помещаем значение в конец массива
          obj[paramName].push(paramValue);
        }
        // если индекс задан...
        else {
          // размещаем элемент по заданному индексу
          obj[paramName][paramNum] = paramValue;
        }
      }
      // если параметр не задан, делаем это вручную
      else {
        obj[paramName] = paramValue;
      }
    }
  }
 
  return obj;
}


function dateInputChange(element) {
    let value = element.value;
    let reg_g = value.match(/(\b\d{1,2})\W+(\d{1,2})\W+(\d{1,4}\b)/g)
    if (reg_g != null) {
        for (let i = 0; i < reg_g.length; i++) {
            let reg = reg_g[i].match(/(\b\d{1,2})\W+(\d{1,2})\W+(\d{1,4}\b)/)
            let day = reg[1] < 10 ? '0' + +reg[1].toString() : reg[1]
            let month = reg[2] < 10 ? '0' + +reg[2].toString() : reg[2]
            let year = reg[3] < 10 && reg[3] >= 0 ? '200' + reg[3].toString() :
                reg[3] <= 30 && reg[3] >= 10 ? '20' + reg[3].toString() :
                    reg[3] > 30 && reg[3] <= 99 ? '19' + reg[3].toString() :
                        reg[3] >= 100 && reg[3] <= 999 ? '2' + reg[3].toString() :
                            reg[3].toString()
            if (+day <= 31 && month <= 12 && year <= 9999) {
                value = day + '.' + month + '.' + year
                if(i === 0) {
                    element.value = element.value.replace(/^(\b\d{1,2})\W+(\d{1,2})\W+(\d{1,4}\b)/, value)
                }
                else {
                    element.value = element.value.replace(/(\b\d{1,2})\W+(\d{1,2})\W+(\d{1,4}\b)$/, value)
                }
            }
        }
    }
}





export {
	throttle,
	debounce,
	isChildOf,
	come,
	// makeCaching,
  sleep,
  save,
  formatDate,
  uniq,
  EmptyError,
  addMouseUpTrigger,
  closeModal,
  dateInputChange,
  getAllUrlParams,
  close,
  // onKeyPressClose
}