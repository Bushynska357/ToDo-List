class View {
    onAddTodoItem;
    onRemoveTodoItem;
    onTodoItemStateChanged;
    onEditTodoItem;
    onEditChange;

    constructor() {
        this.addBtn = document.querySelector('.addBtn');
        this.counter = document.getElementById('counter');
        this.modalBtn = document.querySelector('.modalBtn');
        this.cancel = document.querySelector('.cancel');

        this.modalBtn.addEventListener('click', () => {
            let modal = document.getElementById('myModal');
            modal.style.display = "block";
        });
        this.cancel.addEventListener('click', () => {
            let modal = document.getElementById('myModal');
            modal.style.display = "none";
        });

        this.addBtn.addEventListener('click', () => {
            let text = document.getElementById("myInput").value;
            let time = new Date().toLocaleTimeString("en-us", {
                hour: 'numeric',
                minute: 'numeric'
            });
            if (this.onAddTodoItem) {
                this.onAddTodoItem(text, time);
            }
            document.getElementById("myInput").value = "";
        });
    }

    countItems(todoItems) {
        this.counter.innerText = todoItems;
    }

    renderTodoItem(todoItem) {
        const todoItemNode = this.createTodoItemNode();

        if (todoItem.isComplete) {
            todoItemNode.chbox.checked = true;
            todoItemNode.div.style.textDecoration = "line-through";
            todoItemNode.div.style.color = "#d6d6e4";
        } else {
            todoItemNode.chbox.checked = false;
            todoItemNode.div.style.textDecoration = "none";
            todoItemNode.div.style.color = "#82829c";
        }
        todoItemNode.removeButton.hidden = true;

        console.log(todoItem);

        let test = new Date();
        let h = test.getHours().toString();
        let m = test.getMinutes();
        todoItemNode.div.id = todoItem.index;
        todoItemNode.div.innerText = todoItem.text;
        todoItemNode.time.innerText = todoItem.time;
        todoItemNode.time.className = "creationTime";

        todoItemNode.removeButton.addEventListener('click', () => {
            if (this.onRemoveTodoItem) {
                this.onRemoveTodoItem(todoItemNode.div.id)
            }
            todoItemNode.li.remove();
        })

        todoItemNode.chbox.addEventListener('click', (event) => {
            if (this.onTodoItemStateChanged) {
                this.onTodoItemStateChanged(todoItemNode.div.id);
            }
            if (todoItemNode.chbox.checked) {
                todoItemNode.div.style.textDecoration = "line-through";
                todoItemNode.div.style.color = "#d6d6e4";
            } else {
                todoItemNode.div.style.textDecoration = "none";
                todoItemNode.div.style.color = "#82829c";
            }

            event.stopPropagation();
        })

        todoItemNode.editButton.addEventListener('click', () => {
            if (todoItemNode.editButton.innerText == "Edit") {
                todoItemNode.div.setAttribute("contenteditable", true);
                todoItemNode.editButton.innerText = "Ok";
                todoItemNode.div.style.border = "2px solid #000";
                todoItemNode.div.style.borderRadius = "5px";
            } else {
                todoItemNode.div.setAttribute("contenteditable", false)
                todoItemNode.editButton.innerText = "Edit";
                todoItemNode.div.style.border = "none";
                if (this.onEditTodoItem) {
                    this.onEditTodoItem(todoItemNode.div.id, todoItemNode.div.innerText, todoItemNode.chbox.checked);
                }
            }
        })

        todoItemNode.li.addEventListener('click', () => {
            console.log('Li click');
            console.log(todoItemNode.li.classList);
            if (this.onTodoItemStateChanged) {
                this.onTodoItemStateChanged(todoItemNode.div.id);
            }
            if (todoItemNode.removeButton.hidden == true) {
                todoItemNode.removeButton.hidden = false;
                todoItemNode.time.hidden = true;
            } else {
                todoItemNode.removeButton.hidden = true;
                todoItemNode.time.hidden = false;
            }
            let el = todoItemNode.li;

            let toggleUl = document.querySelector("ul#myUL li.current");
            if (toggleUl && toggleUl != todoItemNode.li) {
                toggleUl.classList.remove('current');
                el.classList.toggle("current");
            } else if (toggleUl == todoItemNode.li) {
                toggleUl.classList.remove('current');
            } else {
                el.classList.toggle("current");
            }
        })
    }

    createTodoItemNode() {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const removeButton = document.createElement('button');
        const editButton = document.createElement('button');
        const time = document.createElement('div');
        const chbox = document.createElement("input");
        const box = document.createElement('div');

        div.style.padding = '5px';
        li.style.borderBottom = '1px solid #e1e3e6';
        removeButton.innerText = "+";
        removeButton.className = "removeBtn";
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.margin = "0 -10px";
        chbox.style.margin = "0 10px";
        div.style.margin = "0 10px";
        time.style.innerText = 'test';
        editButton.innerText = "Edit";
        chbox.setAttribute("type", "checkbox");

        box.append(chbox,
            div);
        li.append(box,
            time,
            removeButton);
        document.getElementById("myUL").append(li);

        return {
            li,
            div,
            time,
            removeButton,
            editButton,
            chbox
        }
    }
}