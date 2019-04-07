import React, { Component } from 'react';
import { Widget , toggleWidget, addResponseMessage, setQuickButtons, renderCustomComponent } from 'react-chat-widget';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import 'react-chat-widget/lib/styles.css';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Chip from '@material-ui/core/Chip';
import ViewIcon from '@material-ui/icons/Pageview';
import Zoom from '@material-ui/core/Zoom';

const data = { categories : ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'] , amenities : [ 'Rooftop', 'Doorma', 'Elevator', 'Laundry', 'TV', 'Gym', 'AC', 'Wifi', 'Balcony'] , areas : [ 'Downtown', 'Midtown', 'East Village', 'Show', 'Upper East', 'Upper West'] };


class botDatesResponse extends Component {
    constructor(){
        super();
        this.state = { dates : { startDate : '', endDate : '' }, renderedNext : false, defaultStart: '', defaultEnd : '' } ;
    }

    componentWillMount() {
        var today = new Date();
        var firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth()+1, 1).toISOString().split('T')[0];
        var dateIn12Month = new Date(today.getFullYear(), today.getMonth()+13, 0).toISOString().split('T')[0];

        this.setState( {
            dates : { startDate : firstDayOfNextMonth, endDate: '' }
        })
    }

    updateInquiry = ( event ) => {
        console.log( event );
        this.setState({ dates :  { startDate : event.val } })
        if( !this.state.renderedNext ){
            addResponseMessage( '3 Results found');
            renderCustomComponent( ListingsList );
            this.setState( { renderedNext : true });
        }
    }

    render() {

        return (
            <div>
                <form  noValidate>
                <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue={this.state.dates.startDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        onChange={ (event) => this.updateInquiry(event )}
                        defaultValue={this.state.dates.endDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </div>
        )
    }
}

class renderCheckboxes extends Component {
    constructor(props){
        super( props );
        let selections = {};
        Object.keys(data).map(  key => { selections[key] = []  } )
        let renderedNext = {};
        Object.keys(data).map(  key => { renderedNext[key] = false } )
        this.state = { type : props.type ,listingCat : [], renderedNext : renderedNext , selections : selections } ;
    }

    getCheckboxes = ( type ) =>{
        {return data[type].map( ( value , key ) =>
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
            )}
    }
    updateInquiry = ( type, value ) => {

        let selections = this.state.selections;
        selections[type].push(value);
        this.setState({ selections : selections })
        if( !this.state.renderedNext[type] ){
            addResponseMessage(`Please select ${type}. You can still modify the apartment size you want.`);
            if( type === 'areas'){
                renderCustomComponent(botDatesResponse);
            } else {
                renderCustomComponent( renderCheckboxes,  { type : type ==='categories' ? 'amenities' : 'areas' } );
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


class ListingsList extends Component {
    constructor(){
        super();

    }

    handleToggleListing = listing => () => {

        console.log( listing );
        // this.setState({
        //     checked: newChecked,
        // });
    };

    render() {
        return (
            <List dense >
               {
                   Array.from({length: 3}, (x,i) =>  {
                       return <Zoom in={true} key={i}><ListItem style={ {maxWidth : '95%' , borderRadius : '10px', margin: '10px', background: '#f4f7f9'} } className={'rcw-response'} alignItems="flex-start"   button>
                           <img style={ {maxWidth : '50px' } } src="/images/listing-1.jpg" />

                           <ListItemText
                               style={{margin: '5px 0'}}
                               primary={`Listing ${i}`}
                               secondary={
                                   <React.Fragment >
                                       <Chip
                                           component={'span'}
                                           label="East Village"
                                       />
                                       {data['amenities'].map((amenity, i) => {
                                               return <Chip
                                                   key={i}
                                                   style={{margin: '5px'}}
                                                   component={'span'}
                                                   label={amenity}
                                               />
                                           })
                                       }

                                       <Fab
                                           style={{margin: '10px 0'}}
                                           variant="extended"
                                           size="small"
                                           color="primary"
                                           aria-label="Add"
                                       >
                                           {/*<Icon>star</Icon>*/}
                                           <ViewIcon style={{margin: '0 10px'}}/>
                                           View Details
                                       </Fab>
                                    </React.Fragment>
                               }
                           />

                           <ListItemSecondaryAction>
                               <Checkbox
                                   onChange={this.handleToggleListing(i)}
                               />
                           </ListItemSecondaryAction>

                       </ListItem></Zoom>
                   })
               }
            </List>
        )
    }
}

class App extends Component {
    constructor(){
        super();

    }

    handleNewUserMessage = (newMessage) => {
        renderCustomComponent( renderCheckboxes, { type : 'categories' } );
        // Now send the message throught the backend API
    }


    componentDidMount() {
        toggleWidget();
        addResponseMessage("Hi! Which apartment are you looking for?");
        renderCustomComponent( renderCheckboxes, { type : 'categories' } );
        //renderCustomComponent( ListingsList );

    }

    render() {
        return (
            <div className="App">
                <Widget
                    badge="2"
                    title="Real Estate Bot"
                    subtitle="Your real estate Agent"
                    showCloseButton={true}
                    handleNewUserMessage={this.handleNewUserMessage}
                />
            </div>
    )
    }
}

export default App;
