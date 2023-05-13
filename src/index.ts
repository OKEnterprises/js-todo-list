import './style.css';
import * as dfns from 'date-fns';
import { de } from 'date-fns/locale';

console.log("index.ts loaded");

// Takes in an item and a list.
// Returns a copy of list with the first instance of the item removed.
// If the list does not contain the item, returns the list unaltered.
function remove(list: any[], item: any): any[] {
    let retVal = [...list];
    const index: number = retVal.indexOf(item);
    if (index < 0) return list;
    retVal.splice(index, 1);
    return retVal;
}

class ToDoItem {
    title: string;
    description: string;
    dueDate: Date;
    priority: number;

    constructor(title: string, description: string, dueDate: string, priority: string) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = parseInt(priority);
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

interface ProjectComponent extends HTMLLIElement {}
interface ToDoComponent extends HTMLLIElement {}
interface AddTaskButtonComponent extends HTMLButtonElement {}
interface NewTaskFormComponent extends HTMLFormElement {};

const page = (() => {
    let defaultToDo: ToDoItem = new ToDoItem('brush teeth', 'for 2 min', '2/23/23', '3');
    let defaultProject: Project = new Project('Project 1', defaultToDo);
    let allProjects: Map<string, Project> = new Map();
    allProjects.set(defaultProject.name, defaultProject);
    let selectedProjectName: string = defaultProject.name;

    const BODY = document.querySelector('body')!;

    // Appends an array of ToDoComponent objects to the task list component.
    const appendTasks = (...toDoComps: ToDoComponent[]): void => {
        const taskList = document.querySelector('#task-list')!;
        taskList.replaceChildren(...toDoComps);
    }

    // Appends an array of ProjectComponent objects to the task list component.
    const appendProjects = (...projComps: ProjectComponent[]): void => {
        const projectList = document.querySelector('#project-list')!;
        projectList.replaceChildren(...projComps);
    }

    // Takes in a ToDoItem object and returns an HTML component for it.
    const toDoComponentFactory = (toDo: ToDoItem): ToDoComponent => {
        const component: HTMLLIElement = document.createElement('li');
        const container: HTMLDivElement = document.createElement('div');

        const title: HTMLDivElement = document.createElement('div');
        title.textContent = toDo.title;

        const dueDate: HTMLDivElement = document.createElement('div');
        dueDate.textContent = toDo.dueDate.toDateString();

        component.append(title, dueDate);
        container.append(component);
        return component;
    }

    // Takes in a variable number of ToDoItems and returns an array of HTML components.
    const toDoComponentArray = (...toDos: ToDoItem[]): ToDoComponent[] => {
        return [...toDos].map(toDo => toDoComponentFactory(toDo));
    }

    const projectComponentArray = (...projects: Project[]): ProjectComponent[] => {
        return [...projects].map(proj => projectComponentFactory(proj));
    }

    // Takes in a Project object and returns an HTML component for it.
    const projectComponentFactory = (proj: Project): ProjectComponent => {
        const component = document.createElement('li');
        component.id = proj.name;
        component.textContent = proj.name;

        component.addEventListener('click', () => {
            selectedProjectName = proj.name;
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
            selectedProjectName = 'All';
            appendTasks(...toDoComponentArray(...Project.allToDos));
        });

        list.append(all);

        // Creates and appends a project component for each project in the projects list.
        let pl: Project[] = [...allProjects.values()];
        list.append(...projectComponentArray(...pl)); 

        listContainer.append(list);
        return listContainer;
    }

    const newTaskFormDisplay = (): NewTaskFormComponent => {
        const form: NewTaskFormComponent = document.createElement('form');
        form.id = 'new-task-form';

        const titleLabel: HTMLLabelElement = document.createElement('label');
        titleLabel.htmlFor = 'title';
        titleLabel.textContent = 'Title';

        const title: HTMLInputElement = document.createElement('input');
        title.type = 'text';
        title.id = 'title';
        title.name = 'title';

        const descriptionLabel: HTMLLabelElement = document.createElement('label');
        descriptionLabel.htmlFor = 'description';
        descriptionLabel.textContent = 'Description';
        
        const description: HTMLInputElement = document.createElement('input');
        description.type = 'text';
        description.id = 'description';
        description.name = 'description';

        const dueDateLabel: HTMLLabelElement = document.createElement('label');
        dueDateLabel.htmlFor = 'due-date';
        dueDateLabel.textContent = 'Due date';
        
        const dueDate: HTMLInputElement = document.createElement('input');
        dueDate.type = 'date';
        dueDate.id = 'due-date';
        dueDate.name = 'due-date';

        const priorityLabel: HTMLLabelElement = document.createElement('label');
        priorityLabel.htmlFor = 'priority';
        priorityLabel.textContent = 'Priority';

        const priority: HTMLInputElement = document.createElement('input');
        priority.type = 'number';
        priority.id = 'priority';
        priority.name = 'priority';

        const submit: HTMLButtonElement = document.createElement('button');
        submit.textContent = 'Submit';
        submit.addEventListener('click', () => {
            let toDo = new ToDoItem(title.value, description.value, dueDate.value, priority.value);

        });

        form.append(titleLabel, title, descriptionLabel, description, dueDateLabel, dueDate, priorityLabel, priority);
        return form;
    } 

    const addTaskButtonDisplay = (): AddTaskButtonComponent => {
        const button: AddTaskButtonComponent = document.createElement('button');
        button.textContent = '+';
        button.id = 'add-task-button';

        button.addEventListener('click', () => {
            BODY.replaceChildren(taskListDisplay(), projectListDisplay(), addTaskButtonDisplay(), newTaskFormDisplay());
        });

        return button;
    }

    const render = () => {
        BODY.replaceChildren(taskListDisplay(), projectListDisplay(), addTaskButtonDisplay());
    }

    return {
            allProjects,
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