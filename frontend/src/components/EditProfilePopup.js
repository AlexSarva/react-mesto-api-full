import PopupWithForm from './PopupWithForm';
import {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       title="Редактировать профиль"
                       saveBtn="Сохранить" name="profile" children={
            <fieldset className="popup__field-set">
                <label className="popup__label">
                    <input value={name || ''} onChange={handleChangeName} type="text" className="popup__field"
                           placeholder="Имя" required
                           name="name" minLength="2" maxLength="40"/>
                    <span className="popup__field-error name-error"></span>
                </label>
                <label className="popup__label">
                    <input value={description || ''} onChange={handleChangeDescription} type="text" className="popup__field"
                           placeholder="О себе"
                           required
                           name="about" minLength="2" maxLength="200"/>
                    <span className="popup__field-error about-error"></span>
                </label>
            </fieldset>}/>
    )
}

export default EditProfilePopup;