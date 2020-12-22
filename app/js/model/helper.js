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



// function makeCaching(f) {
//   var cache = {};

//   return function(x) {
//     if (!(x in cache)) {
//       cache[x] = f.call(this, x);
//     }
//     return cache[x];
//   };

// }


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



let uniq = function(xs, id) {
    let seen = {};
    return xs.filter(function(x) {
        let key = JSON.stringify(x[id]);
        return !(key in seen) && (seen[key] = x[id]);
    });
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


const sleep = (ms) => {
  return new Promise(res => {
    setTimeout(function(){
      res('ok')
    }, ms)
  })
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
  dateInputChange
}