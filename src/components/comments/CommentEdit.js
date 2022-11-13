import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";



export const CommentEdit = () => {
    const navigate = useNavigate()
    const {commentId} = useParams()

    const [comment, update] = useState({
        userId: "",
        eventId: "",
        datePosted: "",
        comment: ""
    })

    useEffect(
        () => {
            const fetchComment = async () => {
                const response = await fetch(`http://localhost:8088/comments/${commentId}`)
                const responseJSON = await response.json()
                update(responseJSON)
            }
            fetchComment()
        },
        []
    )

    const handleSaveButtonClick = () => {
        const commentToSendToAPI = {
            userId: comment.userId,
            eventId: comment.eventId,
            datePosted: comment.datePosted,
            comment: comment.comment
        }

        const sendData = async () => {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentToSendToAPI)
            }
            await fetch(`http://localhost:8088/comments/${commentId}`, options)
            navigate(`/eventDetails/${comment.eventId}`)
        }
        sendData()
    }


    return <>
        <h4>Edit Comment</h4>
        <form>
            <fieldset>
                <div className="form-group">
                <label htmlFor="descriptionBox">Comment:</label>
                <textarea
                    className="descriptionBox"
                    required
                    autoFocus
                    type="text-area"
                    placeholder="Comment"
                    value={comment.comment}
                    onChange={(evt) => {
                        const copy = { ...comment };
                        copy.comment = evt.target.value;
                        update(copy);
                    }}
                />
                </div>
            </fieldset>
        </form>

        <button className="btn btn-primary"
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
            Save Changes
        </button>
    </>
}