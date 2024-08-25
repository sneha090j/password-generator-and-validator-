import React, { useState } from 'react'
import '../css/Options.css'
const Options = ({ name, min, max,onRangeChange }) => {
    const [value, setValue] = useState(min);

    const handleChange = (event) => {
      const newvalue=event.target.value
        setValue(newvalue);
        onRangeChange(newvalue);
    };

    return (
        <>
            <div className="options">
                <div className="wordrange">
                    <p>{name}</p>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
                <div className="selectedrange">
                    <p>{`${name} range: ${value}`}</p>
                </div>

            </div>
        </>
    )
}

export default Options
