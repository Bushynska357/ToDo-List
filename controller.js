class Controller {
    liststorage
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.liststorage = liststorage;
        this.view.onAddTodoItem = (text, time) => this.addTodo(text, time);
        this.view.onRemoveTodoItem = (todoItemId) => this.removeTodo(todoItemId);
        this.view.onEditTodoItem = (id, txt, checked) => this.editTodo(id, txt, checked);
        this.view.onTodoItemStateChanged = (todoItem) => this.itemStateChaged(todoItem);
    }

    addTodo(text, time) {
        this.model.addTodoItem(text, time);
        this.view.countItems(this.model.liststorage.length);
    }

    removeTodo(todoItemId) {
        this.model.removeTodoItemByIndex(todoItemId);
        this.view.countItems(this.model.liststorage.length);
    }

    editTodo(id, txt, checked) {
        this.model.editTodoItem(id, txt, checked)
    }

    itemStateChaged(id) {
        this.model.triggerStateById(id)
            // console.log(this.liststorage)
    }
}