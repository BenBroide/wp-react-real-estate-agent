import React from "react";
import TextField from '@material-ui/core/TextField';
const DateField = (label, defaultValue, callback) => {
    return <TextField
        id="date"
        label={label}
        type="date"
        defaultValue={defaultValue}
        InputLabelProps={{
            shrink: true,
        }}
        onChange={callback}
    />
}
export default DateField;
