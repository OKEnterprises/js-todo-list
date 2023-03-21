(self["webpackChunkjs_todo_list"] = self["webpackChunkjs_todo_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

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
        const index = this.todos.indexOf(project);
        this.list.splice(index, 1);
    }
}

const page = (() => {
    let defaultProject = new Project('Project 1');
    let todo = new ToDoItem('brush teeth', 'for 2 min', '2/23/23', 3);
    defaultProject.add(todo);
    let projects = new ProjectList(defaultProject);

    // Appends an array of ToDoItem components to the task list component.
    const appendTasks = (comps) => {
        const taskList = document.querySelector('#task-list');
        taskList.append(...comps);
    }

    // Takes in a ToDoItem object and returns an HTML component for it.
    const toDoComponentFactory = (todo) => {
        const component = document.createElement('li');
        const container = document.createElement('div');

        const title = document.createElement('div');
        title.textContent = todo.title;

        const dueDate = document.createElement('div');
        dueDate.textContent = todo.dueDate;

        component.append(title, dueDate);
        container.append(component);
        return component;
    }

    // Takes in a variable number of ToDoItems and returns an array of HTML components.
    const toDoComponentArray = (...args) => {
        res = [];
        [...args].forEach((todo) => {
            res.push(toDoComponentFactory(todo));
        });
        return res;
    }

    // Takes in a Project object and returns an HTML component for it.
    const projectComponentFactory = (proj) => {
        const component = document.createElement('li');
        component.id = proj.name;
        component.textContent = proj.name;

        component.addEventListener('click', () => {
            appendTasks(toDoComponentArray(proj.todos));
        }); // BUG: Click appends [Object object] to taskList

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
            appendTasks(toDoComponentArray(Project.allTodos));
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
    }

    return {
            toDoComponentFactory,
            toDoComponentArray,
            projectComponentFactory,
            taskListDisplay, 
            appendTasks, 
            projectListDisplay, 
            render,
        };
})();

