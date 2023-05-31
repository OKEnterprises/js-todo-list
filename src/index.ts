import './style.css';

// TODO You should add some persistence to this todo app using the Web Storage API. 

// The ToDoItem class models an item on a to-do list with a title, description, due date, and priority.
// The item's details can be edited.

class ToDoId {
    readonly id: number;
    private static maxId = -1;

    constructor() {
        this.id = ToDoId.maxId++;
    }

    equals(id: ToDoId): boolean {
        return this.id == id.id;
    }
}

class ToDoItem {
    title: string;
    description: string;
    dueDate: Date;
    priority: number;
    id: ToDoId;

    constructor(title: string, description: string, dueDate: string, priority: string) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = parseInt(priority);
        this.id = new ToDoId();
    }

    edit(title: string, description: string, dueDate: string, priority: string): void {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = parseInt(priority);
    }

    equals(other: ToDoItem): boolean {
        return this.id.equals(other.id);
    }
}

// The ToDoList class models a to-do list.
// It is backed by an array of ToDoItems.
// ToDoItems can be added and removed from the list.

class ToDoList {
    private list: ToDoItem[];

    constructor(...toDos: ToDoItem[]) {
        this.list = [...toDos];
    }

    add(...toDos: ToDoItem[]) {
        this.list.concat(toDos);
    }

    remove(toDo: ToDoItem) {
        console.log(toDo);
        const index: number = this.indexOf(toDo);
        this.removeIdx(index);
    }

    removeIdx(idx: number) {
        if (idx >= 0) this.list.splice(idx, 1);
    }

    contains(toDo: ToDoItem): boolean {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].equals(toDo)) return true;
        }
        return false;
    }

    indexOf(toDo: ToDoItem): number {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].equals(toDo)) return i;
        }
        return -1;
    }

    toArray() {
        return this.list;
    }

    get(id: ToDoId): ToDoItem {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id.equals(id)) return this.list[i];
        }
    }
}

// The Project class models a project the user wants to track tasks for.
// It contains two static fields, allToDos and numProjects.
// Each Project has its own ToDoList.
// ToDoItems can be added and removed.

class Project {
    static allToDos: ToDoList = new ToDoList();
    static numProjects = 0;
    toDos: ToDoList;
    name = "Projecty";

    //New Projects can be initialized with todos.
    constructor(name: string, ...toDos: ToDoItem[]) {
        this.name = name;
        Project.allToDos.add(...toDos);
        this.toDos = new ToDoList(...toDos);
        Project.numProjects++;
    }

    //Pushes a ToDoItem to the todos AND all_todos arrays.
    add(item: ToDoItem) {
        Project.allToDos.add(item);
        this.toDos.add(item);
        console.log(Project.allToDos, this.toDos);
    }

    //Removes a given ToDoItem from both todos and all_todos.
    remove(toDo: ToDoItem) {
        Project.allToDos.remove(toDo);
        this.toDos.remove(toDo);
    }

    contains(toDo: ToDoItem): boolean {
        return this.toDos.contains(toDo);
    }

    indexOf(toDo: ToDoItem): number {
        return this.toDos.indexOf(toDo);
    }

    get(id: ToDoId): ToDoItem {
        return this.toDos.get(id);
    }
}

// The Page module renders and tracks events for the page.

type ProjectComponent = HTMLLIElement
type ToDoComponent = HTMLLIElement
type ToDoDetailsComponent = HTMLDivElement
type AddTaskButtonComponent = HTMLButtonElement
type NewTaskFormComponent = HTMLFormElement

