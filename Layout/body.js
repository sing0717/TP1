var form;
var modal;
var storage;
var closeButton;
var d = new Date();
var SearchButton;
var swapButton;
var InitButton;

window.addEventListener('DOMContentLoaded', function(){

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';
    var divBody = document.querySelector('#body');
    var divCover = document.querySelector('#cover');
    divBody.style.visibility = 'hidden';
    divBody.style.display = 'none';
    divBody.style.opacity = 0;
    setTimeout(function(){
        divCover.style.opacity = 1;
        (function fadeout() {
            if ((divCover.style.opacity -= .05) < 0) {
                divCover.style.display = "none";
                divBody.style.visibility = 'visible';
                divBody.style.display = 'block';
                document.documentElement.style.overflow = 'auto';
                document.body.scroll = 'yes';
                (function fadein() {
                    var val = parseFloat(divBody.style.opacity);
                    if (!((val += .03) > 1)){
                        divBody.style.opacity = val;
                        requestAnimationFrame(fadein);
                    }
                })();
            } else {
                requestAnimationFrame(fadeout);
            }
        })();
    },1500);


    storage = window.localStorage;
    modal = document.querySelector('.modal');
    form = document.querySelector('#asideform');
    closeButton = document.querySelector('.close-button');
    SearchButton = document.querySelector('#search');
    InitButton = document.querySelector('#init');
    swapButton = document.querySelector('#swap');
    InitButton.setAttribute('inits', 'true');
    SearchButton.addEventListener('click',function(){
        if(canvas.startSelected==null){
            alert('출발역을 선택해 주세요.');
            return;
        }
        if(canvas.endSelected==null){
            alert('종착역을 선택해 주세요.');
            return;
        }
        if(SearchButton.getAttribute('searched') != 'true' && InitButton.getAttribute('inits') == 'true'){
            Submit(Rails, 'time');
            addHistory(document.querySelector('#start').value, document.querySelector('#end').value);
            change();
            sidePrint(1);
        }
        SearchButton.setAttribute('searched', 'true');
        InitButton.setAttribute('inits', 'false');
    });

    InitButton.addEventListener('click', function(){
        InitRails(Rails, canvas);
        if(SearchButton.getAttribute('searched') == 'true' && InitButton.getAttribute('inits') != 'true'){
            InitButton.setAttribute('inits', 'true');
            change();
            sidePrint(1);
        }
        SearchButton.setAttribute('searched', 'false');
    });

    swapButton.addEventListener('click', function(){
        swapInput();
        if(canvas.startSelected != null && canvas.endSelected != null){
            Submit(Rails, 'time');
            addHistory(document.querySelector('#start').value, document.querySelector('#end').value);
            sidePrint(1);
        }
        SearchButton.setAttribute('searched', 'true');
        InitButton.setAttribute('inits', 'false');
    });

    Init();
    makeSideCanvas();

    var options = '';
    var hourTag = document.getElementById('hourSelect');
    var minuteTag = document.getElementById('minuteSelect');
    for(var i = 0; i<60; i++){
        if(i==d.getMinutes()){
            options += '<option selected>' + i +'분</option>';
        }
        else{
            options += '<option>' + i +'분</option>';
        }
    }
    minuteTag.innerHTML = options;
    options = '';
    for(var i = 0; i<24; i++){
        if(i==d.getHours()){
            options += '<option selected>' + i +'시</option>';
        }
        else{
            options += '<option>' + i +'시</option>';
        }
    }
    hourTag.innerHTML = options;
});

//shows Favorite
function showFav(element){
    var startLabel = document.querySelector('#start');
    var endLabel = document.querySelector('#end');
    SearchButton = document.querySelector('#search');
    startLabel.value = element.getAttribute('start');
    endLabel.value = element.getAttribute('end');
    canvas.startSelected = getNodeElement(Rails, startLabel.value);
    canvas.endSelected = getNodeElement(Rails, endLabel.value);
    SearchButton.setAttribute('searched', 'true');
    Submit(Rails, 'time');
    sidePrint(1);
    change();
    SearchButton.setAttribute('searched', 'true');
    InitButton.setAttribute('inits', 'false');
}

