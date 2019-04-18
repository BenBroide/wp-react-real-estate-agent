import React, {useState} from "react";
import { addResponseMessage} from 'react-chat-widget';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import ViewIcon from '@material-ui/icons/Pageview';
import Zoom from '@material-ui/core/Zoom';
import CompleteSelectionButton from './CompleteSelectionButton';
import {update} from "../actions";
import {connect} from "react-redux";


const ListingList = ({ data, selections}) => {
    const [selectionsState, setSelection] = useState(selections);
    const handleToggleListing = (listing) => {
        selectionsState['listings'].push(listing);
        setSelection(selectionsState);
        //console.log(selections);
    };

    const nextStep = () => {
        console.log(selections);
        addResponseMessage('Please leave Name, phone and email and anything else you want us to know about the apartment');
    }

    return (
        <div>
            <List dense>
                {Array.from({length: 3}, (x, i) => {
                    return <Zoom in={true} key={i}><ListItem
                        style={{maxWidth: '95%', borderRadius: '10px', margin: '10px', background: '#f4f7f9'}}
                        className={'rcw-response'} alignItems="flex-start" button>
                        <img alt={`Listing ${i}`} style={{maxWidth: '50px'}} src={`${data.imagesPath}image-${i}.jpg`}/>
                        <ListItemText
                            style={{margin: '5px 0'}}
                            primary={`Listing ${i}`}
                            secondary={
                                <React.Fragment>
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
                                        <ViewIcon style={{margin: '0 10px'}}/>
                                        View Details
                                    </Fab>
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Checkbox
                                onChange={() => handleToggleListing(i)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem></Zoom>
                })
                }
            </List>
            <CompleteSelectionButton callback={nextStep}/>
        </div>

    )
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
)(ListingList)
