import type { Dish } from '../types'

// Typical food first; a spot is only named when a long-standing place is
// famous for that dish. Photos from Wikimedia Commons.
export const dishes: Dish[] = [
  {
    id: 'schnitzel',
    name: 'Wiener Schnitzel',
    nameEs: 'Escalope de ternera empanado',
    kind: 'Plato',
    description:
      'El plato vienés por excelencia: filete de ternera muy fino, empanado y frito hasta quedar dorado y ondulado. Se sirve con limón y ensalada de patata.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/960px-Wiener-Schnitzel02.jpg',
    tip: 'El auténtico es de ternera («vom Kalb»); si pone «vom Schwein» es de cerdo, más barato y también muy común.',
    spot: { name: 'Figlmüller', area: 'Centro, junto a la Catedral', lat: 48.2089, lng: 16.3746 },
  },
  {
    id: 'tafelspitz',
    name: 'Tafelspitz',
    nameEs: 'Ternera cocida con su caldo',
    kind: 'Plato',
    description:
      'Carne de ternera cocida lentamente, servida en la misma olla con su caldo. Se acompaña de patatas, salsa de manzana con rábano y salsa de cebollino.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Tafelspitz.jpg/960px-Tafelspitz.jpg',
    tip: 'Primero se toma el caldo como sopa y después la carne.',
    spot: { name: 'Plachutta Wollzeile', area: 'Centro', lat: 48.2093, lng: 16.3785 },
  },
  {
    id: 'gulasch',
    name: 'Gulasch',
    nameEs: 'Guiso de ternera con pimentón',
    kind: 'Plato',
    description:
      'Herencia húngara del imperio: un guiso de carne con mucha cebolla y pimentón dulce. Ideal en un día frío.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Gulasch.jpg/960px-Gulasch.jpg',
    tip: 'Lo tienen casi todas las tabernas tradicionales («Beisl»). Se acompaña de pan o de un «Knödel» (bola de pan).',
  },
  {
    id: 'stelze',
    name: 'Stelze',
    nameEs: 'Codillo de cerdo asado',
    kind: 'Plato',
    description:
      'Codillo asado con la piel muy crujiente, para compartir. Típico de las cervecerías con jardín.',
    tip: 'Es enorme: una ración da para dos o tres personas.',
    spot: { name: 'Schweizerhaus', area: 'Prater', lat: 48.2147, lng: 16.4009 },
  },
  {
    id: 'kasekrainer',
    name: 'Käsekrainer',
    nameEs: 'Salchicha rellena de queso',
    kind: 'Para picar',
    description:
      'La reina de los puestos de salchichas («Würstelstand»): salchicha ahumada con trocitos de queso que se funden al asarla.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/K%C3%A4sekrainer.jpg/960px-K%C3%A4sekrainer.jpg',
    tip: 'Se pide con mostaza dulce («süßer Senf») o picante y un trozo de pan. Perfecta para cenar algo rápido.',
  },
  {
    id: 'sachertorte',
    name: 'Sachertorte',
    nameEs: 'Tarta de chocolate y albaricoque',
    kind: 'Dulce',
    description:
      'Bizcocho de chocolate con una fina capa de mermelada de albaricoque y cobertura de chocolate. Se toma con nata sin azúcar.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Wien_-_Sachertorte.jpg/960px-Wien_-_Sachertorte.jpg',
    tip: 'Pedidla «mit Schlag» (con nata montada), como hacen los vieneses.',
    spot: { name: 'Café Sacher', area: 'Junto a la Ópera', lat: 48.2036, lng: 16.3696 },
  },
  {
    id: 'apfelstrudel',
    name: 'Apfelstrudel',
    nameEs: 'Hojaldre de manzana',
    kind: 'Dulce',
    description:
      'Masa estirada finísima rellena de manzana, canela y pasas. Se sirve templado, a veces con salsa de vainilla.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Wiener_Apfelstrudel.jpg/960px-Wiener_Apfelstrudel.jpg',
    tip: 'Lo tienen todos los cafés tradicionales; es el acompañante perfecto de un café a media tarde.',
  },
  {
    id: 'kaiserschmarrn',
    name: 'Kaiserschmarrn',
    nameEs: 'Tortita del emperador',
    kind: 'Dulce',
    description:
      'Tortita esponjosa rota en trozos, con azúcar glas y compota de ciruela. Cuentan que era el postre favorito del emperador Francisco José.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Kaiserschmarrn_mit_Zwetschkenr%C3%B6ster.jpg/960px-Kaiserschmarrn_mit_Zwetschkenr%C3%B6ster.jpg',
    tip: 'Es contundente: compartidlo como postre o tomadlo como merienda.',
  },
  {
    id: 'melange',
    name: 'Wiener Melange',
    nameEs: 'Café con leche espumosa',
    kind: 'Bebida',
    description:
      'El café vienés más popular, parecido a un capuchino. En los cafés clásicos llega en bandeja de plata con un vaso de agua.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Caf%C3%A9_Hofburg_Wien_2008_Melange_1.jpg/960px-Caf%C3%A9_Hofburg_Wien_2008_Melange_1.jpg',
    tip: 'En un café vienés nadie os meterá prisa: podéis quedaros leyendo o charlando todo el rato que queráis.',
    spot: { name: 'Café Central', area: 'Centro', lat: 48.2103, lng: 16.3659 },
  },
]
