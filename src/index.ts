import './style.css';

// globalMaxId is a global variable reflecting the highest id on a ToDoId object .
let globalMaxId = -1;

interface StorableToDoId {
    id: number;
}

function storableToDoIdFactory(): StorableToDoId {
    return { id: globalMaxId++ }
}

class ToDoId {
    readonly id: number;

    constructor(o: StorableToDoId) {
        this.id = o.id;
    }

    equals(id: ToDoId): boolean {
        return this.id == id.id;
    }
}

interface StorableToDoItem {
    title: string;
    description: string;
    dueDate: string;
    priority: number;
    id: StorableToDoId;
}

function storableToDoItemFactory(title: string, description: string, dueDate: string, priority: string): StorableToDoItem {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: parseInt(priority),
        id: storableToDoIdFactory()
    }
}

// The ToDoItem class models an item on a to-do list with a title, description, due date, and priority.
// The item's details can be edited. 

class ToDoItem {
    title: string;
    description: string;
    dueDate: Date;
    priority: number;
    id: ToDoId;

    constructor(o: StorableToDoItem) {
        this.title = o.title;
        this.description = o.description;
        this.dueDate = new Date(o.dueDate);
        this.id = new ToDoId(o.id);
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

    asStorable(): StorableToDoItem {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate.toDateString(),
            priority: this.priority,
            id: this.id,
        }
    }
}

// The ToDoList class models a to-do list.
// It is backed by an array of ToDoItems.
// ToDoItems can be added and removed from the list.

interface StorableToDoList {
    list: StorableToDoItem[]
}

function storableToDoListFactory(...toDos: StorableToDoItem[]): StorableToDoList {
    return { list: [...toDos] }
}

class ToDoList {
    private list: ToDoItem[];

    constructor(o: StorableToDoList) {
        this.list = o.list.map(storable => new ToDoItem(storable));
    }

    add(...toDos: ToDoItem[]): boolean {
        for (let i = 0; i < toDos.length; i++) {
            if (this.contains(toDos[i])) return false;
        } 
        
        this.list = this.list.concat(toDos);
        return true;
    }

    remove(toDo: ToDoItem): ToDoItem {
        const index: number = this.indexOf(toDo);
        return this.removeIdx(index);
    }

    removeIdx(idx: number): ToDoItem {
        if (idx >= 0) return this.list.splice(idx, 1)[0];
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

    toArray(): ToDoItem[] {
        return this.list;
    }

    get(id: ToDoId): ToDoItem {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id.equals(id)) return this.list[i];
        }
    }

    asStorable(): StorableToDoList {
        return {
            list: this.toArray().map(toDo => toDo.asStorable())
        }
    }
}

// The Project class models a project the user wants to track tasks for.
// It contains two static fields, allToDos and numProjects.
// Each Project has its own ToDoList.
// ToDoItems can be added and removed.

interface StorableProject { 
    name: string,
    toDos: StorableToDoList,
}

function storableProjectFactory(name: string, ...toDos: StorableToDoItem[]): StorableProject {
    return {
        name,
        toDos: storableToDoListFactory(...toDos),
    }
}

const globalToDos: ToDoList = (() => {
    const allToDos: ToDoList = new ToDoList({ list: [] });
    let allProjects: StorableProjectDictionary;
    
    try {
        allProjects = JSON.parse(localStorage.getItem('allProjects'));
    } catch (error) {
        return allToDos;
    }

    // Adds all tasks from all projects to a unified ToDoList
    for (const proj in allProjects) { 
        allToDos.add(...new Project(allProjects[proj]).toDos.toArray());
    }

    return allToDos;
})();

class Project {
    name: string;
    toDos: ToDoList;
    static numProjects = 0;

    //New Projects can be initialized with todos.
    constructor(o: StorableProject) {
        this.name = o.name;
        this.toDos = new ToDoList(o.toDos);
        globalToDos.add(...this.toDos.toArray());
        Project.numProjects++;
    }