const page = (() => {
    const defaultToDo: ToDoItem = new ToDoItem('brush teeth', 'for 2 min', '2/23/23', '3');
    const defaultProject: Project = new Project('Project 1', defaultToDo);
    const allProjectsMap: Map<string, Project> = new Map();
    allProjectsMap.set(defaultProject.name, defaultProject);
    let selectedProjectName: string = defaultProject.name;
    let selectedToDo: ToDoId = defaultToDo.id;
    let editMode = false;

    const BODY = document.querySelector('body');

    // Appends an array of ToDoComponent objects to the task list component.
    const appendTasks = (...toDoComps: ToDoComponent[]): void => {
        const taskList = document.querySelector('#task-list');
        taskList.replaceChildren(...toDoComps);
    }

    // Takes in a ToDoItem and returns an HTML component for its details.
    const toDoDetailsComponentFactory = (toDo: ToDoItem): ToDoDetailsComponent => {
        const component: ToDoDetailsComponent = document.createElement('div');
        const description: HTMLParagraphElement = document.createElement('p');
        const priority: HTMLParagraphElement = document.createElement('p');
        const editButton: HTMLButtonElement = document.createElement('button');

        description.textContent = toDo.description;
        priority.textContent = `Priority ${toDo.priority}`;

        editButton.textContent = "Edit"
        editButton.addEventListener('click', () => {
            editMode = true;
            selectedToDo = toDo.id;

            const newTaskForm: NewTaskFormComponent = newTaskFormDisplay();

            const taskTitle: HTMLInputElement = newTaskForm.querySelector("#title");
            taskTitle.value = toDo.title;

            const taskDescription: HTMLInputElement = newTaskForm.querySelector('#description');
            taskDescription.value = toDo.description;

            const dueDate: HTMLInputElement = newTaskForm.querySelector('#due-date');
            dueDate.value = `${toDo.dueDate}`;

            const priority: HTMLInputElement = newTaskForm.querySelector('#priority');
            priority.value = `${toDo.priority}`;

            BODY.append(newTaskForm);
        });

        component.append(description, priority, editButton);
        return component;
    }

    // Takes in a ToDoItem object and returns an HTML component for it.
    const toDoComponentFactory = (toDo: ToDoItem): ToDoComponent => {
        const component: ToDoComponent = document.createElement('li');
        const container: HTMLDivElement = document.createElement('div');

        const title: HTMLDivElement = document.createElement('div');
        title.textContent = toDo.title;

        const dueDate: HTMLDivElement = document.createElement('div');
        dueDate.textContent = toDo.dueDate.toDateString();

        let detailsShowing = false;

        container.addEventListener('click', () => {
            if (detailsShowing) {
                component.replaceChildren(container);
                detailsShowing = false;
            } else {
                component.replaceChildren(container, toDoDetailsComponentFactory(toDo));
                detailsShowing = true;
            }
        });

        container.addEventListener('contextmenu', () => {
            const pr: Project = allProjectsMap.get(selectedProjectName);
            pr.remove(toDo);
            component.remove();
        })

        container.append(title, dueDate);
        component.append(container);
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
            console.log(selectedProjectName);
            appendTasks(...toDoComponentArray(...proj.toDos.toArray()));
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
            console.log(selectedProjectName);
            const tasks = Project.allToDos.toArray();
            const taskComponents = toDoComponentArray(...tasks);
            console.log(tasks);
            appendTasks(...taskComponents);
        });

        list.append(all);

        // Creates and appends a project component for each project in the projects list.
        const pl: Project[] = [...allProjectsMap.values()];
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
            const proj: Project = allProjectsMap.get(selectedProjectName);

            if (editMode) {
                const toDo = proj.get(selectedToDo);
                toDo.edit(title.value, description.value, dueDate.value, priority.value);
                editMode = false;
            } else {
                const toDo: ToDoItem = new ToDoItem(title.value, description.value, dueDate.value, priority.value);
                console.log(toDo);
                proj.add(toDo);
            }

            allProjectsMap.set(selectedProjectName, proj);

            render();
        });

        form.append(titleLabel, title, descriptionLabel, description, dueDateLabel, dueDate, priorityLabel, priority, submit);
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
            allProjectsMap,
            appendTasks,
            toDoComponentFactory,
            toDoComponentArray,
            projectComponentFactory,
            taskListDisplay, 
            projectListDisplay, 
            render,
        }
})();

page.render();