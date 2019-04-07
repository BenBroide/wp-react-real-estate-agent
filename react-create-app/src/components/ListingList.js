import React, {useState} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import ViewIcon from '@material-ui/icons/Pageview';
import Zoom from '@material-ui/core/Zoom';

const ListingList = ({selectionsInit, data}) => {
    const [selections, setSelection] = useState(selectionsInit);
    const handleToggleListing = (listing) => {
        selections['listings'].push(listing);
        setSelection(selections);
        console.log(selections);
    };

    return (
        <List dense>
            {Array.from({length: 3}, (x, i) => {
                return <Zoom in={true} key={i}><ListItem
                    style={{maxWidth: '95%', borderRadius: '10px', margin: '10px', background: '#f4f7f9'}}
                    className={'rcw-response'} alignItems="flex-start" button>
                    <img alt={`Listing ${i}`} style={{maxWidth: '50px'}} src="/images/listing-1.jpg"/>
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
    )
}
export default ListingList;
