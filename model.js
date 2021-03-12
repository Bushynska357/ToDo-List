var list = [{ text: 'test 1', index: 0, isComplete: false, time: '14:15 PM' }, { text: 'test 2', index: 1, isComplete: true, time: '14:15 PM' }];

localStorage = window.localStorage;
var liststorage = JSON.parse(localStorage.getItem('data'));
if (!liststorage) {
    liststorage = this.list;
}
var getStorage = localStorage.getItem("data");
console.log(liststorage);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var now = new Date();
nowDay = now.getDay();
nowNum = now.getDate();
nowMo = now.getMonth();

var dateM = document.querySelector(".date");
var dateD = document.querySelector(".dateDay");
var dateMonth = document.querySelector(".dateMo");

dateM.innerText = days[nowDay];
dateD.innerText = nowNum + 'th';
dateMonth.innerText = months[nowMo];

class Model {
    liststorage

    constructor(view) {
        this.view = view;
        this.liststorage = liststorage;
    }

    triggerStateById(id) {
        let item = this.liststorage.find((item) => item.index == id);
        item.isComplete = !item.isComplete;
        localStorage.setItem('data', JSON.stringify(this.liststorage));
    }

    addTodoItem(text, time) {
        let newListItem = {
            index: this.liststorage.length,
            isComplete: false,
            text,
            time
        }

        if (newListItem.text != "") {
            this.liststorage.push(newListItem);
            this.view.renderTodoItem(newListItem);
            localStorage.setItem('data', JSON.stringify(this.liststorage));
        }

        console.log(this.liststorage)
        localStorage.setItem('data', JSON.stringify(this.liststorage));
    }
    

    removeTodoItemByIndex(index) {
        this.liststorage = this.liststorage.filter(item => item.index != index);

        for (let i = 0; i < this.liststorage.length; i++) {
            this.liststorage[i].index = i
            localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
    }

    editTodoItem(id, txt, checked) {
        this.liststorage.splice(id, 1, { text: txt, index: Number(id), isComplete: checked })
        for (let i = 0; i < this.liststorage.length; i++) {
            this.liststorage[i].index = i;
            localStorage.setItem('data', JSON.stringify(this.liststorage))
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    
    const view = new View(firstList);
    const model = new Model(view);
    const controller = new Controller(model, view);

    const viewTwo = new View(secondList);
    const modelTwo = new Model(viewTwo);
    const controllerTwo = new Controller(modelTwo, viewTwo);

    if (localStorage.getItem("data") != null) {
        for (let i = 0; i < this.liststorage.length; i++) {
            view.renderTodoItem(this.liststorage[i]);
            view.countItems(this.liststorage.length);
        }
    } else {
        for (let i = 0; i < this.list.length; i++) {
            this.liststorage = view.renderTodoItem(this.list[i]);
            this.liststorage = localStorage.setItem('data', JSON.stringify(this.list))
        }
    }
});