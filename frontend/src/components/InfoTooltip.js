function InfoTooltip(props) {
    const className = `popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`;

    return (
        <div className={className}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <div
                    className={`popup__auth-image ${props.authType ? 'popup__auth-image_type_yes' : 'popup__auth-image_type_no'}`}></div>
                <h3 className="popup__auth-text">{props.authType ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                <button type="button" onClick={props.onClose} className="popup__close-btn button" value="Закрыть"
                        name="close-btn"></button>
            </div>
        </div>
    )
}

export default InfoTooltip;