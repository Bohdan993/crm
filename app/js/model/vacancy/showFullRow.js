import {isChildOf} from '../helper'

const showFullRow = (rows) => {
	slideToggle(rows)
	
	function slideToggle(linkToggle) {
	for(let i = 0; i < linkToggle.length; i++){

	  linkToggle[i].addEventListener('click', function(event){

	  		let parent  = this.querySelector('.table-full')
	  		
	  		if(event.target.classList.contains('no-open')) {
					return
				}

				if(isChildOf(event.target, parent)) {
					return
				}

				// console.log(event.target)


		    var container = this.querySelector('.table-full');

		    if (container && !container.classList.contains('active')) {
		      
		      container.classList.add('active');
		      container.style.height = 'auto';

		      var height = container.clientHeight + 'px';

		      container.style.height = '0px';

		      setTimeout(function () {
		        container.style.height = height;
		      }, 0);
		      
		    } else {
		      
		      container.style.height = '0px';

		      this.addEventListener('transitionend', function () {
		        container.classList.remove('active');
		      }, {
		        once: true
		      });
		      
		    }
	    
	  });

	}
}
}

export default showFullRow