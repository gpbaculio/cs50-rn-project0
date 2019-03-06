const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete'
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const text = prompt('What needs to be done?').trim();
  if (!!text) {
    // container
    const todoItem = document.createElement('li');
    todoItem.setAttribute('class', classNames.TODO_ITEM);
    // text
    const todoLabel = document.createElement('label');
    todoLabel.setAttribute('class', classNames.TODO_TEXT);
    todoLabel.textContent = text;
    // checkbox
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.classname = classNames.TODO_CHECKBOX;
    // nest checkbox on label
    todoLabel.appendChild(todoCheckbox);
    // delete
    const deleteTodo = document.createElement('div');
    deleteTodo.setAttribute('class', classNames.TODO_DELETE);
    deleteTodo.textContent = 'X';
    todoItem.append(todoLabel, deleteTodo);
    console.log('todoItem = ', todoItem);
    list.appendChild(todoItem);
    const todoCount = list.getElementsByTagName('li').length;
    itemCountSpan.innerHTML = todoCount;
  } else {
    alert('Please enter a valid todo');
  }
}
