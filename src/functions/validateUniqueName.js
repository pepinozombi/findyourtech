function validateUniqueName(inputString) {
    const regex = /^[a-zA-Z0-9_]+$/; // Expresión regular que permite letras, números y underscores

    if (inputString.length <= 16 && regex.test(inputString)) {
        return null; // La cadena es válida
    } else {
        return 'Only letters, numbers and underscore ("_"), must not exceed 16 characters'; // La cadena no es válida
    }
}

export default validateUniqueName;