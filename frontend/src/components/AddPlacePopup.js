import PopupWithForm from './PopupWithForm';
import {useEffect, useState} from 'react';

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    },[props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       title="Новое место"
                       saveBtn="Создать"
                       name="new-card" children={
            <fieldset className="popup__field-set">
                <label className="popup__label">
                    <input value={name} onChange={handleChangeName} type="text" className="popup__field"
                           id="newCardTitle" placeholder="Название"
                           required
                           name="name" minLength="2" maxLength="30"/>
                    <span className="popup__field-error newCardTitle-error"></span>
                </label>
                <label className="popup__label">
                    <input value={link} onChange={handleChangeLink} type="url" className="popup__field"
                           id="newCardSource"
                           placeholder="Ссылка на картинку"
                           required
                           name="link"/>
                    <span className="popup__field-error newCardSource-error"></span>
                </label>
            </fieldset>}/>
    )
}

export default AddPlacePopup;