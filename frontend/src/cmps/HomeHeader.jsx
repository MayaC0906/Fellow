import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/dist";
import { logout } from "../store/actions/user.actions";

export function HomeHeader({ isLogin }) {
    const user = useSelector(storeState => storeState.userModule.user)
    // const [isLogin, setIsLogin] = useState(false)

    // useEffect(() => {
    //     onCheckIsUserLogged()
    // }, [user])

    // function onCheckIsUserLogged() {
    //     console.log('hey from homeheader');
    //     if (user) {
    //         if (user.username === 'guest') {
    //             setIsLogin(true)
    //         } else {
    //             setIsLogin(false)
    //         }
    //     }
    // }

    async function onLogoutUser() {
        try {
            await logout()
        } catch (err) {
            console.log('Could not log out', err)
        }
    }


    return (
        <header className="home-header">
            <span>Fellow</span>
            {isLogin ? (
                <NavLink to="/login">Log in</NavLink>
            ) : (
                <span className='logout' onClick={onLogoutUser}>Log out</span>
            )}
        </header>
    )
}