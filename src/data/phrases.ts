export interface Phrase {
  es: string
  de: string
  pron: string
}

export interface PhraseGroup {
  group: string
  items: Phrase[]
}

// "pron" es una pronunciación aproximada en español, no fonética exacta.
export const phraseGroups: PhraseGroup[] = [
  {
    group: 'Saludos y cortesía',
    items: [
      { es: 'Hola', de: 'Hallo', pron: 'já-lo' },
      { es: 'Buenos días', de: 'Guten Morgen', pron: 'gúten mórguen' },
      { es: 'Buenas tardes', de: 'Guten Tag', pron: 'gúten tag' },
      { es: 'Adiós', de: 'Auf Wiedersehen', pron: 'auf víder-seen' },
      { es: 'Por favor', de: 'Bitte', pron: 'bíte' },
      { es: 'Gracias', de: 'Danke', pron: 'dánke' },
      { es: 'Muchas gracias', de: 'Vielen Dank', pron: 'fílen dank' },
      { es: 'Perdón / disculpe', de: 'Entschuldigung', pron: 'ent-shúldigung' },
      { es: 'Sí / No', de: 'Ja / Nein', pron: 'ya / náin' },
    ],
  },
  {
    group: 'Preguntas útiles',
    items: [
      { es: '¿Habla español?', de: 'Sprechen Sie Spanisch?', pron: 'shpréjen sí shpánish' },
      { es: '¿Habla inglés?', de: 'Sprechen Sie Englisch?', pron: 'shpréjen sí énglish' },
      { es: 'No entiendo', de: 'Ich verstehe nicht', pron: 'ish fer-shtée nisht' },
      { es: '¿Dónde está...?', de: 'Wo ist...?', pron: 'vo ist' },
      { es: '¿Cuánto cuesta?', de: 'Wie viel kostet das?', pron: 'ví fil kóstet das' },
      { es: '¿Dónde está el baño?', de: 'Wo ist die Toilette?', pron: 'vo ist di tualéte' },
    ],
  },
  {
    group: 'En el restaurante',
    items: [
      { es: 'La carta, por favor', de: 'Die Speisekarte, bitte', pron: 'di shpáize-karte, bíte' },
      { es: 'Agua', de: 'Wasser', pron: 'váser' },
      { es: 'Una cerveza', de: 'Ein Bier', pron: 'áin bir' },
      { es: 'Un café', de: 'Ein Kaffee', pron: 'áin káfe' },
      { es: 'La cuenta, por favor', de: 'Die Rechnung, bitte', pron: 'di réjnung, bíte' },
      { es: 'Está muy rico', de: 'Es schmeckt sehr gut', pron: 'es shmékt ser gut' },
    ],
  },
  {
    group: 'Emergencia',
    items: [
      { es: 'Ayuda', de: 'Hilfe', pron: 'jílfe' },
      { es: 'Necesito un médico', de: 'Ich brauche einen Arzt', pron: 'ish bráuje áinen artst' },
      { es: 'Llame a la policía', de: 'Rufen Sie die Polizei', pron: 'rúfen sí di poli-tsái' },
    ],
  },
]
