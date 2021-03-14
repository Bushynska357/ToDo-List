// var list = [{ text: 'test 1', index: 0, isComplete: false, time: '14:15 PM' }, { text: 'test 2', index: 1, isComplete: true, time: '14:15 PM' }];
var list = [];
class Storage{
    constructor(){
        this.localStorage = window.localStorage;
        this.liststorage = JSON.parse(localStorage.getItem('data'));
        this.getStorage = localStorage.getItem("data");
        this.setStorage = function setItemStorage(){
            localStorage.setItem('data', JSON.stringify(this.liststorage));
        }
        
    }
}

class StorageCard{
    constructor(){
        this.localStorage = window.localStorage;
        this.liststorage = JSON.parse(localStorage.getItem('dataCard'));
        this.getStorage = localStorage.getItem("dataCard");
        this.setStorage = function setItemStorage(){
            localStorage.setItem('dataCard', JSON.stringify(this.liststorage));
        }
        
    }
}

const storage = new Storage();
const storageCard = new StorageCard;

if (!storageCard.liststorage) {
    storageCard.liststorage = this.list;
}
if (!storage.liststorage) {
    storage.liststorage = this.list;
}


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var now = new Date();
nowDay = now.getDay();
nowNum = now.getDate();
nowMo = now.getMonth();

var dateM = document.querySelector(".date");
var dateD = document.querySelector(".dateDay");
var dateMonth = document.querySelector(".dateMo");

var dateMCard = document.querySelector(".dateCard");
var dateDCard = document.querySelector(".dateDayCard");
var dateMonthCard = document.querySelector(".dateMoCard");


dateM.innerText = days[nowDay];
dateD.innerText = nowNum + 'th';
dateMonth.innerText = months[nowMo];

dateMCard.innerText = days[nowDay];
dateDCard.innerText = nowNum + 'th';
dateMonthCard.innerText = months[nowMo];

class Model {
    // liststorage

    constructor(view,storage) {
        this.view = view;
        this.storage = storage;
        console.log(this.storage.liststorage.length);
        console.log(this.storage.liststorage)
    }

    triggerStateById(id) {
        let item = this.storage.liststorage.find((item) => item.index == id);
        console.log(item)
        item.isComplete = !item.isComplete;
        this.storage.setStorage();
        // localStorage.setItem('data', JSON.stringify(this.liststorage));
    }

    addTodoItem(text, time) {
        
        let newListItem = {
            index: this.storage.liststorage.length,
            isComplete: false,
            text,
            time
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
    }

    editTodoItem(id, txt, checked) {
        this.storage.liststorage.splice(id, 1, { text: txt, index: Number(id), isComplete: checked})
        for (let i = 0; i < this.storage.liststorage.length; i++) {
            this.storage.liststorage[i].index = i;
            this.storage.setStorage();
            // localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
   
    
    const view = new View(firstList);
    const model = new Model(view, storage);
    const controller = new Controller(model, view);

    const viewCard = new View(secondList);
    const modelCard = new Model(viewCard, storageCard);
    const controllerCard = new Controller(modelCard, viewCard);

      if (storage.liststorage != null) {
        for (let i = 0; i < storage.liststorage.length; i++) {
            view.renderTodoItem(storage.liststorage[i]);
            view.countItems(storage.liststorage.length);
        }
    } else {
        for (let i = 0; i < this.list.length; i++) {
            storage.liststorage = view.renderTodoItem(this.list[i]);
            storage.liststorage = localStorage.setItem('data', JSON.stringify(this.list))
        }
    }

      if (storageCard.liststorage != null) {
        for (let i = 0; i < storageCard.liststorage.length; i++) {
            viewCard.renderTodoItem(storageCard.liststorage[i]);
            viewCard.countItems(storageCard.liststorage.length);
        }
    } else {
        for (let i = 0; i < this.list.length; i++) {
            storageCard.liststorage = viewCard.renderTodoItem(this.list[i]);
            storageCard.liststorage = localStorage.setItem('dataCard', JSON.stringify(this.list))
        }
    }


});