import { baseApiURL } from "./constants";

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
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

    getInitialProfileInfo(token) {
        return fetch(`${this._baseUrl}/users/me`,
            {headers: {
                    ...this._headers,
                    'Authorization': token,
                },
                method: 'GET'})
            .then(this._checkResponse)
            .then((res) => {
                this._myID = res._id;
                return res;
            })
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`,
            {headers: {
                    ...this._headers,
                    'Authorization': token,
                },
                method: 'GET'})
            .then(this._checkResponse)
    }

    patchProfileInfo({name, about}, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                ...this._headers,
                'Authorization': token,
            },
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse)
    }

    addNewCard({name, link}, token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                ...this._headers,
                'Authorization': token,
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)

    }

    deleteCard(id, token) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            headers: {
                ...this._headers,
                'Authorization': token,
            },
            method: 'DELETE',
        })
            .then(this._checkResponse)
    }

    editAvatar({avatar}, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: {
                ...this._headers,
                'Authorization': token,
            },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(this._checkResponse)
    }

    pressLike({likeState, imgID}, token) {
        if (likeState) {
            return fetch(`${this._baseUrl}/cards/${imgID}/likes`,
                {
                    headers: {
                        ...this._headers,
                        'Authorization': token,
                    },
                    method: 'DELETE'
                })
                .then(this._checkResponse)
        } else {
            return fetch(`${this._baseUrl}/cards/${imgID}/likes`,
                {
                    headers: {
                        ...this._headers,
                        'Authorization': token,
                    },
                    method: 'PUT'
                })
                .then(this._checkResponse)
        }
    }
}

const api = new Api(baseApiURL);
export default api;