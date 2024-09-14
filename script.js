const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
    updateProgress();
}
listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateProgress();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateProgress();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    updateProgress();
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updateProgress();
}

function updateProgress() {
    const allTasks = document.querySelectorAll('#list-container li');
    const completedTasks = document.querySelectorAll('#list-container li.checked');
    
    const totalTasks = allTasks.length;
    const completedPercentage = totalTasks === 0 ? 0 : (completedTasks.length / totalTasks) * 100;

    
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${completedPercentage}%`;


    const percentageText = document.querySelector('.percentage-text');
    percentageText.textContent = `${Math.round(completedPercentage)}% Completed`;
}
showTask();
