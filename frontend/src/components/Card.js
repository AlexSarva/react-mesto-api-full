import {useContext} from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Card(props) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onLikeClick(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteClick(props.card);
    }

    return (
        <article className="element fade fade_type_in" id={props.card._id}>
            <img onClick={handleClick} className="element__image" src={props.card.link} alt="template"/>
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__reaction">
                    <button onClick={handleLikeClick} type="button" value="Лайк"
                            className={`element__like button ${isLiked ? 'element__like_active' : null}`}
                            name="like-btn"></button>
                    <p className="element__like-cnt">{props.card.likes.length}</p>
                </div>
            </div>
            <button onClick={handleDeleteClick} type="button" value="Удалить"
                    className={`element__delete button ${isOwn ? 'element__delete_active' : null}`}
                    name="delete-btn"></button>
        </article>
    )
}

export default Card;