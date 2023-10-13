

import React from 'react'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import hero from '../assets/img/hero.png'
import hs1 from '../assets/img/hs1.png'
import hs2 from '../assets//img/hs2.png'
import hs3 from '../assets//img/hs3.png'
// import logo from '../assets/img/logo.png'
import { homePage } from '../cmps/Svgs'
export function HomePage() {
    const [img, setImg] = useState(hs2)

    return (
        <section className='home-container'>

            <div className='hero-container'>
                <section className='signup-intro'>
                    <span>

                        <h2>Fellow brings all your tasks, teammates, and tools
                    together</h2>
                        <p>Keep everything in the same place-even if your team isn't.</p>
                    </span>
                    <Link className='demo-btn' to="/workspace">Start demo</Link>

                </section>
                <section className='hero'>
                    <img src={hero} alt="img" />
                    
                </section>
                <div className='full' style={{ width: '100%', height: '100px' }}>
                    {/* <svg preserveAspectRatio="none" viewBox="0 0 1440 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 99h1440V0C689.239 179.5 669.733-106.498 0 91v8Z" fill="#fff"/>
                    </svg> */}
                </div>

            </div>

            <div className='app-desc'>
                <section className='desc'>
                    <h2>A productivity powerhouse</h2>
                    <h3>Simple, flexible, and powerful. All it takes are boards,
                        lists, and cards to get a clear view of who’s doing
                         what and what needs to get done.
                        Learn more in our guide for getting started.</h3>
                </section>
            </div>

            <div className='boards-desc'>
                <div className='tabs'>
                    <button onClick={() => setImg(hs1)} className='tab clean-btn'>
                        <h4>Boards</h4>
                        <p>Fellow boards keep tasks organized and work moving
                             forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”</p>
                    </button>
                    <button onClick={() => setImg(hs2)} className='tab clean-btn'>
                        <h4>Lists</h4>
                        <p>The different stages of a task. Start as simple as
                             To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Fellow.</p>
                    </button>
                    <button onClick={() => setImg(hs3)} className='tab clean-btn'>
                        <h4>Cards</h4>
                        <p>Cards represent tasks and ideas and hold all
                            the information to get the job done. As you make progress, move cards across lists to show their status.</p>
                    </button>
                </div>

                <div className='imgs-section'>
                    <img src={img} alt="" />
                </div>
            </div>



            <footer>
                <section className='upper-section'>
                    <div>
                        <img src="https://res.cloudinary.com/dehxwadkk/image/upload/v1696466880/logo_transparent_dz6ld4.png" alt="" />
                        <button className='clean-btn'>Log in</button>
                    </div>
                    {/* <div</div> */}
                    <article>
                        {/* <button className='clean-btn'></button> */}
                        <span>About Fellow</span>
                        <p>What's behind the boards</p>
                    </article>
                    <article>
                        <span>Jobs</span>
                        <p>Learn about open roles on the Fellow team</p>
                    </article>
                    <article>
                        <span>Apps</span>
                        <p>
                            Download the Fellow App for your 
                            Desktop or Mobile devices.
                        </p>
                    </article>
                    <article>
                        <span>Contact us</span>
                        <p>
                            Need anything? 
                            Get in touch and we can help
                        </p>
                    </article>
                </section>
                <section className='lower-section'>
                    <section>
                        <a >{homePage.globe}</a>
                        <span>English</span>
                    </section>
                    <div className='policies'>
                        <button className='clean-btn'>Privacy policy</button>
                        <button className='clean-btn'>Terms</button>
                        {/* <button className='clean-btn'>Copy</button> */}
                        {/* <article></article> */}
                        <span>&copy; 2023 Fellow</span>
                    </div>
                    <div className='social-links'>
                        <a >{homePage.instagram}</a>
                        <a >{homePage.facebook}</a>
                        <a >{homePage.linkedin}</a>
                        <a >{homePage.twitter}</a>
                        <a >{homePage.youtube}</a>
                    </div>
                </section>
            </footer>
        </section >
    )
}