function addFav(start, end){
    var divFavorites = this.document.querySelector('div#Favorites');
    var FavCount = Number(divFavorites.getAttribute('count'));
    var FavPrompt = this.document.querySelector('div#Favorites .prompt');
    var element = document.createElement('div');
    element.setAttribute('class', 'show');
    element.setAttribute('start', `${start}`);
    element.setAttribute('end', `${end}`);
    element.innerHTML = `
    <input class="show" type="button" value="${start} -> ${end}" enabled>
    <span class="star">
        <input type="checkbox" id="Fav${FavCount+1}" checked>
        <label for="Fav${FavCount+1}"></label>
    </span>`;

    element.children[0].addEventListener('click', function(){
        showFav(element);
    });
    element.children[1].children[0].addEventListener('click', function(){
        if(!this.checked){
            delFav(start, end);
        }
    });

    divFavorites.setAttribute('count', ''+(FavCount+1));
    FavCount = Number(divFavorites.getAttribute('count'));
    if(FavCount==1){
        FavPrompt.removeChild(FavPrompt.children[0]);
    }
    
    divFavorites.insertBefore(element, divFavorites.children[3]);
    if(FavPrompt != null){
        FavPrompt.removeChild(FavPrompt.firstChild);
        return;
    }
}

function Init(){
    var form = document.querySelector('#asideForm');
    var History = document.querySelector('#History');
    var Favorites = document.querySelector('div#Favorites');
    var divButtons = document.querySelector('#container');
    var sideCanvas = document.querySelector('#sideCanvas');
    if( History == null || History == undefined ){
        History = document.createElement('div');
        History.setAttribute('id', 'History');
        History.setAttribute('count', '0');
        History.style.visibility = 'visible';
        History.style.display = 'block';
        History.innerHTML = `
        <p style="font-size: 12px;">
            <b>최근 검색</b>
            <hr style="color: gray; width: 100%; left: 0px; size: 1px;">
        </p>
        <div class="prompt">
            <p>검색 기록이 없습니다</p>
            <br><br><br><br><br><br><br><br>
        </div>`;
        form.appendChild(History);
    }

    if( Favorites == null || Favorites == undefined ){
        Favorites = document.createElement('div');
        Favorites.setAttribute('id', 'Favorites');
        Favorites.setAttribute('count', '0');
        Favorites.style.display = 'block';
        Favorites.style.visibility = 'visible';
        Favorites.innerHTML = `
        <p style="font-size: 12px;">
            <b>즐겨찾기한 지하철</b>
            <hr style="color: gray; width: 100%; left: 0px; size: 1px;">
        </p>
        <div class="prompt">
            <p>지하철역을 즐겨찾기하고, 도착정보를 빠르게 확인해 보세요</p>
            <br><br><br><br><br>
        </div>`;
        form.appendChild(Favorites);
    }

    if( divButtons == null || divButtons == undefined ){
        divButtons = document.createElement('div');
        divButtons.setAttribute('id', 'container');
        divButtons.setAttribute('style', 'min-width:180px;');
        divButtons.style.display = 'none';
        divButtons.style.visibility = 'hidden';
        divButtons.innerHTML = `
        <div class="container">
            <button type = "button" class="btn-2" onclick="javascript:Submit(Rails, 'time'),sidePrint(1)">최소시간</button>
            <button type = "button" class="btn-2" onclick="javascript:Submit(Rails, 'distance'),sidePrint(0)">최소거리</button>
            <button type = "button" class="btn-2" onclick="javascript:Submit(Rails, 'fee'),sidePrint(2)">최소비용</button>
            <button type = "button" class="btn-2" onclick="javascript:Submit(Rails, 'transfer'),sidePrint(3)">최소환승</button>
        </div>
        <select style='float:left' id = 'timeSelect'>
            <option>출발시간</option>
            <option>도착시간</option>
        </select>
        <select style='float:left' id = 'hourSelect'>
            <option></option>
        </select>
        <select style='float:left' id = 'minuteSelect'>
            <option></option>
        </select>
        `;
        form.appendChild(divButtons);
    }
    if(sideCanvas == null || divButtons == undefined){
        sideCanvas = document.createElement('div');
        sideCanvas.setAttribute('id', 'sideCanvas');
        sideCanvas.setAttribute('style', 'width: 90%; height: 55%; overflow: hidden');
        sideCanvas.style.display = 'none';
        sideCanvas.style.visibility = 'hidden';
        sideCanvas.innerHTML = `
        <section class="side">
            <canvas id="s" width="500" height="1000"></canvas>
        </section>`;
        form.appendChild(sideCanvas);
    }
}

