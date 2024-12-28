const form = document.querySelector('#todo-form');
const taskInput = document.querySelector('#todo-input');
const localTodos = document.querySelector('#local-todos');
const zeroTodo = document.querySelector('#zero-todo');
let currentId = parseInt(localStorage.getItem('currentId')) || 200; 

form.addEventListener('submit', addTodo); 

localTodos.addEventListener('click', deleteTask);

localTodos.addEventListener('click', doneTask);

if (localStorage.getItem('TasksHTML')) {
    localTodos.innerHTML = localStorage.getItem('TasksHTML');
    if (localTodos.innerHTML.trim() === '') {
        zeroTodo.style.display = 'block';
    } else {
        zeroTodo.style.display = 'none';
    }
    initAccordion(); 
}

function addTodo(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    currentId++; 

    const taskHTML = `
            <div class="accordion-item">
                <div class="accordion">
                    <span>ID: ${currentId}</span>
                    <p class="completed">unfinished</p>
                    <div class="button">
                        <button class="btn-action" data-action="done">
                            <img src="Components/img/check-mark.png" alt="">
                        </button>
                        <button class="btn-action" data-action="delete">
                            <img src="Components/img/x-mark.png" alt="">
                        </button>
                    </div>
                </div>
                <div class="accordion-output" style="display: none;">
                    <p>User ID: 1</p>
                    <p>Title: ${taskText}</p>
                </div>
            </div>
    `;
    localTodos.insertAdjacentHTML('beforeend', taskHTML);

    taskInput.value = '';
    taskInput.focus();

    if (localTodos.children.length > 0) {
        zeroTodo.style.display = 'none';
    }

    saveCurrentIdToLS(); 
    initAccordion();
    saveHTMLtoLS();
}

function deleteTask(event) {
   if(event.target.dataset.action === 'delete') {
    event.target.closest('.accordion-item').remove();
   }
   saveHTMLtoLS();
}

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        event.stopPropagation();

        const accordion = event.target.closest('.accordion');
        const status = accordion.querySelector('.completed');

        if (status.textContent.trim() === 'unfinished') {
            status.textContent = 'completed';
            status.style.color = 'green';
        } else {
            status.textContent = 'unfinished';
            status.style.color = '#333'; 
        }
    }
    saveHTMLtoLS();
}

function saveHTMLtoLS() {
    localStorage.setItem('TasksHTML', localTodos.innerHTML);
}

function saveCurrentIdToLS() {
    localStorage.setItem('currentId', currentId);
}
