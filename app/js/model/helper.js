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






export {
	throttle,
	debounce,
	isChildOf
}