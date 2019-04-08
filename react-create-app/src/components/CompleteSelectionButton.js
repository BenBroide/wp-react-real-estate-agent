import React from "react";
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

const CompleteSelectionButton = ({callback}) => {
    return (
        <Button color="primary" variant="contained" size="small" onClick={callback}>
            <DoneIcon style={{margin: '0 5px'}}/>
            Complete Selection
        </Button>
    )
}
export default CompleteSelectionButton
