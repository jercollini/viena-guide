import type { PhraseGroup } from '../types'

// "pron" es una pronunciación aproximada en español, no fonética exacta.
export const phraseGroups: PhraseGroup[] = [
  {
    group: 'Saludos y cortesía',
    items: [
      { es: 'Hola', local: 'Hallo', pron: 'já-lo' },
      { es: 'Buenos días', local: 'Guten Morgen', pron: 'gúten mórguen' },
      { es: 'Buenas tardes', local: 'Guten Tag', pron: 'gúten tag' },
      { es: 'Adiós', local: 'Auf Wiedersehen', pron: 'auf víder-seen' },
      { es: 'Por favor', local: 'Bitte', pron: 'bíte' },
      { es: 'Gracias', local: 'Danke', pron: 'dánke' },
      { es: 'Muchas gracias', local: 'Vielen Dank', pron: 'fílen dank' },
      { es: 'Perdón / disculpe', local: 'Entschuldigung', pron: 'ent-shúldigung' },
      { es: 'Sí / No', local: 'Ja / Nein', pron: 'ya / náin' },
    ],
  },
  {
    group: 'Preguntas útiles',
    items: [
      { es: '¿Habla español?', local: 'Sprechen Sie Spanisch?', pron: 'shpréjen sí shpánish' },
      { es: '¿Habla inglés?', local: 'Sprechen Sie Englisch?', pron: 'shpréjen sí énglish' },
      { es: 'No entiendo', local: 'Ich verstehe nicht', pron: 'ish fer-shtée nisht' },
      { es: '¿Dónde está...?', local: 'Wo ist...?', pron: 'vo ist' },
      { es: '¿Cuánto cuesta?', local: 'Wie viel kostet das?', pron: 'ví fil kóstet das' },
      { es: '¿Dónde está el baño?', local: 'Wo ist die Toilette?', pron: 'vo ist di tualéte' },
    ],
  },
  {
    group: 'En el restaurante',
    items: [
      { es: 'La carta, por favor', local: 'Die Speisekarte, bitte', pron: 'di shpáize-karte, bíte' },
      { es: 'Agua', local: 'Wasser', pron: 'váser' },
      { es: 'Una cerveza', local: 'Ein Bier', pron: 'áin bir' },
      { es: 'Un café', local: 'Ein Kaffee', pron: 'áin káfe' },
      { es: 'La cuenta, por favor', local: 'Die Rechnung, bitte', pron: 'di réjnung, bíte' },
      { es: 'Está muy rico', local: 'Es schmeckt sehr gut', pron: 'es shmékt ser gut' },
    ],
  },
  {
    group: 'Emergencia',
    items: [
      { es: 'Ayuda', local: 'Hilfe', pron: 'jílfe' },
      { es: 'Necesito un médico', local: 'Ich brauche einen Arzt', pron: 'ish bráuje áinen artst' },
      { es: 'Llame a la policía', local: 'Rufen Sie die Polizei', pron: 'rúfen sí di poli-tsái' },
    ],
  },
]
