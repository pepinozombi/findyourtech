import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import getUserByUniqueName from "../../functions/getUserByUniqueName";
import { Link } from "react-router-dom";
import obtenerTiempoTranscurrido from "../../functions/obtenerTiempoTranscurrido";
import LargeText from "../LargeText";

const CommentReply = ({
  replyFromComment
}) => {

  const [reply, setReply] = useState(null);
  const [userProps, setUserProps] = useState(null);

  useEffect(() => {
    getUserByUniqueName(replyFromComment.user).then((userPropsFromQuery) => {
      setUserProps(userPropsFromQuery.data);
      setReply(replyFromComment)
    })
  }, [replyFromComment]);
  return (
    <>
      {
        reply &&
          <div className="row">
            <div className="col-1 media">
              <img className="mr-3 rounded-circle w-100" alt="Bootstrap Media Preview" src={userProps?.profilePic} />
            </div>
            <div className="col-11">
              <div className="row">
                <div className="col-12 col-md-10 d-flex">
                  <h5>
                    <Link to={`/user/${userProps?.uniqueName}`}>
                      {userProps?.name}
                    </Link>
                  </h5>
                  <span>- {obtenerTiempoTranscurrido(new Date(reply?.createdAt?.seconds * 1000 + Math.round(reply?.createdAt?.nanoseconds / 1000000)))}</span>
                </div>
                <div className="col-12 col-md-2">
                </div>
                <LargeText
                  textGet={reply?.text}
                />
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default CommentReply;

