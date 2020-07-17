function throttle(f, ms){
	
	let isThrottled = false,
	t, a

	function d(){
		
		if (isThrottled) {
			t = this;
			a = arguments;
			return
		}

		isThrottled = true;

		setTimeout(function(){
			isThrottled = false;
			if(a) {
				f.apply(t, a)
				d.apply(t, a);
				t = a = null;
			}
		}, ms)
	}

	return d
}


export {
	throttle
}