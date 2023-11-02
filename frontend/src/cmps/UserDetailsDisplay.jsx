import { useNavigate } from "react-router"
import { logout } from "../store/actions/user.actions"


export function UserDetailsDisplay({ user, setIsUserDetailOpen, isUserDetailOpen }) {
    const navigate = useNavigate()

    async function onLogOut() {
        try {
            await logout()
            setIsUserDetailOpen(false)
            navigate('/')
        } catch (err) {
            console.log('Could not log ou user', err)
        }
    }
    return (
        <div className="user-details-container">
            <div className="user-details">
                <p>ACCOUNT</p>
                <section className="user-details-display flex">
                    <img onClick={() => setIsUserDetailOpen(!isUserDetailOpen)} style={{ width: 32, height: 32, }} src={user.imgUrl} alt="" />
                    <div className="user-names flex">

                        <h2 className="userfullname">{user.fullname}</h2>
                        <h2 className="username">@{user.username}</h2>
                    </div>
                </section>
            </div>
            <hr />
            <button className="clean-btn" onClick={onLogOut}>Log out</button>
        </div>
    )
}