/*Testeá la función reservarHorario(horario). Las pruebas que realices tienen que verificar que:
Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.
Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.
Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual*/

var assert = require("assert");
var expect = require("chai").expect; //de todo chai trae solamente expect

//DUDA: CREO QUE DEBERIA SELECCIONAR UN RESTAURANT PARA TESTEAR, SE TESTEA UNO EN ESPECIAL?. si
var restaurantParaTest = new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]);

describe("Test funcion reservarHorario", function() {
  it("Horario reservado se elimina del array", function() {
    var horariosAnteriorALaReserva = restaurantParaTest.horarios.length;
    var horarioReservado = reservarHorario("12:00");
    expect(restaurantParaTest.horarios.lentgth).to.equal(
      horariosAnteriorALaReserva.length - 1
    ); //acá chequea que despues de la reserva se haya eliminado el horario reservado del array, es decir que tenga un elemento menos
  });
  it("Reservar horario que no existe", function() {
    var arrayDeHorariosAnteriorALaReserva = restaurantParaTest.horarios.length;
    var reservarHorarioQueNoExiste = reservarHorario("17:00"); //horarioquenoexiste
    expect(restaurantParaTest.horarios).to.equal(
        arrayDeHorariosAnteriorALaReserva
      ); 
  });
  it("Reservar sin parametro", function() {
    var arrayDeHorariosAnteriorALaReserva = restaurantParaTest.horarios.length;
    var reservarSinParametro = reservarHorario();
    expect(restaurantParaTest.horarios).to.equal(
        arrayDeHorariosAnteriorALaReserva);
});


});

/*Testeá la función obtenerPuntuacion(). Las pruebas que realices tienen que verificar que:
Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.*/

describe("Test funcion obtenerPuntuacion", function() {
  it("Calculo correcto de puntuacion", function() {
      expect(restaurantParaTest.obtenerPuntuacion()).to.equal((9 + 4 + 6 + 5 +6)/5);
  });
  it("Restaurant sin calificacion", function() {
      expect(restaurantParaTest.obtenerPuntuacion()).to.equal(0);
  });
});

/* Paso 4: Testeá la función calificar()
Testeá la función calificar(). En este paso, podés elegir vos las pruebas que quieras hacer.*/

describe("Test función calificar", function() {
    it("Testear que solo se agregue al arreglo la calificación que sea un numero válido y del 1 al 10", function() {
        var calificacionesAntesDelTest = restaurantParaTest.calificaciones
        restaurantParaTest.calificar(m);
        expect(restaurantParaTest.calificaciones).to.equal(calificacionesAntesDelTest);
        restauranteParaTest.calificar(100);
        expect(restaurantParaTest.calificaciones).to.equal(calificacionesAntesDelTest);
        restauranteParaTest.calificar(-15)
        expect(restaurantParaTest.calificaciones).to.equal(calificacionesAntesDelTest);
        restaurantParaTest.calificar(0);
        expect(restaurantParaTest.calificaciones).to.equal(calificacionesAntesDelTest);

    }
);
});


/*

Paso 5: Testeá la función buscarRestaurante(id)
Testeá la función buscarRestaurante(id). En este paso, podés elegir vos las pruebas que quieras hacer.*/

describe("Test buscarRestaurante por id", function() {
  it('Retorna el restaurant correcto al pasar el ID', function () {
    expect(listadoTest.buscarRestaurante(5)).to.eql(listadoTest.restaurantes[4]);
});
it('Si no existe el ID o es un dato invalido devuelve error', function () {
    expect(listadoTest.buscarRestaurante(0)).to.equal("No se ha encontrado ningún restaurant");
    expect(listadoTest.buscarRestaurante("a")).to.equal("No se ha encontrado ningún restaurant");
    expect(listadoTest.buscarRestaurante(-40)).to.equal("No se ha encontrado ningún restaurant");
  
});
});


/*Paso 6: Testeá la función obtenerRestaurantes()
Testeá la función obtenerRestaurantes() para comprobar su funcionamiento. En este paso, podés elegir vos la pruebas que quieras hacer.*/
