var assert = require("assert");
var expect = require("chai").expect;
var app = require('./restaurant.js');


var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
  this.id = id;
  this.nombre = nombre;
  this.rubro = rubro;
  this.ubicacion = ubicacion;
  this.horarios = horarios;
  this.imagen = imagen;
  this.calificaciones = calificaciones;
}

var restaurantParaTest = new Restaurant(
  10,
  "New London Cafe",
  "Desayuno",
  "Londres",
  ["12:00", "13:00", "14:30"],
  "../img/desayuno3.jpg",
  [9, 4, 6, 5, 6]
);

describe("Test funcion reservarHorario", function() {
  it("Horario reservado se elimina del array", function() {
    var horariosAnteriorALaReserva = restaurantParaTest.horarios.length;
    var horarioReservado = reservarHorario("12:00");
    expect(restaurantParaTest.horarios.lentgth).to.equal(
      horariosAnteriorALaReserva.length - 1
    );
  });
  it("Reservar horario que no existe", function() {
    var arrayDeHorariosAnteriorALaReserva = restaurantParaTest.horarios.length;
    var reservarHorarioQueNoExiste = reservarHorario("17:00");
    expect(restaurantParaTest.horarios).to.equal(
      arrayDeHorariosAnteriorALaReserva
    );
  });
  it("Reservar sin parametro", function() {
    var arrayDeHorariosAnteriorALaReserva = restaurantParaTest.horarios.length;
    var reservarSinParametro = reservarHorario();
    expect(restaurantParaTest.horarios).to.equal(
      arrayDeHorariosAnteriorALaReserva
    );
  });
});

describe("Test funcion obtenerPuntuacion", function() {
  it("Calculo correcto de puntuacion", function() {
    expect(restaurantParaTest.obtenerPuntuacion()).to.equal(
      (9 + 4 + 6 + 5 + 6) / 5
    );
  });
  it("Restaurant sin calificacion", function() {
    expect(restaurantParaTest.obtenerPuntuacion()).to.equal(0);
  });
});

describe("Test función calificar", function() {
  it("Testear que solo se agregue al arreglo la calificación que sea un numero válido y del 1 al 10", function() {
    var calificacionesAntesDelTest = restaurantParaTest.calificaciones;
    restaurantParaTest.calificar(m);
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );
    restauranteParaTest.calificar(100);
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );
    restauranteParaTest.calificar(-15);
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );
    restaurantParaTest.calificar(0);
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );
  });
});

describe("Buscar Restaurante por id", function() {
  it("Retorna el restaurant correcto al pasar el ID", function() {
    expect(listadoTest.buscarRestaurante(5)).to.eql(
      listadoTest.restaurantes[4]
    );
  });
  it("Si no existe el ID o es un dato invalido devuelve error", function() {
    expect(listadoTest.buscarRestaurante(0)).to.equal(
      "No se ha encontrado ningún restaurant"
    );
    expect(listadoTest.buscarRestaurante("a")).to.equal(
      "No se ha encontrado ningún restaurant"
    );
    expect(listadoTest.buscarRestaurante(-40)).to.equal(
      "No se ha encontrado ningún restaurant"
    );
  });
});

describe("Obtener restaurante", function() {
  it("Filtro con tres parametros", function() {
    var tresParametros = listado.obtenerRestaurantes(
      "Desayuno",
      "Londres",
      "12:00"
    );
    var resultado = [
      new Restaurant(
        10,
        "New London Cafe",
        "Desayuno",
        "Londres",
        ["12:00", "13:00", "14:30"],
        "../img/desayuno3.jpg",
        [9, 4, 6, 5, 6]
      )
    ];
    expect(tresParametros).to.eql(resultado);
  });
  it("Si no se pasa parametro no se filtra el listado", function() {
    var sinParametros = listado.obtenerRestaurantes(null, null, null);
    expect(listado.restaurantes).to.eql(sinParametros);
  });
  it("Si pasa un filtro solo devuelve la lista que corresponde", function() {
    var unParametro = listado.obtenerRestaurantes(null, "Londres", null);
    var resultadoEsperado = [
      new Restaurant(
        2,
        "Mandarín Kitchen",
        "Asiática",
        "Londres",
        ["15:00", "14:30", "12:30"],
        "../img/asiatica2.jpg",
        [7, 7, 3, 9, 7]
      ),
      new Restaurant(
        10,
        "New London Cafe",
        "Desayuno",
        "Londres",
        ["12:00", "13:00", "14:30"],
        "../img/desayuno3.jpg",
        [9, 4, 6, 5, 6]
      ),
      new Restaurant(
        18,
        "Pizza Union Spitalfields",
        "Pizza",
        "Londres",
        ["12:00", "15:00", "17:30"],
        "../img/pizza1.jpg",
        [8, 8, 8, 4, 6, 7]
      ),
      new Restaurant(
        22,
        "Byron Hoxton",
        "Hamburguesa",
        "Londres",
        ["14:00", "16:00", "21:30"],
        "../img/hamburguesa3.jpg",
        [4, 9, 10, 10, 6]
      )
    ];
    expect(unParametro).to.eql(resultadoEsperado);
  });
});
