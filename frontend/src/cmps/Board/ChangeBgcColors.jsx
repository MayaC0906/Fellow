import { useEffect } from "react";

export function ChangeBgcColor({setTitle, onChangeBoardBgc}) {
    const clrsImgs = [
      {url: 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202531/707f35bc691220846678_bdydef.svg', emoji: '❄️'},
      {url:'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202537/d106776cb297f000b1f4_kroicr.svg', emoji: '🌊'},
      {url:'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202522/8ab3b35f3a786bb6cdac_ci3ilc.svg', emoji: '🔮' },
      {url:'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg', emoji: '🌈'},
      {url:'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202495/aec98becb6d15a5fc95e_dseafo.svg', emoji: '🍑' },
      {url:'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389855/92e67a71aaaa98dea5ad_ogsw1y.svg', emoji: '🌸'}
    ]

    useEffect(() => {
        setTitle('Colors');
        return () => {
            setTitle("Menu")
        };
    }, [setTitle])
    

    return ( 
    <section className="bgc-modal-layout">        
        <div className="upper-section">
            {clrsImgs.map(clr => {
            return <div onClick={() => onChangeBoardBgc(clr.url)} className="sq unsplash colors">
                        <img src={`${clr.url}`} alt="" />
                        {/* <a href={`${img.nameLink}`}>{img.name}</a> */}
                        <span style={{fontSize: '16px',position: 'absolute', bottom:'6px', left:'14px'}}>{clr.emoji}</span>
                       
                    </div>                     
            })}
        </div>
    </section>
    )
}