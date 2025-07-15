const fs = require("fs");
const filePath = "./tasks.json";

function loadTasks() {
    try {
        const dataBuffer = fs.readFileSync(filePath);

        const dataJSON = dataBuffer.toString();

        data = JSON.parse(dataJSON);
        console.log(data);
        return data;
    } catch (error) {
        return [];
    }
}

function saveTasks(tasks) {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
}

function addTask(task) {
    let tasks = loadTasks();
    tasks.push({ task: task });
    saveTasks(tasks);
    console.log("Task added", tasks);
}
function removeTask(id) {
    id--;
    let tasks = loadTasks();
    tasks = tasks.filter((_, index) => {
        return index != id;
    });
    saveTasks(tasks);
}

function listTasks() {
    loadTasks();
}

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTasks();
} else if (command === "remove") {
    removeTask(parseInt(argument));
} else {
    console.log("Command not found");
}
