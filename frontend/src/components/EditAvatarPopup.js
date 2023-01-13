import PopupWithForm from './PopupWithForm';
import {useEffect, useRef} from 'react';

function EditAvatarPopup(props) {

    const avatar = useRef();

    useEffect(() => {
        avatar.current.value = '';
    },[props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatar.current.value,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       title="Обновить аватар"
                       saveBtn="Сохранить" name="avatar" children={
            <fieldset className="popup__field-set">
                <label className="popup__label">
                    <input ref={avatar} type="url" className="popup__field" id="avatarSource"
                           placeholder="Ссылка на картинку"
                           required
                           name="avatar"/>
                    <span className="popup__field-error avatarSource-error"></span>
                </label>
            </fieldset>}/>
    )
}

export default EditAvatarPopup;