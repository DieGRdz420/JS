
/* window.addEventListener('click', function(){
    let firstBody = this.document.getElementById('firstBody');
    let posicionObj1 = firstBody.getBoundingClientRect().top; //Da posicion de imagen
    let tamDePantalla = window.innerHeight/3.5;

    if (posicionObj1 < tamDePantalla) {
        animacion.style.animation = 'mover 1s ease-out';
    }
}); */
//-----------------------------------------------------------------------------------
    /* Traer objetos */
const firstBody = this.document.getElementById('firstBody');
const backgroundLock = this.document.getElementById('backgroundLock');
const secondBody = this.document.getElementById('secondBody');
const buttonSearch = this.document.getElementById('buttonSearch');
const inputSearch = this.document.getElementById('inputSearch');
const pokeImg = this.document.getElementById('pokeimg');
const buttonNext = this.document.getElementById('buttonNext');
const buttonBack = this.document.getElementById('buttonBack');
const pokeInfoDetails = this.document.getElementById('pokeInfoDetails');
const buttonNextInfo = this.document.getElementById('buttonNextInfo');
const buttonBackInfo = this.document.getElementById('buttonBackInfo');
const detailsLoading = this.document.getElementById('detailsLoading');
const pokeInfoDiv = this.document.getElementById('pokeInfoDiv');

    /* Variables */
var namePokemon = "";
var counter = 0;
var urlImages = "";
var url = "";
var searchPokemon = false;
var namesSpr = [];
var sprites = {};
var urlSprite = "";

var moves = undefined;
var countMoves = 0;
var totalMoves = 0;
var nameMove = undefined;
var urlMove = undefined;
var descriptionMove = "";

//-------------- Animación pagina Inicio.
    function animation() {

        setTimeout(()=>{
            firstAnimation();
        },500);

        /* Primera animación */
        function firstAnimation() {

            firstBody.style.transition = '4s';
            firstBody.style.top = '100%';
            backgroundLock.style.transition = '4s';
            backgroundLock.style.top = '0%';

            setTimeout(()=>{
                    /* Segunda animación */
                firstBody.style.display = "none";
                secondBody.style.display = "contents";
                backgroundLock.style.transition = "3s";
                backgroundLock.style.top = '-100%';

                setTimeout(()=>{
                    backgroundLock.style.display = 'none';
                },6000);
            },5000);
        };
        alert("Recuerda solo escribir en minusculas:)");
    };


// ------------------------------------ GET API

/*           Botones             */
buttonSearch.addEventListener('click', searchPokemon = () => {    //Buscar
    counter = 0;
    countMoves = 0;
    moves = undefined;
    url = `https://pokeapi.co/api/v2/pokemon/${ inputSearch.value }`;

    axios({
        method: 'GET',
        url: url
    }).then(res => {
        var data = res.data;
        var forms = data.forms;
        var urlForms = forms[0].url;

        moves =  data.moves;

        pokeImages(urlForms, counter);

        pokeInfoDetails.innerHTML = "";
        putData(moves);

    }).catch(err => { 
            console.log(err, "error1")
            alert("Ese pokemon no existe, intenta de nuevo...");
            location.reload();
        });  
});

buttonNext.addEventListener('click', nextPokemon = () => {   //Next
    var newCount = counter + 1;
        counter = newCount;
    var nameImage = namesSpr[counter];
        urlSprite = sprites[nameImage];

        if ( counter > namesSpr.length ) {
                counter = -1;
                nextPokemon();
        };
        if ( urlSprite == null ) {
            nextPokemon();
        };

    pokeImage(urlSprite);
    return;
});

buttonBack.addEventListener('click', backPokemon = () => {    //Back
    var newCount = counter - 1;
        counter = newCount;
    var nameImage = namesSpr[counter];
        urlSprite = sprites[nameImage];

        if ( counter < 0 ) {
                counter = namesSpr.length + 1;
                backPokemon();
        };
        if ( urlSprite == null ) {
            backPokemon();
        };

    pokeImage(urlSprite);
    return;
});

buttonNextInfo.addEventListener('click', NextInfo = () => {   //NextInfo
    var newCount = countMoves + 1;
        countMoves = newCount;
    
        if ( countMoves > moves.length-1 ) {
            countMoves = -1;

            NextInfo();
        } else {
            pokeInfoDetails.innerHTML = "";
            putData(moves);
        };
});

buttonBackInfo.addEventListener('click', BackInfo = () => {   //BackInfo
    var newCount = countMoves - 1;
        countMoves = newCount;

        if ( countMoves === -1 ) {
            countMoves = moves.length;
            BackInfo();
        } else {
            pokeInfoDetails.innerHTML = "";
            putData(moves);
        };
});


/*           Imagen             */
function pokeImages(url, counter) {
    urlImages = url;

    function searchImg(urlImages, counter) {
        axios({
            method: 'GET',
            url: urlImages
        }).then(res => {
            var data = res.data;
                sprites = data.sprites;
                namesSpr = Object.keys(sprites);
            var nameSprite = namesSpr[counter];
            var urlSprite = sprites[nameSprite];
    
            pokeImage(urlSprite);
        }).catch(err => { console.log(err, "error2") });
    };
    imagesUrl = urlImages;
    searchImg(imagesUrl, counter);
};

function pokeImage(url) {
    pokeImg.setAttribute("src", url);
};


/*           Movimientos             */
function putData(data) {
    pokeInfoDiv.style.display = "inline";
    detailsLoading.style.display = "inline";

    let moves = data;
    let move = moves[countMoves].move;

    totalMoves = moves.length;
    nameMove = move.name;
    urlMove = move.url;

    axios({
        method: 'GET',
        url: urlMove
    }).then(res => {
        let effect_entries = res.data.effect_entries;
            descriptionMove = effect_entries[0].short_effect;

        let summary = document.createElement("summary");
        let p = document.createElement("p");

            summary.setAttribute("id", "pokeInfoSummary");
            p.setAttribute("p", "pokeInfoP");

            nameMove = document.createTextNode(nameMove);
            descriptionMove = document.createTextNode(descriptionMove);

            summary.appendChild(nameMove);
            p.appendChild(descriptionMove);

            pokeInfoDetails.insertAdjacentElement("afterbegin", summary);
            pokeInfoDetails.insertAdjacentElement("beforeend", p);
            
            detailsLoading.style.display = "none";
            pokeInfoDiv.style.display = "none";
    }).catch(err => { console.log(err, "error3") });
};
