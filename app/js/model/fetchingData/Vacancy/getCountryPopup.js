import fetch from '../fetchingDataClass'
import CountryPopup from '../../Components/CountryPopupComponent'
import {list, mount} from '../../../../libs/libs'

const countryPopup = document.querySelector('#country-popup-vacancy .flex-form')

// const popup = list("form", CountryPopup, 'id', 'vacancy')

const part1 = list("fieldset", CountryPopup, 'id', 'vacancy')
const part2 = list("fieldset", CountryPopup, 'id', 'vacancy')


if (countryPopup) {
    mount(countryPopup, part1)
    mount(countryPopup, part2)
}


const getCountryVacancyPopup = async () => {
    if (countryPopup) {
        try {
            const data = await fetch.getResourse('/vacancies/get_other/?s=3')
            let countries = data.data.country
            countries.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })


            if (sessionStorage.getItem('countryFilterVacancy')) {
                countries = countries.map(country => {
                    let checked = !!~JSON.parse(sessionStorage.getItem('countryFilterVacancy')).split(',').indexOf(country.id)
                    return {
                        id: country.id,
                        name: country.name,
                        icon: country.icon,
                        prefix: 'country-chbx-',
                        checked
                    }
                })
            } else {
                countries = countries.map(country => {
                    return {
                        id: country.id,
                        name: country.name,
                        icon: country.icon,
                        prefix: 'country-chbx-',
                    }
                })
            }


            const end = countries.length
            const middle = Math.ceil(end / 2)

            const cont1 = countries.slice(0, middle)
            const cont2 = countries.slice(middle, end)


            localStorage.setItem('countriesVacancy', JSON.stringify(countries))

            part1.update(cont1)
            part2.update(cont2)


        } catch (e) {
            console.error(e)
        }
    }

}


export default getCountryVacancyPopup // to ../index.js