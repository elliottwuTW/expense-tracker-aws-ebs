const apiURL = '/records'

const recordPanel = getElem('#record-panel')
const filterForm = getElem('#filter')
const totalAmount = getElem('.total-amount')
const duration = getElem('.duration')
const typePanel = getElem('#type-panel')
const categoryTag = getElem('#category-tag')
const loader = getElem('.loader-wrapper')

document.addEventListener('DOMContentLoaded', function () {
  // delete the record
  if (recordPanel) {
    // event delegation
    recordPanel.addEventListener('click', function (event) {
      let confirmDelete
      if (event.target.classList.contains('delete')) {
        confirmDelete = deleteCheck()
      }
      if (confirmDelete) {
        // the nearest record
        const record = event.target.closest('.record')
        const recordId = record.dataset.id
        // DELETE request
        addLoader()
        axios.delete(`${apiURL}/${recordId}`)
          .then(response => {
            if (response.data.status === 'success') {
              record.remove()
              updateTotalAmount()
            } else {
              alert('刪除失敗')
            }
            removeLoader()
          })
          .catch(err => console.error(err))
      }
    })
  }

  // filter the records by setting
  if (filterForm) {
    filterForm.addEventListener('change', function (event) {
      getAjaxResult()
        .then(response => {
          const records = response.data.data.records
          renderRecords(records)
          updateTotalAmount()
          updateDuration()
          removeLoader()
        })
        .catch(err => console.error(err))
    })
  }

  // filter the records and render the categories by record type
  if (typePanel) {
    typePanel.addEventListener('click', function (event) {
      if (event.target.matches('.type')) {
        const typeEls = document.querySelectorAll('.type')
        typeEls.forEach(typeEl => {
          typeEl.classList.remove('active')
        })
        event.target.classList.add('active')

        // change category to 'all' option
        categoryTag.value = 'all'

        getAjaxResult()
          .then(response => {
            console.log('Already respond..... , response: ', response)
            const records = response.data.data.records
            const categories = response.data.data.categories
            renderRecords(records)
            renderCategories(categories)
            updateTotalAmount()
            updateDuration()
            removeLoader()
          })
          .catch(err => console.error(err))
      }
    })
  }
})

/**
 * Functions
 */
// confirm the delete action
function deleteCheck () {
  return window.confirm('確認要刪除這筆計帳?')
}

// get element
function getElem (selector) {
  return document.querySelector(selector)
}

// get the records and categories by the record type
function getAjaxResult () {
  const period = getElem("[name='period']").value
  const sort = getElem("[name='sort']").value
  const categoryValue = getElem("[name='categoryValue']").value

  // record type
  const typeEls = document.querySelectorAll('.type')
  let type
  typeEls.forEach(typeEl => {
    if (typeEl.matches('.active')) {
      type = typeEl.id
    }
  })

  const url = apiURL + `?period=${period}&sort=${sort}&categoryValue=${categoryValue}&type=${type}`
  window.history.pushState({}, '', url)

  // ajax
  addLoader()
  return axios.get(url)
}

// update total amount on page
function updateTotalAmount () {
  const amountNodeArray = [...document.querySelectorAll('.amount')]
  const balance = getTotalAmount(amountNodeArray)
  if (balance >= 0) {
    totalAmount.innerHTML = `<span style="color: #4e7d34 ;">${balance}</span>`
  } else {
    totalAmount.innerHTML = `<span style="color: #c0392b ;">${balance}</span>`
  }
}

// update duration on page
function updateDuration () {
  const period = getElem("[name='period']").value
  const { minDate, maxDate } = getDateRange(period)
  duration.innerText = `${formatDate(minDate)}` + ' ~ ' + `${formatDate(maxDate)}`
}

// render records out
function renderRecords (records) {
  recordPanel.innerHTML = ''
  if (!records.length) {
    recordPanel.innerHTML = `
    <div class="d-flex justify-content-center mt-5">
      <h4>沒有計帳紀錄</h4>
    </div>`
  } else {
    records.forEach(record => {
      recordPanel.innerHTML += `
      <li class="list-group-item record ${record.amount >= 0 ? 'income' : 'expense'}" data-id=${record._id}>
        <div class="row">
          <div class="col-sm-7 mr-auto">
            <div class="row">
              <div class="d-flex flex-column justify-content-center align-items-center"
                style="width: 50px; transform: scale(0.9);">
                ${record.category.icon}</div>
              <div class="col-auto mr-auto">
                <div class="row" style="font-size: large;">${record.name} / ${record.merchant}</div>
                <div class="row">
                  <small>${formatDate(record.date)} </small>
                </div>
              </div>
              <div class="col-auto d-flex flex-column justify-content-center amount" data-amount=${record.amount}>
                NT ${record.amount}
              </div>
            </div>

          </div>
          <div class="col-sm-5 d-flex align-items-center justify-content-end">
            <a class="btn btn-outline-secondary mx-2" href="/records/${record._id}/edit" style="border: none;">
              <i class="far fa-edit"></i>
            </a>
            <button class="btn btn-outline-danger delete" style="border: none;">
              <i class="far fa-trash-alt delete"></i>
            </button>
          </div>
        </div>
      </li>
      `
    })
  }
}

// render categories
function renderCategories (categories) {
  categoryTag.innerHTML = ''
  categories.forEach(category => {
    categoryTag.innerHTML += `
    <option value="${category.value}">${category.title}</option>
    `
  })
}

// get total amount of all records
function getTotalAmount (amountNodeArray) {
  return amountNodeArray.reduce((acc, cur, index, arr) => {
    cur = Number(arr[index].dataset.amount)
    return acc + cur
  }, 0)
}

// format date in YYYY-MM-DD
function getDateRange (period) {
  const minDate = new Date(period)
  const maxDate = new Date(period)
  maxDate.setMonth(maxDate.getMonth() + 1)
  maxDate.setDate(maxDate.getDate() - 1)

  return { minDate, maxDate }
}

// format date string to YYYY-MM-DD
// "2021-01-01T00:00:00.000Z" -> "2021-01-01"
// 2021-01-01T00:00:00.000Z -> "2021-01-01"
function formatDate (date) { 
  if (typeof date === 'string') {
    return date.slice(0, 10)
  } else if (typeof date === 'object') {
    return date.toISOString().slice(0, 10)
  } else {
    throw new Error('unknown date type')
  }
}

// add loader
function addLoader () {
  loader.classList.add('show')
}

// remove loader
function removeLoader () {
  loader.classList.remove('show')
}
