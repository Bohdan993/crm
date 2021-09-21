import fetch from '../../fetchingDataClass'
import WorkModalMedia from '../../../Components/WorkModalMediaComponent'
import Loader from '../../../Components/LoaderComponent'
import {
    mount,
    place
} from '../../../../../libs/libs'

const state = {}
let globalMedia = []
let globalID = ''
const media = document.querySelector('.row.media')
const mediaVacancy = document.querySelector('.row.media-vacancy')


const loader = place(Loader)
const loader2 = place(Loader)

export const workModalMedia = new WorkModalMedia()
export const vacancyModalMedia = new WorkModalMedia()


if (media) {
    mount(media, workModalMedia)
    mount(media, loader)
}

if (mediaVacancy) {
    mount(mediaVacancy, vacancyModalMedia)
    mount(mediaVacancy, loader2)
}


const getWorkModalMedia = async ({
    id = '1',
    loading,
    w = 1000,
    deleating,
    adding,
    showing,
    showingLess
} = {}) => {
    if (media) {

        if (loading) {
            loader.update(true)
            workModalMedia.setHiddenClass().setEmptyLayer()
        }


        try {

            w = w !== 0 ? (workModalMedia.modalLayer.clientWidth - 30) || (workModalMedia.modalLayer.offsetWidth - 30) : 0



            const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=4&width_image=${w}`) //&p=1&t=6
            const otherPart = data.data.other

            if (globalID !== id) {
                globalMedia = [
                    ...otherPart.media
                ]
            } else {

                if (loading || showingLess || deleating || adding) {
                    globalMedia = [
                        ...otherPart.media
                    ]
                }

                if (showing) {
                    globalMedia = [
                        ...globalMedia,
                        ...otherPart.media
                    ]
                }

            }


            const media = {
                id: id,
                data: globalMedia,
                total: data.data.total !== undefined ? data.data.total.media : otherPart.media.length,
                loading,
                deleating,
                showingLess,
                adding,
                showing
            }


            workModalMedia.update(media)

            if (loading) {
                loader.update(false)
                workModalMedia.removeHiddenClass()
            }


            state.id = id
        } catch (e) {
            console.error(e)
        }
    }

    if (mediaVacancy) {
        if (loading) {
            loader2.update(true)
            vacancyModalMedia.setHiddenClass().setEmptyLayer()
        }


        try {

            w = w !== 0 ? (vacancyModalMedia.modalLayer.clientWidth - 30) || (vacancyModalMedia.modalLayer.offsetWidth - 30) : 0

            const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=4&width_image=${w}`) //&p=1&t=6
            const otherPart = data.data.other

            if (globalID !== id) {
                globalMedia = [
                    ...otherPart.media
                ]
            } else {

                if (loading || showingLess || deleating || adding) {
                    globalMedia = [
                        ...otherPart.media
                    ]
                }

                if (showing) {
                    globalMedia = [
                        ...globalMedia,
                        ...otherPart.media
                    ]
                }

            }


            const media = {
                id: id,
                data: globalMedia,
                total: data.data.total !== undefined ? data.data.total.media : otherPart.media.length,
                loading,
                deleating,
                showingLess,
                adding,
                showing
            }


            vacancyModalMedia.update(media)

            if (loading) {
                loader2.update(false)
                vacancyModalMedia.removeHiddenClass()
            }


            state.id = id
        } catch (e) {
            console.error(e)
        }
    }

    globalID = id
}





export default getWorkModalMedia //to ../../../Components/EmployersRow.js