const input=document.getElementById('input')
const addBtn=document.getElementById('add')
const taskList=document.getElementById('task-list')

let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task)=>renderTask(task))


addBtn.addEventListener('click',()=>{
    let taskText=input.value.trim();
    if (taskText==="") return
    const newTask={
        id:Date.now(),
        text:taskText,
        completed:false,
    }
    tasks.push(newTask)
    saveTasks();
    renderTask(newTask);
    console.log(tasks)
    input.value="";
})


function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

function renderTask(task){
    const li=document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.completed) li.classList.add('completed');
    
    // li.innerHTML=`
    // <span>${task.text}</span>
    // <button>Delete</button>`;

    //alternate of innerHTML
    const span=document.createElement("span");
    span.textContent=task.text;
    const btn=document.createElement('button');
    btn.textContent="Delete";
    li.appendChild(span);
    li.appendChild(btn);

    taskList.appendChild(li)

    span.addEventListener('click',()=>{
        task.completed = !task.completed;
        span.classList.toggle('completed');
        saveTasks();
    })

    btn.addEventListener('click',(e)=>{
        e.stopPropagation();
        tasks=tasks.filter((t)=>t.id !== task.id);
        li.remove();
        saveTasks();
    });
}