
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
  const listHeader = document.getElementById('listTitle')
  listHeader.innerHTML = `<h2 id=header  data-id="${firstList}"> ${Object.values(listname)[0]}<h2>`
  const getTasks = await fetch(`/app/lists/${firstList}/tasks`);
  const { tasks } = await getTasks.json();
  let taskObj = {};
  let taskHtml = [];
  for (let task of tasks) {
    const { taskName, id } = task;
    taskObj[id] = taskName;
  }
  for (let task in taskObj) {
    taskHtml.push(`<li data-id="${task}" class="task_li">${taskObj[task]}</li>`);
  }
  const taskList = document.querySelector('.task_list');
  taskList.innerHTML = taskHtml.join('');


  const listDiv = document.getElementsByClassName("list_div")
  for (let div of listDiv) {
    div.addEventListener('click', async () => {
      const id = div.dataset.id
      const newListTitle = div.innerText
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
      listHeader.innerHTML = `<h2 id=header data-id="${id}">${newListTitle}</h2>`
      console.log(id)

      newTaskButton.addEventListener('click', (e) => {
        newTaskButton.setAttribute('type', 'hidden')
        newTaskInput.setAttribute('type', 'text')
        newTaskInput.focus()
        newTaskInput.addEventListener('focusout', (e) => {
          newTaskInput.setAttribute('type', 'hidden')
          newTaskInput.value = ''
          newTaskButton.setAttribute('type', 'button')
        })
        newTaskInput.addEventListener("keyup", async (e) => {
          console.log(id)
          if (e.key === 'Enter') {
            const result = await fetch(`/app/lists/${id}/tasks`, {
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify({ taskName: `${newTaskInput.value}` })
            })
            if (result) {
              newTaskInput.value = ''
              const { id, taskName } = await result.json();
              let newElement = document.createElement('li')
              newElement.innerText = `${taskName} `
              taskList.appendChild(newElement)

            }
          }
        })
      })
    })
  }

  const newListButton = document.getElementById("newListButton")
  const newListInput = document.getElementById("newListInput")
  newListButton.addEventListener('click', (e) => {
    newListButton.setAttribute('type', 'hidden')
    newListInput.setAttribute('type', 'text')
    newListInput.focus()
    newListInput.addEventListener('focusout', (e) => {
      newListInput.setAttribute('type', 'hidden')
      newListInput.value = ''
      newListButton.setAttribute('type', 'button')
    })
    newListInput.addEventListener("keyup", async (e) => {
      if (e.key === 'Enter') {
        e.stopImmediatePropagation();
        const result = await fetch('/app/lists', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ listName: `${newListInput.value} ` })
        })
        if (result) {
          newListInput.value = ''
          const { id, listName } = await result.json();
          let newList = document.createElement('div')
          newList.className = 'list_div'
          newList.innerText = `${listName} `
          newList.addEventListener('click', async () => {
            const getTasks = await fetch(`/ app / lists / ${id} /tasks`);
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
      }
    })
  })







});
