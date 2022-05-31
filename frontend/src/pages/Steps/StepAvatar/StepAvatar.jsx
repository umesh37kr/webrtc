import React, { useEffect, useState } from 'react';
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from './StepAvatar.module.css'
import { useDispatch, useSelector} from 'react-redux';
import {setAvatar} from '../../../store/activateSlice'
import { setAuth } from '../../../store/authSlice'
import { activate } from '../../../http'
import Loader from '../../../components/shared/loader/Loader';
const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch()
    const { name, avatar } = useSelector((state) => state.activate)
    const [image, setImage] = useState('/images/monkey-avatar.png')
    const [loading, setLoading] = useState(false)
    const [unMounted, setUnMounted] = useState(false)
    function captureImage(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            setImage(reader.result)
            dispatch(setAvatar(reader.result))
        }
    }
    async function submit(){
        if(!name || !avatar) return;
        setLoading(true);
        try {
            const { data } = await activate({name, avatar})
            if(data.auth){
                // check
                if(!unMounted){
                    dispatch(setAuth(data))
                }
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    
    useEffect(() =>{
        return () =>{
            setUnMounted(true)
        }
    },[])

    if(loading) return <Loader message="Activation in progress..." />
    return (
        <>
                <Card title={`Okay ${name} !`} icon="monkey-emoji">
                    <p className={styles.subHeading}>How's this photo?</p>
                    <div className={styles.avatarWrapper}>
                        <img className={styles.avatarImage} src={image} alt="avatar" />
                    </div>
                    <div>
                        <input onChange={captureImage} id="avtarInput" type="file" className={styles.avtarInput} />
                        <label className={styles.avatarLabel} htmlFor="avtarInput">choose a  different photo</label>
                    </div>
                    <div>
                        <Button onClick={submit} text="Next"/>
                    </div>
                </Card>
        </>
    );
};

export default StepAvatar;
