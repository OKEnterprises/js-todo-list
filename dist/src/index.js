var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import './style.css';
console.log("index.ts loaded");
// Takes in an item and a list.
// Returns a copy of list with the first instance of the item removed.
// If the list does not contain the item, returns the list unaltered.
function remove(list, item) {
    var retVal = __spreadArray([], list, true);
    var index = retVal.indexOf(item);
    if (index < 0)
        return list;
    retVal.splice(index, 1);
    return retVal;
}
var ToDoItem = /** @class */ (function () {
    function ToDoItem(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
    }
    return ToDoItem;
}());
var Project = /** @class */ (function () {
    //New Projects can be initialized with todos.
    function Project(name) {
        var toDos = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            toDos[_i - 1] = arguments[_i];
        }
        this.toDos = [];
        this.name = "Projecty";
        this.name = name;
        Project.allToDos = Project.allToDos.concat(toDos);
        this.toDos = toDos;
        Project.numProjects++;
    }
    //Pushes a ToDoItem to the todos AND all_todos arrays.
    Project.prototype.add = function (item) {
        Project.allToDos.push(item);
        this.toDos.push(item);
    };
    //Removes a given ToDoItem from both todos and all_todos.
    Project.prototype.remove = function (item) {
        var all_index = Project.allToDos.indexOf(item);
        Project.allToDos.splice(all_index, 1);
        var index = this.toDos.indexOf(item);
        this.toDos.splice(index, 1);
    };
    Project.allToDos = [];
    Project.numProjects = 0;
    return Project;
}());
var page = (function () {
    var defaultToDo = new ToDoItem('brush teeth', 'for 2 min', '2/23/23', 3);
    var defaultProject = new Project('Project 1', defaultToDo);
    var allProjects = [defaultProject];
    // Appends an array of ToDoComponent objects to the task list component.
    var appendTasks = function () {
        var toDoComps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toDoComps[_i] = arguments[_i];
        }
        var taskList = document.querySelector('#task-list');
        taskList.append.apply(taskList, toDoComps);
    };
    // Appends an array of ProjectComponent objects to the task list component.
    var appendProjects = function () {
        var projComps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            projComps[_i] = arguments[_i];
        }
        var projectList = document.querySelector('#project-list');
        projectList.append.apply(projectList, projComps);
    };
    // Takes in a ToDoItem object and returns an HTML component for it.
    var toDoComponentFactory = function (toDo) {
        var component = document.createElement('li');
        var container = document.createElement('div');
        var title = document.createElement('div');
        title.textContent = toDo.title;
        var dueDate = document.createElement('div');
        dueDate.textContent = toDo.dueDate.toDateString();
        component.append(title, dueDate);
        container.append(component);
        return component;
    };
    // Takes in a variable number of ToDoItems and returns an array of HTML components.
    var toDoComponentArray = function () {
        var toDos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toDos[_i] = arguments[_i];
        }
        return __spreadArray([], toDos, true).map(function (toDo) { return toDoComponentFactory(toDo); });
    };
    var projectComponentArray = function () {
        var projects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            projects[_i] = arguments[_i];
        }
        return __spreadArray([], projects, true).map(function (proj) { return projectComponentFactory(proj); });
    };
    // Takes in a Project object and returns an HTML component for it.
    var projectComponentFactory = function (proj) {
        var component = document.createElement('li');
        component.id = proj.name;
        component.textContent = proj.name;
        component.addEventListener('click', function () {
            appendTasks.apply(void 0, toDoComponentArray.apply(void 0, proj.toDos));
        });
        return component;
    };
    // Returns the task list as a component.
    var taskListDisplay = function () {
        var listContainer = document.createElement('div');
        listContainer.classList.add('list-container');
        var taskList = document.createElement('ul');
        taskList.id = "task-list";
        listContainer.append(taskList);
        return listContainer;
    };
    // Returns the project list as a component.
    var projectListDisplay = function () {
        var listContainer = document.createElement('div');
        listContainer.classList.add('list-container');
        var list = document.createElement('ul');
        list.id = 'project-list';
        // 'All' displays the tasks from across all projects.
        var all = document.createElement('li');
        all.id = 'all';
        all.textContent = 'All';
        all.addEventListener('click', function () {
            appendTasks.apply(void 0, toDoComponentArray.apply(void 0, Project.allToDos));
        });
        list.append(all);
        // Creates and appends a project component for each project in the projects list.
        list.append.apply(list, allProjects.map(function (proj) { return projectComponentFactory(proj); }));
        listContainer.append(list);
        return listContainer;
    };
    var render = function () {
        var body = document.querySelector('body');
        body.append(taskListDisplay(), projectListDisplay());
        console.log("Render function completed");
    };
    return {
        allProjects: allProjects,
        appendTasks: appendTasks,
        toDoComponentFactory: toDoComponentFactory,
        toDoComponentArray: toDoComponentArray,
        projectComponentFactory: projectComponentFactory,
        taskListDisplay: taskListDisplay,
        projectListDisplay: projectListDisplay,
        render: render,
    };
})();
page.render();