page.render();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUyxHQUFHOztBQUVaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb0RvSXRlbSB7XG4gICAgdGl0bGU7XG4gICAgZGVzY3JpcHRpb247XG4gICAgZHVlRGF0ZTtcbiAgICBwcmlvcml0eTtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIHN0YXRpYyBhbGxUb2RvcyA9IFtdO1xuICAgIHN0YXRpYyBudW1Qcm9qZWN0cyA9IDA7XG4gICAgdG9kb3MgPSBbXTtcbiAgICBuYW1lID0gXCJQcm9qZWN0eVwiO1xuXG4gICAgLy9OZXcgUHJvamVjdHMgY2FuIGJlIGluaXRpYWxpemVkIHdpdGggdG9kb3MuXG4gICAgY29uc3RydWN0b3IobmFtZSwgLi4uYXJncykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFsbFRvZG9zID0gUHJvamVjdC5hbGxUb2Rvcy5jb25jYXQoYXJncyk7XG4gICAgICAgIHRoaXMudG9kb3MgPSBhcmdzO1xuICAgICAgICB0aGlzLm51bVByb2plY3RzKys7XG4gICAgfVxuXG4gICAgLy9QdXNoZXMgYSBUb0RvSXRlbSB0byB0aGUgdG9kb3MgQU5EIGFsbF90b2RvcyBhcnJheXMuXG4gICAgYWRkKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5hbGxUb2Rvcy5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLnRvZG9zLnB1c2goaXRlbSk7XG4gICAgfVxuXG4gICAgLy9SZW1vdmVzIGEgZ2l2ZW4gVG9Eb0l0ZW0gZnJvbSBib3RoIHRvZG9zIGFuZCBhbGxfdG9kb3MuXG4gICAgcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgYWxsX2luZGV4ID0gdGhpcy5hbGxUb2Rvcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICB0aGlzLmFsbFRvZG9zLnNwbGljZShhbGxfaW5kZXgsIDEpO1xuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0TGlzdCB7XG4gICAgbGlzdCA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICB0aGlzLmxpc3QgPSBbLi4uYXJnc107XG4gICAgfVxuXG4gICAgYWRkKHByb2plY3QpIHtcbiAgICAgICAgdGhpcy5saXN0LnB1c2gocHJvamVjdCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YocHJvamVjdCk7XG4gICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cblxuY29uc3QgcGFnZSA9ICgoKSA9PiB7XG4gICAgbGV0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoJ1Byb2plY3QgMScpO1xuICAgIGxldCB0b2RvID0gbmV3IFRvRG9JdGVtKCdicnVzaCB0ZWV0aCcsICdmb3IgMiBtaW4nLCAnMi8yMy8yMycsIDMpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZCh0b2RvKTtcbiAgICBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdExpc3QoZGVmYXVsdFByb2plY3QpO1xuXG4gICAgLy8gQXBwZW5kcyBhbiBhcnJheSBvZiBUb0RvSXRlbSBjb21wb25lbnRzIHRvIHRoZSB0YXNrIGxpc3QgY29tcG9uZW50LlxuICAgIGNvbnN0IGFwcGVuZFRhc2tzID0gKGNvbXBzKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stbGlzdCcpO1xuICAgICAgICB0YXNrTGlzdC5hcHBlbmQoLi4uY29tcHMpO1xuICAgIH1cblxuICAgIC8vIFRha2VzIGluIGEgVG9Eb0l0ZW0gb2JqZWN0IGFuZCByZXR1cm5zIGFuIEhUTUwgY29tcG9uZW50IGZvciBpdC5cbiAgICBjb25zdCB0b0RvQ29tcG9uZW50RmFjdG9yeSA9ICh0b2RvKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcblxuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XG5cbiAgICAgICAgY29tcG9uZW50LmFwcGVuZCh0aXRsZSwgZHVlRGF0ZSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvLyBUYWtlcyBpbiBhIHZhcmlhYmxlIG51bWJlciBvZiBUb0RvSXRlbXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgSFRNTCBjb21wb25lbnRzLlxuICAgIGNvbnN0IHRvRG9Db21wb25lbnRBcnJheSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHJlcyA9IFtdO1xuICAgICAgICBbLi4uYXJnc10uZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICAgICAgcmVzLnB1c2godG9Eb0NvbXBvbmVudEZhY3RvcnkodG9kbykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUYWtlcyBpbiBhIFByb2plY3Qgb2JqZWN0IGFuZCByZXR1cm5zIGFuIEhUTUwgY29tcG9uZW50IGZvciBpdC5cbiAgICBjb25zdCBwcm9qZWN0Q29tcG9uZW50RmFjdG9yeSA9IChwcm9qKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbXBvbmVudC5pZCA9IHByb2oubmFtZTtcbiAgICAgICAgY29tcG9uZW50LnRleHRDb250ZW50ID0gcHJvai5uYW1lO1xuXG4gICAgICAgIGNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGFwcGVuZFRhc2tzKHRvRG9Db21wb25lbnRBcnJheShwcm9qLnRvZG9zKSk7XG4gICAgICAgIH0pOyAvLyBCVUc6IENsaWNrIGFwcGVuZHMgW09iamVjdCBvYmplY3RdIHRvIHRhc2tMaXN0XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSB0YXNrIGxpc3QgYXMgYSBjb21wb25lbnQuXG4gICAgY29uc3QgdGFza0xpc3REaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICB0YXNrTGlzdC5pZCA9IFwidGFzay1saXN0XCI7XG5cbiAgICAgICAgbGlzdENvbnRhaW5lci5hcHBlbmQodGFza0xpc3QpO1xuICAgICAgICByZXR1cm4gbGlzdENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBwcm9qZWN0IGxpc3QgYXMgYSBjb21wb25lbnQuXG4gICAgY29uc3QgcHJvamVjdExpc3REaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpc3RDb250YWluZXIuaWQgPSAnbGlzdC1jb250YWluZXInO1xuXG4gICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBsaXN0LmlkID0gJ2xpc3QnO1xuXG4gICAgICAgIGNvbnN0IGFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGFsbC5pZCA9ICdhbGwnO1xuICAgICAgICBhbGwudGV4dENvbnRlbnQgPSAnQWxsJztcblxuICAgICAgICBhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBhcHBlbmRUYXNrcyh0b0RvQ29tcG9uZW50QXJyYXkoUHJvamVjdC5hbGxUb2RvcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0LmFwcGVuZChhbGwpO1xuXG4gICAgICAgIHByb2plY3RzLmxpc3QuZm9yRWFjaCgocHJvaikgPT4ge1xuICAgICAgICAgICAgbGlzdC5hcHBlbmQocHJvamVjdENvbXBvbmVudEZhY3RvcnkocHJvaikpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0Q29udGFpbmVyLmFwcGVuZChsaXN0KTtcbiAgICAgICAgcmV0dXJuIGxpc3RDb250YWluZXI7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0YXNrTGlzdERpc3BsYXkoKSwgcHJvamVjdExpc3REaXNwbGF5KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b0RvQ29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgIHRvRG9Db21wb25lbnRBcnJheSxcbiAgICAgICAgICAgIHByb2plY3RDb21wb25lbnRGYWN0b3J5LFxuICAgICAgICAgICAgdGFza0xpc3REaXNwbGF5LCBcbiAgICAgICAgICAgIGFwcGVuZFRhc2tzLCBcbiAgICAgICAgICAgIHByb2plY3RMaXN0RGlzcGxheSwgXG4gICAgICAgICAgICByZW5kZXIsXG4gICAgICAgIH07XG59KSgpO1xuXG5wYWdlLnJlbmRlcigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==