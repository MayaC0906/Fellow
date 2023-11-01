import { NavLink } from "react-router-dom/dist";

export function HomeHeader() {
    return <header className="home-header">
        <span>Fellow</span>
        <NavLink to='/login'>
            Log in
        </NavLink>
    </header>
}