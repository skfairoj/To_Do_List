
        let tasks = [];
        let currentFilter = 'all';

        function addTask() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();

            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            const task = {
                id: Date.now(),
                text: taskText,
                completed: false,
                createdAt: new Date().toLocaleString()
            };

            tasks.push(task);
            input.value = '';
            renderTasks();
            updateStats();
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
                updateStats();
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
            updateStats();
        }

        function filterTasks(filter) {
            currentFilter = filter;
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            renderTasks();
        }

        function clearCompleted() {
            if (confirm('Are you sure you want to delete all completed tasks?')) {
                tasks = tasks.filter(t => !t.completed);
                renderTasks();
                updateStats();
            }
        }

        function renderTasks() {
            const tasksSection = document.getElementById('tasksSection');
            const clearSection = document.getElementById('clearSection');
            
            let filteredTasks = tasks;
            
            if (currentFilter === 'active') {
                filteredTasks = tasks.filter(t => !t.completed);
            } else if (currentFilter === 'completed') {
                filteredTasks = tasks.filter(t => t.completed);
            }

            if (filteredTasks.length === 0) {
                tasksSection.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📝</div>
                        <h3>No ${currentFilter} tasks</h3>
                        <p>${currentFilter === 'all' ? 'Add a task to get started!' : `You have no ${currentFilter} tasks.`}</p>
                    </div>
                `;
            } else {
                tasksSection.innerHTML = filteredTasks.map(task => `
                    <div class="task-item ${task.completed ? 'completed' : ''}">
                        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                        <div class="task-text">${task.text}</div>
                        <div class="task-time">${task.createdAt}</div>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `).join('');
            }

            // Show/hide clear completed button
            const hasCompleted = tasks.some(t => t.completed);
            clearSection.style.display = hasCompleted ? 'block' : 'none';
        }

        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const active = total - completed;

            document.getElementById('totalTasks').textContent = total;
            document.getElementById('activeTasks').textContent = active;
            document.getElementById('completedTasks').textContent = completed;
        }

        // Initialize
        renderTasks();
        updateStats();