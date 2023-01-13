import {apiConfig} from "./constants";

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getInitialProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`,
            {headers: this._headers})
            .then(this._checkResponse)
            .then((res) => {
                this._myID = res._id;
                return res;
            })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,
            {headers: this._headers})
            .then(this._checkResponse)
    }

    patchProfileInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse)
    }

    addNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)

    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._checkResponse)
    }

    editAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(this._checkResponse)
    }

    pressLike({likeState, imgID}) {
        if (likeState) {
            return fetch(`${this._baseUrl}/cards/${imgID}/likes`,
                {
                    headers: this._headers,
                    method: 'DELETE'
                })
                .then(this._checkResponse)
        } else {
            return fetch(`${this._baseUrl}/cards/${imgID}/likes`,
                {
                    headers: this._headers,
                    method: 'PUT'
                })
                .then(this._checkResponse)
        }
    }
}

const api = new Api(apiConfig);
export default api;