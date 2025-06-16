// add form event listener
const form = document.getElementById("tableBoundsForm")

form.addEventListener("submit", function(event) {
  event.preventDefault()
  const formData = new FormData(form)

  const xLower = formData.get("xLower")
  const xUpper = formData.get("xUpper")
  const yLower = formData.get("yLower")
  const yUpper = formData.get("yUpper")

  const table = constructTable(xLower, xUpper, yLower, yUpper)

  // insert table into document
  const tableContainer = document.getElementById("tableContainer")
  tableContainer.replaceChildren(table)
})

const constructTable = (xLower, xUpper, yLower, yUpper) => {
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
