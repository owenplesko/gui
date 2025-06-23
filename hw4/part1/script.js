// GUI HW4
// Owen Plesko
// owen_plesko@student.uml.edu

// custom form validation methods
$.validator.addMethod("greaterThan", function(value, element, param) {
  const other = $(param).val()
  return this.optional(element) || value > other
}, "Must be greater than other input");

$.validator.addMethod("lessThan", function(value, element, param) {
  const other = $(param).val()
  return this.optional(element) || value < other
}, "Must be lower than other input");

// returns a new table element given upper and lower bounds
const newTableElement = (xLower, xUpper, yLower, yUpper) => {
  // create table element
  const table = document.createElement("table")

  // create table header
  const thead = document.createElement("thead")
  const headerRow = document.createElement("tr")

  headerRow.appendChild(document.createElement("th")) // empty corner cell

  for (let i = xLower; i <= xUpper; i++) {
    const th = document.createElement("th")
    th.textContent = i
    headerRow.appendChild(th)
  }
  thead.appendChild(headerRow)
  table.appendChild(thead)

  // create body
  const tbody = document.createElement("tbody")

  for (let y = yLower; y <= yUpper; y++) {
    // add y table header
    const tableRow = document.createElement("tr")
    const th = document.createElement("th")
    th.textContent = y
    tableRow.appendChild(th)

    // add multiplication rows
    for (let x = xLower; x <= xUpper; x++) {
      const td = document.createElement("td")
      td.textContent = y * x
      tableRow.appendChild(td)
    }
    tbody.appendChild(tableRow)
  }
  table.appendChild(tbody)

  return table
}

// form validation rules
$("#tableBoundsForm").validate({
  rules: {
    xLower: {
      required: true,
      number: true,
      min: -50,
      max: 50,
      lessThan: "#xUpper"
    },
    xUpper: {
      required: true,
      number: true,
      min: -50,
      max: 50,
      greaterThan: "#xLower"
    },
    yLower: {
      required: true,
      number: true,
      min: -50,
      max: 50,
      lessThan: "#yUpper"
    },
    yUpper: {
      required: true,
      number: true,
      min: -50,
      max: 50,
      greaterThan: "#yLower"
    },
  },
  messages: {
    xLower: {
      lessThan: "Must be less than X upper bound"
    },
    xUpper: {
      greaterThan: "Must be greater than X lower bound"
    },
    yLower: {
      lessThan: "Must be less than Y upper bound"
    },
    yUpper: {
      greaterThan: "Must be greater than Y lower bound"
    },
  },
  submitHandler: function(form) {
    // create new table using form values
    const table = newTableElement(
      form.xLower.value,
      form.xUpper.value,
      form.yLower.value,
      form.yUpper.value
    )

    // insert table into document
    const tableContainer = document.getElementById("tableContainer")
    tableContainer.replaceChildren(table)
  }
})

// Link validation of x bounds and y bounds:
//
// Needed because greaterThan and lessThan validation
// methods depend on different input values
$("#xLower").on("blur", function() {
  $("#xUpper").valid()
})
$("#xUpper").on("blur", function() {
  $("#xLower").valid()
})
$("#yLower").on("blur", function() {
  $("#yUpper").valid()
})
$("#yUpper").on("blur", function() {
  $("#yLower").valid()
})
