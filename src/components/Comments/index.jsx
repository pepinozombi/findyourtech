import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Comment from "../Comment"

const Comments = ({
  commentsFromSection,
  handleReplyToSection
}) => {

  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReply = (e) => {
    handleReplyToSection(e.target.getAttribute("data-comment-id"))
  }

  useEffect(() => {
    setComments(handleComments(commentsFromSection))
  }, [commentsFromSection]);

  const handleComments = (commentsToHandle) => {
    // Ordenar los comentarios por fecha de creación de más nuevo a más antiguo
    const comentariosOrdenados = commentsToHandle.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Función para obtener las respuestas de un comentario específico
    const obtenerRespuestas = (comentarioId) => {
      return commentsToHandle.filter(
        (comentario) => comentario.replyTo === comentarioId
      );
    };

    // Construir una estructura de comentarios anidados
    const comentariosAnidados = comentariosOrdenados.reduce((acc, comentario) => {
      if (comentario.replyTo === "") {
        // Si es un comentario, agregarlo al resultado
        acc.push({
          ...comentario,
          replies: obtenerRespuestas(comentario.id)
        });
      }
      return acc;
    }, []);

    return comentariosAnidados;
  };

  useEffect(() => {
    setLoading(false);
  }, [comments]);

  return (
    <>
      {
        comments &&
        comments.map((comment, index) => (
          comment &&
            <Comment 
              commentFromQuery={comment}
              handleReply={handleReply}
              key={"comment-" + index}
              />
        ))
      }
    </>
  );
};

export default Comments;

