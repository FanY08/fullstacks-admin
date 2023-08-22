import React, { useState } from "react";
import SubmitForm from "components/SubmitForm";
import { useLoginByEmailAndPwdMutation } from "store/api/adminApi";
import { useDispatch } from "react-redux";
import { loginUser } from "store/slice/globalSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errInfo, setErrInfo] = useState({ isErr: undefined, message: "" });
    const [login] = useLoginByEmailAndPwdMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault();
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        login({
            email: data.get("email"),
            password: data.get("password"),
        })
            .then((res) => {
                setErrInfo({ isErr: undefined, message: "" });

                if (!res.error) {
                    dispatch(
                        loginUser({
                            userId: res.data.user._id,
                            token: res.data.token,
                        })
                    );

                    navigate(location.state?.prevLocation || "/dashboard");
                } else {
                    throw new Error(res.error.data.message);
                }
            })
            .catch((err) => setErrInfo({ isErr: true, message: err.message }));
    };

    return (
        <SubmitForm
            title="Log In"
            handleSubmit={handleSubmit}
            path="/signup"
            slogan="Don't have an account? Sign Up"
            isLogin={true}
            errInfo={errInfo}
            email={email}
            pwd={pwd}
            setEmail={setEmail}
            setPwd={setPwd}
        />
    );
}
