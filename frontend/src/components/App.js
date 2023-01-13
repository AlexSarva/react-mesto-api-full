import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';
import Register from './Register';
import Login from './Login';

function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({
        name: 'Alex',
        about: 'me',
        avatar: 'https://placepic.ru/wp-content/uploads/2018/11/kartinkijane.ru-8304.jpg',
        _id: '1'
    });
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isDeleteCardPopup, setIsDeleteCardPopup] = useState({
        show: false,
        card: null
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);
    const [regStatus, setRegStatus] = useState('');
    const [userName, setUserName] = useState('');

    function handleRegStatus(status) {
        setRegStatus(status);
    }

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getInitialProfileInfo(), api.getInitialCards()])
                .then(([userData, cards]) => {
                    setCurrentUser(userData);
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
        }
    }, [loggedIn])

    function handleUpdateUser(userInfo) {
        api.patchProfileInfo(userInfo)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.pressLike({
            likeState: isLiked,
            imgID: card._id
        })
            .then((newCard) => {
                setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleAddPlace(place) {
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.addNewCard(place)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function openProfilePopup() {
        setIsEditProfilePopupOpen(true);
    }

    function openAvatarPopup() {
        setIsEditAvatarPopupOpen(true);
    }

    function openPlacePopup() {
        setIsAddPlacePopupOpen(true);
    }

    function changeSelectedCard(card) {
        setSelectedCard(card);
    }

    function openAuthPopup(bool) {
        setAuthStatus(bool);
        setIsAuthPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteCardPopup({
            show: false,
            card: null
        });
        setSelectedCard({});
        setIsAuthPopupOpen(false);
    }

    function handleDeleteConfirm(card) {
        setIsDeleteCardPopup({
            show: true,
            card: card,
        });
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        if (isDeleteCardPopup.show) {
            api.deleteCard(isDeleteCardPopup.card._id)
                .then(() => {
                    setCards((state) => state.filter((oldCard) => oldCard._id !== isDeleteCardPopup.card._id));
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
            setIsDeleteCardPopup({
                show: false,
                card: null,
            });
        }
    };

    useEffect(() => {
        function handleEscapeKey(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    function handleSignup(email, password) {
        auth.register(email, password)
            .then((res) => {
                openAuthPopup(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(err)
                openAuthPopup(false);
            });
    }

    function handleSignin(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err)
                openAuthPopup(false);
            });
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            // проверяем токен пользователя
            auth.checkToken(jwt)
                .then((data) => {
                    setUserName(data.data.email);
                    setLoggedIn(true);
                    history.push('/');
                })
                .catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        handleTokenCheck();
    },)

    function handleLogout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header authState={regStatus} onLogout={handleLogout} userName={userName}/>
            <Switch>
                <ProtectedRoute exact path="/" loggedIn={loggedIn} onEditProfile={openProfilePopup}
                                onAddPlace={openPlacePopup}
                                onEditAvatar={openAvatarPopup}
                                onCardClick={changeSelectedCard}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleDeleteConfirm}
                                onRender={handleRegStatus}
                                component={Main}/>

                <Route path="/sign-up">
                    <Register onSignup={handleSignup} onRender={handleRegStatus}/>
                </Route>
                <Route path="/sign-in">
                    <Login onSignin={handleSignin} onRender={handleRegStatus}/>
                </Route>
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-up"/>}
                </Route>
            </Switch>
            <Footer/>

            <InfoTooltip name="auth" isOpen={isAuthPopupOpen} authType={authStatus} onClose={closeAllPopups}/>

            <EditProfilePopup isOpen={isEditProfilePopupOpen}
                              onClose={closeAllPopups}
                              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                             onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}
            />


            <AddPlacePopup isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups}
                           onAddPlace={handleAddPlace}
            />


            <PopupWithForm isOpen={isDeleteCardPopup.show}
                           onClose={closeAllPopups}
                           onSubmit={handleDeleteSubmit}
                           title="Вы уверены?"
                           saveBtn="Да"
                           name="delete-card"/>

            <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

        </CurrentUserContext.Provider>
    );
}

export default App;
