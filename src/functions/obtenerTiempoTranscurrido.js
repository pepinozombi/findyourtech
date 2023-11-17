import { differenceInDays, formatDistanceToNow } from 'date-fns';

export default function obtenerTiempoTranscurrido(fecha) {
  const hoy = new Date();
  const diferenciaDias = differenceInDays(fecha, hoy);

  if (diferenciaDias === 0) {
    return 'Today';
  } else if (diferenciaDias < 0) {
    return `${formatDistanceToNow(fecha)} ago`
  } else {
    return `In ${formatDistanceToNow(fecha)}`
  }
}