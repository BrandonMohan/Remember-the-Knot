document.addEventListener('click', function (event) {
  event.stopImmediatePropagation();

  const editForm = document.querySelector('.editForm');

  const editTask = async (id, editValue) => {
    const result = await fetch(`/app/task/${id}/edit`, {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ editValue })
    });
    return result;
  };
  event.stopPropagation();
  if (event.target.id == 'editTaskButton') {
    event.preventDefault();
    const tId = event.target.className;
    editForm.style.display = 'flex';
    const submitEdit = document.createElement('button');
    submitEdit.id = `editButton`;
    submitEdit.innerHTML = `Edit #${tId}`;
    submitEdit.setAttribute('class', `${tId}`);
    editForm.appendChild(submitEdit);
  }

  const submitEdit = document.getElementById('editButton');

  const editValue = document.querySelector('#eTaskInput');
  submitEdit.addEventListener('click', async (event) => {
    event.stopImmediatePropagation();
    const currentTask = document.querySelector(`.task${submitEdit.className}`);
    console.log(currentTask);
    currentTask.innerHTML = `<li data-taskId="${submitEdit.className}" class="task_li task${submitEdit.className}">${editValue.value} <button id="editTaskButton" class="${submitEdit.className}" type="button">Edit</button></li> `;
    // console.log(editValue.value, submitEdit.className);
    let result = await editTask(submitEdit.className, editValue.value);
  });
});
