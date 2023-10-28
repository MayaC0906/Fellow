import { appHeaderSvg } from "../Svgs"


export function ChangeBgcPhotos({onChangeBoardBgc}) {
    
    const imgs = [
        { 
            imgUrl: 'https://images.unsplash.com/photo-1696144706485-ff7825ec8481?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Joshua Rawson-Harris', 
            nameLink: 'https://unsplash.com/@joshrh19?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' 
        },
        { 
            imgUrl: 'https://images.unsplash.com/photo-1696595883516-76c97aa3a164?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Cokile Ceoi', 
            nameLink: 'https://unsplash.com/@c0ki1e?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' 
        },
        { 
            imgUrl: 'https://images.unsplash.com/photo-1697201826242-141dec817a6f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Ander Peña', 
            nameLink: 'https://unsplash.com/@anderrek?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        { 
            imgUrl: 'https://images.unsplash.com/photo-1697577473134-46490cf51044?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Pawan Thap', 
            nameLink: 'https://unsplash.com/@thapapawan?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' 
        },
        { 
            imgUrl: 'https://images.unsplash.com/photo-1696935518912-ee46a5c161d0?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            name: 'Lucija Ros', 
            nameLink: 'https://unsplash.com/@lucija_ros?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' 
        },
        { 
            imgUrl: 'https://images.unsplash.com/photo-1697701859524-f4cc65e4747a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Pawel Czerwinski', 
            nameLink: 'https://unsplash.com/@pawel_czerwinski?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
         },
         {
            imgUrl: 'https://images.unsplash.com/photo-1697297937792-ec7c0adf6c16?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8M3x8fGVufDB8fHx8fA%3D%3D',
            name: 'Javier Miranda',
            nameLink: 'https://unsplash.com/@nuvaproductions?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1697438858951-b57b577db305?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTB8fHxlbnwwfHx8fHw%3D',
            name: 'Zetong Li',
            nameLink: 'https://unsplash.com/@zetong?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1696643830146-44a8755f1905?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTF8fHxlbnwwfHx8fHw%3D',
            name: 'Jigar Panchal',
            nameLink: 'https://unsplash.com/@brave4_heart?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1698255921824-9c87f3f8514a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTN8fHxlbnwwfHx8fHw%3D',
            name: 'Mo',
            nameLink: 'https://unsplash.com/@mo_design_3d?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1697015357114-a30b4ee51659?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjB8fHxlbnwwfHx8fHw%3D',
            name: 'Ilia Bronskiy',
            nameLink: 'https://unsplash.com/@idbronskiy?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1696875221702-76a6420303af?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NTZ8fHxlbnwwfHx8fHw%3D',
            name: 'Marek Piwnicki',
            nameLink: 'https://unsplash.com/@marekpiwnicki?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        // {
        //     imgUrl: '',
        //     name: '',
        //     nameLink: ''
        // },
        // {
        //     imgUrl: '',
        //     name: '',
        //     nameLink: ''
        // },
        // {
        //     imgUrl: '',
        //     name: '',
        //     nameLink: ''
        // },
        // {
        //     imgUrl: '',
        //     name: '',
        //     nameLink: ''
        // },
        // {
        //     imgUrl: '',
        //     name: '',
        //     nameLink: ''
        // },
        // {
        //     imgUrl: '',
        //     name: '',
        //     nameLink: ''
        // },
    ]


    return (
        <section className="bgc-modal-layout">

            <div className="input-section">
                <input type="text" 
                    placeholder="Photos"
                    //TODO - FILTER PHOTOS
                />
                {appHeaderSvg.search}
            </div>

            <div className="upper-section">
                {imgs.map(img => {
                   return <div onClick={() => onChangeBoardBgc(img.imgUrl)} className="sq unsplash">
                            <img src={`${img.imgUrl}`} alt="" />
                            <article>
                                <a href={`${img.nameLink}`}>{img.name}</a>
                            </article>
                        </div>               
                    
                })}
            </div>
            <footer>
                <p>
                    By using images from Unsplash, you agree to their <span>license</span> and <span>Terms of Service</span>
                </p>
            </footer>
        </section>
    )
}