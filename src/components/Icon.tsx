// Iconos de línea (estilo Lucide), sin dependencias.
const paths: Record<string, string> = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  places: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M12 4V2',
  food: 'M7 3v8a2 2 0 0 0 2 2v8M5 3v6M9 3v6M17 21V3c-2.5 1.5-4 4.5-4 8h4',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  sos: 'M12 3l9 16H3L12 3zM12 10v4M12 17h.01',
  transport: 'M5 4h14a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2zM3 11h18M8 21l1.5-3M16 21l-1.5-3M8 14h.01M16 14h.01',
  phrases: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM9 11h6M9 14h4',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5 5-2z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  sound: 'M4 10v4h4l5 4V6L8 10H4zM16.5 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11',
  calendar: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM4 10h16M8 2v4M16 2v4M8 14h3',
  arrow: 'M5 12h14M13 6l6 6-6 6',
}

export default function Icon({
  name,
  size = 22,
}: {
  name: keyof typeof paths | string
  size?: number
}) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name] ?? paths.pin} />
    </svg>
  )
}
