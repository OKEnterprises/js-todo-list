class ToDoItem {
    title;
    description;
    dueDate;
    priority;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    static all_todos = [];
    static num_projects = 0;
    todos = [];
    name = `Project ${num_projects}`;

    //New Projects can be initialized with todos.
    constructor(name, ...args) {
        this.name = name;
        this.all_todos = this.all_todos.concat(args);
        this.todos = args;
        this.num_projects++;
    }

    //Pushes a ToDoItem to the todos AND all_todos arrays.
    add(item) {
        this.all_todos.push(item);
        this.todos.push(item);
    }

    //Removes a given ToDoItem from both todos and all_todos.
    remove(item) {
        const all_index = this.all_todos.indexOf(item);
        this.all_todos.splice(all_index, 1);

        const index = this.todos.indexOf(item);
        this.todos.splice(index, 1);
    }
}

class ProjectList {
    list = [];

    constructor(...args) {
        this.list = args;
    }

    add(project) {
        this.list.push(project);
    }

    remove(project) {
        const index = this.todos.indexOf(item);
        this.list.splice(index, 1);
    }
}

const page = (() => {
    let projects = new ProjectList(new Project('Project 1'));

    // Takes in a ToDoItem object and returns an HTML component for it.
    const toDoComponentFactory = (todo) => {
        const component = document.createElement('div');

        const title = document.createElement('div');
        title.textContent = todo.title;

        const dueDate = document.createElement('div');
        dueDate.textContent = todo.dueDate;

        component.append(title, dueDate);
        return component;
    }

    // Takes in a Project object and returns an HTML component for it.
    const projectComponentFactory = (proj) => {
        const component = document.createElement('div');
        
        const title = document.createElement('h2');
        title.textContent = proj.name;

        component.append(title);
        
        component.addEventListener('click', () => {

        });

        return component;
    }

    // Returns the task list as a component.
    const taskListDisplay = () => {
        const listContainer = document.createElement('div');

        const taskList = document.createElement('ul');
        taskList.id = "task-list";

        listContainer.append(taskList);
        return listContainer;
    }

    // Appends an array of ToDoItem components to the task list component.
    const appendTasks = (...args) => {
        const taskList = document.querySelector('#task-list');
        taskList.append(...args);
    }

    // Returns the project list as a component.
    const projectListDisplay = () => {
        const listContainer = document.createElement('div');
        listContainer.id = 'list-container';

        const list = document.createElement('ul')
        list.id = 'list';

        const all = document.createElement('li')
        all.id = 'all';
        all.textContent = 'All';

        all.addEventListener('click', () => {
            appendTasks(Project.all_todos);
        });

        list.append(all);

        projects.list.forEach((project) => {
            const listItem = document.createElement('li');
            listItem.textContent = project.name;
            listItem.addEventListener
            list.append(listItem);
        });
    }



})();



