//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const todoList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
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
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  deleteIcon.src = './remove.svg';

  deleteButton.appendChild(deleteIcon);
  listItem.append(checkbox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  //Append listItem to todoList
  todoList.appendChild(listItem);
  bindTaskHandlers(listItem, moveTaskByCheckbox);

  newTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  //Remove the parent list item from the ul.
  list.removeChild(listItem);
};

const moveTaskByCheckbox = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(listItem);
  bindTaskHandlers(listItem, moveTaskByCheckbox);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const bindTaskHandlers = function (taskItem, checkboxHandler) {
  //select ListItems children
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkboxHandler.
  checkbox.onchange = checkboxHandler;
};

const bindTasksInList = function (list) {
  for (const listItem of list.children) {
    bindTaskHandlers(listItem, moveTaskByCheckbox);
  }
};

bindTasksInList(todoList);
bindTasksInList(completedList);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
