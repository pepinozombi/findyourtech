import React, {useState, useEffect} from "react";
import ReactShowMoreText from "react-show-more-text";

const LargeText = ({
    textGet
}) => {
    const [text, setText] = useState("");

    useEffect(() => {
        setText(textGet);
    }, [textGet]);

    return (
        <ReactShowMoreText>
            <p>
                {text}
            </p>
        </ReactShowMoreText>

    )
}

export default LargeText