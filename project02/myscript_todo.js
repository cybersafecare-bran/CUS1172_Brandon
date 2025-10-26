let taskArray = [];

// Get references to DOM elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.onsubmit = function(event) {
    event.preventDefault();
    
    const taskTitle = document.getElementById('task-title').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskStatusElements = document.getElementsByName('task-status');
    
    let taskStatus = '';
    for (let i = 0; i < taskStatusElements.length; i++) {
        if (taskStatusElements[i].checked) {
            taskStatus = taskStatusElements[i].value;
        }
    }
    
    const task = {
        title: taskTitle,
        priority: taskPriority,
        status: taskStatus
    };
    
    taskArray.push(task);
    
    addTaskToDOM(task, taskArray.length - 1);
    
    taskForm.reset();
};

function addTaskToDOM(task, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    
    const taskText = document.createElement('span');
    taskText.textContent = task.title + ' - Priority: ' + task.priority + ' - Status: ' + task.status;
    
    if (task.status === 'completed') {
        taskText.style.textDecoration = 'line-through';
    }
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'btn btn-danger btn-sm float-right';
    removeBtn.onclick = function() {
        removeTask(index);
    };
    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Mark as Complete';
    completeBtn.className = 'btn btn-warning btn-sm float-right';
    completeBtn.onclick = function() {
        markTaskComplete(index);
    };
    
    li.appendChild(taskText);
    li.appendChild(removeBtn);
    li.appendChild(completeBtn);
    
    taskList.appendChild(li);
}

function removeTask(index) {
    taskArray.splice(index, 1);
    
    rebuildTaskList();
}

function markTaskComplete(index) {
    taskArray[index].status = 'completed';
    
    rebuildTaskList();
}

function rebuildTaskList() {
    taskList.innerHTML = '';
    
    for (let i = 0; i < taskArray.length; i++) {
        addTaskToDOM(taskArray[i], i);
    }
}
