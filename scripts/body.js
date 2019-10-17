wlsgetItem = function(key){return sessionStorage.getItem(key);};
wlssetItem = function(key, val){sessionStorage.setItem(key, val);};
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

    
    // if(wlsgetItem('visited') == false){
    //     wlssetItem('visited', true);
    //     window.location.href += '#popup1';
    //     return;
    // }

    if(wsgetItem('UID') == null){
        window.location.href += '#popup1';
        return;
    }

    

    //FAV List
    for(var i = 0; i < parseInt(wsgetItem('numFavs')); i++){
        console.log(wsgetItem('start' + i.toString()) + ' ' + wsgetItem('end' + i.toString()));
    }
};