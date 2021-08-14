import React, { useState, useEffect } from 'react'
import fire from './fire';
import './Login.scss';
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => history.push('/form'))
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            })

    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs();
                setUser(user)
            } else {
                setUser("");
            }
        })
    }

    useEffect(() => {
        authListener();
    }, [])

    return (
        <div className="center-container">
            <div className="login-container">
                <h1 className="heading">Sign In</h1>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <p className="error-msg">{emailError}</p>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="error-msg">{passwordError}</p>
                <button className="submit-btn" onClick={handleLogin}>Sign in</button>
            </div>
        </div>
    )
}

export default Login
