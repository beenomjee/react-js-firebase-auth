import React, { useEffect, useState } from 'react'
import styles from './SignUp.module.css'
import { FaUser } from 'react-icons/fa'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { FormControl, Loader } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { auth, createUser } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const SignIn = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [data, setData] = useState({ fName: '', lName: '', email: '', password: '', address: '', phone: '', img: 'data:image/jpeg;base64,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' })
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const changeHandler = (e) => {
        if (e.target.id === 'img') {
            const file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setData(p => ({ ...p, [e.target.id]: reader.result }))
            };
        }
        else
            setData(p => ({ ...p, [e.target.id]: e.target.value }))
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await createUser({ ...data });
            setIsLoading(false);
            navigate('/')
        } catch (e) {
            setIsLoading(false);
            if (e.code === 'auth/email-already-in-use')
                setErrorText('Email already in use!')
            else
                setErrorText(e.message)
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
                <h1>Sign Up</h1>
                <p className={styles.info}>Please fill in the details below to get started!</p>
                <form action="#" onSubmit={submitHandler}>
                    <FormControl onChange={changeHandler} value={data.fName} id="fName" required width='29rem' type="text" placeholder="First Name" icon={<FaUser />} />
                    <FormControl onChange={changeHandler} value={data.lName} id="lName" required width='29rem' type="text" placeholder="Last Name" icon={<FaUser />} />
                    <FormControl onChange={changeHandler} value={data.email} id="email" required width='29rem' type="email" placeholder="Email" icon={<FaUser />} />
                    <FormControl onChange={changeHandler} value={data.password} id="password" required width='29rem' iconHandler={() => setIsPasswordShow(p => !p)} type={isPasswordShow ? 'text' : "password"} placeholder="Password" icon={isPasswordShow ? <IoMdEye /> : <IoMdEyeOff />} />
                    <FormControl onChange={changeHandler} value={data.address} id="address" required width='29rem' type="text" placeholder="Address" icon={<MdLocationOn />} />
                    <FormControl onChange={changeHandler} value={data.phone} id="phone" required width='29rem' type="text" placeholder="Phone No" icon={<BsTelephoneFill />} />
                    <div className={styles.img}>
                        <img src={data.img} alt="AVATAR" />
                        <input accept="image/*" type="file" id="img" onChange={changeHandler} />
                        <label htmlFor="img">Upload Image</label>
                    </div>
                    {errorText && <p>{errorText}</p>}
                    <button type='submit'>Sign Up</button>
                </form>
                <p className={styles.dont}>Don't have an account? <Link to={'/login'} >Login</Link></p>
            </div>
    )
}

export default SignIn