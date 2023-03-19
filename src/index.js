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
    static allTodos = [];
    static numProjects = 0;
    todos = [];
    name = "Projecty";

    //New Projects can be initialized with todos.
    constructor(name, ...args) {
        this.name = name;
        this.allTodos = Project.allTodos.concat(args);
        this.todos = args;
        this.numProjects++;
    }

    //Pushes a ToDoItem to the todos AND all_todos arrays.
    add(item) {
        this.allTodos.push(item);
        this.todos.push(item);
    }

    //Removes a given ToDoItem from both todos and all_todos.
    remove(item) {
        const all_index = this.allTodos.indexOf(item);
        this.allTodos.splice(all_index, 1);

        const index = this.todos.indexOf(item);
        this.todos.splice(index, 1);
    }
}

class ProjectList {
    list = [];

    constructor(...args) {
        this.list = [...args];
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
    let defaultProject = new Project('Project 1');
    let todo = new ToDoItem('brush teeth', 'for 2 min', '2/23/23', '3');
    defaultProject.add(todo);
    let projects = new ProjectList(defaultProject);

    // Appends an array of ToDoItem components to the task list component.
    const appendTasks = (...args) => {
        const taskList = document.querySelector('#task-list');
        taskList.append(...args);
    }

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
        
        // const title = document.createElement('h2');
        component.textContent = proj.name;

        // component.append(title);
        
        component.addEventListener('click', () => {
            appendTasks(proj.todos);
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

    // Returns the project list as a component.
    const projectListDisplay = () => {
        const listContainer = document.createElement('div');
        listContainer.id = 'list-container';

        const list = document.createElement('ul');
        list.id = 'list';

        const all = document.createElement('li');
        all.id = 'all';
        all.textContent = 'All';

        all.addEventListener('click', () => {
            appendTasks(...Project.all_todos);
        });

        list.append(all);

        projects.list.forEach((proj) => {
            list.append(projectComponentFactory(proj));
        });

        listContainer.append(list);
        return listContainer;
    }

    const render = () => {
        document.body.append(taskListDisplay(), projectListDisplay());
        console.log("Rendered!");
    }

    return {toDoComponentFactory, projectComponentFactory, taskListDisplay, appendTasks, projectListDisplay, render};
})();

page.render();



