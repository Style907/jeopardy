// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/* getting a random number for a category id and requesting category from api */

async function getCategoryIds() {

     await getCategory(Math.floor(Math.random() * 1000 + 1))
  
    }

/* ensuring the retrieved category has att least 5 questions and adding info to categories array, once categories array 
is full fill table*/    

async function getCategory(catId) {
    let results = await axios.get(`http://jservice.io/api/category?id=${catId}`)
    if(results.data.clues.length >= 5){categories.push({title: `${results.data.title}`,
    clues: [
        {question: `${results.data.clues[0].question}`, answer: `${results.data.clues[0].answer}`, showing: null},
        {question: `${results.data.clues[1].question}`, answer: `${results.data.clues[1].answer}`, showing: null},
        {question: `${results.data.clues[2].question}`, answer: `${results.data.clues[2].answer}`, showing: null},
        {question: `${results.data.clues[3].question}`, answer: `${results.data.clues[3].answer}`, showing: null},
        {question: `${results.data.clues[4].question}`, answer: `${results.data.clues[4].answer}`, showing: null},
    ]

    })}
    else getCategoryIds()
if(categories.length <=5)getCategoryIds()
else fillTable()

    
}

/** building table for board */

 async function fillTable() {
    const $board = $('#jeopardy')
    const $thead = $('thead')
    const $tbody = $('tbody')
    const $categories = $(`
    <tr>
    <td>${categories[0].title}</td>,
    <td>${categories[1].title}</td>,
    <td>${categories[2].title}</td>,
    <td>${categories[3].title}</td>,
    <td>${categories[4].title}</td>,
    <td>${categories[5].title}</td>
    
    </tr>
    
    `)
    const $questions = $(`
    <tr>
    <td id= '0-0'>?</td>
    <td id= '1-0'>?</td>
    <td id= '2-0'>?</td>
    <td id= '3-0'>?</td>
    <td id= '4-0'>?</td>
    <td id= '5-0'>?</td>
    
    </tr>
    <tr>
    <td id= '0-1'>?</td>
    <td id= '1-1'>?</td>
    <td id= '2-1'>?</td>
    <td id= '3-1'>?</td>
    <td id= '4-1'>?</td>
    <td id= '5-1'>?</td>
    
    </tr>
    <tr>
    <td id= '0-2'>?</td>
    <td id= '1-2'>?</td>
    <td id= '2-2'>?</td>
    <td id= '3-2'>?</td>
    <td id= '4-2'>?</td>
    <td id= '5-2'>?</td>
    
    </tr>
    <tr>
    <td id= '0-3'>?</td>
    <td id= '1-3'>?</td>
    <td id= '2-3'>?</td>
    <td id= '3-3'>?</td>
    <td id= '4-3'>?</td>
    <td id= '5-3'>?</td>
    
    </tr>
    <tr>
    <td id= '0-4'>?</td>
    <td id= '1-4'>?</td>
    <td id= '2-4'>?</td>
    <td id= '3-4'>?</td>
    <td id= '4-4'>?</td>
    <td id= '5-4'>?</td>
    
    </tr>`)
    $thead.empty()
    $tbody.empty()
    $thead.append($categories)
    $tbody.append($questions)
}

/** click handler to update table with the question and then the answer */

 $('tbody').on('click', function handleClick(evt) {
    let cat = evt.target.id[0]
    let text = evt.target.id[2]

    if(categories[cat].clues[text].showing === null){
    evt.target.innerText= `${categories[cat].clues[text].question}`;
    categories[cat].clues[text].showing = 'question'}

    else if(categories[cat].clues[text].showing === 'question'){
        evt.target.innerText= `${categories[cat].clues[text].answer}`;
        categories[cat].clues[text].showing = 'answer'
    }
    else return
    

})


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $('#spin-container').hide()
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
 $('#start').text('Restart')
hideLoadingView(),
 await getCategoryIds()
//await fillTable()
}

/** On click of start / restart button, set up game. */

// TODO
$('#start').on('click',async function (evt) {
    evt.preventDefault();
    categories = []
    await setupAndStart()})
/** On page load, add event handler for clicking clues */
 
// TODO