import React, { useState, useRef } from 'react';
import './CommentBox.css'; // Archivo CSS para estilos personalizados
import send, { Send } from "react-bootstrap-icons"

const CommentBox = ({ onSubmitComment, isReply, replyId, handleCancelReply }) => {
  const [comment, setComment] = useState('');
  const [notifyVideo, setNotifyVideo] = useState(false);
  
  const textareaRef = useRef(null);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    autoExpandTextarea();
  };

  const handleNotifyVideoChange = () => {
    setNotifyVideo(!notifyVideo);
  };

  const autoExpandTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    console.log(textarea.scrollHeight);
  };

  const handleSubmit = () => {
    // Aquí se puede implementar la lógica para enviar el comentario
    setNotifyVideo(false);
    setComment("")
    onSubmitComment({ text: comment, notifyVideo, replyTo: replyId});
    // Limpia el campo de texto después de enviar el comentario
    
  };

  return (
    <div className="comment-box-container">
        
       <textarea
        ref={textareaRef}
        placeholder={isReply ? 'Reply...' : 'Comment...'}
        value={comment}
        onChange={handleCommentChange}
        className="comment-textarea"
        rows={1} // Inicialmente ocupa una fila
      />
      <div className="checkbox-container">
        <label htmlFor="notifyVideo">Notify clip as invalid text (explain why)</label>
        <input
          type="checkbox"
          id="notifyVideo"
          checked={notifyVideo}
          onChange={handleNotifyVideoChange}
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">
        <Send></Send>
      </button>
      {
        isReply &&
        <button onClick={handleCancelReply} className="btn-danger">
          Cancel reply
        </button>
      }
    </div>
  );
};

export default CommentBox;