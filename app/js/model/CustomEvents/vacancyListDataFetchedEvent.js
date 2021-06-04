const vacancyListDataFetchedEvent = new CustomEvent("vacancylistdatafetchedevent", {
            detail: {name: "Fetched"}
        });

export default vacancyListDataFetchedEvent		//to ../fetchingData/getVacancyList.js