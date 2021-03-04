var list = [{ text: 'test 1', index: 0, isComplete: false }, { text: 'test 2', index: 1, isComplete: true }];


localStorage = window.localStorage;
var liststorage= JSON.parse(localStorage.getItem('data'));
if (!liststorage){
    liststorage = this.list;
   
}
var getStorage = localStorage.getItem("data");
console.log(liststorage);


// OOP
// OOP in JS

// MVC 
// MVVM 

// this 
// prototype


// types in js
// value types vs reference types


// iterate functions
// map, filter, some ...

class View {
    onAddTodoItem;
    onRemoveTodoItem;
    onTodoItemStateChanged;
    onEditTodoItem;
    onEditChange;
    constructor(){
        this.addBtn = document.querySelector('.addBtn');
        
     
   
        this.addBtn.addEventListener('click', () => {
            let text = document.getElementById("myInput").value;
            if (this.onAddTodoItem){
                this.onAddTodoItem(text);     
            }
            // dispatch add todo event
            document.getElementById("myInput").value = "";
            
        });
     
        // this.addBtn.addEventListener('click', () => {
        //     let text = document.getElementById("myInput").value;
        //     if (this.onAddTodoItem){
        //         this.onAddTodoItem(text);     
        //     }
        //     // dispatch add todo event
        //     document.getElementById("myInput").value = "";
            
        // });
    
       
        
    }
    
    renderTodoItem(todoItem){
        const todoItemNode = this.createTodoItemNode();
        // if (  document.getElementById("myInput").value = ""){
        //     this.addBtn.disabled = true;
        // }else{
        //     this.addBtn.disabled = false;
        // }

        if (todoItem.isComplete) {
            todoItemNode.chbox.checked = true;
            todoItemNode.div.style.textDecoration = "line-through";
            todoItemNode.removeButton.disabled = false;
        }else{
            todoItemNode.chbox.checked = false;
            todoItemNode.div.style.textDecoration = "none";
            todoItemNode.removeButton.disabled = true;
        }

        todoItemNode.div.id = todoItem.index;
        todoItemNode.div.innerText = todoItem.text;

        todoItemNode.removeButton.addEventListener('click', () => {
            if (this.onRemoveTodoItem){
                this.onRemoveTodoItem(todoItemNode.div.id)
                
            }
            todoItemNode.li.remove();
        })

        todoItemNode.chbox.addEventListener('click', () =>{
            if (this.onTodoItemStateChanged){
                this.onTodoItemStateChanged(todoItemNode.div.id);
            }
            if (todoItemNode.chbox.checked) {
                todoItemNode.div.style.textDecoration = "line-through";
                todoItemNode.removeButton.disabled = false;           
            } else {
                todoItemNode.div.style.textDecoration = "none";
                todoItemNode.removeButton.disabled = true;
            }
        })
     
        

        todoItemNode.editButton.addEventListener('click',() => {
            if (todoItemNode.editButton.innerText == "Edit"){
                todoItemNode.div.setAttribute("contenteditable", true);
                todoItemNode.editButton.innerText = "Ok";
                todoItemNode.div.style.border = "2px solid #000";
                todoItemNode.div.style.borderRadius = "5px";
              
            }else{
                todoItemNode.div.setAttribute("contenteditable", false)
                todoItemNode.editButton.innerText = "Edit";
                todoItemNode.div.style.border = "none";
                if (this.onEditTodoItem){
                    this.onEditTodoItem(todoItemNode.div.id, todoItemNode.div.innerText, todoItemNode.chbox.checked);
                }
                
            }
        })
        
    }

    createTodoItemNode(){
        let li = document.createElement('li');
        let div = document.createElement('div');
        let removeButton = document.createElement('button');
        let editButton = document.createElement('button');
        let chbox = document.createElement("INPUT");

        div.style.padding = '5px';
        removeButton.innerText = "Remove";
        editButton.innerText  = "Edit";
        chbox.setAttribute("type", "checkbox");
        li.append(chbox,
            div,
            removeButton,
            editButton);
        document.getElementById("myUL").append(li);

        return {
            li,
            div,
            removeButton,
            editButton,
            chbox
        }
    }
   
   
}

