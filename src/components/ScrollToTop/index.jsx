import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Esto hace que la página se desplace a la parte superior
  }, [pathname]); // Se ejecutará cada vez que cambie la ruta (pathname)

  return null; // Este componente no renderiza nada en la interfaz, solo maneja el desplazamiento
}

export default ScrollToTop;