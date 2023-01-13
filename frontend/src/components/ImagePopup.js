function ImagePopup(props) {

    const className = `popup popup_type_${props.card.name} ${Object.keys(props.card).length !== 0 ? 'popup_opened' : ''}`;

    return (
        <div className={className}>
            <div className="popup__container popup__container_type_image"><q></q>
                <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                <h3 className="popup__text">{props.card.name}</h3>
                <button type="button" onClick={props.onClose} className="popup__close-btn button" value="Закрыть"
                        name="close-btn"
                        id="imageCloseBtn"></button>
            </div>
        </div>
    )
}

export default ImagePopup