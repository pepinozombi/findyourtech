import React, { useContext, useEffect, useState } from "react";
import { authentication } from "../../firebase/config";
import { TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Navbar, Container, Nav, NavDropdown, Image, Spinner } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BoxArrowDown, Twitter, CaretDown } from "react-bootstrap-icons";
import "./header.scss";
import "../../pages/Upload/upload.scss";
import { AuthenticationContext } from "../../App";
import checkAndCreateUser from "../../functions/checkAndCreateUser";
import getUserByUID from "../../functions/getUserByUID";

export default function Header() {
  const { user, setUser } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(true);
  const [userProps, setUserProps] = useState(null);
  const [vip, setVip] = useState(false);
  
  const navigate = useNavigate(); // Obtiene la función de navegación
  const signInTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        checkAndCreateUser(re)
          .then((result) => {
            console.log(result);
            result ? navigate('/editUserProfile') : console.log('logeado correctamente');
          })
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // Comprobar si el usuario está autenticado
    if (user?.photoURL) {
        // Realizar la consulta a Firebase para obtener UserProps
        // Sustituye 'tuConsultaAFirebase' con la consulta real a tu colección UserProps
        getUserByUID(user.uid)
          .then((userPropsData) => {
              setUserProps(userPropsData.data);
              setLoading(false); // Cambia el estado de carga una vez que los datos están listos
        })
        .catch((error) => {
            console.error("Error al cargar UserProps:", error);
            setLoading(false);
        });
        setLoading(false);
    } else {
        setLoading(false); // Si el usuario no está autenticado, cambiar el estado de carga
    }
}, [user]);

useEffect(() => {
  if (userProps) {
    setVip(userProps.vip)
  }
}, [userProps]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Findyourtech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {loading ? (
            <div className="justify-content-end">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        ) : (
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            {user && vip && (
              <Navbar.Text href="#upload">
                <BoxArrowDown />
                <Link to="/upload" className="mx-2">
                  Upload
                </Link>
              </Navbar.Text>
            )}
            {!user ? (
              <Nav.Link onClick={signInTwitter}>
                <Twitter />
                <span className="mx-2">Login</span>
              </Nav.Link>
            ) : (
              <NavDropdown
                title={
                  <>
                    <Image
                      src={user.photoURL}
                      alt="UserName profile image"
                      style={{ width: "30px", borderRadius: "10%"}}
                    />
                    <CaretDown />
                  </>
                }
                id="basic-nav-dropdown"
              >
                {userProps?.uniqueName &&
                  <NavDropdown.Item href={"/user/" + userProps.uniqueName}>
                    Profile
                  </NavDropdown.Item>
                }
                <NavDropdown.Item href="/editUserProfile">
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => signOut(authentication)}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}
