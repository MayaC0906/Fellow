import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from '../pages/LoginSignup'
import { appHeaderSvg } from './Svgs'

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
        <header className='app-header'>
            <section className='nav-links'>
                <button className='app-header-btn nav-link-btn menu'>{appHeaderSvg.menu}</button>
                <div className='logo'>
                    <img src='https://res.cloudinary.com/dehxwadkk/image/upload/v1696466880/logo_transparent_dz6ld4.png' alt="" />
                </div>
                <section className='links'>
                    <NavLink to={"/workspace"}>
                        <button className='app-header-btn nav-link-btn link'><span>Workspaces</span> {appHeaderSvg.arrowDown}</button>
                    </NavLink>
                    <button className='app-header-btn nav-link-btn link'><span>Recent</span> {appHeaderSvg.arrowDown}</button>
                    <button className='app-header-btn nav-link-btn link'> <span>Starred</span> {appHeaderSvg.arrowDown}</button>
                    <button className='app-header-btn nav-link-btn link'>Templats {appHeaderSvg.arrowDown}</button>
                </section>
                <button className='create-btn'>Create</button>
            </section>

            <section className='nav-info'>
                <div className='search-input'>
                    <span>{appHeaderSvg.search}</span>
                    <input type="text" placeholder='Search' />
                </div>
                <button className='app-header-btn user-info'>{appHeaderSvg.notifications}</button>
                <div className='app-header-btn user-info' >
                <img src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg" alt="" />
                </div>
            </section>
        </header>
    )
}