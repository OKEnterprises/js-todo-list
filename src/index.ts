import './style.css';

// TODO You should add some persistence to this todo app using the Web Storage API. 

// Takes in an item and a list.
// Returns a copy of list with the first instance of the item removed.
// If the list does not contain the item, returns the list unaltered.

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

    edit(title: string, description: string, dueDate: string, priority: string) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = parseInt(priority);
    }
}

class ToDoList {
    private list: ToDoItem[];

    constructor(...toDos: ToDoItem[]) {
        this.list = [...toDos];
    }

    add(toDo: ToDoItem) {
        this.list.push(toDo);
    }

    addMultiple(...toDos: ToDoItem[]) {
        this.list.concat(toDos);
    }

    remove(toDo: ToDoItem) {
        const index: number = this.list.indexOf(toDo);
        if (index >= 0) this.list.splice(index, 1);
    }

    toArray() {
        return this.list;
    }
}

class Project {
    static allToDos: ToDoList = new ToDoList();
    static numProjects = 0;
    toDos: ToDoList;
    name = "Projecty";

    //New Projects can be initialized with todos.
    constructor(name: string, ...toDos: ToDoItem[]) {
        this.name = name;
        Project.allToDos.addMultiple(...toDos);
        this.toDos = new ToDoList(...toDos);
        Project.numProjects++;
    }

    //Pushes a ToDoItem to the todos AND all_todos arrays.
    add(item: ToDoItem) {
        Project.allToDos.add(item);
        this.toDos.add(item);
    }

    //Removes a given ToDoItem from both todos and all_todos.
    remove(toDo: ToDoItem) {
        Project.allToDos.remove(toDo);
        this.toDos.remove(toDo);
    }
}

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
            const newTaskForm: NewTaskFormComponent = newTaskFormDisplay();

            const taskTitle: HTMLInputElement = newTaskForm.querySelector("#title");
            taskTitle.value = toDo.title;

            const taskDescription: HTMLInputElement = newTaskForm.querySelector('#description');
            taskDescription.value = toDo.description;

            const dueDate: HTMLInputElement = newTaskForm.querySelector('#due-date');
            dueDate.value = `${toDo.dueDate}`;

            const priority: HTMLInputElement = newTaskForm.querySelector('#priority');
            priority.value = `${toDo.priority}`;
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

        component.addEventListener('click', () => {
            if (detailsShowing) {
                component.replaceChildren(container);
                detailsShowing = false;
            } else {
                component.replaceChildren(container, toDoDetailsComponentFactory(toDo));
                detailsShowing = true;
            }
        });

        component.addEventListener('contextmenu', () => {
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
            appendTasks(...toDoComponentArray(...Project.allToDos.toArray()));
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
            const toDo: ToDoItem = new ToDoItem(title.value, description.value, dueDate.value, priority.value);
            const proj: Project = allProjectsMap.get(selectedProjectName);
            proj.add(toDo);
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
        };
})();

page.render();