class Controller{
    liststorage
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.liststorage = liststorage;
        this.view.onAddTodoItem = (text) => this.addTodo(text);
        this.view.onRemoveTodoItem = (todoItemId) => this.removeTodo(todoItemId);
        this.view.onEditTodoItem = (id, txt, checked) => this.editTodo(id, txt, checked);
        this.view.onTodoItemStateChanged = (todoItem) => this.itemStateChaged(todoItem);
    }
    
    addTodo(text){
        this.model.addTodoItem(text)
    }

    removeTodo(todoItemId){
        this.model.removeTodoItemByIndex(todoItemId)
    }

    editTodo(id, txt, checked){
        this.model.editTodoItem(id, txt, checked)
    }
 
    itemStateChaged(id){
        // todoItem.isComplete = !todoItem.isComplete;
        this.model.triggerStateById(id)
        // localStorage.setItem('data', JSON.stringify(this.liststorage));
        console.log(this.liststorage)
    }
}
   

class Model {
    liststorage
  
    constructor(view){
        this.view = view;
        this.liststorage = liststorage;
    }

    triggerStateById(id){
        let item = this.liststorage.find((item) => item.index == id);
        item.isComplete = !item.isComplete;
        localStorage.setItem('data', JSON.stringify(this.liststorage));
    }
   
    addTodoItem(text){
        let newListItem = {
            text: text,
            index: this.liststorage.length,
            isComplete: false
        }

        if (newListItem.text != ""){
            this.liststorage.push(newListItem);
            this.view.renderTodoItem(newListItem);
            localStorage.setItem('data', JSON.stringify(this.liststorage));
        }
        
        console.log(this.liststorage)
        localStorage.setItem('data', JSON.stringify(this.liststorage));
    }

