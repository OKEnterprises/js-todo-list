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





/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWixDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvRG9JdGVtIHtcbiAgICB0aXRsZTtcbiAgICBkZXNjcmlwdGlvbjtcbiAgICBkdWVEYXRlO1xuICAgIHByaW9yaXR5O1xuXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdCB7XG4gICAgc3RhdGljIGFsbFRvZG9zID0gW107XG4gICAgc3RhdGljIG51bVByb2plY3RzID0gMDtcbiAgICB0b2RvcyA9IFtdO1xuICAgIG5hbWUgPSBcIlByb2plY3R5XCI7XG5cbiAgICAvL05ldyBQcm9qZWN0cyBjYW4gYmUgaW5pdGlhbGl6ZWQgd2l0aCB0b2Rvcy5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYWxsVG9kb3MgPSBQcm9qZWN0LmFsbFRvZG9zLmNvbmNhdChhcmdzKTtcbiAgICAgICAgdGhpcy50b2RvcyA9IGFyZ3M7XG4gICAgICAgIHRoaXMubnVtUHJvamVjdHMrKztcbiAgICB9XG5cbiAgICAvL1B1c2hlcyBhIFRvRG9JdGVtIHRvIHRoZSB0b2RvcyBBTkQgYWxsX3RvZG9zIGFycmF5cy5cbiAgICBhZGQoaXRlbSkge1xuICAgICAgICB0aGlzLmFsbFRvZG9zLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMudG9kb3MucHVzaChpdGVtKTtcbiAgICB9XG5cbiAgICAvL1JlbW92ZXMgYSBnaXZlbiBUb0RvSXRlbSBmcm9tIGJvdGggdG9kb3MgYW5kIGFsbF90b2Rvcy5cbiAgICByZW1vdmUoaXRlbSkge1xuICAgICAgICBjb25zdCBhbGxfaW5kZXggPSB0aGlzLmFsbFRvZG9zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIHRoaXMuYWxsVG9kb3Muc3BsaWNlKGFsbF9pbmRleCwgMSk7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3RMaXN0IHtcbiAgICBsaXN0ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IFsuLi5hcmdzXTtcbiAgICB9XG5cbiAgICBhZGQocHJvamVjdCkge1xuICAgICAgICB0aGlzLmxpc3QucHVzaChwcm9qZWN0KTtcbiAgICB9XG5cbiAgICByZW1vdmUocHJvamVjdCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuXG5jb25zdCBwYWdlID0gKCgpID0+IHtcbiAgICBsZXQgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdCgnUHJvamVjdCAxJyk7XG4gICAgbGV0IHRvZG8gPSBuZXcgVG9Eb0l0ZW0oJ2JydXNoIHRlZXRoJywgJ2ZvciAyIG1pbicsICcyLzIzLzIzJywgJzMnKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGQodG9kbyk7XG4gICAgbGV0IHByb2plY3RzID0gbmV3IFByb2plY3RMaXN0KGRlZmF1bHRQcm9qZWN0KTtcblxuICAgIC8vIEFwcGVuZHMgYW4gYXJyYXkgb2YgVG9Eb0l0ZW0gY29tcG9uZW50cyB0byB0aGUgdGFzayBsaXN0IGNvbXBvbmVudC5cbiAgICBjb25zdCBhcHBlbmRUYXNrcyA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stbGlzdCcpO1xuICAgICAgICB0YXNrTGlzdC5hcHBlbmQoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLy8gVGFrZXMgaW4gYSBUb0RvSXRlbSBvYmplY3QgYW5kIHJldHVybnMgYW4gSFRNTCBjb21wb25lbnQgZm9yIGl0LlxuICAgIGNvbnN0IHRvRG9Db21wb25lbnRGYWN0b3J5ID0gKHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuXG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcblxuICAgICAgICBjb21wb25lbnQuYXBwZW5kKHRpdGxlLCBkdWVEYXRlKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvLyBUYWtlcyBpbiBhIFByb2plY3Qgb2JqZWN0IGFuZCByZXR1cm5zIGFuIEhUTUwgY29tcG9uZW50IGZvciBpdC5cbiAgICBjb25zdCBwcm9qZWN0Q29tcG9uZW50RmFjdG9yeSA9IChwcm9qKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBcbiAgICAgICAgLy8gY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBjb21wb25lbnQudGV4dENvbnRlbnQgPSBwcm9qLm5hbWU7XG5cbiAgICAgICAgLy8gY29tcG9uZW50LmFwcGVuZCh0aXRsZSk7XG4gICAgICAgIFxuICAgICAgICBjb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBhcHBlbmRUYXNrcyhwcm9qLnRvZG9zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSB0YXNrIGxpc3QgYXMgYSBjb21wb25lbnQuXG4gICAgY29uc3QgdGFza0xpc3REaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICB0YXNrTGlzdC5pZCA9IFwidGFzay1saXN0XCI7XG5cbiAgICAgICAgbGlzdENvbnRhaW5lci5hcHBlbmQodGFza0xpc3QpO1xuICAgICAgICByZXR1cm4gbGlzdENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBwcm9qZWN0IGxpc3QgYXMgYSBjb21wb25lbnQuXG4gICAgY29uc3QgcHJvamVjdExpc3REaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpc3RDb250YWluZXIuaWQgPSAnbGlzdC1jb250YWluZXInO1xuXG4gICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBsaXN0LmlkID0gJ2xpc3QnO1xuXG4gICAgICAgIGNvbnN0IGFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGFsbC5pZCA9ICdhbGwnO1xuICAgICAgICBhbGwudGV4dENvbnRlbnQgPSAnQWxsJztcblxuICAgICAgICBhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBhcHBlbmRUYXNrcyguLi5Qcm9qZWN0LmFsbF90b2Rvcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3QuYXBwZW5kKGFsbCk7XG5cbiAgICAgICAgcHJvamVjdHMubGlzdC5mb3JFYWNoKChwcm9qKSA9PiB7XG4gICAgICAgICAgICBsaXN0LmFwcGVuZChwcm9qZWN0Q29tcG9uZW50RmFjdG9yeShwcm9qKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3RDb250YWluZXIuYXBwZW5kKGxpc3QpO1xuICAgICAgICByZXR1cm4gbGlzdENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRhc2tMaXN0RGlzcGxheSgpLCBwcm9qZWN0TGlzdERpc3BsYXkoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyZWQhXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB7dG9Eb0NvbXBvbmVudEZhY3RvcnksIHByb2plY3RDb21wb25lbnRGYWN0b3J5LCB0YXNrTGlzdERpc3BsYXksIGFwcGVuZFRhc2tzLCBwcm9qZWN0TGlzdERpc3BsYXksIHJlbmRlcn07XG59KSgpO1xuXG5wYWdlLnJlbmRlcigpO1xuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9