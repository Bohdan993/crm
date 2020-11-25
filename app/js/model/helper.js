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



function makeCaching(f) {
  var cache = {};

  return function(x) {
    if (!(x in cache)) {
      cache[x] = f.call(this, x);
    }
    return cache[x];
  };

}


  let save = function ({
    id, 
    value, 
    field, 
    target = 'main', 
    str = 'vacancies',
    id_target = ''
  }) {
      saveFieldsData({
        str,
        id,
        value, 
        field, 
        target, 
        id_target
      })
    }






export {
	throttle,
	debounce,
	isChildOf,
	come,
	makeCaching,
  save
}