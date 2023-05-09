import './style.css';
import * as dfns from 'date-fns';

class ToDoItem {
    title: string;
    description: string;
    dueDate: Date;
    priority: number;

    constructor(title: string, description: string, dueDate: string, priority: number) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
    }
}

class Project {
    static allToDos: ToDoItem[] = [];
    static numProjects: number = 0;
    toDos: ToDoItem[] = [];
    name: string = "Projecty";

    //New Projects can be initialized with todos.
    constructor(name: string, ...toDos: ToDoItem[]) {
        this.name = name;
        Project.allToDos = Project.allToDos.concat(toDos);
        this.toDos = toDos;
        Project.numProjects++;
    }

    //Pushes a ToDoItem to the todos AND all_todos arrays.
    add(item: ToDoItem) {
        Project.allToDos.push(item);
        this.toDos.push(item);
    }

    //Removes a given ToDoItem from both todos and all_todos.
    remove(item: ToDoItem) {
        const all_index = Project.allToDos.indexOf(item);
        Project.allToDos.splice(all_index, 1);

        const index = this.toDos.indexOf(item);
        this.toDos.splice(index, 1);
    }
}

class ProjectList {
    list: Project[] = [];

    constructor(...args: Project[]) {
        this.list = [...args];
    }

    add(proj: Project) {
        this.list.push(proj);
    }

    remove(project: Project) {
        const index = this.list.indexOf(project);
        this.list.splice(index, 1);
    }
}

interface ProjectComponent extends HTMLLIElement {}
interface ToDoComponent extends HTMLLIElement {}

const page = (() => {
    let defaultProject: Project = new Project('Project 1');
    let todo: ToDoItem = new ToDoItem('brush teeth', 'for 2 min', '2/23/23', 3);
    defaultProject.add(todo);
    let projects: ProjectList = new ProjectList(defaultProject);
    
    // Appends an array of ToDoComponent objects to the task list component.
    const appendTasks = (...tasks: ToDoComponent[]) => {
        const taskList = document.querySelector('#task-list')!;
        taskList.append(...tasks);
    }

    // Appends an array of ProjectComponent objects to the task list component.
    const appendProjects = (...projects: ProjectComponent[]) => {
        const projectList = document.querySelector('#project-list')!;
        projectList.append(...projects);
    }

    // Takes in a ToDoItem object and returns an HTML component for it.
    const toDoComponentFactory = (todo: ToDoItem): ToDoComponent => {
        const component: HTMLLIElement = document.createElement('li');
        const container: HTMLDivElement = document.createElement('div');

        const title: HTMLDivElement = document.createElement('div');
        title.textContent = todo.title;

        const dueDate: HTMLDivElement = document.createElement('div');
        dueDate.textContent = todo.dueDate.toDateString();

        component.append(title, dueDate);
        container.append(component);
        return component;
    }

    // Takes in a variable number of ToDoItems and returns an array of HTML components.
    const toDoComponentArray = (...args: ToDoItem[]): ToDoComponent[] => {
        return [...args].map(toDo => toDoComponentFactory(toDo));
    }

    const projectComponentArray = (...args: Project[]): ProjectComponent[] => {
        return [...args].map(proj => projectComponentFactory(proj));
    }

    // Takes in a Project object and returns an HTML component for it.
    const projectComponentFactory = (proj: Project): ProjectComponent => {
        const component = document.createElement('li');
        component.id = proj.name;
        component.textContent = proj.name;

        component.addEventListener('click', () => {
            appendTasks(...toDoComponentArray(...proj.toDos));
        }); 

        return component;
    }

     // Returns the task list as a component.
     const taskListDisplay = (): HTMLDivElement => {
        const listContainer: HTMLDivElement = document.createElement('div');
        listContainer.classList.add('list-container');

        const taskList: HTMLUListElement = document.createElement('ul');
        taskList.id = "task-list";

        listContainer.append(taskList);
        return listContainer;
    }

    // Returns the project list as a component.
    const projectListDisplay = (): HTMLDivElement => {
        const listContainer: HTMLDivElement = document.createElement('div');
        listContainer.classList.add('list-container');

        const list: HTMLUListElement = document.createElement('ul');
        list.id = 'project-list';

        // 'All' displays the tasks from across all projects.
        const all: ProjectComponent = document.createElement('li');
        all.id = 'all';
        all.textContent = 'All';

        all.addEventListener('click', () => {
            appendTasks(...toDoComponentArray(...Project.allToDos));
        });

        list.append(all);

        // Creates and appends a project component for each project in the projects list.
        list.append(...projects.list.map(proj => projectComponentFactory(proj))); 

        listContainer.append(list);
        return listContainer;
    }

    const render = () => {
        const body = document.querySelector('body')!;
        body.append(taskListDisplay(), projectListDisplay());
    }

    return {
            defaultProject,
            todo,
            projects,
            appendTasks,
            toDoComponentFactory,
            toDoComponentArray,
            projectComponentFactory,
            taskListDisplay, 
            projectListDisplay, 
            render,
        };
})();

page.render();