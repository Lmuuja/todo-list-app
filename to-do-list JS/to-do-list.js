let tasks = [
    {
        "title": "إنهاء المشروع",
        "date": "2024-06-30",
        "isDone": false
    },
    {
        "title": "إنهاء كورس الجافاسكريبت",
        "date": "2024-06-30",
        "isDone": false
    },
    {
        "title": "إبدء كورس إكسبريس ",
        "date": "2024-06-30",
        "isDone": false
    },
    
];

function GetStorageTask(){
    let taskString = localStorage.getItem("tasks");
    tasks = JSON.parse(taskString) || [];
}
GetStorageTask();

//   add task //---------------------------------------------------------------

function FillTasks(){
    document.getElementById("tasks").innerHTML = "";
    index = 0;
    for (task of tasks) {
        let content = `
    <div class="task ${task.isDone ? 'done' : ''}" style="display: flex; justify-content: space-between; align-items: center; background-color: ${task.isDone ? 'rgb(57, 218, 121)' : 'white'}; border-radius: 12px; padding: 15px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); flex-wrap: wrap; gap: 15px; transition: all 0.3s ease;">
        
        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 8px; opacity: ${task.isDone ? '0.6' : '1'};">
            <h2 style="margin: 0; font-size: 18px; color: #111; text-align: start; word-break: break-word; text-decoration: ${task.isDone ? 'line-through' : 'none'};">
                ${task.title}
            </h2>
            <div style="display: flex; align-items: center; gap: 6px; color: #666; font-size: 14px;">
                <span class="material-symbols-outlined" style="font-size: 18px;">
                    calendar_month
                </span>
                <span>${task.date}</span>
            </div>
        </div>
        
        <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
            
            <button onclick="deleteTask(${index})" class="circular" style="background-color: rgb(97, 3, 3); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
            </button>
            
            ${task.isDone ? `
            <button onclick="TogglecheckTask(${index})" class="circular" style="background-color: rgb(97, 3, 61); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
            </button>
            ` : `
            <button onclick="TogglecheckTask(${index})" class="circular" style="background-color: rgb(3, 97, 3); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 18px;">check</span>
            </button>
            `}
            
            <button onclick="editTask(${index})" class="circular" style="background-color: rgb(3, 3, 97); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
            </button> 
        
        </div>
    </div>
`;
    // let content = `
    //     <div class="task ${task.isDone ? 'done' : ''} ">
    //         <div style="width: 70%;margin: 20px;">
    //             <h2>${task.title}</h2>
    //             <div>
    //                 <span class="material-symbols-outlined">
    //                 calendar_month
    //                 </span>
    //                 <span>${task.date}</span>
    //             </div>
    //         </div>
    //         <div style="display: flex; justify-content: space-between; align-items: center; width:20%; padding: 10px;">
    //             <button onclick="deleteTask(${index})" class="circular" style="background-color: rgb(97, 3, 3); color: white;">
    //                 <span class="material-symbols-outlined">
    //                     delete
    //                 </span>
    //             </button>
    //             ${task.isDone ? `<button onclick="TogglecheckTask(${index})" class="circular" style="background-color: rgb(97, 3, 61); color: white;">
    //                 <span class="material-symbols-outlined"> cancel </span>
    //             </button>` 
    //             : `
    //                <button onclick="TogglecheckTask(${index})" class="circular" style="background-color: rgb(3, 97, 3); color: white;">
    //                 <span class="material-symbols-outlined">
    //                 check
    //                 </span>
    //             </button> `}
                
    //             <button onclick="editTask(${index})" class="circular" style="background-color: rgb(3, 3, 97); color: white;">
    //                 <span class="material-symbols-outlined">
    //                 edit
    //                 </span>
    //             </button>   
    //                 </span>
    //             </button>
            
    //         </div>
    //     </div>
    // `;
    document.getElementById("tasks").innerHTML += content;
    index++;
}}
FillTasks();


document.getElementById("add_task").addEventListener("click", function() {
    let date = new Date().toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    let nameTask = prompt("Enter the task name");
    let taskObj = {
        "title": nameTask,
        "date": date,
        "isDone": false
    }
    if(nameTask){
        tasks.push(taskObj);
    }
    SetStorageTask();
    FillTasks()
});

    // add task //---------------------------------------------------------------

   // delete task //---------------------------------------------------------------
   function deleteTask(index){
    if (confirm("Are you sure you want to delete the task ? " +  tasks[index].title)) {
        tasks.splice(index, 1);
        SetStorageTask();
        FillTasks();
    }
   }
   // delete task //---------------------------------------------------------------

   // edit task //---------------------------------------------------------------
   function editTask(index){
    let newTitle = prompt("Enter the new title for the task", tasks[index].title);
    if (newTitle !== null && newTitle.trim() !== "") {
        tasks[index].title = newTitle;
        SetStorageTask();
        FillTasks();
    }
   }
   // edit task //---------------------------------------------------------------

   // check task //---------------------------------------------------------------
   function TogglecheckTask(index){
    let task = tasks[index];
    task.isDone = !task.isDone;
    SetStorageTask();
    FillTasks();
   }
    // check task //---------------------------------------------------------------

    // Storage functon //---------------------------------------------------------------
    function SetStorageTask(){
    let taskString = JSON.stringify(tasks);
    localStorage.setItem("tasks", taskString);
    }
    // Storage functon //---------------------------------------------------------------

    