import React, {useState} from 'react';

import './Search.scss'
const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
        value={value}
        onClick={onClick}
        ref={ref}
        readOnly
        className="datepicker__input"
    />
));

export default CustomInput;
