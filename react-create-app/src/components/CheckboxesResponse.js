import React, {Component} from "react";
import {addResponseMessage, renderCustomComponent} from "react-chat-widget";
import DatesResponse from './DatesResponse';
import CompleteSelectionButton from './CompleteSelectionButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {update} from '../actions'
import { connect } from 'react-redux'


class CheckboxesResponse extends Component {
    constructor(props){
        console.log(props);
        super( props );
        let renderedNext = {};
        Object.keys(props.data).map(  key => renderedNext[key] = false  )
        this.state = { onUpdate: this.props.onUpdate, showButton : true, type : props.type , renderedNext : renderedNext , selections : props.selections , data : props.data } ;

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
        console.log(selections);
        selections[type].push(value);
        this.setState({ selections : selections })
        this.nextStep();
    }

    nextStep = ( ) => {
        this.setState({
            showButton: false
            }
        )
        if( !this.state.renderedNext[this.state.type] ){
            if( this.state.type === 'areas'){
                addResponseMessage(`Please select dates.`);
                renderCustomComponent(DatesResponse, { data : this.state.data });
            } else {
                let nextType = ( this.state.type ==='categories' ? 'amenities' : 'areas' )
                addResponseMessage(`Please select ${nextType}.`);
                renderCustomComponent( CheckboxesResponse,  { type : nextType , selections : this.state.selections, data : this.state.data } );
            }
            this.setState( { renderedNext : {[this.state.type] : true} });
        }
    }

    render() {
        return (
            <div>
                <FormGroup row>
                    {this.getCheckboxes( this.state.type  )}
                </FormGroup>
                {/*{this.state.showButton &&*/}
                {/*/!*<CompleteSelectionButton callback={this.nextStep}/>*!/*/}
                {/*}*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selections: state.selections
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: () => {
            dispatch(update())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckboxesResponse)

