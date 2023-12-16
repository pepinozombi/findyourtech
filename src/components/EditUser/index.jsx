import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { toast } from 'react-toastify';
import { AuthenticationContext } from "../../App";
import getUserByUID from "../../functions/getUserByUID";
import { Tooltip } from 'react-tooltip'
import updateUser from "../../functions/updateUser";
import validateUniqueName from "../../functions/validateUniqueName";

const EditUser = () => {
    const [name, setName] = useState("");
    const [uniqueName, setUniqueName] = useState("");
    const [uniqueNameError, setUniqueNameError] = useState(null);
    const [discord, setDiscord] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [twitch, setTwitch] = useState("");
    const [hasEditedName, setHasEditedName] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(true);
    const [userProps, setUserProps] = useState(null);

    const { user } = useContext(AuthenticationContext);

    useEffect(() => {
        // Comprobar si el usuario está autenticado
        if (user?.uid) {
            // Realizar la consulta a Firebase para obtener UserProps
            getUserByUID(user.uid)
                .then((userPropsData) => {
                    setUserProps(userPropsData.data);
                    console.log(userPropsData);
                    setLoading(false); // Cambia el estado de carga una vez que los datos están listos
                })
                .catch((error) => {
                    toast.error("Error al cargar UserProps:", error);
                    setLoading(false);
                });
        } else {
            setLoading(true); // Si el usuario no está autenticado, cambiar el estado de carga
        }
    }, [user]);

    // Cuando userProps se actualiza, establece los valores iniciales de los campos del formulario
    useEffect(() => {
        if (userProps) {
            setHasEditedName(userProps.hasEditedName)
            if (userProps.hasEditedName) {
                setName(userProps.name);
                setUniqueName(userProps.uniqueName);
            }

            setDiscord(userProps.discord);
            setTwitter(userProps.twitter);
            setTwitch(userProps.twitch);
            setYoutube(userProps.youtube);

            setProfilePic(userProps.profilePic)
            // También puedes establecer otros campos del formulario según los datos de userProps
        }
    }, [userProps]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        if (name === "") {
            toast.error("El nombre no puede estar vacio");
            return;
        }

        if (name.length < 4) {
            toast.error("El nombre debe tener como minimo 4 caracteres");
            return;
        }

        try {

            let updatedUserProps = userProps;

            if (!hasEditedName) {
                updatedUserProps.hasEditedName = true;
                updatedUserProps.uniqueName = uniqueName.toLocaleLowerCase();
            }

            updatedUserProps.name = name;
            updatedUserProps.discord = discord;
            updatedUserProps.twitter = twitter;
            updatedUserProps.twitch = twitch;
            updatedUserProps.youtube = youtube;

            setHasEditedName(true);

            await updateUser(user.uid, updatedUserProps)
                .then((response) => {
                    toast(response.data)
                })
                .catch((error) => {
                    toast.error("Error al cargar UserProps:", error);
                    setLoading(false);
                });
        } catch (error) {
            console.error(error);
        }
    }

    const handleUniqueName = async (e) => {
        const value = e.target.value;
        setUniqueName(value);
        const validationError = validateUniqueName(value);
        setUniqueNameError(validationError);
        if (validationError != null) {
            toast.error(validationError);
        }
    }
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Row className="justify-content-center">
                                <div className="col-2">
                                    <Image
                                        src={profilePic}
                                        alt="Profile pic"
                                        data-tooltip-id={"profilePic"}
                                        data-tooltip-content={"Changing your profile pic is not available yet. You will have this flashy autogenerated picture instead!"}
                                        data-tooltip-place="bottom"
                                    />
                                    <Tooltip 
                                        key={"profilePic"}
                                        id={"profilePic"} 
                                    />
                                    <Tooltip 
                                        key={"userNameTooltip"}
                                        id={"userNameTooltip"} 
                                    />
                                </div>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Unique name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Unique name(only letters, numbers and underscore ('_'), no spaces, max. 16 characters length)" 
                                            value={uniqueName} 
                                            onChange={handleUniqueName} 
                                            disabled={hasEditedName ? 'disabled': ''}
                                            data-tooltip-id={"userNameTooltip"}
                                            data-tooltip-content={"You can't edit you username more than once! Try contacting Pepino if you want so."}
                                            data-tooltip-place="bottom"
                                        />
                                        {uniqueNameError && <div>{uniqueNameError}</div>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>User name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="User name" 
                                            value={name} 
                                            onChange={e => setName(e.target.value)} 
                                            />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Discord</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Discord user" 
                                            value={discord} 
                                            onChange={e => setDiscord(e.target.value)} 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Twitter/X</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Tiwtter/X user" 
                                            value={twitter} 
                                            onChange={e => setTwitter(e.target.value)} 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Twitch</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Twitch user" 
                                            value={twitch} 
                                            onChange={e => setTwitch(e.target.value)} 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Youtube</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Youtube user" 
                                            value={youtube} 
                                            onChange={e => setYoutube(e.target.value)} 
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit"
                                        disabled={uniqueNameError ? 'disabled': ''}>
                                        Save
                                    </Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditUser;