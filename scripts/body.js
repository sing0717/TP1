var form;
var modal;
var storage;
var closeButton;
var starInputList;


window.addEventListener('DOMContentLoaded', function(){
    this.storage = window.localStorage;
    this.modal = this.document.querySelector('.modal');
    this.form = this.document.querySelector('#asideform');
    closeButton = this.document.querySelector('.close-button');

    // .fav init
    this.starInputList = this.document.querySelectorAll('.fav > input');
    this.starLabelList = this.document.querySelectorAll('.fav > label');
    for(var i=0;i<starInputList.length;i++){
        starInputList[i].setAttribute('id', 'star'+i);
        starLabelList[i].setAttribute('for', 'star'+i);
    }
    for(i=0;i<starInputList.length;i++){
        starInputList[i].addEventListener('click', function(){
            if(!this.checked){
                console.log('delFav() called');
                delFav(i);
            }else{
                console.log('addFav() called');
                addFav();
            }
        });
    }
    

    // if(wsgetItem('numFavs') == null){wssetItem('numFavs', '0');}

    // closeButton.addEventListener('click', toggleModal()); // toggleModal() called on add

    // if(wsgetItem('UID') == null){
    //     this.console.log('in');
    //     // this.toggleModal();
    //     return;
    // }

    // //FAV List
    // for(var i = 0; i < parseInt(wsgetItem('numFavs')); i++){
    //     console.log(wsgetItem('start' + i.toString()) + ' ' + wsgetItem('end' + i.toString()));
    // }
});

// adds Favorite
function addFav(){
    var list = [];
    if(canvas.startSelected == null){
        return;
    }
    if(canvas.endSelected == null){
        return;
    }
    if(storage.numFav==undefined || storage.numFav==null){
        storage.numFav = 1;
    }else{
        list = JSON.parse(storage.Favs);
    }
    list.push({start:canvas.startSelected, end:canvas.endSelected});
    storage.Favs = JSON.stringify(list);
}

//shows Favorite
function showFav(){
    console.log('showFav');
}

//shows Favorite
function showFavStatus(){
    var list = [];
    if(storage.numFav==undefined || storage.numFav==null){
        return;
    }
    list = JSON.parse(storage.Favs);
    console.log(list);
}

//deletes Favorite
function delFav(index){
    var list = [];
    if(storage.numFav==undefined || storage.numFav==null){
        return;
    }
    storage.numFav -= 1;
    list = JSON.parse(storage.Favs);
    list.splice(index, 1);
    storage.Favs = JSON.stringify(list);
}

function toggleModal(){
    modal = document.querySelector('.modal');
    console.log('toggleModal()');
    modal.classList.toggle('show-modal');
}