import React, {Component} from "react";
import {addResponseMessage, renderCustomComponent} from "react-chat-widget";
import DatesResponse from './DatesResponse';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxesResponse extends Component {
    constructor(props){
        super( props );
        let renderedNext = {};
        Object.keys(props.data).map(  key => renderedNext[key] = false  )
        this.state = { type : props.type , renderedNext : renderedNext , selections : props.selections , data : props.data } ;
    }

    getCheckboxes = ( type ) =>{
        return this.state.data[type].map( ( value , key ) =>
            <FormControlLabel
                key={key}
                control={
                    <Checkbox
                        onChange={ () => this.updateInquiry( this.state.type , value)}
                        value={value}
                    />
                }
                label={value}
            />
        )
    }
    updateInquiry = ( type, value ) => {
        let selections = this.state.selections;
        selections[type].push(value);
        this.setState({ selections : selections })
        if( !this.state.renderedNext[type] ){
            if( type === 'areas'){
                addResponseMessage(`Please select dates.`);
                renderCustomComponent(DatesResponse, {selections : this.state.selections, data : this.state.data });
            } else {
                let nextType = ( type ==='categories' ? 'amenities' : 'areas' )
                addResponseMessage(`Please select ${nextType}.`);
                renderCustomComponent( CheckboxesResponse,  { type : nextType , selections : this.state.selections, data : this.state.data } );
            }
            this.setState( { renderedNext : {[type] : true} });
        }
    }

    render() {
        return (
            <div>
                <FormGroup row>
                    {this.getCheckboxes( this.state.type  )}
                </FormGroup>
            </div>
        )
    }
}
export default CheckboxesResponse;
