export interface Place {
  id: string
  name: string
  category: 'Monumento' | 'Palacio' | 'Museo' | 'Iglesia' | 'Ocio' | 'Mercado'
  description: string
  address: string
  lat: number
  lng: number
  image: string
  tip?: string
}

// Imágenes desde Wikimedia Commons (uso libre).
export const places: Place[] = [
  {
    id: 'stephansdom',
    name: 'Catedral de San Esteban',
    category: 'Iglesia',
    description:
      'El símbolo de Viena, en pleno centro. Su tejado de tejas de colores y la torre gótica son inconfundibles. Se puede entrar gratis a la parte principal.',
    address: 'Stephansplatz 3, 1010 Wien',
    lat: 48.2085,
    lng: 16.3735,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wien_-_Stephansdom_%281%29.JPG/500px-Wien_-_Stephansdom_%281%29.JPG',
    tip: 'Está a pie de metro (estación Stephansplatz). Buen punto de partida para pasear.',
  },
  {
    id: 'schonbrunn',
    name: 'Palacio de Schönbrunn',
    category: 'Palacio',
    description:
      'La residencia de verano imperial, con enormes jardines. Se puede visitar por dentro y pasear por los jardines de forma gratuita.',
    address: 'Schönbrunner Schloßstraße 47, 1130 Wien',
    lat: 48.1845,
    lng: 16.3122,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Wien_-_Schloss_Sch%C3%B6nbrunn.JPG/500px-Wien_-_Schloss_Sch%C3%B6nbrunn.JPG',
    tip: 'Hay bancos y zonas de sombra. Los jardines son llanos y cómodos para pasear.',
  },
  {
    id: 'hofburg',
    name: 'Palacio de Hofburg',
    category: 'Palacio',
    description:
      'El antiguo palacio imperial en el centro. Alberga los aposentos imperiales, el Museo Sisi y la Escuela Española de Equitación.',
    address: 'Michaelerkuppel, 1010 Wien',
    lat: 48.2065,
    lng: 16.3657,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Wien_-_Neue_Hofburg.JPG/500px-Wien_-_Neue_Hofburg.JPG',
  },
  {
    id: 'staatsoper',
    name: 'Ópera Estatal de Viena',
    category: 'Monumento',
    description:
      'Uno de los teatros de ópera más famosos del mundo. Precioso por fuera; se puede visitar por dentro con visita guiada.',
    address: 'Opernring 2, 1010 Wien',
    lat: 48.2029,
    lng: 16.3691,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Wiener_Staatsoper_Front.jpg/500px-Wiener_Staatsoper_Front.jpg',
  },
  {
    id: 'belvedere',
    name: 'Palacio Belvedere',
    category: 'Museo',
    description:
      'Dos palacios barrocos con jardines. Dentro está "El Beso" de Gustav Klimt, la obra más famosa de Austria.',
    address: 'Prinz-Eugen-Straße 27, 1030 Wien',
    lat: 48.1915,
    lng: 16.3809,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Palacio_Belvedere%2C_Viena%2C_Austria%2C_2020-02-01%2C_DD_93-95_HDR.jpg/500px-Palacio_Belvedere%2C_Viena%2C_Austria%2C_2020-02-01%2C_DD_93-95_HDR.jpg',
  },
  {
    id: 'prater',
    name: 'Prater y Noria (Riesenrad)',
    category: 'Ocio',
    description:
      'Gran parque con la famosa noria gigante de 1897. Buenas vistas de la ciudad desde arriba, subida tranquila y sentada.',
    address: 'Riesenradplatz 1, 1020 Wien',
    lat: 48.2166,
    lng: 16.3958,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Wien_Riesenrad.jpg/500px-Wien_Riesenrad.jpg',
    tip: 'La noria va muy despacio y es muy cómoda. Ideal para descansar con vistas.',
  },
  {
    id: 'naschmarkt',
    name: 'Naschmarkt',
    category: 'Mercado',
    description:
      'El mercado más conocido de Viena, con puestos de comida, especias y pequeños restaurantes para tapear.',
    address: 'Naschmarkt, 1060 Wien',
    lat: 48.1985,
    lng: 16.3648,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Wien_-_Naschmarkt.JPG/500px-Wien_-_Naschmarkt.JPG',
  },
  {
    id: 'hundertwasser',
    name: 'Casa de Hundertwasser',
    category: 'Monumento',
    description:
      'Un edificio de viviendas muy original, con formas curvas, colores y árboles en las ventanas. Curioso de ver por fuera.',
    address: 'Kegelgasse 36-38, 1030 Wien',
    lat: 48.2073,
    lng: 16.3939,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Wien_-_Hundertwasserhaus_%2803%29.JPG/500px-Wien_-_Hundertwasserhaus_%2803%29.JPG',
  },
  {
    id: 'karlskirche',
    name: 'Iglesia de San Carlos (Karlskirche)',
    category: 'Iglesia',
    description:
      'Una preciosa iglesia barroca con una gran cúpula verde y dos columnas. Frente a ella hay un estanque para hacer fotos.',
    address: 'Karlsplatz, 1040 Wien',
    lat: 48.1984,
    lng: 16.3719,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Karlskirche_Abendsonne_1.jpg/500px-Karlskirche_Abendsonne_1.jpg',
  },
  {
    id: 'museumsquartier',
    name: 'MuseumsQuartier',
    category: 'Museo',
    description:
      'Gran zona de museos y patios con bancos donde sentarse. Buen sitio para descansar y tomar algo entre visitas.',
    address: 'Museumsplatz 1, 1070 Wien',
    lat: 48.2035,
    lng: 16.3585,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/MuseumsQuartier_Wien_Sept_2020_1.jpg/500px-MuseumsQuartier_Wien_Sept_2020_1.jpg',
  },
]
