
document.addEventListener('DOMContentLoaded', async () => {

  const fetchList = async () => {
    const result = await fetch('/app/lists');
    const { lists } = await result.json();
    return lists
  };
  const fetchTasks = async (listId) => {
    const result = await fetch(`/app/lists/${listId}/tasks`)
    const { tasks } = await result.json()
    return tasks
  };

  const renderList = (lists) => {
    const listcontainer = document.querySelector('.list_container');
    let listHtml = [];
    for (let list of lists) {
      const { id, listName } = list
      listHtml.push(
        `<div data-listId="${id}" class="list_div list${id}"><button id=${id} class='btnDelete list${id}'>x</button>${listName}</div>`
      );
    }
    return listcontainer.innerHTML = listHtml.join('');
  };
  const renderTasks = (tasks) => {
    const taskList = document.querySelector('.task_list');
    let taskHtml = [];
    if (tasks.length) {
      for (let task of tasks) {
        const { taskName, id } = task;
        taskHtml.push(`<li data-taskId="${id}" class="task_li">${taskName}</li>`);
      }
    }
    return taskList.innerHTML = taskHtml.join('');
  };
  const addList = async (listName) => {
    const listcontainer = document.querySelector('.list_container');
    const res = await fetch('/app/lists', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ listName })
    })
    return await res.json();
  }
  const addTask = async (listId, taskName) => {
    const res = await fetch(`/app/lists/${listId}/tasks`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ taskName })
    })
    return await res.json()
  };
  const deleteList = async (id) => {
    const result = await fetch(`/app/lists/${id}`, {
      method: 'DELETE'
    })
    return result
  }
  const addTaskEventHandler = () => {
    const taskList = document.querySelector(".task_list")
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
        e.stopImmediatePropagation()
        if (e.key === 'Enter') {
          const task = await addTask(lastClickedListId, newTaskInput.value)
          if (task) {
            newTaskInput.value = ''
            const { id, taskName } = task;
            let newElement = document.createElement('li')
            newElement.innerText = `${taskName} `
            taskList.appendChild(newElement)
          };
        }
      })
    })
  }
  const addListEventHandler = () => {
    const listcontainer = document.querySelector('.list_container');
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
          const res = await addList(newListInput.value)
          if (res) {
            newListInput.value = ''
            const { id, listName } = res
            let newList = document.createElement('div')
            newList.innerHTML = `<div data-listId="${id}" class="list_div list${id}"><button id=${id} class='btnDelete list${id}'>x</button>${listName}</div>`
            // newList.className = 'list_div'
            // newList.innerText = `${listName} `
            // newList.id = id
            // newList.dataset.listid = id
            newList.addEventListener('click', async () => {
              renderTasks([])
            })
            listcontainer.appendChild(newList)
          };
        }
      })
    })
  }
  const fetchListEventHandler = async () => {
    const listDiv = document.querySelector(".list_container")
    listDiv.addEventListener('click', async (event) => {
      const listId = event.target.dataset.listid;
      if (listId) {
        const tasks = await fetchTasks(listId)
        renderTasks(tasks)
        lastClickedListId = Number(listId);
      }
    });
  }
  const deleteListEventHandler = async () => {
    const listDiv = document.querySelector('.list_container')
    listDiv.addEventListener('click', async (event) => {
      const target = event.target.type
      const listId = event.target.id
      console.log(listId)
      console.log(target)
      if (target === 'submit') {
        const result = deleteList(listId)
        if (result) {
          const listDiv = document.querySelector(`div.list${listId}`)
          listDiv.remove()
        }
      }
    })
  }


  const lists = await fetchList();
  renderList(lists);

  let lastClickedListId;

  if (lists[0].id) {
    const tasks = await fetchTasks(lists[0].id);
    renderTasks(tasks);
    lastClickedListId = lists[0].id;
  }

  addListEventHandler();
  addTaskEventHandler();
  fetchListEventHandler();
  deleteListEventHandler();



});
