const completedTodosList = document.getElementById('completed-todos');

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(todos => {
        const completedTodos = todos.filter(todo => todo.completed);
        
        completedTodos.forEach(todo => {
            const listItem = document.createElement('div');
            
            const accordion = document.createElement('div');

            accordion.classList.add('accordion');
            accordion.innerHTML = `ID: ${todo.id}`;
            
            listItem.appendChild(accordion);
            completedTodosList.appendChild(listItem);

            accordion.addEventListener('click', () => {
                let output = accordion.nextElementSibling;

                if (!output) {
                    const loading = document.createElement('div');
                    loading.classList.add('loading');
                    loading.innerHTML = 'Loading...';
                    listItem.appendChild(loading);

                    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
                        .then(response => response.json())
                        .then(fetchedTodo => {
                            listItem.removeChild(loading);

                            output = document.createElement('div');
                            output.classList.add('accordion-output');
                            output.innerHTML = `
                                <p>User ID: ${fetchedTodo.userId}</p>
                                <p>Title: ${fetchedTodo.title}</p>
                                <p>Completed: ${fetchedTodo.completed}</p>
                            `;
                            listItem.appendChild(output);
                        });
                } else {
                    listItem.removeChild(output);
                }
            });
        });
        initAccordion();
    })
