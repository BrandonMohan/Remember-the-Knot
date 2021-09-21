// const initialize = () => {
//     const test = document.createElement(p)
//     test.innerHTML = "Test"
//     document.body.appendChild(test)
// }


// window.onload = () => {
//     initialize();
// }


document.addEventListener("DOMContentLoaded", async() => {
    const result = await fetch("http://localhost:8080/app/lists")
    console.log(result);
    const { lists } = await result.json();
    console.log(lists);
    const { listName } = lists
    const test = document.createElement("div")
        test.innerText = listName
        document.body.appendChild(test)
    const listDiv = document.querySelector("list_container")

})
