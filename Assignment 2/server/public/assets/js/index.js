const getAllBtn = document.getElementById('index_note_button')
async function getAll () {
  try {
    let result = await fetch('/notes/get')
    const response = await result.json()
    const code = response.status
    const msg = response.msg
    const data = response.data
    // console.log(code)
    // console.log(msg)
    // console.log(data)
    initNotes(data)
    // timeoutID = window.setTimeout(addEvent, 10000)
  } catch (err) {
    console.log('Request Failed', err)
  }

}
function clickHandler (event) {
  console.log(event)
  event.target.style.cssText = 'opacity: 0.4'
  getDetail(event.target.getAttribute('ObjectId'))
}
async function getDetail (id) {

  try {
    console.log('Request')
    window.location.assign('/notes/get/' + id)
    // window.open('http://127.0.0.1:3000/notes/get/' + id)
    // console.log("response")
    // let result = await fetch('http://127.0.0.1:3000/notes/get/' + id)
    // const response = await result.json()
    // console.log(response)
  } catch (err) {
    console.log('Request Failed', err)
  }

}
function initNotes (data) {
  var container = document.getElementById("index_note_section")
  container.innerHTML = ""
  var eleList = new Array()
  data.forEach(element => {
    var secElement = document.createElement("section")
    // var idElement = document.createElement("div")
    // var dateText = document.createTextNode(element._id)
    // idElement.appendChild(dateText)
    // idElement.className = "index_note_id"

    var titleElement = document.createElement("div")
    var titleText = document.createTextNode(element.title)
    titleElement.appendChild(titleText)
    titleElement.className = "index_note_title"
    titleElement.setAttribute('ObjectId', element._id)
    var desElement = document.createElement("div")
    var desText = document.createTextNode(element.description)
    desElement.appendChild(desText)
    desElement.className = "index_note_description"
    desElement.setAttribute('ObjectId', element._id)
    // secElement.appendChild(idElement)
    secElement.appendChild(titleElement)
    secElement.appendChild(desElement)
    secElement.setAttribute('ObjectId', element._id)
    secElement.className = 'index_note_block'
    secElement.id = element._id
    // eleList.push(secElement)
    container.appendChild(secElement)
    secElement.addEventListener('click', clickHandler)
  })

}

var form = document.getElementById('index_note_form')

form.addEventListener("submit", async function (event) {
  event.preventDefault()
  var submitBtn = document.getElementById("submit_btn")
  var data = new FormData(form)
  var output = {}
  for (const entry of data) {
    output[entry[0]] = entry[1]
    // output += entry[0] +'='+ entry[1]
  };
  if (!output['title']) {
    alert('Title must be not empty!')
    return
  }
  const response = await fetch('/notes/post', {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: 'title=' + output['title'] + '&description=' + output['description']
  })
  const res = await response.json()
  console.log(res)
  location.reload()

}, false)
getAll()