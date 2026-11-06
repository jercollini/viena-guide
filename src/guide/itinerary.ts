import type { ItineraryDay } from '../types'

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'El corazón imperial',
    summary: 'Centro histórico a pie, sin grandes distancias.',
    stops: [
      { time: 'Mañana', text: 'Empezad en la Catedral de San Esteban y pasead por la Graben y la Kohlmarkt.', placeId: 'stephansdom' },
      { time: 'Mediodía', text: 'Visita al Palacio de Hofburg y sus patios.', placeId: 'hofburg' },
      { time: 'Tarde', text: 'Café y tarta en un café clásico y paseo hasta la Ópera.', placeId: 'staatsoper' },
    ],
  },
  {
    day: 2,
    title: 'Schönbrunn y jardines',
    stops: [
      { time: 'Mañana', text: 'Palacio de Schönbrunn: interior y jardines hasta la Glorieta.', placeId: 'schonbrunn' },
      { time: 'Tarde', text: 'Vuelta en metro (U4) y tarde tranquila en el Naschmarkt.', placeId: 'naschmarkt' },
    ],
  },
  {
    day: 3,
    title: 'Arte y barroco',
    stops: [
      { time: 'Mañana', text: 'Palacio Belvedere y «El beso» de Klimt.', placeId: 'belvedere' },
      { time: 'Mediodía', text: 'Iglesia de San Carlos, a un paseo del Belvedere.', placeId: 'karlskirche' },
      { time: 'Tarde', text: 'MuseumsQuartier: museos y terrazas en el patio.', placeId: 'museumsquartier' },
    ],
  },
  {
    day: 4,
    title: 'La Viena más alegre',
    stops: [
      { time: 'Mañana', text: 'La colorida Casa de Hundertwasser.', placeId: 'hundertwasser' },
      { time: 'Tarde', text: 'Prater y vuelta en la noria gigante al atardecer.', placeId: 'prater' },
    ],
  },
]
