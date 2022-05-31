import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from './StepOtp.module.css';
import { useSelector } from "react-redux";
import { verifyOtp } from '../../../http';
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

const StepOtp = () => {
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()
    const { phone, hash } = useSelector((state) => state.auth.otp)
    async function submit(){
        if(!otp || !phone || !hash) return;
        try {
            const { data } = await verifyOtp({otp, phone, hash})
            console.log(data);
            dispatch(setAuth(data))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className={styles.cardWrapper}>
                <Card
                    title="Enter the that we just text you"
                    icon="lock-emoji"
                >
                    <TextInput 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next"/>
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you are aggreing to our terms of 
                        service and privacy policy. Thanks! 
                    </p>
                </Card>
            </div>
        </>
    );
};

export default StepOtp;
