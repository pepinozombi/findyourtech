import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClipView from "../../components/ClipView";

const Clip = () => {

  const { clipGet } = useParams();

  const [clipId, setClipId] = useState(null)

  useEffect(() => {
      setClipId(clipGet)
  }, [clipGet])

  return (
    <>
      <ClipView 
        clipIdFromPage={clipId}
      />
    </>
  );
};

export default Clip;
