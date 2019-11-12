window.onload = function(){
    var hourTag = document.getElementById('hourSelect');
    var minuteTag = document.getElementById('minuteSelect');
    var options = '';

    for(var i = 0; i<60; i++){
        options += '<option>' + i +'분</option>';
    }
    minuteTag.innerHTML = options;

    options = '';
    for(var i = 0; i<25; i++){
        options += '<option>' + i +'시</option>';
    }
    hourTag.innerHTML = options;
}