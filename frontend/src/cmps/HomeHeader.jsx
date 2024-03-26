import { useEffect } from "react";
import { NavLink } from "react-router-dom/dist";
import { loadUsers, logout } from "../store/actions/user.actions";

export function HomeHeader({ isLogin }) {

    useEffect(() => {
        loadUsers()
    })

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