class View {
    onAddTodoItem;
    onRemoveTodoItem;
    onTodoItemStateChanged;
    onEditTodoItem;
    onEditChange;
    onTodoItemStateSelect;
    onUpdateTodoList;
    //modalCard
    // onAddTodoItemCard;
    
    constructor(id, idModal, idEditModal) {

        this.container = new CardList(id, idModal, idEditModal);
        this.container.modalBtn.addEventListener('click', () => {
            let modal = this.container.modal;
            // console.log(modal)
            modal.style.display = "block";
            // console.log(container.modalBtn)
        });
        this.container.cancel.addEventListener('click', () => {
            let modal = this.container.modal;
            modal.style.display = "none";
            
        });



        this.container.addBtn.addEventListener('click', () => {
            let text = this.container.text.value;
            // let time = new Date().toLocaleTimeString("en-us", {
            //     hour: 'numeric',
            //     minute: 'numeric'
            // });
            let time = new Date();
            if (this.onAddTodoItem) {
                this.onAddTodoItem(text, time);
            }
            this.container.text.value = "";
        });

    }

    countItems(todoItems) {
        this.container.counter.innerText = todoItems;
    }

    renderTodoItem(todoItem) {
        const todoItemNode = this.createTodoItemNode();
       

        if (todoItem.isComplete) {
            todoItemNode.chbox.checked = true;
            // todoItemNode.chbox.style.background = 'red';
            // todoItemNode.chbox.classList.toggle('checked');
            todoItemNode.div.style.textDecoration = "line-through";
            todoItemNode.div.style.color = "#d6d6e4";
        } else {
            todoItemNode.chbox.checked = false;
            todoItemNode.div.style.textDecoration = "none";
            todoItemNode.div.style.color = "#82829c";
            // todoItemNode.chbox.classList.remove('checked');
            // todoItemNode.chbox.style.background = 'white';
        }
        // todoItemNode.removeButton.hidden = true;

        // console.log(todoItem);

        // let test = new Date();
        // let h = test.getHours().toString();
        // let m = test.getMinutes();
        todoItemNode.div.id = todoItem.index;
        todoItemNode.div.innerText = todoItem.text;
        todoItemNode.time.innerText = new Date(todoItem.time).toLocaleTimeString("en-us", {
            hour: 'numeric',
            minute: 'numeric'
        });
        // todoItemNode.time.innerText = todoItem.time;
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

            // let el = todoItemNode.li;
            // let toggleUl = this.container.toggleUl;
            // if (todoItemNode.removeButton.hidden == true) {
            //     todoItemNode.removeButton.hidden = false;
            //     todoItemNode.time.hidden = true;
               
            // }else{
            //     todoItemNode.removeButton.hidden = true;
            //     todoItemNode.time.hidden = false;
            // }

            // if (toggleUl && toggleUl != todoItemNode.li) {
            //     toggleUl.classList.remove('current');
            //     el.classList.toggle("current");
            // } else if (toggleUl == todoItemNode.li) {
            //     toggleUl.classList.remove('current');
            // } else {
            //     el.classList.toggle("current");
               
            // }

            event.stopPropagation();
        })
        
    //    let IdItemClicked;
    //     let elementIsClicked = false;
    //     function clickHandler(eventItem){
    //         elementIsClicked = true;
    //         // console.log('clicked');
    //         console.log(eventItem);
    //         IdItemClicked = eventItem;
    //         console.log(IdItemClicked)
    //        return IdItemClicked;
           
    //     }
       
        todoItemNode.div.addEventListener('click', (e) =>{
            let eventItem = e.target.id;
            // console.log(eventItem);
            this.container.editBlock.style.display = "block";
            this.container.inputEditCard.value = todoItemNode.div.innerText;

            

            let showModalCallback = (event) => {
                let textEdit = this.container.inputEditCard.value;  
                if (this.onEditTodoItem) {
                    this.onEditTodoItem(eventItem, textEdit, todoItemNode.chbox.checked, todoItem.time, todoItem.selected);
                    this.container.editBlock.style.display = "none";  
                }          

                this.container.editButton.removeEventListener('click', showModalCallback)
            }
           
            this.container.editButton.addEventListener('click', showModalCallback)
      
            // clickHandler(eventItem);
        });
     
        // console.log(eventItem)
        this.container.editBtnFinish.addEventListener('click', () =>{
            this.container.editBlock.style.display = "none";
         
        })
              
       
     


        // this.container.editButton.addEventListener('click', (event) =>{
        //     let textEdit = this.container.inputEditCard.value;
               
        //         if (this.onEditTodoItem) {
        //             this.onEditTodoItem(todoItemNode.div.id, textEdit, todoItemNode.chbox.checked, todoItem.time, todoItem.selected);
        //             this.container.editBlock.style.display = "none";
        //         }
               
             
        // })
        
        
      
      
        // todoItemNode.div.addEventListener('click', (event) => {
        //     // if (this.onEditTodoItem) {
        //     //     this.onEditTodoItem(todoItemNode.div.id, todoItemNode.div.innerText, todoItemNode.chbox.checked, todoItemNode.time.innerText);
        //     // }
        // alert('hi')
        //     // let el = todoItemNode.li;
        //     // let toggleUl = this.container.toggleUl;
        //     // if (todoItemNode.removeButton.hidden == true) {
        //     //     todoItemNode.removeButton.hidden = false;
        //     //     todoItemNode.time.hidden = true;
               
        //     // }else{
        //     //     todoItemNode.removeButton.hidden = true;
        //     //     todoItemNode.time.hidden = false;
        //     // }

        //     // if (toggleUl && toggleUl != todoItemNode.li) {
        //     //     toggleUl.classList.remove('current');
        //     //     el.classList.toggle("current");
        //     // } else if (toggleUl == todoItemNode.li) {
        //     //     toggleUl.classList.remove('current');
        //     // } else {
        //     //     el.classList.toggle("current");
               
        //     // }
        //     // if (todoItemNode.editButton.innerText == "Edit") {
        //     //     todoItemNode.div.setAttribute("contenteditable", true);
        //     //     todoItemNode.editButton.innerText = "Ok";
        //     //     todoItemNode.div.style.border = "2px solid #000";
        //     //     todoItemNode.div.style.borderRadius = "5px";
        //     // } else {
        //     //     todoItemNode.div.setAttribute("contenteditable", false)
        //     //     todoItemNode.editButton.innerText = "Edit";
        //     //     todoItemNode.div.style.border = "none";
        //     //     if (this.onEditTodoItem) {
        //     //         this.onEditTodoItem(todoItemNode.div.id, todoItemNode.div.innerText, todoItemNode.chbox.checked, todoItemNode.time.innerText);
        //     //     }
        //         event.stopPropagation();
        //     // }
        // })


        if(todoItem.selected){
            // todoItemNode.li.style.background = "red";
            todoItemNode.li.classList.toggle("current");
            todoItemNode.removeButton.hidden = false;
            todoItemNode.time.hidden = true;
        }else{
            // todoItemNode.li.style.background = "yellow";
            todoItemNode.li.classList.remove("current");
            todoItemNode.removeButton.hidden = true;
            todoItemNode.time.hidden = false;
        }

        todoItemNode.li.addEventListener('click', () => {
            // console.log('Li click');
            // console.log(todoItemNode.li.classList);
            if (this.onTodoItemStateSelect) {
                this.onTodoItemStateSelect(todoItemNode.div.id);
            }

            // if (todoItemNode.chbox.checked) {
            //     todoItemNode.div.style.textDecoration = "line-through";
            //     todoItemNode.div.style.color = "#d6d6e4";
            // } else {
            //     todoItemNode.div.style.textDecoration = "none";
            //     todoItemNode.div.style.color = "#82829c";
            // }

            // if (this.onTodoItemStateChanged) {
            //     this.onTodoItemStateChanged(todoItemNode.div.id);
            // }
          
        //     if (todoItemNode.removeButton.hidden == true) {
        //         todoItemNode.removeButton.hidden = false;
        //         todoItemNode.time.hidden = true;
               
        //     } else {
        //         todoItemNode.removeButton.hidden = true;
        //         todoItemNode.time.hidden = false;
               
        //     }
        //     let el = todoItemNode.li;
            
        //     let toggleUl = this.container.toggleUl;
        //     if (toggleUl && toggleUl != todoItemNode.li) {
        //         toggleUl.classList.remove('current');
        //         el.classList.toggle("current");
        //     } else if (toggleUl == todoItemNode.li) {
        //         toggleUl.classList.remove('current');
        //     } else {
        //         el.classList.toggle("current");
        //     }
        // })
        })
    }
    // function selectElement (){
    //     let allItems = document.getElementById("myUL").parentElement.querySelectorAll("li");
    //     for (let i = 0; i<= allItems.length; i++){
    //         allItems[i].classList.remove('current');
    //     }
    //     document.querySelector("ul#myUL").classList.add('current')
    // }

    // todoItemNode.li.addEventListener('click', selectElement, true);
    // }
 
    
    

 

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
        this.container.ulList.append(li);

        return {
            li,
            div,
            time,
            removeButton,
            editButton,
            chbox
        }
    }


    updateTodoListItem(){
        
       if (this.onUpdateTodoList) {
        this.container.ulList.innerHTML = " ";
            this.onUpdateTodoList();
           
        }
    }

}


