// Cache elements using getElementById and querySelector
const taskForm = document.getElementById('taskForm');
const taskInput = document.querySelector('#taskInput');
const taskList = document.getElementById('taskList');

// Event listener for form submission (with validation)
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  
  if (task === '') {
    alert('Task cannot be empty');
    return;
  }

  addTask(task);
  taskInput.value = '';
});

// Function to add task
function addTask(taskText) {
  // Create a DocumentFragment for optimized DOM manipulation
  const fragment = document.createDocumentFragment();

  // Create a new list item (LI) element
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  // Add mark as completed and delete buttons
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.classList.add('complete-btn');
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');

  // Append the buttons to the taskItem
  taskItem.appendChild(completeButton);
  taskItem.appendChild(deleteButton);
  
  // Append the taskItem to the fragment
  fragment.appendChild(taskItem);

  // Append the fragment to the list
  taskList.appendChild(fragment);
}

// Event delegation for complete and delete actions
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('complete-btn')) {
    const taskItem = e.target.parentNode;
    taskItem.classList.toggle('completed');
  }

  if (e.target.classList.contains('delete-btn')) {
    const taskItem = e.target.parentNode;
    taskItem.remove();
  }
});

// Browser Object Model (BOM) properties and methods
window.addEventListener('load', () => {
  console.log('Page has loaded');
});

window.addEventListener('beforeunload', (e) => {
  e.returnValue = 'Are you sure you want to leave?';
});

// Mark all tasks as completed
const markAllCompleteButton = document.createElement('button');
markAllCompleteButton.textContent = 'Mark All Complete';
document.body.appendChild(markAllCompleteButton);

markAllCompleteButton.addEventListener('click', () => {
  const tasks = document.querySelectorAll('li');
  tasks.forEach(task => task.classList.add('completed'));
});

// DOM event-based validation for task input
taskInput.addEventListener('input', () => {
  if (taskInput.value.length < 3) {
    taskInput.setCustomValidity('Task must be at least 3 characters long.');
  } else {
    taskInput.setCustomValidity('');
  }
});