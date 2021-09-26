document.addEventListener("DOMContentLoaded", (event) => {
  const demoButton = document.querySelector('#demoButton')
  const greyDiv = document.querySelector('#greyOut')

  demoButton.addEventListener('click', (event) => {
    greyDiv.removeAttribute('class')
    greyDiv.setAttribute('class', 'greyBackground')
  })

})