import { useEffect } from "react"
import { appHeaderSvg } from "../Svgs"

export function ChangeBgcPhotos({ setTitle, onChangeBoardBgc }) {

    const imgs = [
        {
            imgUrl: 'https://images.unsplash.com/photo-1698255921824-9c87f3f8514a?auto=format&fit=crop&q=80&w=2105&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Mo',
            nameLink: 'https://unsplash.com/@mo_design_3d?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1697577473134-46490cf51044?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
            imgUrl: 'https://images.unsplash.com/photo-1697297937792-ec7c0adf6c16?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Javier Miranda',
            nameLink: 'https://unsplash.com/@nuvaproductions?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1697438858951-b57b577db305?auto=format&fit=crop&q=80&w=1972&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Zetong Li',
            nameLink: 'https://unsplash.com/@zetong?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1696643830146-44a8755f1905?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Jigar Panchal',
            nameLink: 'https://unsplash.com/@brave4_heart?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },

        {
            imgUrl: 'https://images.unsplash.com/photo-1697015357114-a30b4ee51659?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Ilia Bronskiy',
            nameLink: 'https://unsplash.com/@idbronskiy?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1696875221702-76a6420303af?auto=format&fit=crop&q=80&w=1928&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Marek Piwnicki',
            nameLink: 'https://unsplash.com/@marekpiwnicki?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1696416853482-b33d6486dca9?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'ft shafi',
            nameLink: 'https://unsplash.com/@ftshafi'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1698094276096-05782e47238a?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Spenser Sembrat',
            nameLink: 'https://unsplash.com/@spensersembrat'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1697990718230-b8e83532edcc?auto=format&fit=crop&q=80&w=2129&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Marek Piwnicki',
            nameLink: 'https://unsplash.com/@marekpiwnicki'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1696144706485-ff7825ec8481?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Joshua Rawson-Harris',
            nameLink: 'https://unsplash.com/@joshrh19?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1696595883555-5a2f5ab967f8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Cokile Ceoi',
            nameLink: 'https://unsplash.com/@c0ki1e?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1697201826242-141dec817a6f?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Ander Peña',
            nameLink: 'https://unsplash.com/@anderrek?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1693868769698-6c7440636a09?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Aperture Vintage',
            nameLink: 'https://unsplash.com/@aperturevintage?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1628003695449-92f40647d56b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Aperture Vintage',
            nameLink: 'https://unsplash.com/@aperturevintage?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1692285679185-271d1bf7052f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Marcel Strauß',
            nameLink: 'https://unsplash.com/@martzzl'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1695456166343-918eba48421d?auto=format&fit=crop&q=80&w=2006&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Spenser Sembrat',
            nameLink: 'https://unsplash.com/@spensersembrat'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1691092282872-f0e67d907377?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'le Sixième Rêve',
            nameLink: 'https://unsplash.com/@le_sixieme_reve?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1694746028481-f0ff8d0713d8?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Leo',
            nameLink: 'https://unsplash.com/@leo_visions_?utm_source=trello&utm_medium=referral&utm_campaign=api-credit'
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1694042877461-59f092b82533?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Spenser Sembrat',
            nameLink: 'https://unsplash.com/@spensersembrat'
        },
    ]


    useEffect(() => {
        setTitle(<span>Photos by <a style={{ color: '#0c66e4' }} href="https://unsplash.com">Unsplash</a></span>);
        return () => {
            setTitle("Menu")
        };
    }, [setTitle])


    return (
        <section className="bgc-modal-layout">

            <div className="input-section">
                <input type="text"
                    placeholder="Photos"
                />
                {appHeaderSvg.search}
            </div>

            <div className="upper-section">
                {imgs.map(img => {
                    return <div onClick={() => onChangeBoardBgc(img.imgUrl)} className="sq unsplash">
                        <img src={`${img.imgUrl}`} alt="" />
                        <article>
                            <a style={{ bottom: '0' }} href={`${img.nameLink}`}>{img.name}</a>
                        </article>
                    </div>
                })}
            </div>

        </section>
    )
}