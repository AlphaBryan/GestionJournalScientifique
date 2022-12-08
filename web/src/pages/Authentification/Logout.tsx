import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {useEffect} from "react";
import {authActions} from "../../redux/features/auth/slice";

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authActions.logout());
        navigate('/');
    }, [dispatch, navigate]);

    return null;
}