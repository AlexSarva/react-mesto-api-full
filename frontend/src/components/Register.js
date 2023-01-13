import {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSignup(email, password);
    }

    useEffect(() => {
        props.onRender('login');
        return () => props.onRender('');
    })

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="auth__form">
                <input id="email" name="email" type="email" className="auth__input" value={email}
                       onChange={handleChangeEmail} placeholder="Email" required minLength="2" maxLength="40"/>
                <input id="password" name="password" type="password" className="auth__input" value={password}
                       onChange={handleChangePassword} placeholder="Пароль" required minLength="5" maxLength="40"/>
                <div className="auth__button-container">
                    <button type="submit" onSubmit={handleSubmit} className="auth__link">Зарегистрироваться</button>
                </div>
            </form>
            <div className="auth__signin">
                <span>Уже зарегистрированы?</span>
                <Link to="/sign-in" className="auth__login-link">Войти</Link>
            </div>
        </div>
    )
}

export default withRouter(Register);