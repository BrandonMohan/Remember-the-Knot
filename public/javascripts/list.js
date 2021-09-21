// const initialize = () => {
//     const test = document.createElement(p)
//     test.innerHTML = "Test"
//     document.body.appendChild(test)
// }

// window.onload = () => {
//     initialize();
// }

document.addEventListener('DOMContentLoaded', async () => {
  const listcontainer = document.querySelector('.list_container');
  const result = await fetch('http://localhost:8080/app/lists');
  const { lists } = await result.json();
  let listname = {};

  for (let list of lists) {
    const { listName, id } = list;
    listname[id] = listName;
  }

  console.log(listname);
  let listHtml = [];
  for (let key in listname) {
    listHtml.push(
      `<div class="card-body"><a href="/lists/${key}/tasks">${listname[key]}</a></div>`
    );
  }
  // const listHtml = listname.map(
  //   (ele) => `
  //         <div class="card-body">
  //            a(href='/lists/:listId/tasks')
  //         </div>
  //       </div>
  //     `
  // );
  listcontainer.innerHTML = listHtml.join('');
});
