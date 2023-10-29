export default function filterClipsBySearchText(clips, searchText) {
    // Usamos el método filter para crear una nueva lista que cumple la condición
    const listaFiltrada = clips.filter(objeto => {
      // Comparamos si la propiedad 'titleDescription' contiene la cadena
      return objeto.indexes.titleDescription.toLowerCase().includes(searchText.toLowerCase());
    });
  
    return listaFiltrada;
  }