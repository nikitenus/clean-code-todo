const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createElement = function (tagName, className) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  return element;
};

const createTaskElement = function (taskText) {
  const listItem = createElement('li');
  const checkbox = createElement('input');
  const label = createElement('label', 'task');
  const editInput = createElement('input', 'task');
  const editButton = createElement('button', 'edit');
  const deleteButton = createElement('button', 'delete');
  const deleteIcon = createElement('img');

  checkbox.type = 'checkbox';
  editInput.type = 'text';

  label.innerText = taskText;
  editButton.innerText = 'Edit'; // innerText encodes special characters, HTML does not.
  deleteIcon.src = './remove.svg';

  deleteButton.appendChild(deleteIcon);
  listItem.append(checkbox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;

  const listItem = createTaskElement(newTaskInput.value);
  todoList.appendChild(listItem);
  bindTaskHandlers(listItem, moveTaskByCheckbox);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
};

const moveTaskByCheckbox = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(listItem);
  bindTaskHandlers(listItem, moveTaskByCheckbox);
};

addButton.addEventListener('click', addTask);

const bindTaskHandlers = function (taskItem, checkboxHandler) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  // Handlers are assigned rather than added: a task is re-bound every time it
  // moves between lists, and the old handler must be replaced, not stacked.
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxHandler;
};

const bindTasksInList = function (list) {
  for (const listItem of list.children) {
    bindTaskHandlers(listItem, moveTaskByCheckbox);
  }
};

bindTasksInList(todoList);
bindTasksInList(completedList);
