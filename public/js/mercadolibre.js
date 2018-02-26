var boxSombras = document.getElementById('box-sombras'),
  boxMaquillaje = document.getElementById('box-maquillaje'),
  boxBase = document.getElementById('box-base'),
  boxCorrector = document.getElementById('box-corrector'),
  boxDelineador = document.getElementById('box-delineador'),
  boxEsmalte = document.getElementById('box-esmalte'),
  boxLabial = document.getElementById('box-labial'),
  boxRimel = document.getElementById('box-rimel'),
  boxRubor = document.getElementById('box-rubor'),
  inputSearch = document.getElementById('search');
// main = document.getElementById('main');
let parameter;

getFetch();

function getFetch() {
  for (let i = 1; i < 60; i++) {

    inputSearch.addEventListener('keydown', function () {
      let search = inputSearch.value;
      var container = document.getElementById('section');
      container.innerHTML = '';
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${search}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          console.log(data.results[i]);
          // if(search != ''){
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6>${data.results[i].title}</h6>
              <h5>S/.${data.results[i].price}</h5>
              <span><i class="fa fa-truck"></i> Envio a todo el País<span>
              <p> ${data.results[i].sold_quantity}  vendidos-Lima</p>
              <button type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;
        })

        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    document.getElementById('hom').addEventListener('click', function () {
      window.location.reload(true);
    })

    boxMaquillaje.addEventListener('click', function () {
      parameter = 'maquillaje';
      var container = document.getElementById('maquillaje');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6 id="title">${data.results[i].title}</h6>
              <h5 id="price">S/.${data.results[i].price}</h5>
              <button id="buy" type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;

          $('.row').on('click', '#buy', function (e) {
            event.preventDefault();
            console.log('feed');
            $('.modal-body').append('<p>' + $('#title').html() + '</p><p>' + $('#price').html() + '</p>');
          })
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    boxSombras.addEventListener('click', function () {
      parameter = 'sombras';
      var container = document.getElementById('sombras');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE118865&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6 id="title">${data.results[i].title}</h6>
              <h5 id="price">S/.${data.results[i].price}</h5>
              <button id="buy" type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;

          $('.row').on('click', '#buy', function (e) {
            event.preventDefault();
            console.log('feed');
            $('.modal-body').append('<p>' + $('#title').html() + '</p><p>' + $('#price').html() + '</p>');
          })
        })

        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });

    })

    boxBase.addEventListener('click', function () {
      parameter = 'base';
      var container = document.getElementById('base');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE121463&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6>${data.results[i].title}</h6>
              <h5>S/.${data.results[i].price}</h5>
              <button type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    boxCorrector.addEventListener('click', function () {
      parameter = 'corrector';
      var container = document.getElementById('corrector');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE122628&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
              <div class="col-4 col-md-3 col offset-md-2">
              <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
              </div>
              <div class="col-8 col-md-6">
                <h6>${data.results[i].title}</h6>
                <h5>S/.${data.results[i].price}</h5>
                <button type="button" class="btn btn-warning">Comprar</button>
              </div>
            </div><hr>`;
          container.innerHTML += characters;
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    boxDelineador.addEventListener('click', function () {
      parameter = 'delineador';
      var container = document.getElementById('delineador');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE118869&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6>${data.results[i].title}</h6>
              <h5>S/.${data.results[i].price}</h5>
              <button type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    boxEsmalte.addEventListener('click', function () {
      parameter = 'esmalte';
      var container = document.getElementById('esmalte');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE121462&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6>${data.results[i].title}</h6>
              <h5>S/.${data.results[i].price}</h5>
              <button type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    boxLabial.addEventListener('click', function () {
      parameter = 'labial';
      var container = document.getElementById('labial');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE118867&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6>${data.results[i].title}</h6>
              <h5>S/.${data.results[i].price}</h5>
              <button type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    boxRimel.addEventListener('click', function () {
      parameter = 'rimel';
      var container = document.getElementById('rimel');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE118868&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6>${data.results[i].title}</h6>
              <h5>S/.${data.results[i].price}</h5>
              <button type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

    boxRubor.addEventListener('click', function () {
      parameter = 'rubor';
      var container = document.getElementById('rubor');
      const url = `https://api.mercadolibre.com/sites/MPE/search?condition=MPE118866&q=${parameter}`;
      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          const characters =
            `<div class="row">
            <div class="col-4 col-md-3 col offset-md-2">
            <img id="imgg" class="img-characters" data-toggle="modal" data-target="#MyModal" src="${data.results[i].thumbnail}" alt="${data.name}">
            </div>
            <div class="col-8 col-md-6">
              <h6>${data.results[i].title}</h6>
              <h5>S/.${data.results[i].price}</h5>
              <button type="button" class="btn btn-warning">Comprar</button>
            </div>
          </div><hr>`;
          container.innerHTML += characters;
        })
        .catch(function (error) {
          console.log(JSON.stringify(`Error ${error}`));
        });
    })

  }

}