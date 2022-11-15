import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Comment = ({ id, datePosted, fullName, comment, userId }) => {
    const localUser = localStorage.getItem("project_user");
    const userObject = JSON.parse(localUser);

    const navigate = useNavigate()

    const [userLikes, setUserLikes] = useState([])
    const [userLikesNamesOnly, setUserLikesNamesOnly] = useState([])

    const fetchUserLikes = async () => {
        const response = await fetch(`http://localhost:8088/likedComments?commentId=${id}&_expand=user`)
        const responseJSON = await response.json()
        // console.log(responseJSON)
        const nameArray = responseJSON.map((liked) =>
            ({
                id: liked?.id,
                userId: liked?.userId,
                name: liked?.user?.fullName
            })
        )
        // console.log(nameArray)
        setUserLikes(nameArray)
    }

    useEffect(
        () => {
            fetchUserLikes()
        },
        []
    )

    useEffect(
        () => {
            const names = userLikes.map(like => like.name)
            setUserLikesNamesOnly(names)
        },
        [userLikes]
    )

    const likeComment = async () => {
        const likedCase = {
            commentId: id,
            userId: userObject.id
        }

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(likedCase)
        }
        await fetch('http://localhost:8088/likedComments', options)
        fetchUserLikes()
    }

    return <>
        <div key={`comment--${id}`}>
            <div>{datePosted}</div>
            <div>{fullName}</div>
            <div>{comment}</div>
            <span>Likes:{" "}
                {
                    userLikesNamesOnly.join(', ')
                }
            </span>
            {
                userLikes.find(like => userObject.id === like.userId)
                ? <button className="btn btn-primary"
                    onClick={() =>
                        {
                            const removeLike = async () => {
                                const response = await fetch(`http://localhost:8088/likedComments?commentId=${id}&userId=${userObject.id}`)
                                const responseJSON = await response.json()
                                const likeId = await responseJSON[0].id
                                await fetch(`http://localhost:8088/likedComments/${likeId}`, {method: "DELETE"})
                                fetchUserLikes()
                            }
                            removeLike()
                        }
                    }
                >Remove Like</button>
                : <button onClick={() => likeComment()}>👍</button>
            }
            {
                userObject.id === userId
                ? <button className="btn comment_edit"
                    onClick={() => {navigate(`/commentEdit/${id}`)}}>
                    Edit Comment
                </button>
                : ""
            }
            {
                userObject.id === userId
                ? <button className="btn btn-primary"
                    onClick={() =>
                        {
                            const deleteComment = async () => {
                                await fetch(`http://localhost:8088/comments/${id}`, {method: "DELETE"})
                                window.location.reload(false)
                            }
                            deleteComment()
                        }
                    }
                >Delete Comment</button>
                : ""
            }
    `</div>
  </>
}