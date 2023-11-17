import React, {useEffect, useState} from 'react'

const CommentSection = (
    clipId
) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //loader a false
        //cargar la box
        //obtener comentarios
        //cuando termine obtener replies
    }, [clipId]);

    return (
        <>
            <div>CommentSection</div>
        </>
    )
}

export default CommentSection