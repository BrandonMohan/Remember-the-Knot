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
      `<div class="card-body"><a href="/app/lists/${key}/tasks">${listname[key]}</a></div>`
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
});
