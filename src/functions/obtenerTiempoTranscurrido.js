import { differenceInDays, formatDistanceToNow } from 'date-fns';

export default function obtenerTiempoTranscurrido(fecha) {
  const hoy = new Date();
  const diferenciaDias = differenceInDays(fecha, hoy);

  if (diferenciaDias === 0) {
    return 'Hoy';
  } else if (diferenciaDias < 0) {
    return `Hace ${formatDistanceToNow(fecha)}`
  } else {
    return `Dentro de ${formatDistanceToNow(fecha)}`
  }
}