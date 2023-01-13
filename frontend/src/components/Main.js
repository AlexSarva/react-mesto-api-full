import {useContext} from 'react';
import Card from './Card';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__item">
                    <button type="button" onClick={props.onEditAvatar} className="profile__avatar-btn"
                            value="Изменить" name="avatar-btn"
                            id="avatarEditBtn" style={{backgroundImage: `url(${currentUser.avatar})`}}></button>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__occupation">{currentUser.about}</p>
                        <button type="button" onClick={props.onEditProfile} className="profile__edit-btn button"
                                value="Изменить" name="edit-btn"
                                id="profileEditBtn"></button>
                    </div>
                </div>
                <button type="button" onClick={props.onAddPlace} className="profile__add-btn button"
                        value="Добавить" name="add-btn"
                        id="cardAddBtn"></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card}
                          onCardClick={props.onCardClick}
                          onLikeClick={props.onCardLike}
                          onDeleteClick={props.onCardDelete}/>
                ))}
            </section>
        </main>
    )
}

export default Main