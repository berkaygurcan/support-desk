import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);  //loading aslında
    //get user from state bu yüzden useSelector kullanacağız
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        if(user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }


        setCheckingStatus(false); //checkleme işlemi tamam
    }, [user]);

    return {loggedIn, checkingStatus};
}

