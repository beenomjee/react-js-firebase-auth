import React, { useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components'
import { signOutUser } from '../../firebase'

const Home = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const logoutHandler = async () => {
        setIsLoading(true);
        await signOutUser()
        navigate('/login')
    }
    return (
        isLoading ? <Loader />
            : (
                <div className={styles.container}>
                    <div><strong>First Name :</strong> {user.fName}</div>
                    <div><strong>Last Name :</strong> {user.lName}</div>
                    <div><strong>Email :</strong> {user.email}</div>
                    <div><strong>Address :</strong> {user.address}</div>
                    <div><strong>Phone No :</strong> {user.phone}</div>
                    <img src={user.img} alt={user.fName} />
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            )
    )
}

export default Home