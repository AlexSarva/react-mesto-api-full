class Auth {
    constructor() {
        this._baseUrl = 'https://auth.nomoreparties.co';
        this._headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(this._checkResponse)
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(this._checkResponse)
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`
            },
            method: 'GET',
        })
            .then(this._checkResponse)
    }
}

const auth = new Auth();
export default auth;