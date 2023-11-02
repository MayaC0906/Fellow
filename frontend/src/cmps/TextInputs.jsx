import React, { useState } from "react";

export function TextInputs({ toggle, setToggle, handleSubmit, from }) {
    const [txt, setTxt] = useState('');

    function handleChange(e) {
        setTxt(e.target.value)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        console.log(txt);
        // handleSubmit(txt)
        setTxt('')
    }

    return (
        <section>
            {!toggle ?
                <div onClick={() => setToggle(true)}>+ Add a {from}</div> :
                <div>
                    <form onSubmit={(event) => onSubmit(event)}>
                        <textarea value={txt}
                         type="text"
                         name="title"
                         onChange={handleChange}
                         ></textarea>
                        <button type="submit">Add {from}</button>
                        <button onClick={() => setToggle(!toggle)}>X</button>
                    </form>
                </div>}
        </section>
    );
}
