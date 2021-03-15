class Controller {
    liststorage
    constructor(model, view) {
        this.model = model;
        this.view = view;
        // this.liststorage = liststorage;
        this.view.onAddTodoItem = (text, time) => this.addTodo(text, time);
        this.view.onRemoveTodoItem = (todoItemId) => this.removeTodo(todoItemId);
        this.view.onEditTodoItem = (id, txt, checked, cardTime) => this.editTodo(id, txt, checked, cardTime);
        this.view.onTodoItemStateChanged = (todoItem) => this.itemStateChaged(todoItem);
    }

    addTodo(text, time) {
        this.model.addTodoItem(text, time);
        this.view.countItems(this.model.storage.liststorage.length);
    }
    removeTodo(todoItemId) {
        this.model.removeTodoItemByIndex(todoItemId);
        this.view.countItems(this.model.storage.liststorage.length);
    }

    editTodo(id, txt, checked, cardTime) {
        this.model.editTodoItem(id, txt, checked, cardTime)
    }

    itemStateChaged(id) {
        this.model.triggerStateById(id)
            // console.log(this.liststorage)
    }
}