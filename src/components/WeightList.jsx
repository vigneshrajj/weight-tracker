import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import fire from './fire'
import './WeightList.scss'

const WeightList = () => {
    const db = fire.firestore().collection('weight');
    let [itemsList, setItemsList] = useState([]);
    let [edit, setEdit] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (!user) {
                history.push('/');
            }
        })
    }, [])

    useEffect(() => {
        db
            .orderBy("timestamp", "desc")
            .onSnapshot(snap => {
                const items = [];
                snap.forEach(doc => {
                    items.push({ ...doc.data(), id: doc.id });
                })
                setItemsList(items);

            })
        console.log(itemsList, "items")
    }, [])

    const handleLogout = () => {
        fire.auth().signOut();
        history.push('/')
    }

    const handleDeleteWeight = (id) => {
        db.doc(id).delete()
    }
    const handleEdit = (event, id) => {
        if (event.keyCode == 13) {
            db.doc(id).set({
                weight: event.target.value
            }, { merge: true })
            setEdit(null);
        }

    }


    return (
        <div className="weight-list">
            <h1>Weight List</h1>
            {itemsList.map((item, index) => {
                return (
                    <div className="weight-item">
                        {edit === index ? <input className="weight-input" type="text" onKeyDown={e => handleEdit(e, item.id)} /> : <p className="weight-display" id={item.id}>{item.weight ? item.weight : 0} <span>{item.isKg ? 'kg' : 'lbs'}</span></p>}
                        <div className="edit-container">
                            <p className="edit" onClick={() => setEdit(index)}>Edit</p>
                            <p className="delete" onClick={() => handleDeleteWeight(item.id)}>x</p>
                        </div>
                    </div>
                )
            })}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default WeightList
