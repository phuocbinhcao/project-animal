import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actLogin } from '../../redux/actions/userAction';
import './login.css'

const LogIn = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = () => {
        if (!username || !password) {
            return (
                alert(" Api key or secret can't be empty ")
            )
        }
        const axios = require('axios');
        const data = JSON.stringify({
            "grant_type": "client_credentials",
            "client_id": username,
            "client_secret": password
        });

        const config = {
            method: 'post',
            url: 'https://api.petfinder.com/v2/oauth2/token',
            headers: {
                'Authorization': 'Bearer v3YvEB7MQAmosLDjPHKa3LWyfEikMU5GVzZqNLF77lFP2hsKuQ',
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(function (res) {
                const access_token = res.data.access_token
                dispatch(actLogin(access_token))
                history.push('/animals')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="form-container">
            <div className="form">
                <h1>Log In</h1>
                <div className="form-group">
                    <label>API key:</label>
                    <input
                        type="text"
                        placeholder="Enter your API key"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Secret:</label>
                    <input
                        type="password"
                        placeholder="Enter your secret"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="button"
                    onClick={() => handleLogin()}
                >
                    LogIn
                </button>
            </div>
        </div>
    );
};

export default LogIn;