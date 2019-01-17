var expect = chai.expect;

var listadoTest = new Listado(listadoDeRestaurantes);

var restaurantParaTest = new Restaurant(
  10,
  "New London Cafe",
  "Desayuno",
  "Londres",
  ["12:00", "13:00", "14:30"],
  "../img/desayuno3.jpg",
  [9, 4, 6, 5, 6]
);

var restaurantParaTestSinCalificacion = new Restaurant(
  10,
  "New London Cafe",
  "Desayuno",
  "Londres",
  [],
  "../img/desayuno3.jpg",
  []
);

describe("Test funcion reservarHorario", function() {
  it("Horario reservado se elimina del array", function() {
    var horariosAnteriorALaReserva = restaurantParaTest.horarios.length;
    restaurantParaTest.reservarHorario("12:00");
    expect(restaurantParaTest.horarios.length).to.equal(
      horariosAnteriorALaReserva - 1
    );
  });
  it("Reservar horario que no existe", function() {
    var arrayDeHorariosAnteriorALaReserva = restaurantParaTest.horarios;
    restaurantParaTest.reservarHorario("17:00");
    expect(restaurantParaTest.horarios).to.equal(
      arrayDeHorariosAnteriorALaReserva
    );
  });
  it("Reservar sin parametro", function() {
    var arrayDeHorariosAnteriorALaReserva = restaurantParaTest.horarios;
    restaurantParaTest.reservarHorario();
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
    expect(restaurantParaTestSinCalificacion.obtenerPuntuacion()).to.equal(0);
  });
});

describe("Test función calificar", function() {
  it("Testear que solo se agregue al arreglo la calificación que sea un numero válido y del 1 al 10", function() {
    var calificacionesAntesDelTest = restaurantParaTest.calificaciones;
    restaurantParaTest.calificar("m");
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );

    /*restauranteParaTest.calificar("100");
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );
    restauranteParaTest.calificar("-15");
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );
    restaurantParaTest.calificar("0");
    expect(restaurantParaTest.calificaciones).to.equal(
      calificacionesAntesDelTest
    );*/
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
    var resultadoEsperado = 4;
    expect(unParametro.length).to.equal(resultadoEsperado);
  });
});