    //Pushes a ToDoItem to the todos AND all_todos arrays.
    add(item: ToDoItem): boolean {
        return globalToDos.add(item) && this.toDos.add(item);
    }

    //Removes a given ToDoItem from both todos and all_todos.
    remove(toDo: ToDoItem): ToDoItem {
        globalToDos.remove(toDo);
        return this.toDos.remove(toDo);
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

    asStorable(): StorableProject {
        return {
            name: this.name,
            toDos: this.toDos.asStorable(),
        }
    }
}

function storablesToProjArr(...storables: StorableProject[]): Project[] {
    return storables.map(storable => new Project(storable));
}

// The Page module renders and tracks events for the page.

type ProjectComponent = HTMLLIElement
type ToDoComponent = HTMLLIElement
type ToDoDetailsComponent = HTMLDivElement
type AddTaskButtonComponent = HTMLButtonElement
type NewTaskFormComponent = HTMLFormElement

interface StorableProjectDictionary {
    [index: string]: StorableProject
}

function storableProjectDictFactory(...projects: StorableProject[]): StorableProjectDictionary {
    const res: StorableProjectDictionary = {}
    projects.forEach(proj => res[proj.name] = proj);
    return res;
}

function storableProjectValues(dict: StorableProjectDictionary): StorableProject[] {
    const res = [];
    for (const property in dict) res.push(dict[property]);
    return res;
}

const defaultDataToLocalStorage = () => {
    const defaultToDo: StorableToDoItem = storableToDoItemFactory('brush teeth', 'for 2 min', '2/23/23', '3');
    const defaultProject: StorableProject = storableProjectFactory('Project 1', defaultToDo);
    const allProjects: StorableProjectDictionary = storableProjectDictFactory(defaultProject);
    localStorage.setItem('allProjects', JSON.stringify(allProjects));
    localStorage.setItem('selectedProjectName', defaultProject.name);
    localStorage.setItem('selectedToDo', JSON.stringify(defaultToDo.id));
};

const page = (() => {
    defaultDataToLocalStorage();

    let allProjects: StorableProjectDictionary;
    let selectedProjectName: string;
    let selectedToDo: ToDoId;
    let editMode = false;

    try {
        allProjects = JSON.parse(localStorage.getItem('allProjects'));
        selectedProjectName = localStorage.getItem('selectedProjectName');
        selectedToDo = JSON.parse(localStorage.getItem('selectedToDo'));
    } catch (error) {
        allProjects = {};
        selectedProjectName = "All";
    }

    const BODY = document.querySelector('body');

    // Appends an array of ToDoComponent objects to the task list component.
    const appendTasks = (...toDoComps: ToDoComponent[]): void => {
        document.querySelector('#task-list').replaceChildren(...toDoComps);
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
            const pr: Project = new Project(allProjects[selectedProjectName]);
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
            const tasks = globalToDos.toArray();
            const taskComponents = toDoComponentArray(...tasks);
            appendTasks(...taskComponents);
        });

        list.append(all);

        // Creates and appends a project component for each project in the projects list.
        const pl = storablesToProjArr(...storableProjectValues(allProjects));
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

        const onSubmit = () => {
            console.log("onsubmit");
            const proj: Project = new Project(allProjects[selectedProjectName]);

            if (editMode) {
                const toDo = proj.get(selectedToDo);
                toDo.edit(title.value, description.value, dueDate.value, priority.value);
                editMode = false;
            } else {
                const toDo: ToDoItem = new ToDoItem(storableToDoItemFactory(title.value, description.value, dueDate.value, priority.value));
                proj.add(toDo);
            }

            allProjects[selectedProjectName] = proj.asStorable();
            localStorage.setItem('allProjects', JSON.stringify(allProjects));

            render();
        }
        
        submit.addEventListener('click', onSubmit);

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
            allProjects,
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