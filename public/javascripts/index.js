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
})

// confirm the delete action
function deleteCheck() {
  return window.confirm('確認要刪除這個支出?')
}
