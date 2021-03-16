// var list = [{ text: 'test 1', index: 0, isComplete: false, time: '14:15 PM' }, { text: 'test 2', index: 1, isComplete: true, time: '14:15 PM' }];
var list = [];
var listCard = [];
class Storage{
    constructor(storageName){
        this.localStorage = window.localStorage;
        this.liststorage = JSON.parse(localStorage.getItem(storageName)) || [];
        this.getStorage = localStorage.getItem(storageName);
        this.setStorage = function setItemStorage(){
            localStorage.setItem(storageName, JSON.stringify(this.liststorage));
        }
        
    }
}
// const storage = new Storage();

// class StorageCard{
//     constructor(){
//         this.localStorage = window.localStorage;
//         this.liststorage = JSON.parse(localStorage.getItem('dataCard')) || [];
//         this.getStorage = localStorage.getItem("dataCard");
//         this.setStorage = function setItemStorage(){
//             localStorage.setItem('dataCard', JSON.stringify(this.liststorage));
//         }
        
//     }
// }

// if (!storageCard.liststorage) {
//     storageCard.liststorage = this.listCard;
// }
// if (!storage.liststorage) {
//     storage.liststorage = this.list;
// }


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var now = new Date();
nowDay = now.getDay();
nowNum = now.getDate();
nowMo = now.getMonth();

var dateM = document.querySelector("#first .date");
var dateD = document.querySelector("#first .dateDay");
var dateMonth = document.querySelector("#first .dateMo");

var dateMCard = document.querySelector("#second .date");
var dateDCard = document.querySelector("#second .dateDay");
var dateMonthCard = document.querySelector("#second .dateMo");


dateM.innerText = days[nowDay];
dateD.innerText = nowNum + 'th';
dateMonth.innerText = months[nowMo];

dateMCard.innerText = days[nowDay];
dateDCard.innerText = nowNum + 'th';
dateMonthCard.innerText = months[nowMo];

class Model {
    // liststorage

    constructor(view, storage) {
        this.view = view;
        this.storage = storage;
        console.log(this.storage.liststorage.length);
        // console.log(this.storage.liststorage)
    }

    triggerStateById(id) {
        let item = this.storage.liststorage.find((item) => item.index == id);
        console.log(item)
        item.isComplete = !item.isComplete;
        this.storage.setStorage();
        // localStorage.setItem('data', JSON.stringify(this.liststorage));
    }

    triggerSelectedById(id){
        let itemSelect = this.storage.liststorage.find((itemSelect) => itemSelect.index == id);
        if(this.storage.liststorage.length != null){  
            itemSelect.selected = !itemSelect.selected;
        }
       
        // const select = this.storage.liststorage.filter(itemSelect => itemSelect.selected == true);
        // console.log(select)
        
        for (let i = 0; i < this.storage.liststorage.length; ++i){
            if(this.storage.liststorage[i] != itemSelect){
                this.storage.liststorage[i].selected = false;
               
            }
           
            this.storage.setStorage();
        }
      this.view.updateTodoListItem();
    }
    addTodoItem(text, time) {
        
        let newListItem = {
            index: this.storage.liststorage.length,
            isComplete: false,
            text,
            time,
            selected:false
        }

        if (newListItem.text != "") {
            this.storage.liststorage.push(newListItem);
            this.view.renderTodoItem(newListItem);
            this.storage.setStorage();
            // localStorage.setItem('data', JSON.stringify(this.liststorage));
        }

        // console.log(this.liststorage)
        this.storage.setStorage();
        // localStorage.setItem('data', JSON.stringify(this.liststorage));
    }
    

    removeTodoItemByIndex(index) {
        this.storage.liststorage = this.storage.liststorage.filter(item => item.index != index);

        for (let i = 0; i < this.storage.liststorage.length; i++) {
            this.storage.liststorage[i].index = i;
            this.storage.setStorage();
            // localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
        this.storage.setStorage();
    }

    editTodoItem(id, txt, checked, cardTime, select) {
        this.storage.liststorage.splice(id, 1, { index: Number(id), isComplete: checked, text: txt, time: cardTime, selected: select})
        for (let i = 0; i < this.storage.liststorage.length; i++) {
            this.storage.liststorage[i].index = i;
           
           
            // localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
        this.storage.setStorage();
        this.view.updateTodoListItem();
       
    }

    updateTodoList(){
        // this.storage.setStorage();
        for (let i = 0; i < this.storage.liststorage.length; i++){
            this.view.renderTodoItem(this.storage.liststorage[i])
        }
    }
}
