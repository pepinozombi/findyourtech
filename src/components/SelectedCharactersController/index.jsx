import React from "react";
import SelectedCharacters from "../SelectedCharacters";

const SelectedCharactersController = ({
  charactersByTeam,
  characterSelect,
  setCharacterSelect
}) => {
  

  const handleCharacterDeletion = (characterId) => {
    deleteSelectedCharacter(characterId)
  }

  const deleteSelectedCharacter = characterId => {
    //hacemos un shallow copy para forzar el re-render del componente
    let updateCharacterSelect = { ...characterSelect };
    updateCharacterSelect[characterId] = {};
    setCharacterSelect(updateCharacterSelect)
  }

  return (
    <SelectedCharacters
      characterSelect={characterSelect}
      charactersByTeam={charactersByTeam}
      handleCharacterDeletion={handleCharacterDeletion}
    />
  );
};

export default SelectedCharactersController;