describe("Calculo de precio base de una reserva", function() {
  it("Calculo de precio base con todos los datos pasados correctamente", function() {
    var primeraReserva = new Reserva(new Date(2018, 11, 3, 15, 00), 4, 300, "");
    expect(primeraReserva.calcularPrecioBase()).to.equal(1200);
    var segundaReserva = new Reserva(new Date(2018, 11, 1, 13, 00), 2, 400, "");
    expect(segundaReserva.calcularPrecioBase()).to.equal(800);
    var terceraReserva = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "");
    expect(terceraReserva.calcularPrecioBase()).to.equal(2800);
    it("Calculo de precio base con datos incorrectos, devuelve error", function() {
      var cuartaReserva = new Reserva(
        new Date(2018, 11, 28, 14, 00),
        a,
        400,
        ""
      );
      var quintaReserva = new Reserva(
        new Date(2018, 11, 28, 14, 00),
        6,
        null,
        ""
      );
      var sextaReserva = new Reserva(null, 8, 800, "");
      expect(cuartaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
      expect(quintaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
      expect(sextaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
    });
  });
});

describe("Calculo del precio final de reserva", function() {
  it("Calculo de precio base con datos incorrectos, devuelve error", function() {
    var cuartaReserva = new Reserva(
      new Date(2018, 11, 28, 14, 00),
      "a",
      400,
      "DES15"
    );
    var quintaReserva = new Reserva(
      new Date(2018, 11, 28, 14, 00),
      6,
      null,
      ""
    );
    var sextaReserva = new Reserva(null, 8, 800, "");
    expect(cuartaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
    expect(quintaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
    expect(sextaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
  });
  it("Calculo precio de reservas dia de semana, hora no pico, grupos < 4 c/ desc.", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 3, 350, "DES1");
    var reserva2 = new Reserva(
      new Date(2018, 6, 24, 15, 100),
      2,
      150,
      "DES200"
    );
    var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 1, 250, "DES15");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 350 - 350);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150 - 200);
    expect(reserva3.calcularPrecioFinal()).to.be.equal(1 * 250 * 0.85);
  });

  it("Calculo precio de reservas dia de semana, hora pico, grupos < 4 c/ desc.", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 23, 13, 00), 2, 400, "DES200");
    var reserva2 = new Reserva(new Date(2018, 11, 12, 13, 00), 3, 300, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal((2 * 400 - 200) * 1.05);
    expect(reserva2.calcularPrecioFinal()).to.be.equal((3 * 300 - 300) * 1.05);
  });
  it("Calculo precio de reservas fin de semana, hora pico, grupos < a 4 con descuentos.", function() {
    var reserva1 = new Reserva(
      new Date(2018, 11, 29, 13, 00),
      2,
      400,
      "DES200"
    );
    expect(reserva1.calcularPrecioFinal()).to.be.equal((2 * 400 - 200) * 1.15);
  });
  it("Calculo de precio de reservas día de semana, hora no pico, grupos menores a 4 sin descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 3, 400, "");
    var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 2, 150, "");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 400);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150);
  });
  it("Calculo de precio de reservas día de semana, hora no pico, grupos menores a 4 con descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 3, 400, "DES200");
    var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 2, 150, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 400 - 200);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150 - 150);
  });
  it("Calculo de precio de reservas día de semana, hora pico, grupos de cuatro a seis con descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 23, 13, 00), 5, 400, "DES200");
    var reserva2 = new Reserva(new Date(2018, 11, 12, 13, 00), 5, 300, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(
      (5 * 400 - 200) * 0.95 * 1.05
    );
    expect(reserva2.calcularPrecioFinal()).to.be.equal(
      (5 * 300 - 300) * 0.95 * 1.05
    );
  });

  it("Calculo de precio de reservas día de semana, hora no pico, grupos de cuatro a seis con descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 5, 400, "DES200");
    var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 5, 150, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal((5 * 400 - 200) * 0.95);
    expect(reserva2.calcularPrecioFinal()).to.be.equal((5 * 150 - 150) * 0.95);
  });
  it("Calculo de precio de reservas fin de semana, hora pico, grupos de cuatro a seis sin descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 11, 29, 13, 00), 5, 400, "");
    var reserva2 = new Reserva(new Date(2018, 11, 29, 13, 00), 5, 150, "");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(5 * 400 * 0.95 * 1.15);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(5 * 150 * 0.95 * 1.15);
  });
  it("Calculo de precio de reservas fin de semana, hora no pico, grupos de cuatro a seis con descuento", function() {
    var reserva1 = new Reserva(
      new Date(2018, 11, 22, 11, 00),
      5,
      400,
      "DES200"
    );
    var reserva2 = new Reserva(new Date(2018, 11, 29, 11, 00), 5, 150, "DES15");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(
      (5 * 400 - 200) * 0.95 * 1.1
    );
    expect(reserva2.calcularPrecioFinal()).to.be.equal(
      5 * 150 * 0.85 * 0.95 * 1.1
    );
  });

  it("Calculo de precio de reservas día de semana, hora pico, grupos de siete a ocho con descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 23, 13, 00), 7, 400, "DES200");
    var reserva2 = new Reserva(new Date(2018, 11, 24, 13, 00), 8, 150, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(
      (7 * 400 - 200) * 0.9 * 1.05
    );
    expect(reserva2.calcularPrecioFinal()).to.be.equal(
      (8 * 150 - 150) * 0.9 * 1.05
    );
  });
  it("Calculo de precio de reservas día de semana, hora no pico, grupos de siete a ocho con descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 6, 23, 11, 00), 7, 400, "DES200");
    var reserva2 = new Reserva(new Date(2018, 11, 24, 11, 00), 8, 150, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal((7 * 400 - 200) * 0.9);
    expect(reserva2.calcularPrecioFinal()).to.be.equal((8 * 150 - 150) * 0.9);
  });

  it("Calculo de precio de reservas fin de semana, hora pico, grupos de siete a ocho sin descuento", function() {
    var reserva1 = new Reserva(new Date(2018, 11, 29, 13, 00), 7, 400, "");
    var reserva2 = new Reserva(new Date(2018, 11, 29, 13, 00), 8, 150, "");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(7 * 400 * 0.9 * 1.15);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(8 * 150 * 0.9 * 1.15);
  });

  it("Calculo de precio de reservas fin de semana, hora no pico, grupos de siete a ocho con descuento", function() {
    var reserva1 = new Reserva(
      new Date(2018, 11, 29, 11, 00),
      7,
      400,
      "DES200"
    );
    var reserva2 = new Reserva(new Date(2018, 11, 29, 11, 00), 8, 150, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(
      (7 * 400 - 200) * 0.9 * 1.1
    );
    expect(reserva2.calcularPrecioFinal()).to.be.equal(
      (8 * 150 - 150) * 0.9 * 1.1
    );
  });
});
