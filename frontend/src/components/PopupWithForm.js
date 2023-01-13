function PopupWithForm(props) {

    const className = `popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`;

    return (
        <div className={className}>
            <div className="popup__container popup__container_type_form">
                <button type="button" onClick={props.onClose} className="popup__close-btn button" value="Закрыть"
                        name="profile-close-btn"
                        id="profileFormCloseBtn"></button>
                <h3 className="popup__title">{props.title}</h3>
                <form onSubmit={props.onSubmit} className="popup__form" name={props.name}>
                    {props.children}
                    <button type="submit" className="popup__save-btn button" value={props.saveBtn}
                            name="save-btn">{props.saveBtn}
                    </button>
                </form>
            </div>
        </div>
    )

}

export default PopupWithForm