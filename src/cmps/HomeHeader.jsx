import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/dist";

export function HomeHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isLoginDisabled, setIsLoginDisabled] = useState(false)
    useEffect(() => {
        onCheckIsUserLogged()
    }, [])

    function onCheckIsUserLogged() {
        if (user) {
            if (user._id === 'guest') {
                setIsLoginDisabled(false)
            }
            setIsLoginDisabled(true)
        }
    }
    return (
        <header className="home-header">
            <span>Fellow</span>
            {isLoginDisabled ? (
                <span className="log-in">Log in</span>
            ) : (
                <NavLink to="/login">Log in</NavLink>
            )}
        </header>
    )
}