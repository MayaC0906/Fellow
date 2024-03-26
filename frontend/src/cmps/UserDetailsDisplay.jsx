import { useNavigate } from "react-router"
import { logout } from "../store/actions/user.actions"
import { additionTaskSvg } from "./Svgs";


export function UserDetailsDisplay({ user, setIsUserDetailOpen }) {

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
                <section>
                    <button onClick={() => setIsUserDetailOpen(false)} className="close-modal clean-btn">{additionTaskSvg.close}</button>
                    <p>ACCOUNT</p>
                </section>
                <section className="user-details-display flex">
                    <img className="insdie-img" src={user.imgUrl} alt="" />
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