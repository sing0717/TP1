wlsgetItem = function(key){return sessionStorage.getItem(key);};
wlssetItem = function(key, val){sessionStorage.setItem(key, val);};
wsgetItem = function(key){return window.localStorage.getItem(key);};
wssetItem = function(key, val){window.localStorage.setItem(key, val);};

createFav = function(start, end){
    wssetItem('start' + parseInt(wsgetItem('numFavs')).toString(), start);
    wssetItem('end' + parseInt(wsgetItem('numFavs')).toString(), end);
    wssetItem('numFavs', (parseInt(wsgetItem('numFavs'))+1).toString()); // numFavs++;
};

function toggleModal(){
    modal = document.querySelector('.modal');
    console.log('toggleModal()');
    modal.classList.toggle('show-modal');
}

window.onload = function(){
    if(wsgetItem('numFavs') == null){wssetItem('numFavs', '0');}

    closeButton.addEventListener('click', toggleModal()); // toggleModal() called on add

    if(wsgetItem('UID') == null){
        this.console.log('in');
        // this.toggleModal();
        return;
    }

    //FAV List
    for(var i = 0; i < parseInt(wsgetItem('numFavs')); i++){
        console.log(wsgetItem('start' + i.toString()) + ' ' + wsgetItem('end' + i.toString()));
    }
};
