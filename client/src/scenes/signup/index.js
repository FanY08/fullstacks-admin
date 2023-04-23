import React, { useState } from "react";
import SubmitForm from "components/SubmitForm";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "store/api/adminApi";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errInfo, setErrInfo] = useState({ isErr: undefined, message: "" });

    const navigate = useNavigate();
    const [registerFn] = useRegisterMutation();

    const handleSubmit = (event) => {
        event.preventDefault();
        registerFn({
            name,
            city,
            email,
            password: pwd,
            country,
            phoneNumber,
        }).then((res) => {
            console.log(res);
            if (res.error)
                setErrInfo({ isErr: true, message: res.error.data.message });
            else {
                switch (res.data.status) {
                    case 200:
                        setErrInfo({ isErr: true, message: res.data.message });
                        navigate("/login");
                        break;
                    case 202:
                        setErrInfo({ isErr: false, message: res.data.message });
                        break;
                    default:
                        break;
                }
            }
        });
        // if (isSuccess) {
        //     navigate("/login");
        // }
    };

    return (
        <SubmitForm
            title="Sing Up"
            handleSubmit={handleSubmit}
            path="/login"
            slogan="Already have an account? Log In"
            isLogin={false}
            errInfo={errInfo}
            email={email}
            pwd={pwd}
            setEmail={setEmail}
            setPwd={setPwd}
            signupInfo={{
                name,
                setName,
                city,
                setCity,
                country,
                setCountry,
                phoneNumber,
                setPhoneNumber,
            }}
        />
    );
}
