document.addEventListener('DOMContentLoaded', async () => {
  //GET LISTS
  const listcontainer = document.querySelector('.list_container');
  const result = await fetch('/app/lists');
  const { lists } = await result.json();
  let listname = {};
  for (let list of lists) {
    const { listName, id } = list;
    listname[id] = listName;
  }
  let listHtml = [];
  for (let key in listname) {
    listHtml.push(
      `<div data-id="${key}" class="list_div">${listname[key]}</div>`
    );
  }
  listcontainer.innerHTML = listHtml.join('');

  // GET TASKS ONTO LISTS
  let firstList = Object.keys(listname)[0]; // default view is first list
  const getTasks = await fetch(`/app/lists/${firstList}/tasks`);
  const { tasks } = await getTasks.json();
  let taskObj = {};
  let taskHtml = [];
  for (let task of tasks) {
    const { taskName, id } = task;
    taskObj[id] = taskName;
  }
  for (let task in taskObj) {
    taskHtml.push(`<li>${taskObj[task]}</li>`);
  }
  const taskList = document.querySelector('.task_list');
  taskList.innerHTML = taskHtml.join('');


  const listDiv = document.getElementsByClassName("list_div")
  for (let div of listDiv) {
    div.addEventListener('click', async () => {
      const id = div.dataset.id
      const getTasks = await fetch(`/app/lists/${id}/tasks`);
      const { tasks } = await getTasks.json();
      let taskObj = {};
      let taskHtml = [];
      for (let task of tasks) {
        const { taskName, id } = task;
        taskObj[id] = taskName;
      }
      for (let task in taskObj) {
        taskHtml.push(`<li>${taskObj[task]}</li>`);
      }
      taskList.innerHTML = taskHtml.join('');
    })
  }

  const newListButton = document.getElementById("newListButton")
  newListButton.addEventListener('click', (e) => {
    newListButton.setAttribute('type', 'text')
    newListButton.removeAttribute('value')
    newListButton.setAttribute('placeholder', 'Enter list name')
    newListButton.addEventListener('focusout', (e) => {
      newListButton.setAttribute('type', 'button')
      newListButton.setAttribute('value', 'New List')
    })
    newListButton.addEventListener("keyup", async (e) => {
      e.stopImmediatePropagation();
      if (e.key === 'Enter') {
        const result = await fetch('/app/lists', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ listName: `${newListButton.value}` })
        })
        const { id, listName } = await result.json();
        console.log(id)
        let newList = document.createElement('div')
        newList.className = 'list_div'
        newList.innerText = `${listName}`
        newList.addEventListener('click', async () => {
          const getTasks = await fetch(`/app/lists/${id}/tasks`);
          const { tasks } = await getTasks.json();
          let taskObj = {};
          let taskHtml = [];
          for (let task of tasks) {
            const { taskName, id } = task;
            taskObj[id] = taskName;
          }
          for (let task in taskObj) {
            taskHtml.push(`<li>${taskObj[task]}</li>`);
          }
          taskList.innerHTML = taskHtml.join('');
        })
        listcontainer.appendChild(newList)

      }
    })
  })


});
