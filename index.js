class ToDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    static all_todos = []
    todos = [];
    constructor(...args) {
        this.all_todos = this.all_todos.concat(args);
        this.todos = args;
    }

    add(item) {
        this.all_todos.push(item);
        this.todos.push(item);
    }
}



