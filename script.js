// @ts-nocheck
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  TODO_EDIT: 'todo-edit'
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');


let id = 0;
function newTodo() {
  const text = prompt('What needs to be done?');
  if (text) {
    id += 1;
    const todoId = `todo-${id}`;
    const textId = `text-${id}`;
    const checkboxId = `checkbox-${id}`;
    const deleteId = `delete-${id}`;
    const editId = `edit-${id}`;
    // li
    const todoItem = document.createElement('li');
    todoItem.setAttribute('class', classNames.TODO_ITEM);
    todoItem.setAttribute('id', todoId);
    // container
    const dataContainer = document.createElement('div');
    dataContainer.setAttribute('class', 'data-container');
    // operators
    const operators = document.createElement('div');
    operators.setAttribute('class', 'operators');
    // text
    const todoLabel = document.createElement('label');
    todoLabel.setAttribute('id', textId);
    todoLabel.setAttribute('class', classNames.TODO_TEXT);
    todoLabel.textContent = text;
    // checkbox
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.setAttribute('id', checkboxId);
    todoCheckbox.setAttribute('class', classNames.TODO_CHECKBOX);
    todoCheckbox.setAttribute('onclick', `handleCheck('${textId}', '${checkboxId}')`);
    // nest checkbox on label
    todoLabel.appendChild(todoCheckbox);
    // delete
    const deleteTodo = document.createElement('span');
    deleteTodo.setAttribute('class', classNames.TODO_DELETE);
    deleteTodo.setAttribute('id', deleteId)
    deleteTodo.innerHTML = 'delete';
    deleteTodo.setAttribute('onclick', `deleteTodo('${todoId}')`);
    //edit
    const toggleEdit = document.createElement('span');
    toggleEdit.setAttribute('class', classNames.TODO_EDIT);
    toggleEdit.setAttribute('id', editId)
    toggleEdit.innerHTML = 'edit';
    //append item
    operators.append(toggleEdit, deleteTodo)
    dataContainer.append(todoLabel, operators)
    todoItem.append(dataContainer);
    //insert on top
    list.insertBefore(todoItem, document.querySelector("ul > li"));
    updateCounts()
  } else {
    alert('Please enter a valid todo');
  }
  renderFilters()
}

function renderFilters() {
  const listCount = list.getElementsByTagName('li').length;
  const filters = document.getElementById('filters')
  if (listCount) {
    filters.style.display = 'flex';
  } else {
    filters.style.display = 'none';
  }
}

function updateCounts() {
  itemCountSpan.innerHTML = list.getElementsByTagName('li').length.toString();
  uncheckedCountSpan.innerHTML = getUncheckedCount()
}

function deleteTodo(todoId) {
  const todo = document.getElementById(todoId)
  list.removeChild(todo)
  updateCounts()
  renderFilters()
}

function handleCheck(textId, checkboxId) {
  const checked = document.getElementById(checkboxId).checked;
  const text = document.getElementById(textId);
  if (checked) {
    text.style.textDecoration = 'line-through';
  } else {
    text.style.textDecoration = 'none';
  }
  updateCounts()
}

function getUncheckedCount() {
  return Array.from(document.querySelectorAll(`.${classNames.TODO_CHECKBOX}`)).filter(({ checked }) => !checked).length
}

function handleFilter(filter = 'all') {
  const filters = Array.from(document.querySelectorAll('.filter'))
  filters.forEach(currentFilter => {
    if (currentFilter.id !== filter) {
      currentFilter.classList.remove('selected')
    } else {
      currentFilter.classList.add('selected')
    }
  })
  const checkboxes = Array.from(document.querySelectorAll(`.${classNames.TODO_CHECKBOX}`));
  // const checkboxes = Array.from(document.querySelectorAll(`.${classNames.TODO_CHECKBOX}`))
  if (filter === 'all') {
    checkboxes.forEach(checkbox => {
      const liParent = checkbox.parentNode.parentNode.parentNode;
      liParent.style.display = 'flex'
    })
  } else if (filter === 'active') {
    checkboxes.forEach(checkbox => {
      const liParent = checkbox.parentNode.parentNode.parentNode;
      if (!checkbox.checked) {
        liParent.style.display = 'flex'
      } else {
        liParent.style.display = 'none'
      }
    })
  } else if (filter === 'completed') {
    checkboxes.forEach(checkbox => {
      const liParent = checkbox.parentNode.parentNode.parentNode;
      if (!checkbox.checked) {
        liParent.style.display = 'none'
      } else {
        liParent.style.display = 'flex'
      }
    })
  }
  // }
  // if (!allSelected) {
  //   chekboxInputs.forEach(function (input) {
  //     Array.from(document.querySelectorAll("." + input.getAttribute("rel"))).forEach(function (item) {
  //       item.style.display = 'block';
  //     });
  //   });
  // }
}