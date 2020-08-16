import {Autocomplete} from '../../libs/libs'

const autocompleteInput = (el, prev, next) => {
	// console.log(el)
	const wikiUrl = 'https://en.wikipedia.org'
	const params = 'action=query&list=search&format=json&origin=*'
	const data = [
		'Князев Артём Тимофеевич',
		'Ковалев Матвей Максимович',
		'Козлов Владимир Яковлевич',
		'Филиппов Григорий Никитич',
		'Синицына Виктория Ярославовна',
		'Белов Егор Захарович',
		'Алексеева Василиса Данииловна',
		'Малышев Лев Тихонович',
		'Попова Александра Мироновна'
	]
	let autocomplete = new Autocomplete(el, {
  
  // Search function can return a promise
  // which resolves with an array of
  // results. In this case we're using
  // the Wikipedia search API.
  search: async input => {
    const url = `${wikiUrl}/w/api.php?${
      params
    }&srsearch=${encodeURI(input)}`

   try {

				 if (input.length < 3) {
		        return []
		     }

		     let result  = await fetch(url)
		     let json = await result.json()
		     return json.query.search

    }

    catch(err) {
    		console.error(err)
    }

  },
  
  // Control the rendering of result items.
  // Let's show the title and snippet
  // from the Wikipedia results
  renderResult: (result, props) => {
  	// console.log(props)
  	return `
		    <li ${props}>
		      <div class="wiki-title">
		        ${result.title}
		      </div>
		      <div class="wiki-snippet">
		        ${result.snippet}
		      </div>
		    </li>
		  `
  },
  
  // Wikipedia returns a format like this:
  //
  // {
  //   pageid: 12345,
  //   title: 'Article title',
  //   ...
  // }
  // 
  // We want to display the title
  getResultValue: result => result.title,

  // Open the selected article in
  // a new window
  onSubmit: result => {
  	console.log(prev)
  	prev.style.display = 'none'
  	next.style.display = 'flex'
  }
})
}


export default autocompleteInput