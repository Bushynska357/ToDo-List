class CardList  {
    constructor(id, idModal, idEditModel){
        this.addBtn = document.querySelector(`#${idModal} .addBtn`);
        this.counter = document.querySelector(`#${id} #counter`);
        this.modalBtn = document.querySelector(`#${id} .modalBtn`);
        this.cancel = document.querySelector(`#${idModal} .cancel`);
        this.ulList = document.querySelector(`#${id} #myUL`);
        this.modal = document.querySelector(`#${idModal} .modal`);
        this.text = document.querySelector(`#${idModal} #myInput`);
        this.toggleUl = document.querySelector(`#${id} ul#myUL li.current`);

        this.editBlock = document.querySelector(`#${idEditModel} .modal`);
        this.editBtnFinish = document.querySelector(`#${idEditModel} .editBtnFinish`);
        this.inputEditCard = document.querySelector(`#${idEditModel} #editInput`);
        this.editButton = document.querySelector(`#${idEditModel} .editBtn`);
    }

}

// class SecondList{
//     constructor(){
//         this.addBtn = document.querySelector('.addBtnCard');
//         this.counter = document.querySelector('#counterCard');
//         this.modalBtn = document.querySelector('.modalCardBtn');
//         this.cancel = document.querySelector('.cancel-card');
//         this.ulList = document.getElementById("ULCard");
//         this.modal = document.getElementById('ModalCard');
//         this.text = document.getElementById("InputCard");
//         this.toggleUl = document.querySelector("ul#ULCard li.current");

//         this.editBlock = document.getElementById('editModalCard');
//         this.editBtnFinish = document.querySelector('.editBtnCardFinish');
//         this.inputEditCard = document.getElementById('editInputCard');
//         this.editButton = document.querySelector('.editBtnCard');
//     }
// }

// const firstList = new FirstList();
// const secondList = new SecondList();