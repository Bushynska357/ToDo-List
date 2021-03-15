// var list = [{ text: 'test 1', index: 0, isComplete: false, time: '14:15 PM' }, { text: 'test 2', index: 1, isComplete: true, time: '14:15 PM' }];
var list = [];
var listCard = [];
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
    storageCard.liststorage = this.listCard;
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

    triggerSelectedById(id){
        
        let itemSelect = this.storage.liststorage.find((itemSelect) => itemSelect.index == id);
        itemSelect.selected = !itemSelect.selected;
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
    }

    editTodoItem(id, txt, checked, cardTime) {
        this.storage.liststorage.splice(id, 1, { index: Number(id), isComplete: checked, text: txt, time: cardTime })
        for (let i = 0; i < this.storage.liststorage.length; i++) {
            this.storage.liststorage[i].index = i;
            this.storage.setStorage();
            // localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
    }

    updateTodoList(){
        // this.storage.setStorage();
        for (let i = 0; i < this.storage.liststorage.length; i++){
            this.view.renderTodoItem(this.storage.liststorage[i])
        }
    }
}
