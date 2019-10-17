wsgetItem = function(key){return window.localStorage.getItem(key);};
wssetItem = function(key, val){window.localStorage.setItem(key, val);};

createFav = function(start, end){
    wssetItem('start' + parseInt(wsgetItem('numFavs')).toString(), start);
    wssetItem('end' + parseInt(wsgetItem('numFavs')).toString(), end);
    wssetItem('numFavs', (parseInt(wsgetItem('numFavs'))+1).toString()); // numFavs++;
};

window.onload = function(){

    //INIT
    if(wsgetItem('numFavs') == null){
        wssetItem('numFavs', '0');
    }


    if(wsgetItem('UID') == null || wsgetItem('visited') == null){
        window.location.href += '#popup1';
        wssetItem('visited', true);
    }
    
    // redirect to Popup
    if(wsgetItem('visited') == null && wsgetItem('UID') != null){
        wssetItem('visited', true);
        if(window.document.location.hash == '#popup1'){
            window.location.href = '#popup1';
        }
    }

    //FAV List
    for(var i = 0; i < parseInt(wsgetItem('numFavs')); i++){
        console.log(wsgetItem('start' + i.toString()) + ' ' + wsgetItem('end' + i.toString()));
    }
};

UIDKeyPress = function(event){
    if(event.keyCode == 13){
        wssetItem('UID', document.getElementById('UID').value);
    }
};