    removeTodoItemByIndex(index){
        this.liststorage = this.liststorage.filter(item => item.index != index);

        // this.liststorage.splice(todoItem.index, 1);
       
        for (let i = 0; i<this.liststorage.length;i++){
            this.liststorage[i].index  = i
            localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
    //     for (let i in this.liststorge) {
    //         this.liststorge[i].index  = i
    //         localStorage.setItem('key', JSON.stringify(this.liststorge))
    // }
}

    editTodoItem(id, txt, checked){
        this.liststorage.splice(id, 1, { text: txt, index: Number(id), isComplete: checked})
        // localStorage.setItem('data', JSON.stringify(this.liststorage))
      
        for (let i = 0; i < this.liststorage.length; i++) {
            
            this.liststorage[i].index  = i;
            localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
        // localStorage.setItem('data', JSON.stringify(this.liststorage))
    }

}



document.addEventListener('DOMContentLoaded', () => {

    const view = new View();
    const model = new Model(view);
    const controller = new Controller(model, view);
    
    if(localStorage.getItem("data")!= null){
        for (let i = 0; i < this.liststorage.length; i++) {
            view.renderTodoItem(this.liststorage[i]);
        }
    }else{
        for (let i = 0; i < this.list.length; i++) {
            this.liststorage = view.renderTodoItem(this.list[i]);
            this.liststorage = localStorage.setItem('data', JSON.stringify(this.list))
        }
        
    }


});













   

// *******************************Classes*********************************


 // display(listItem) {
    //     view.div.id = listItem.index;
    //     view.div.innerText = listItem.text;
    //     view.removeButton.addEventListener('click', (e) => {
    //         this.list.splice(listItem.index, 1)
    //         view.li.remove();
    //         console.log(e);
    //         console.log(list);
    //     })
        
    //     if (listItem.isComplete) {
    //         view.chbox.checked = true;
    //         view.div.style.textDecoration = "line-through";
    //         model.notRemove(false)
    //         // checkButton.innerHTML = "Undo";
    //     }else{
    //          model.notRemove(true)
    //     }
        
    //     view.chbox.addEventListener('click', () => {
    //         if (!listItem.isComplete ) {
    //             view.div.style.textDecoration = "line-through";
    //             // checkButton.innerHTML = "Undo";
    //             listItem.isComplete = true;
    //             // view.removeButton.disabled = false;
    //             model.notRemove(false)
                    
    //         } else {
    //             view.div.style.textDecoration = "none";
    //             // checkButton.innerHTML = "Done";
    //             l   view.chbox.checked = false;
    //         view.div.style.textDecoration = "none";
    //     istItem.isComplete = false;
    //             // view.removeButton.disabled = true;
    //             model.notRemove(true)
    //             }
        
    //     })
        
       

        // view.editButton.addEventListener('click', () => {
        //     console.log(view.editButton.innerText);
        //     if (view.editButton.innerText == "Edit"){
        //         view.div.setAttribute("contenteditable", true);
        //         view.editButton.innerText = "Ok";
        //         view.div.style.border = "2px solid #000";
        //         view.div.style.borderRadius = "5px";
        //     }else{
        //         console.log('dd')
        //         view.div.setAttribute("contenteditable", false)
        //         view.editButton.innerText = "Edit";
        //         view.div.style.border = "none";
        //     }
    //     view.editButton.onclick = function (){
    //         if (view.editButton.innerText == "Edit"){
    //         view.div.setAttribute("contenteditable", true);
    //          view.editButton.innerText = "Ok";
    //          view.div.style.border = "2px solid #000";
    //          view.div.style.borderRadius = "5px";
    //      }else{
    //          view.div.setAttribute("contenteditable", false)
    //          view.editButton.innerText = "Edit";
    //          view.div.style.border = "none";
    //      }
     
        
    //         for (let i = 0; i < list.length; i++) {
    //             if (view.div.innerText != listItem.text) {
    //                 list.splice(listItem.index, 1, { text: view.div.innerText, index: +view.div.id, isComplete: listItem.isComplete })
    //             }
    //         }
    //     }
        
    //     console.log(list)
    // }




// **********************************Functions***********************************

// var list = [{ text: 'test 1', index: 0, isComplete: false }, { text: 'test 2', index: 1, isComplete: true }];

// function newTodo() {
//     let newListItem = {
//         text: document.getElementById("myInput").value,
//         index: list.length
//     }

//     list.push(newListItem);

//     document.getElementById("myInput").value = "";
//     console.log(list);
//     display(newListItem);
// }

// function display(listItem) {
//     let li = document.createElement('li');
//     let div = document.createElement('div');
//     div.id = listItem.index;
//     div.innerText = listItem.text;
//     div.style.padding = '5px';

//     let removeButton = document.createElement('button');
//     removeButton.innerText = "Remove";
//     let editButton = document.createElement('button');
//     editButton.innerHTML = "Edit";
//     let checkButton = document.createElement('button');
//     checkButton.innerHTML = "Done";
//     let chbox = document.createElement("INPUT");
//     chbox.setAttribute("type", "checkbox");
    
//     removeButton.addEventListener('click', (e) => {
//         list.splice(listItem.index, 1)
//         li.remove();
//         console.log(e);
//         console.log(list);
//     })

//     if (listItem.isComplete) {
//         chbox.checked = true;
//         div.style.textDecoration = "line-through";
//         checkButton.innerHTML = "Undo";
//     }else{
//         chbox.checked = false;
//     }

//     // checkButton.addEventListener('click', () => {

//     //     if (!listItem.isComplete) {
//     //         div.style.textDecoration = "line-through";
//     //         checkButton.innerHTML = "Undo";
//     //         listItem.isComplete = true;
//     //     } else {
//     //         div.style.textDecoration = "none";
//     //         checkButton.innerHTML = "Done";
//     //         listItem.isComplete = false;
//     //     }

//     // })

//     chbox.addEventListener('click', () => {
//         if (!listItem.isComplete ) {
//             div.style.textDecoration = "line-through";
//             checkButton.innerHTML = "Undo";
//             listItem.isComplete = true;
            
//         } else {
//             div.style.textDecoration = "none";
//             checkButton.innerHTML = "Done";
//             listItem.isComplete = false;
//             }

//     })

//     editButton.addEventListener('click', () => {
//         if (editButton.innerText == "Edit"){
//             div.setAttribute("contenteditable", true);
//             editButton.innerText = "Ok";
//             div.style.border = "2px solid #000";
//             div.style.borderRadius = "5px";
//         }else{
//             div.setAttribute("contenteditable", false)
//             editButton.innerHTML = "Edit";
//             div.style.border = "none";
//         }
   

//         for (let i = 0; i < list.length; i++) {
//             if (div.innerText != listItem.text) {
//                 list.splice(listItem.index, 1, { text: div.innerText, index: +div.id })
//             }
//         }
//         console.log(list)
//     })

//     console.log(list)
//     li.append(div)
//     li.append(removeButton);
//     li.append(checkButton);
//     li.append(editButton);
//     li.append(chbox);
//     document.getElementById("myUL").append(li);
// }


// document.addEventListener('DOMContentLoaded', () => {
//     for (let i = 0; i < list.length; i++) {
//         display(list[i]);
//     }

//     let application = new Application();
//     application.start();
// });