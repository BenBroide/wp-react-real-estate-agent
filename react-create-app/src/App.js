import React, {useEffect } from 'react';
import {Widget, toggleWidget, addResponseMessage, renderCustomComponent} from 'react-chat-widget';
import CheckboxesResponse from './components/CheckboxesResponse'
import 'react-chat-widget/lib/styles.css';
import {connect} from "react-redux";

var data;
if( typeof window.bot_data !== 'undefined' ){
    var bot_data = window.bot_data;
    const categories = bot_data.listing_category.map( category => category.name );
    const amenities = bot_data.amenities.map( category => category.name );
    const areas =  bot_data.area.map( category => category.name );
    data = {
        categories: categories,
        amenities: amenities,
        areas: areas
    };
} else {
    data = {
        categories: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'],
        amenities: ['Rooftop', 'Doorman', 'Elevator', 'Laundry', 'TV', 'Gym', 'AC', 'Wifi', 'Balcony'],
        areas: ['Downtown', 'Midtown', 'East Village', 'Show', 'Upper East', 'Upper West']
    };

}



const App = ( {selections }) => {

    const handleNewUserMessage = (newMessage) => {
        var data = {
            'action': 'get_lead',
            'selections': selections,
            'message' : newMessage
        };

        window.jQuery.post(bot_data.ajax_url, data, (response) => {
            let jsonResponse = JSON.parse( response );
            selections.post_id = jsonResponse.post_id;
        });

    }

    useEffect(() => {
            toggleWidget();

            addResponseMessage(`Please select categories.`);
            renderCustomComponent(CheckboxesResponse, {type: 'categories', selections: selections, data: data});
            //renderCustomComponent( ListingList , { selectionsInit : { listings : [] } });
        }
    );

    return (
        <div className="App">
            <Widget
                badge="2"
                title="Real Estate Bot"
                subtitle="Your real estate Agent"
                showCloseButton={true}
                handleNewUserMessage={handleNewUserMessage}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selections: state.selections,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onUpdate: () => {
//             dispatch(update())
//         }
//     }
// }
export default connect(
    mapStateToProps
)(App)


