import { formatDate } from './functions/formatDate.js'

const apiURL = '/records'

document.addEventListener('DOMContentLoaded', function () {
  // delete the record
  document.querySelectorAll('#record').forEach(item => {
    item.addEventListener('submit', function (e) {
      e.preventDefault()

      if (e.target.classList.contains('delete')) {
        const id = item.dataset.id
        // DELETE request
        axios.delete(`${apiURL}/${id}`)
          .then(response => {
            if (response.data.status === 'success') {
              this.remove()
              // updateTotalAmount()
            } else {
              alert('刪除失敗')
            }
          })
          .catch(err => console.error(err))
      }
    })
  })
  // filter the records
  const filterForm = getElem('#filter')
  filterForm.addEventListener('change', function (e) {
    const period = getElem("[name='period']").value
    const sort = getElem("[name='sort']").value
    const categoryValue = getElem("[name='categoryValue']").value

    const url = apiURL + `?period=${period}&sort=${sort}&categoryValue=${categoryValue}`
    window.history.pushState({}, '', url)

    // get records
    const recordPanel = getElem('#record-panel')
    axios.get(url)
      .then(response => {
        const records = response.data.data.records
        recordPanel.innerHTML = ''
        records.forEach(record => {
          recordPanel.innerHTML += `
          <li class="list-group-item" id="record" data-id=${record._id}>
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
                  <div class="col-auto d-flex flex-column justify-content-center">
                    NT ${record.amount}
                  </div>
                </div>

              </div>
              <div class="col-sm-5 d-flex align-items-center justify-content-end">
                <a class="btn btn-outline-secondary mx-2" href="/records/${record._id}/edit" style="border: none;">
                  <i class="far fa-edit"></i>
                </a>
                <form class="delete" onsubmit="return deleteCheck()" style="display: inline;">
                  <button class="btn btn-outline-danger" type="submit" style="border: none;">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </form>
              </div>
            </div>
          </li>
          `
        })
      })
      .catch(err => console.error(err))
  })

})

// get element
function getElem (selector) {
  return document.querySelector(selector)
}

// confirm the delete action
function deleteCheck () {
  return window.confirm('確認要刪除這個支出?')
}
