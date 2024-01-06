import React, { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ListProps from "../../components/ListProps";
import ListView from "../../components/ListView";

const List = () => {
    const { listGet } = useParams();

    const [listId, setListId] = useState(null)
  
    useEffect(() => {
        setListId(listGet)
    }, [listGet])

  return (
    <Container className="mt-4 mb-4">
      <Row>
        <ListProps
          listGet={listId}
        />
        <ListView
          listGet={listId}
        />
      </Row>
    </Container>
  );
};

export default List;
