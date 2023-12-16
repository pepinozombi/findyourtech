import React, { useEffect, useState, useContext } from 'react'
import { Spinner, Container, Row, Col, Media } from 'react-bootstrap';
import getCommentsFromClip from '../../functions/getCommentsFromClip';
import Comments from '../Comments';
import CommentBox from '../CommentBox';
import createNewComment from '../../functions/createNewComment';
import { AuthenticationContext } from '../../App';
import getUserByUID from '../../functions/getUserByUID';

const CommentSection = (
  clipId
) => {

  const { user } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([]);
  const [isReply, setIsReply] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState("");
  const [userProps, setUserProps] = useState(null);

  const onSubmitComment = (commentData) => {

    let completeCommentData = { ...commentData, clipId: clipId.clipId.clipIdFromPage, user: userProps.uniqueName }
    createNewComment(completeCommentData).then(() => {
      handleCancelReply()
      getComments()
    });

  }

  useEffect(() => {
    getComments()
  }, [clipId]);

  const getComments = () => {
    getCommentsFromClip(clipId.clipId.clipIdFromPage).then((commentsByClip) => {
      if (commentsByClip?.status >= 200 && commentsByClip?.status < 300) {
        setComments(commentsByClip.data);
      } else {
        console.log(commentsByClip);
      }
    });
  }

  useEffect(() => {
    setLoading(false);
  }, [comments]);

  const handleReply = (commentId) => {
    console.log(commentId)
    setReplyCommentId(commentId)
    setIsReply(true)
  }

  const handleCancelReply = () => {
    setReplyCommentId("")
    setIsReply(false)
  }

  useEffect(() => {
    // Comprobar si el usuario está autenticado
    if (user?.uid) {
      // Realizar la consulta a Firebase para obtener UserProps
      getUserByUID(user.uid)
        .then((userPropsData) => {
          setUserProps(userPropsData.data);
          setLoading(false); // Cambia el estado de carga una vez que los datos están listos
        })
        .catch((error) => {
          console.log("Error al cargar UserProps:", error);
          setLoading(false);
        });
    } else {
      setLoading(true); // Si el usuario no está autenticado, cambiar el estado de carga
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <div className="container-fluid mb-5 mt-5">
          <div className="comment-card">
            <Row>
              <Col md={12}>
                <h3 className="mr-3 mb-5">
                  Comments
                </h3>
                <Row>
                  <Col md={12}>
                    {userProps &&
                      <CommentBox
                        onSubmitComment={onSubmitComment}
                        isReply={isReply}
                        replyId={replyCommentId}
                        handleCancelReply={handleCancelReply}
                      />
                    }

                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Comments
                      commentsFromSection={comments ? comments : null}
                      handleReplyToSection={handleReply}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}

export default CommentSection