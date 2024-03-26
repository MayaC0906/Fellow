import { Link } from "react-router-dom"

export function HomeEnterSection() {
    return (
        <section className='enter-section'>
            <section className="enter-section-details">
                <h1>Trello brings all your tasks, teammates, and tools
                    together
                </h1>
                <p>
                    Keep everything in the same place-even if your team isn't.
                </p>
                <Link to="/workspace" > <button>Start demo</button> </Link>
            </section>
            <section className="enter-section-img">
                <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp" alt="" />
            </ section>

        </section>

    )
}