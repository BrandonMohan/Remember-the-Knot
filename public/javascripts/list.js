// const initialize = () => {
//     const test = document.createElement(p)
//     test.innerHTML = "Test"
//     document.body.appendChild(test)
// }


// window.onload = () => {
//     initialize();
// }


document.addEventListener("DOMContentLoaded", async () => {
    const listcontainer = document.querySelector(".list_container")
    const result = await fetch("http://localhost:8080/app/lists")
    const { lists } = await result.json();
    let listname = [];
    for (let list of lists) {
        const { listName } = list
        listname.push(listName)
    }
    console.log(listname)
    const listHtml = listname.map(
        (ele) => `
          <div class="card-body">
            <p class="card-text">${ele}</p>
          </div>
        </div>
      `
    );
    listcontainer.innerHTML = listHtml.join("");


})
