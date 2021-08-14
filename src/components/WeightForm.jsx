import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './WeightForm.scss'
import fire from './fire'
import firebase from 'firebase'

const WeightForm = ({ user }) => {

    const [weightInKg, setWeightInKg] = useState(true);
    const [weight, setWeight] = useState(0);
    const history = useHistory();
    const db = fire.firestore();

    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (!user) {
                history.push('/');
            }
        })
    }, [])

    const handleUnitChange = () => {
        setWeightInKg(!weightInKg);
        if (weightInKg) {
            setWeight(weight * 2.2046);
        } else {
            setWeight(weight / 2.2046);
        }
    }

    const handleWeightSubmit = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp;

        db.collection('weight').add({
            isKg: weightInKg,
            weight,
            timestamp: timestamp(),
        })
            .then((item) => {
                console.log('Document id: ', item.id);
            })
            .catch(err => {
                console.log(error);
            })
        history.push('/list');
    }

    const handleLogout = () => {
        fire.auth().signOut();
        history.push('/')
    }

    return (
        <div className="center-container">
            <div className="weight-form">
                <h1> Enter Weight</h1>
                <div className="weight-input">
                    <input type="text" placeholder="Weight" id="weight-entry" value={weight} onChange={e => setWeight(e.target.value)} />
                    <button onClick={handleUnitChange} className="kg-indicator">{weightInKg ? 'kg' : 'lbs'}</button>
                </div>
                <div className="bottom-container">
                    <button onClick={handleWeightSubmit}>Submit</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default WeightForm
