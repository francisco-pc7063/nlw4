import styles from '../styles/components/Profile.module.css'

export function Profile () {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/francisco-pc7063.png" alt="Francisco Pena"/>
            <div>
                <strong>Francisco Pena</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level: 1
                </p>
            </div>
        </div>
    )
}