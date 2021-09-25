document.addEventListener('DOMContentLoaded', async () => {
  let lastClickedListId;
  let noList;

  const fetchList = async () => {
    const result = await fetch('/app/lists');
    const { lists } = await result.json();
    return lists;
  };
  const fetchPutList = async (listId, listName) => {
    const result = await fetch(`/app/lists/${listId}/edit`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ listName })
    });
    return result;
  };
  const fetchTasks = async (listId) => {
    const result = await fetch(`/app/lists/${listId}/tasks`);
    const { tasks } = await result.json();
    return tasks;
  };

  const renderTitle = (title) => {
    const listTitle = document.querySelector('#titleContainer');
    listTitle.innerHTML = `<h2>${title}</h2>`;
    editListNameEventHandler(title);
  };

  const renderList = (lists) => {
    const listcontainer = document.querySelector('.list_container');
    let listHtml = [];
    for (let list of lists) {
      const { id, listName } = list;
      listHtml.push(
        `<div data-listId="${id}" class="list_div list${id}"><button id=${id} class='btnDelete list${id}'>x</button>${listName}</div>`
      );
    }
    return (listcontainer.innerHTML = listHtml.join(''));
  };
  const renderTasks = (tasks) => {
    if (noList) {
      const newTaskButton = document.querySelector('#newTaskButton');
      newTaskButton.setAttribute('disabled', '');
    } else {
      const taskList = document.querySelector('.task_list');
      let taskHtml = [];
      if (tasks.length) {
        for (let task of tasks) {
          const { taskName, id } = task;
          taskHtml.push(
            `<li data-taskId="${id}" class="task_li task${id}">${taskName} <button id="editTaskButton" class="${id}" type="button">Edit</button></li> `
          );
        }
      }
      return (taskList.innerHTML = taskHtml.join(''));
    }
  };
  const addList = async (listName) => {
    const result = await fetch('/app/lists', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ listName })
    });
    return await result.json();
  };
  const addTask = async (listId, taskName) => {
    const result = await fetch(`/app/lists/${listId}/tasks`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ taskName })
    });
    return await result.json();
  };
  const deleteList = async (id) => {
    const result = await fetch(`/app/lists/${id}`, {
      method: 'DELETE'
    });
    return result;
  };
  const addTaskEventHandler = () => {
    const taskList = document.querySelector('.task_list');
    newTaskButton.addEventListener('click', (event) => {
      newTaskButton.setAttribute('type', 'hidden');
      newTaskInput.setAttribute('type', 'text');
      newTaskInput.focus();
      newTaskInput.addEventListener('focusout', (event) => {
        newTaskInput.setAttribute('type', 'hidden');
        newTaskInput.value = '';
        newTaskButton.setAttribute('type', 'button');
      });
      newTaskInput.addEventListener('keyup', async (event) => {
        event.stopImmediatePropagation();
        if (event.key === 'Enter') {
          const task = await addTask(lastClickedListId, newTaskInput.value);
          if (task) {
            newTaskInput.value = '';
            const { id, taskName } = task;
            let newElement = document.createElement('li');
            newElement.innerText = `${taskName} `;
            let newButton = document.createElement('button');
            newButton.id = `editButton`;
            newButton.innerHTML = `Edit`;
            newElement.appendChild(newButton);
            newElement.setAttribute('class', `${id}`);
            taskList.appendChild(newElement);
          }
        }
      });
    });
  };
  const addListEventHandler = () => {
    const listcontainer = document.querySelector('.list_container');
    const newListButton = document.getElementById('newListButton');
    const newListInput = document.getElementById('newListInput');
    newListButton.addEventListener('click', (event) => {
      newListButton.setAttribute('type', 'hidden');
      newListInput.setAttribute('type', 'text');
      newListInput.focus();
      newListInput.addEventListener('focusout', (event) => {
        newListInput.setAttribute('type', 'hidden');
        newListInput.value = '';
        newListButton.setAttribute('type', 'button');
      });
      newListInput.addEventListener('keyup', async (event) => {
        if (event.key === 'Enter') {
          event.stopImmediatePropagation();
          const result = await addList(newListInput.value);
          if (result) {
            newListInput.value = '';
            const { id, listName } = result;
            let newList = document.createElement('div');
            newList.innerHTML = `<div data-listId="${id}" class="list_div list${id}"><button id=${id} class='btnDelete list${id}'>x</button>${listName}</div>`;
            newList.addEventListener('click', async () => {
              const editForm = document.querySelector('.editForm');
              editForm.style.display = 'flex';
              renderTasks([]);
            });
            if (noList) {
              noList = false;
              const titleListEditBtn = document.querySelector('#titleListEdit');
              const newTaskButton = document.querySelector('#newTaskButton');
              titleListEditBtn.removeAttribute('disabled');
              newTaskButton.removeAttribute('disabled');
              defaultView();
            } else {
              listcontainer.appendChild(newList);
            }
          }
        }
      });
    });
  };
  const fetchListEventHandler = async () => {
    const listDiv = document.querySelector('.list_container');
    listDiv.addEventListener('click', async (event) => {
      const listId = event.target.dataset.listid;
      const listName = event.target.innerText.slice(1);
      if (listId) {
        renderTitle(listName);
        const tasks = await fetchTasks(listId);
        renderTasks(tasks);
        lastClickedListId = Number(listId);
      }
    });
  };
  const deleteListEventHandler = async () => {
    const listDiv = document.querySelector('.list_container');
    listDiv.addEventListener('click', async (event) => {
      const target = event.target.type;
      const listId = event.target.id;
      if (target === 'submit') {
        const result = await deleteList(listId);
        if (result) {
          const listDiv = document.querySelector(`div.list${listId}`);
          listDiv.remove();
          defaultView();
        }
      }
    });
  };

  const editListNameEventHandler = async () => {
    const editTitleButton = document.querySelector('#titleListEdit');
    const editListDiv = document.querySelector('#editListDiv');
    const editListInput = document.querySelector('#editListName');
    const editListSubmit = document.querySelector('#submitEditListName');
    const editListCancel = document.querySelector('#cancelEditListName');
    const greyOutBackground = document.querySelector('#greyOut');
    editTitleButton.addEventListener('click', (event) => {
      editListDiv.setAttribute('class', 'show');
      editListInput.setAttribute('class', 'show');
      editListSubmit.setAttribute('class', 'show');
      editListCancel.setAttribute('class', 'show');
      greyOutBackground.setAttribute('class', 'greyBackground');
    });
    editListCancel.addEventListener('click', (event) => {
      editListDiv.setAttribute('class', 'hidden');
      editListInput.setAttribute('value', ' ');
      editListInput.setAttribute('class', 'hidden');
      editListSubmit.setAttribute('class', 'hidden');
      editListCancel.setAttribute('class', 'hidden');
      greyOutBackground.setAttribute('class', 'hidden');
    });
    editListSubmit.addEventListener('click', async (event) => {
      if (editListInput.value) {
        const result = await fetchPutList(
          lastClickedListId,
          editListInput.value
        );
        if (result) {
          const currentListDiv = document.querySelector(
            `.list${lastClickedListId}`
          );
          editListDiv.setAttribute('class', 'hidden');
          editListInput.setAttribute('class', 'hidden');
          editListSubmit.setAttribute('class', 'hidden');
          editListCancel.setAttribute('class', 'hidden');
          greyOutBackground.setAttribute('class', 'hidden');
          renderTitle(editListInput.value);
          currentListDiv.innerHTML = `<div data-listId="${lastClickedListId}" class="list_div list${lastClickedListId}"><button id=${lastClickedListId} class='btnDelete list${lastClickedListId}'>x</button>${editListInput.value}</div>`;
          editListInput.setAttribute('value', ' ');
        }
      }
    });
  };
  const editTask = async () => {
    const editTaskButton = document.querySelector('#editTaskButton');
    const editListDiv = document.querySelector('#editListDiv');
    const editListInput = document.querySelector('#editListName');
    const editListSubmit = document.querySelector('#submitEditListName');
    const editListCancel = document.querySelector('#cancelEditListName');
    const greyOutBackground = document.querySelector('#greyOut');
    editTitleButton.addEventListener('click', (event) => {
      editListDiv.setAttribute('class', 'show');
      editListInput.setAttribute('class', 'show');
      editListSubmit.setAttribute('class', 'show');
      editListCancel.setAttribute('class', 'show');
      greyOutBackground.setAttribute('class', 'greyBackground');
    });
    editListCancel.addEventListener('click', (event) => {
      editListDiv.setAttribute('class', 'hidden');
      editListInput.setAttribute('value', ' ');
      editListInput.setAttribute('class', 'hidden');
      editListSubmit.setAttribute('class', 'hidden');
      editListCancel.setAttribute('class', 'hidden');
      greyOutBackground.setAttribute('class', 'hidden');
    });
    editListSubmit.addEventListener('click', async (event) => {
      if (editListInput.value) {
        const result = await fetchPutList(
          lastClickedListId,
          editListInput.value
        );
        if (result) {
          const currentListDiv = document.querySelector(
            `.list${lastClickedListId}`
          );
          editListDiv.setAttribute('class', 'hidden');
          editListInput.setAttribute('class', 'hidden');
          editListSubmit.setAttribute('class', 'hidden');
          editListCancel.setAttribute('class', 'hidden');
          greyOutBackground.setAttribute('class', 'hidden');
          renderTitle(editListInput.value);
          currentListDiv.innerHTML = `<div data-listId="${lastClickedListId}" class="list_div list${lastClickedListId}"><button id=${lastClickedListId} class='btnDelete list${lastClickedListId}'>x</button>${editListInput.value}</div>`;
          editListInput.setAttribute('value', ' ');
        }
      }
    });
  };
  const defaultView = async () => {
    const lists = await fetchList();
    renderList(lists);
    if (lists.length) {
      noList = false;
      const tasks = await fetchTasks(lists[0].id);
      renderTitle(lists[0].listName);
      renderTasks(tasks);
      lastClickedListId = lists[0].id;
    } else {
      noList = true;
      renderTitle();
      renderTasks();
    }
  };
  defaultView();
  addListEventHandler();
  addTaskEventHandler();
  fetchListEventHandler();
  deleteListEventHandler();
});
