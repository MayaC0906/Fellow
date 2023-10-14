

import React from 'react'
import { Link } from 'react-router-dom'
import { Textarea } from '@mui/joy'
import { Button } from '@mui/joy'
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
                    <span>FELLOW 101</span>
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

            <section className='discover'>
                <header>
                    <h2>See work in a whole new way</h2>
                    <p>
                        View your team's projects from every angle
                        and bring a fresh perspective to the
                        tash at hand 
                    </p>
                    <button className='clean-btn task-btn'>Discover all Fellow views</button>
                </header>
               
                    <div className='square-info sq1'>
                    <img src="https://images.ctfassets.net/rz1oowkt5gyp/5Hb09iiMrK6mSpThW5HS89/f5683a167ad3f74bed4dc7592ae5a002/TrelloBoard_Timeline_2x.png?w=1212&fm=webp" alt="" />

                        <article>
                            <span>{homePage.lines}HIT DEADLINES EVERY TIME</span>
                            <p>From weekly sprints to annual planning,
                                timeline view keeps all tasks on track.
                                Quickly get a glimpse of what's coming down
                                the pipeline and identify any gaps that might
                                impede your team's progress.
                            </p>
                            <a>Learn more</a>
                        </article>
                    </div>
                    <div className='square-info sq2'>
                        <article>
                            <span>
                                {homePage.calender}STAY ON TOP OF TASKS
                            </span>
                            <p>
                                Start each day without any surprises. 
                                Wheter scheduling an editorail calender
                                or staying on top of to-dos, calender view 
                                is like a crystal ball giving you a clear 
                                vision of what work lies ahead
                            </p>
                            <a >Learn more</a>
                        </article>
                        <img src="https://images.ctfassets.net/rz1oowkt5gyp/7sxChS4x6XAcUgDpp4VAZk/25377d162e964f4243e329c447bfd7dc/TrelloBoard_Calendar_2x.png?w=1212&fm=webp" alt="" />

                    </div>
            </section>        

            <section className='intuitive-features'>
                    <header>
                        <span>POWERFUL WAYS TO GROW</span>
                        <h3>Do more with Fellow</h3>
                        <p>
                            Fellow's intuitive features give any team
                            the ability to quickly set up and customize
                            workflows for just about anything
                        </p>
                    </header>
                    <div className='cards'>
                        <article className='card card1'>
                            <img src="https://images.ctfassets.net/rz1oowkt5gyp/gMfkjoA3yWYG3kat3qjpW/3902bfdfccf08869e33d63bbc9d1969b/Integrations_Puzzle.svg" alt="" />
                            <h3>Integrations</h3>
                            <p>
                                Connect the apps your team already uses
                                into your Fellow workflow or add a Power-Up
                                to fine-tune your specific needs.
                            </p>
                            <button>Browse Integrations</button>
                        </article>
                        <article className='card card2'>
                            <img src="https://images.ctfassets.net/rz1oowkt5gyp/7wxRW93hvb7858bMsK4LSs/f6fc44fb23dbc6ee9bc6a7f6e2af0fb7/Gears.svg" alt="" />
                            <h3>Butler Automation</h3>
                            <p>
                                No-code automation is built into every
                                Fellow board. Focus on the work that
                                matters most and let the robots do the rest.
                            </p>
                            <button>Get to know Automation</button>
                        </article>
                        <article className='card card3'>
                            <img src="https://images.ctfassets.net/rz1oowkt5gyp/mNa3Mi7T6ga2OTrNxJx1D/8991b8d57cd6ec7330398c7a8757b4dc/Search_Value.svg" alt="" />
                            <h3>Fellow Enterprise</h3>
                            <p>
                               The productivity tool teams love, paired
                               with the features and security needed for scal.
                            </p>
                            <button>Explore Enterprise</button>
                        </article>
                    </div>
            </section>        
            <section className='signup'>
                <h2>Get started with Fellow today</h2>
                <form action="">
                <Textarea size="md" name="Size" placeholder="Email" />
                    <Button>Sign up - it's free!</Button>
                </form>
            </section>        
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