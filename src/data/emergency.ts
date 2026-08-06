export interface EmergencyContact {
  label: string
  value: string
  phone?: string
  info?: string
}

export const emergencyContacts: EmergencyContact[] = [
  {
    label: 'Emergencias (general, UE)',
    value: '112',
    phone: '112',
    info: 'Número único europeo. Sirve para policía, bomberos y ambulancia.',
  },
  {
    label: 'Ambulancia',
    value: '144',
    phone: '144',
  },
  {
    label: 'Policía',
    value: '133',
    phone: '133',
  },
  {
    label: 'Bomberos',
    value: '122',
    phone: '122',
  },
  {
    label: 'Guardia médica',
    value: '1450',
    phone: '1450',
    info: 'Consejo médico telefónico si no es una urgencia grave.',
  },
  {
    label: 'Embajada de España en Viena',
    value: '+43 1 505 57 88',
    phone: '+4315055788',
    info: 'Argentinierstraße 34, 1040 Wien. Para incidencias con documentación o ayuda consular.',
  },
  {
    label: 'Hospital central (AKH Wien)',
    value: '+43 1 40400-0',
    phone: '+43140400',
    info: 'Währinger Gürtel 18-20, 1090 Wien. Gran hospital universitario.',
  },
]

export const emergencyTips: string[] = [
  'Llevad siempre la Tarjeta Sanitaria Europea (TSE) para ser atendidos en la sanidad pública.',
  'Guardad una foto del pasaporte en el móvil por si lo perdéis.',
  'Las farmacias (Apotheke) tienen una cruz verde. Fuera de horario hay farmacias de guardia señalizadas.',
  'Anotad el nombre y dirección del hotel por si necesitáis pedir ayuda para volver.',
]
