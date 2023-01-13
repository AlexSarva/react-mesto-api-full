import {Link, Route, Switch} from 'react-router-dom';

function Header(props) {

    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__status-container">
                <Switch>
                    <Route path='/sign-up'>
                        <Link to="/sign-in" className="header__auth-link">Войти</Link>
                    </Route>
                    <Route path='/sign-in'>
                        <Link to="/sign-up" className="header__auth-link">Регистрация</Link>
                    </Route>
                    <Route exact path='/'>
                        <p className="header__username">{props.userName}</p>
                        <button type="button" onClick={props.onLogout} className="header__exit-btn"
                                value="Выйти" name="exit-btn">Выйти
                        </button>
                    </Route>
                </Switch>
            </div>
        </header>
    )
}

export default Header;