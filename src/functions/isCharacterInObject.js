
export default async function isCharacterInObject(characters) {
    const charactersKeys = Object.keys(characters);
    let result = false;
    charactersKeys.forEach(character => {
        let characterKeys = Object.keys(characters[character]);
        if(characterKeys.length !== 0) {
            result = true;
            return result;
        }
    });

    return result;
  }