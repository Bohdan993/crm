import {el, MicroModal} from '../../../../../libs/libs'
import archiveVacancy from '../../../fetchingData/Vacancy/VacancyModal/archiveVacancy'
import copyVacancy from '../../../fetchingData/Vacancy/VacancyModal/copyVacancy'
import getVacancyModalInfo from '../../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'

export default class ArchiveCopyVacancyComponent {
	constructor(type){
		this.type = type
		this.el = el('div.sidebar__filter-wrapper', 
			el('p', `${type === 'copy' ? 'Создать копию вакансии' : 'Архивировать вакансию'}`))


		this.el.addEventListener('click', e => {
			if(type === 'copy') {
				copyVacancy({
					vacancy: this.data
				})
				.then(res => {
					if(res  !== 'fail') {
						MicroModal.close('modal-3')
						setTimeout(()=>{
							getVacancyModalInfo(res).then(r => 	MicroModal.show('modal-3'))
						}, 1500)
						
						// console.log(res)
					}	else {
						return
					}
				})
			} else {
				archiveVacancy({
					vacancy: this.data
				})
				.then(res => {
					if(res === 'ok') {
						MicroModal.close('modal-3')
					} else {
						return
					}
				})
			}

		})
	}


	update(data, context){

		this.data = data
	}
}

