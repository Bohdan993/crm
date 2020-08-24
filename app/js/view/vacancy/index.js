let rows = document.querySelectorAll('.vacancy-rows .row')

let statusLeft = document.querySelectorAll('.cell-status__left') 

let sliders = document.querySelectorAll('.cell-status__slider')

let findEmployer = document.querySelector('#employer-type-popup .input-group')
let findEmployer2 = document.querySelector('#employer-type-popup2 .input-group')

let chooseEmployer =  document.querySelector('.main-info_left .choose-employer')
let chooseEmployer2 = document.querySelector('.main-info_right .choose-employer')

let chooseProductType = document.querySelector('.main-info_left .choose-product-type')
let chooseProductType2 = document.querySelector('.main-info_right .employer-name')

let chooseFullInfo = document.querySelector('.main-info_left .full-info')

let mainInfoChooseBlock = document.querySelector('.main-info_left .main-info__choose-block')

let switcher  = document.querySelector('.switcher')
let clientsRow = document.querySelector('.row.clients')

// let mainInfoPrice = document.querySelector('.main-info__price span')
export {

	rows,
	statusLeft,
	sliders,
	findEmployer,
	chooseProductType,
	chooseEmployer,
	chooseFullInfo,
	mainInfoChooseBlock,
	switcher,
	findEmployer2,
	chooseEmployer2,
	chooseProductType2,
	clientsRow
	// mainInfoPrice
	
}