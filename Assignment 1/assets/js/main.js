// theme switch

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.textContent = selectedTheme === 'dark' ? "Light" : "Dark"
}
// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme())
  if (document.body.classList.contains(darkTheme)) {
    themeButton.textContent = "Light"
  }
  else {
    themeButton.textContent = "Dark"
  }
})


// date or time display
var container = document.getElementById("container")

function getDateOrTime (op) {
  if (op == "Date") {
    var d = new Date()
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var months =
      [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ]
    var dateElement = document.createElement("h3")
    var dateText = document.createTextNode(days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear())
    dateElement.appendChild(dateText)
    return dateElement
  } else {
    var timeElement = document.createElement("h3")

    var time = new Date()
    var timeText = document.createTextNode(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }))
    timeElement.appendChild(timeText)
    return timeElement
  }

}

var form = document.querySelector("form")

form.addEventListener("submit", function (event) {
  event.preventDefault()
  var submitBtn = document.getElementById("submit_btn")
  var data = new FormData(form)
  var output = ""
  for (const entry of data) {
    output = output + entry[1]
  };

  var displayElement = getDateOrTime(output)
  if (container.childNodes.length != 0) {
    container.innerHTML = ""
    submitBtn.textContent = "Show"

  } else {
    container.appendChild(displayElement)
    submitBtn.textContent = "Hide"
    console.log("hi")
  }

}, false)