function change(){
    var History = document.querySelector('#History');
    var Favorites = document.querySelector('div#Favorites');
    var divButtons = document.querySelector('#container');
    var sideCanvas = document.querySelector('#sideCanvas');
    if(History != null && History.style.display == 'none' && History.style.visibility == 'hidden'){
        History.style.display =  'block';
        History.style.visibility = 'visible';
    }else{
        History.style.display =  'none';
        History.style.visibility = 'hidden';
    }
    if(Favorites != null && Favorites.style.display == 'none' && Favorites.style.visibility == 'hidden'){
        Favorites.style.display =  'block';
        Favorites.style.visibility = 'visible';
    }else{
        Favorites.style.display =  'none';
        Favorites.style.visibility = 'hidden';
    }
    if(divButtons != null && divButtons.style.display == 'none' && divButtons.style.visibility == 'hidden'){
        divButtons.style.display =  'block';
        divButtons.style.visibility = 'visible';
    }else{
        divButtons.style.display =  'none';
        divButtons.style.visibility = 'hidden';
    }
    if(sideCanvas != null && sideCanvas.style.display == 'none' && sideCanvas.style.visibility == 'hidden'){
        sideCanvas.style.display =  'block';
        sideCanvas.style.visibility = 'visible';
    }else{
        sideCanvas.style.display =  'none';
        sideCanvas.style.visibility = 'hidden';
    }
}

function delFav(start, end){
    var divFavorites = this.document.querySelector('div#Favorites');
    var FavCount = Number(divFavorites.getAttribute('count'));

    divFavorites.setAttribute('count', ''+(FavCount-1));
    FavCount = Number(divFavorites.getAttribute('count'));

    var i = 3;
    var element = null;
    for(i=3;i<divFavorites.childElementCount;i++){
        if(divFavorites.children[i].getAttribute('start') == start && divFavorites.children[i].getAttribute('end') == end){
            element = divFavorites.children[i];
            break;
        }
    }

    if(element != null && element != undefined){
        divFavorites.removeChild(element);
    }

    var divHistory = document.querySelector('#History');
    for(i=3;i<divHistory.childElementCount;i++){
        if(divHistory.children[i].getAttribute('start') == start && divHistory.children[i].getAttribute('end') == end){
            element = divHistory.children[i].children[1].children[0].checked = false;
            break;
        }
    }

    if(FavCount==0){
        var existFavPrompt = this.document.querySelector('div#Favorites .prompt');
        var newFavPrompt = this.document.createElement('div');
        newFavPrompt.setAttribute('class', 'show');
        newFavPrompt.innerHTML = `
        <div class="prompt">
            <p>지하철역을 즐겨찾기하고, 도착정보를 빠르게 확인해 보세요</p>
            <br><br><br><br><br>
        </div>`;
        existFavPrompt.replaceWith(newFavPrompt);
        return;
    }
}

function addHistory(start, end){
    if(start == undefined || start == null || start == ""){
        return;
    }
    if(end == undefined || end == null || end == ""){
        return;
    }

    var divHistory = this.document.querySelector('#History');
    var HisCount = Number(divHistory.getAttribute('count'));
    var existHisPrompt = this.document.querySelector('#History .prompt');
    var element = document.createElement('div');
    element.setAttribute('class', 'show');
    element.setAttribute('start', `${start}`);
    element.setAttribute('end', `${end}`);
    element.innerHTML = `
    <input class="show" type="button" value="${start} -> ${end}" enabled>
        <span class="star">
            <input type="checkbox" id="His${HisCount+1}">
            <label for="His${HisCount+1}"></label>
        </span>`;

    // 중복 불가
    for(var i=3;i<divHistory.childElementCount;i++){
        if(divHistory.children[i].getAttribute('start') == start && divHistory.children[i].getAttribute('end') == end){
            divHistory.insertBefore(divHistory.children[i], divHistory.children[3]);
            return;
        }
    }

    // historyDiv에 show 갯수 설정
    divHistory.setAttribute('count', ''+(HisCount+1));
    HisCount = Number(divHistory.getAttribute('count'));

    // show에 이벤트 설정
    element.children[0].addEventListener('click', function(){
        showFav(element);
    });
    element.children[1].children[0].addEventListener('click', function(){
        if(this.checked){
            //addFav
            addFav(start, end);
        }else{
            delFav(start, end);
        }
    });

    if(HisCount>6){
        divHistory.removeChild(divHistory.children[divHistory.childElementCount-1]);
    }
    divHistory.insertBefore(element, divHistory.children[3]);
    if(existHisPrompt != null){
        if(existHisPrompt.childElementCount == 0){
            divHistory.removeChild(divHistory.children[divHistory.childElementCount-1]);
        }
        existHisPrompt.removeChild(existHisPrompt.children[0]);
    }
}

function toggleModal(){
    modal = document.querySelector('.modal');
    console.log('toggleModal()');
    modal.classList.toggle('show-modal');
}