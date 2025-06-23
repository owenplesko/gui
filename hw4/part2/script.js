// GUI HW4
// Owen Plesko
// owen_plesko@student.uml.edu

// init table tabs
$("#tableTabs").tabs()

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
function newTableElement(xLower, xUpper, yLower, yUpper) {
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

// create new table tab
let tabCount = 0
function createTab(xLower, xUpper, yLower, yUpper) {
  const id = `tab_${tabCount}`
  const headerId = `${id}_header`
  const tabName = `(${xLower}-${xUpper}) X (${yLower}-${yUpper})`

  const table = newTableElement(xLower, xUpper, yLower, yUpper)
  const tabContent = document.createElement("div")
  tabContent.id = id
  tabContent.appendChild(table)

  $("#tableTabs ul").append(`<li id=${headerId}><a href="#${id}">${tabName}</a></li>`);
  $("#tableTabs").append(tabContent)
  $("#tableTabs").tabs("refresh")
  tabCount++;
}

// delete table tab
function deleteTab(id) {
  const headerId = `${id}_header`

  $(`#${headerId}`).remove()
  $(`#${id}`).remove()
  $("#tableTabs").tabs("refresh")
}

// get id of active tab
function getActiveTabId() {
  const index = $("#tableTabs").tabs("option", "active");
  const li = $("#tableTabs ul li").eq(index);
  const href = li.find("a").attr("href");

  if (!href)
    return null

  // remove the leading #
  const id = href.substring(1)
  return id
}

// form validation rules
$("#createForm").validate({
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
    createTab(
      form.xLower.value,
      form.xUpper.value,
      form.yLower.value,
      form.yUpper.value
    )
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

// setup the sliders
function setupSlider(sliderId, lowerInputId, upperInputId) {
  function syncInputs() {
    const [min, max] = $(`#${sliderId}`).slider("values");
    $(`#${lowerInputId}`).val(min)
    $(`#${upperInputId}`).val(max)
  }

  $(`#${sliderId}`).slider({
    range: true,
    min: -50,
    max: 50,
    values: [-25, 25],
    slide: syncInputs
  })

  function syncSlider() {
    const min = $(`#${lowerInputId}`).val()
    const max = $(`#${upperInputId}`).val()
    $(`#${sliderId}`).slider("values", [min, max])
  }

  $(`#${lowerInputId}`).on("input", syncSlider)
  $(`#${upperInputId}`).on("input", syncSlider)

  syncInputs()
}

setupSlider("xSlider", "xLower", "xUpper")
setupSlider("ySlider", "yLower", "yUpper")

// setup the buttons for the delete section
$("#delete").on("click", function() {
  const activeId = getActiveTabId()
  if (activeId !== null)
    deleteTab(activeId)
});

let selected = []
$("#select").on("click", function() {
  const activeId = getActiveTabId()

  if (activeId === null || selected.includes(activeId))
    return

  selected.push(activeId)
  $("#selected").append(`<li>${activeId}</li>`)
})

$("#deleteSelected").on("click", function() {
  for (const id of selected) {
    deleteTab(id)
  }

  $("#selected").empty()
})
