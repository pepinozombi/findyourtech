import React from 'react'
import { Form } from "react-bootstrap";
import { VIDEOGAME_VERSIONS } from '../../utils/collections/videogameVersions'

const GameVersions = ({
    videogameCode,
    handleGameVersionSelection,
    selectedVideogameVersion
}) => {
    const versions = VIDEOGAME_VERSIONS[videogameCode] || [];
    const defaultValue = "Current ver. (" + versions[0]?.version + ")"; 

    const handleChange = (event) => {
        handleGameVersionSelection(event.target.value);
    };

    return (
        <Form.Group className="w-100 ms-1 mb-2" controlId="selectClipType">
            <Form.Select aria-label="Select Clip Type" value={selectedVideogameVersion} onChange={handleChange}>
                <option value={versions[0]?.version}>{defaultValue}</option>
                {versions.map((versionObj, index) => (
                    <option key={index} value={versionObj.version}>
                    {versionObj.version}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}

export default GameVersions;
