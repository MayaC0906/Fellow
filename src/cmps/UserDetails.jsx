import { useNavigate } from "react-router"
import { logout } from "../store/actions/user.actions"


export function UserDetails({ user }) {
    console.log('from detail',user);
    const navigate = useNavigate()

    async function onLogOut() {
        try {
            await logout()
            navigate('/')
        } catch (err) {
            console.log('Could not log ou user', err)
        }
    }
    return (
        <div className="user-details" style={{ position: 'absolute', top: 45, right: 15, backgroundColor: 'beige', zIndex: 40 }}>
            <p>Account</p>
            <section className="user-details-display">
                <img style={{ width: 32, height: 32, }} src={user.imgUrl} alt="" />
                <h2>{user.fullname}</h2>
                <h2>{user.username}</h2>
            </section>
            <hr />
            <button onClick={onLogOut}>Log out</button>
        </div>
    )
}