import React, { useState, useEffect } from "react";
import getUserByUniqueName from "../../functions/getUserByUniqueName";
import obtenerTiempoTranscurrido from "../../functions/obtenerTiempoTranscurrido";
import LargeText from "../LargeText";
import CommentReply from "../CommentReply";
import { Link } from "react-router-dom";
import { Reply } from "react-bootstrap-icons";

const Comments = ({
  commentFromQuery,
  handleReply
}) => {

  const [comment, setComment] = useState(null);
  const [userProps, setUserProps] = useState(null);
  
  useEffect(() => {
    getUserByUniqueName(commentFromQuery.user).then((userPropsFromQuery) => {
        setUserProps(userPropsFromQuery.data);
        setComment(commentFromQuery);
    })
  }, [commentFromQuery]);


  return (
    <>
      {
          comment &&
          <div className="row">
            <div className="col-1 media">
              <Link to={`/user/${userProps?.uniqueName}`}>
                <img className="mr-3 rounded-circle w-100" alt="Bootstrap Media Preview" src={userProps?.profilePic} />
              </Link>
            </div>
            <div className="col-11">
              <div className="row">
                <div className="col-12 col-md-10 d-flex">
                  <h5>
                    <Link to={`/user/${userProps?.uniqueName}`}>
                      {userProps?.name}
                    </Link>
                  </h5>
                  <span>- {obtenerTiempoTranscurrido(new Date(comment?.createdAt?.seconds * 1000 + Math.round(comment?.createdAt?.nanoseconds / 1000000)))}</span>
                </div>
                <div className="col-12 col-md-2">
                  <div className="justify-items-left reply">
                    <span href="#" onClick={handleReply} data-comment-id={comment?.id}><span data-comment-id={comment?.id}><Reply data-comment-id={comment?.id}></Reply> reply</span></span>
                  </div>
                </div>
                <LargeText
                  textGet={comment?.text}
                />
              </div>

              {
                comment?.replies &&
                comment?.replies.map((reply, index) => (
                  reply &&
                    <CommentReply 
                      replyFromComment={reply}
                      key={"reply-" + index}
                      />
                ))
              }
              
            </div>
          </div>
        
      }
    </>
  );
};

export default Comments;