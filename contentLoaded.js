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
        for (let i = 0; i < this.listCard.length; i++) {
            storageCard.liststorage = viewCard.renderTodoItem(this.listCard[i]);
            storageCard.liststorage = localStorage.setItem('dataCard', JSON.stringify(this.listCard))
        }
    }


});