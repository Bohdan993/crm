const employerListDataFetchedEvent = new CustomEvent("employerlistdatafetchedevent", {
    detail: {name: "Fetched"}
});

export default employerListDataFetchedEvent		//to ../fetchingData/getemployerList.js