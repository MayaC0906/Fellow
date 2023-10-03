import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from '../pages/LoginSignup'

export function AppHeader() {

    // async function onLogin(credentials) {
    //     try {
    //         const user = await login(credentials)
    //         showSuccessMsg(`Welcome: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot login')
    //     }
    // }
    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot signup')
    //     }
    // }
    // async function onLogout() {
    //     try {
    //         await logout()
    //         showSuccessMsg(`Bye now`)
    //     } catch(err) {
    //         showErrorMsg('Cannot logout')
    //     }
    // }

    return (
        <header className="app-header">
            <nav className='nav-container'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/workspace">Workspace</NavLink>
                <NavLink to="/login">Log in</NavLink>
            </nav>
            <h1>My App</h1>
        </header>
    )
}