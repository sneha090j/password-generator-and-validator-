import React, { useState } from 'react';
import { MdToggleOn, MdToggleOff } from 'react-icons/md';
import '../css/Include.css'

function Include({ name,onToggle }) {
    const [toggle, setToggle] = useState(false);
   

    const handleToggle = () => {
       setToggle(!toggle);
       onToggle(name.toLowerCase(), !toggle);
    };
    return (
        <>
            <div className="include">
                <p>{name}</p>
                <p onClick={handleToggle} className='click'>
                    {toggle ? <MdToggleOn /> : <MdToggleOff />}
                </p>
            </div>
        </>
    );
}

export default Include;
