class Controller {
    liststorage
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.onAddTodoItem = (text, time) => this.addTodo(text, time);
        this.view.onRemoveTodoItem = (todoItemId) => this.removeTodo(todoItemId);
        this.view.onEditTodoItem = (id, txt, checked, cardTime, select) => this.editTodo(id, txt, checked, cardTime, select);
        this.view.onTodoItemStateChanged = (todoItem) => this.itemStateChaged(todoItem);
        this.view.onTodoItemStateSelect = (todoItemSelected) => this.itemStageSelect(todoItemSelected);
        this.view.onUpdateTodoList = () => this.updateList();
    } 

    addTodo(text, time) {
        this.model.addTodoItem(text, time);
        this.view.countItems(this.model.storage.liststorage.length);
    }
    removeTodo(todoItemId) {
        this.model.removeTodoItemByIndex(todoItemId);
        this.view.countItems(this.model.storage.liststorage.length);
    }

    editTodo(id, txt, checked, cardTime, select) {
        this.model.editTodoItem(id, txt, checked, cardTime, select)
    }

    itemStateChaged(id) {
        this.model.triggerStateById(id)
            // console.log(this.liststorage)
    }
    itemStageSelect(id){
        this.model.triggerSelectedById(id);
    }
    updateList(){
        this.model.updateTodoList();
    }
}