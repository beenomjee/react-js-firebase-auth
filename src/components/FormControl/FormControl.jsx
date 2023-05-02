import React, { useRef } from 'react'
import styles from './FormControl.module.css'

const FormControl = ({ width, iconHandler, icon, ...props }) => {
    const inputRef = useRef(null);

    const clickHandler = () => {
        inputRef.current.focus();
    }

    return (
        <div className={styles.container} style={{ '--w': width }}>
            <input {...props} ref={inputRef} />
            <span onClick={iconHandler ? iconHandler : clickHandler}>{icon}</span>
        </div>
    )
}

export default FormControl