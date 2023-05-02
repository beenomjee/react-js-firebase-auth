import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { FaUser } from 'react-icons/fa'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
import { FormControl, Loader } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { auth, loginUser } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
const Login = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await loginUser(email, password)
            setIsLoading(false);
            navigate('/')
        } catch (e) {
            setIsLoading(false);
            if (e.code === 'auth/user-not-found')
                setErrorText("Invalid email!")
            else if (e.code === 'auth/wrong-password')
                setErrorText('Incorrect password!')
            else
                setErrorText(e.message);
        }
    }
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user)
                navigate('/')
            else
                setIsLoading(false);
        });
    }, []);
    return (
        isLoading ? <Loader /> :
            <div className={styles.container}>
                <div className={styles.icon}><FaUser /></div>
                <h1>Login</h1>
                <p className={styles.info}>Please fill in the details below to get started!</p>
                <form action="#" onSubmit={handleSubmit}>
                    <FormControl onChange={(e) => setEmail(e.target.value)} value={email} required width='29rem' type="email" placeholder="Email" icon={<FaUser />} />
                    <FormControl onChange={(e) => setPassword(e.target.value)} value={password} required width='29rem' iconHandler={() => setIsPasswordShow(p => !p)} type={isPasswordShow ? 'text' : "password"} placeholder="Password" icon={isPasswordShow ? <IoMdEye /> : <IoMdEyeOff />} />
                    {errorText && <p>{errorText}</p>}
                    <button type='submit'>Login</button>
                </form>
                <p className={styles.dont}>Don't have an account? <Link to={'/signup'} >Signup</Link></p>
            </div>
    )
}

export default Login