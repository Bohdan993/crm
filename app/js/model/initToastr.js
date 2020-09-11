import { toastr } from '../../libs/libs'



const initToastr = () => {
	toastr.options.progressBar = true
	toastr.options.preventDuplicates = true
	toastr.options.timeOut = 3000
}


export default initToastr