import {el, setAttr, svg} from '../../../../libs/libs'
import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'


  export default class DateAndTerms {
  	constructor(){
      this.data = {}
      this.el = el('form',
      el('fieldset',
        el('p', 'Дата начала работы'),
        el('div.input-group',
          this.beforeDate = el('input#before-date-chbx', 
            {
              type: 'text'
            }),
          el('label', {
            for: 'before-date-chbx',
            innerText: 'до'
          })),
        el('div.input-group',
          this.afterDate = el('input#after-date-chbx', 
            {
              type: 'text'
            }),
          el('label', {
            for: 'after-date-chbx',
            innerText: 'после'
          })),),
      el('fieldset',
        el('p', 'Срок работы'),
        el('div.group',
          el('div.input-group',
            this.fromDate = el('input#from-date-chbx', 
              {
              type: 'text'
            }),
            el('label', {
              for: 'from-date-chbx',
              innerText: 'от'
            })),
          el('div.input-group',
            this.toDate = el('input#to-date-chbx',{
              type: 'text'
            }),
            el('label', {
              for: 'to-date-chbx',
              innerText: 'до'
            })),
          el('div.input-group',
            el('p','мес'))
          ))

        )

      this.data.beforeDate = this.beforeDate.value = JSON.parse(sessionStorage.getItem('jobStartFilter')) && JSON.parse(sessionStorage.getItem('jobStartFilter')).split('-')[0] || ''
      this.data.afterDate = this.afterDate.value = JSON.parse(sessionStorage.getItem('jobStartFilter')) && JSON.parse(sessionStorage.getItem('jobStartFilter')).split('-')[1] || ''
      this.data.fromDate = this.fromDate.value = JSON.parse(sessionStorage.getItem('jobPeriodFilter')) && JSON.parse(sessionStorage.getItem('jobPeriodFilter')).split('-')[0] || ''
      this.data.toDate = this.toDate.value = JSON.parse(sessionStorage.getItem('jobPeriodFilter')) && JSON.parse(sessionStorage.getItem('jobPeriodFilter')).split('-')[1] || ''

      this.beforeDate.addEventListener('change', (e)=> {
        const val = e.target.value.trim()
        this.data.beforeDate = val || this.data.beforeDate
        sessionStorage.setItem('jobStartFilter', JSON.stringify(`${this.data.beforeDate || ''}-${this.data.afterDate || ''}`))
        getVacancyList({job_start: `${this.data.beforeDate || ''}-${this.data.afterDate || ''}`})
      })
      this.afterDate.addEventListener('change', (e)=> {
        const val = e.target.value.trim()
        this.data.afterDate = val || this.data.afterDate
        sessionStorage.setItem('jobStartFilter', JSON.stringify(`${this.data.beforeDate || ''}-${this.data.afterDate || ''}`))
        getVacancyList({job_start: `${this.data.beforeDate || ''}-${this.data.afterDate || ''}`})
      })
      this.fromDate.addEventListener('change', (e)=> {
        const val = e.target.value.trim()
        this.data.fromDate = val ||  this.data.fromDate
        sessionStorage.setItem('jobPeriodFilter', JSON.stringify(`${this.data.fromDate || ''}-${this.data.toDate || ''}`))
        getVacancyList({job_period: `${this.data.fromDate || '' }-${this.data.toDate || ''}`})
      })
      this.toDate.addEventListener('change', (e)=> {
        const val = e.target.value.trim()
        this.data.toDate = val || this.data.toDate
        sessionStorage.setItem('jobPeriodFilter', JSON.stringify(`${this.data.fromDate || ''}-${this.data.toDate || ''}`))
        getVacancyList({job_period: `${this.data.fromDate || '' }-${this.data.toDate || ''}`})
      })
  	}


  	update(data, index, items) {
  		
  	}

  }