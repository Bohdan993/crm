const vacancyListDeleteEvent = new CustomEvent("vacancylistdeleteevent", {
    detail: {name: "Delete"}
});

export default vacancyListDeleteEvent		//to ../fetchingData/getVacancyList.js