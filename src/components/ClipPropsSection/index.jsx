import React, { useState, useContext, useEffect } from 'react'
import { ButtonGroup, Button, Dropdown, DropdownButton, Modal, Form, FormControl, Row } from 'react-bootstrap';
import { Plus, Heart, Flag, FolderPlus, FlagFill, HeartFill } from 'react-bootstrap-icons';
import './ClipPropsSection.css'; // Archivo CSS para estilos personalizados
import { AuthenticationContext } from '../../App';
import getUserByUID from '../../functions/getUserByUID';
import getCreateLikeListByUser from '../../functions/getCreateLikeListByUser';
import saveClipLike from '../../functions/saveClipLike';
import saveListClip from '../../functions/saveListClip';
import saveClipDeprecated from '../../functions/saveClipDeprecated';
import getClipDeprecatedByUserClip from '../../functions/getClipDeprecatedByUserClip';
import getClipLikeByUserClip from '../../functions/getClipLikeByUserClip';
import ListForm from '../ListForm';
import createNewList from '../../functions/createNewList';
import { toast } from 'react-toastify';
import getUserListsByUser from '../../functions/getUserListsByUser';
import checkClipInLists from '../../functions/checkClipInLists';


const ClipPropsSection = (ClipId) => {

  const { user } = useContext(AuthenticationContext);
  const [meGusta, setMeGusta] = useState(false);
  const [desactualizado, setDesactualizado] = useState(false);
  const [listasReproduccion, setListasReproduccion] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState('Create new list');
  const [dropdownOpen, setDropdownOpen] = useState(false); // Nuevo estado para controlar la apertura/cierre del dropdown
  const [getClipId, setGetClipId] = useState(ClipId);

  // Otros estados necesarios...

  // Funciones y lógica existente...

  const handleLikeClick = () => {
    //obtener el usuario
    let statusMeGusta = !meGusta;
    getUserByUID(user.uid)
      .then((userPropsData) => {
        let uniqueName = userPropsData.data.uniqueName;
        getCreateLikeListByUser(uniqueName)
          .then((userLikeList) => {
            //añadir o borrar el clip de la lista esta en la tabla en ListClip
            saveClipLike(uniqueName, userLikeList.data, ClipId, statusMeGusta)
          });
      })
      .catch((error) => {
        console.error("Error al cargar UserProps:", error);
      });

    setMeGusta(statusMeGusta);
  };

  const handleDesactualizadoClick = () => {
    //obtener el usuario
    let statusDeprecated = !desactualizado;
    getUserByUID(user.uid)
      .then((userPropsData) => {
        let uniqueName = userPropsData.data.uniqueName;

        //añadir o borrar el clip de la lista esta en la tabla en ListClip
        saveClipDeprecated(uniqueName, ClipId)
      })
      .catch((error) => {
        console.error("Error al cargar UserProps:", error);
      });
    //meter el clip id
    //mandar a guardar

    //cambiar el state
    setDesactualizado(statusDeprecated);
  };

  const handleFormSubmit = (listProps) => {
    // Lógica para guardar la lista o editarla, según el contexto

    if (user?.uid) {
      getUserByUID(user.uid)
        .then((userPropsData) => {
          createList(userPropsData, listProps)
        });
    }
  };

  const createList = (userPropsData, listProps) => {

    let arrayP1 = [];
    let arrayP2 = [];

    let characterData = listProps.characterSelect;

    for (const key in characterData) {
      if (key.startsWith('P1_') && characterData[key]?.name) {
        arrayP1.push(characterData[key].name);
      } else if (key.startsWith('P2_') && characterData[key]?.name) {
        arrayP2.push(characterData[key].name);
      }
    }

    let indexes = {
      videogame: process.env.REACT_APP_VIDEOGAME_CODE,
      titleDescription: listProps.listName + listProps.listDescription,
      name: listProps.listName,
      description: listProps.listDescription,
      user: userPropsData.data.uniqueName,
      charactersP1: arrayP1,
      charactersP2: arrayP2
    }

    createNewList(
      {
        name: listProps.listName,
        description: listProps.listDescription,
        indexes: indexes,
        user: userPropsData.data.uniqueName,
        tech: listProps,
        likeList: false
      },
      ClipId.clipId,
      userPropsData.data.uniqueName
    ).then((created) => {
      getUserLists(userPropsData.data.uniqueName)
      if (created) {
        toast("List successfully created");
      }
    }).catch((error) => {
      console.error("Error al cargar deprecated:", error);
      toast.error("Error al crear lista");
    });

  }

  const handleCheckboxChange = (lista) => {
    if (user?.uid) {
      getUserByUID(user.uid)
        .then((userPropsData) => {
          var uniqueName = userPropsData.data.uniqueName;
          saveListClip(uniqueName, lista.id, ClipId.clipId, false)
            .then((data) => {
              getUserLists(uniqueName)
            })

        })
        .catch((error) => {
          console.error("Error al cargar UserProps:", error);
        });
    }
  }

  const handleDropdownToggle = (isOpen, event, metadata) => {
    setDropdownOpen(isOpen); // Actualizar el estado del dropdown al abrir/cerrar
    if (user?.uid) {
      getUserByUID(user.uid)
        .then((userPropsData) => {
          var uniqueName = userPropsData.data.uniqueName;
          getUserLists(uniqueName, ClipId)
        })
        .catch((error) => {
          console.error("Error al cargar UserProps:", error);
        });
    }
  };

  const getUserLists = (uniqueName, ClipId) => {
    let getLikeList = false;
    getUserListsByUser(uniqueName, getLikeList)
      .then((lists) => {
        checkClipInLists(lists.data, uniqueName, getClipId)
          .then((completeLists) => {
            setListasReproduccion(completeLists.data)
          })
          .catch((error) => {
            console.error("Error al cargar listas:", error);
          });
      })
      .catch((error) => {
        console.error("Error al cargar listas:", error);
      });
  }

  const getUserLike = (uniqueName, ClipId) => {
    getClipLikeByUserClip(uniqueName, ClipId)
      .then((isLike) => {
        setMeGusta(isLike.data)
      })
      .catch((error) => {
        console.error("Error al cargar deprecated:", error);
      });
  }

  const getUserDeprecated = (uniqueName, ClipId) => {
    //añadir o borrar el clip de la lista esta en la tabla en ListClip
    getClipDeprecatedByUserClip(uniqueName, ClipId)
      .then((isDeprecated) => {
        setDesactualizado(isDeprecated.data)
      })
      .catch((error) => {
        console.error("Error al cargar deprecated:", error);
      });
  }

  useEffect(() => {
    if (ClipId) { setGetClipId(ClipId) }

    //Obtener el me gusta, el marcado, cargar las listas y marcar las que estan llenas
    if (user?.uid) {
      getUserByUID(user.uid)
        .then((userPropsData) => {
          let uniqueName = userPropsData.data.uniqueName;

          //añadir o borrar el clip de la lista esta en la tabla en ListClip
          getUserLike(uniqueName, ClipId)

          // getClipLike(uniqueName, ClipId)
          getUserDeprecated(uniqueName, ClipId)

          getUserLists(uniqueName, ClipId)
        })
        .catch((error) => {
          console.error("Error al cargar UserProps:", error);
        });
    }

  }, [user, ClipId]);

  return (
    <div className='d-flex justify-content-end'>
      <ButtonGroup aria-label="Botonera" className='botonera'>
        <Button variant={meGusta ? 'primary' : 'outline-primary'} onClick={handleLikeClick}>
          {meGusta ? (<HeartFill />) : (<Heart />)}<span> Like</span>
        </Button>
        <Button
          variant={desactualizado ? 'danger' : 'outline-danger'}
          onClick={handleDesactualizadoClick}
        >
          {desactualizado ? (<FlagFill />) : (<Flag />)}
          <span> Deprecated</span>
        </Button>
        <DropdownButton
          title={<><FolderPlus /> <span> Add</span></>}
          variant="success"
          className='add-listas'
          show={dropdownOpen} // Indicar si el dropdown está abierto o cerrado
          onToggle={handleDropdownToggle} // Manejar el evento de apertura/cierre del dropdown
          onClick={(e) => e.stopPropagation()} // Evitar que el clic se propague y cierre el dropdown
        >
          <Dropdown.Item onClick={() => setShowModal(true)}>
            <Plus></Plus> New list
          </Dropdown.Item>
          <Dropdown.Divider />
          {listasReproduccion && listasReproduccion.map((lista, index) => (
            <Dropdown.Item key={lista.id} onClick={() => handleCheckboxChange(lista)}>
              <label>
                <input
                  type="checkbox"
                  checked={lista.clipInList}
                  onChange={() => handleCheckboxChange(lista)}
                />
                <span>{"  " + lista.name}</span>
              </label>
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </ButtonGroup>

      <ListForm
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleFormSubmit}
        formTitle={formTitle}
      />

    </div>
  )
}

export default ClipPropsSection;
