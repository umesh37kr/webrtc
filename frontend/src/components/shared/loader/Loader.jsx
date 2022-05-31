import React from "react";
import Card from "../Card/Card";
import styles from './Loader.module.css';

const Loader = ({message}) => {
    return(
        <div className={styles.cardWrapper}>
            <Card>
            <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" width="50" height="50"><path fill="#C779D0" d="M25 5a20.14 20.14 0 0 1 20 17.88 2.51 2.51 0 0 0 2.49 2.26A2.52 2.52 0 0 0 50 22.33a25.14 25.14 0 0 0-50 0 2.52 2.52 0 0 0 2.5 2.81A2.51 2.51 0 0 0 5 22.88 20.14 20.14 0 0 1 25 5Z"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.75s" repeatCount="indefinite"/></path></svg>
                <span className={styles.message}>{message}</span>
            </Card>
        </div>
    )
}

export default Loader;