import React, {useEffect} from 'react';
import {Widget, toggleWidget, addResponseMessage, renderCustomComponent} from 'react-chat-widget';
import CheckboxesResponse from './components/CheckboxesResponse'
import 'react-chat-widget/lib/styles.css';
import {update} from "./actions";
import {connect} from "react-redux";

var data = {
    categories: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'],
    amenities: ['Rooftop', 'Doorman', 'Elevator', 'Laundry', 'TV', 'Gym', 'AC', 'Wifi', 'Balcony'],
    areas: ['Downtown', 'Midtown', 'East Village', 'Show', 'Upper East', 'Upper West']
};

// var bot_data = window.bot_data;
// const categories = bot_data.listing_category.map( category => category.name );
// const amenities = bot_data.amenities.map( category => category.name );
// const areas =  bot_data.area.map( category => category.name );
//
// const data = {
//     categories: categories,
//     amenities: amenities,
//     areas: areas
// };

const App = ( {selections}) => {
    const handleNewUserMessage = (newMessage) => {
        console.log(newMessage);
        console.log(selections);
    }

    useEffect(() => {
            toggleWidget();
            let data = {
                categories: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'],
                amenities: ['Rooftop', 'Doorman', 'Elevator', 'Laundry', 'TV', 'Gym', 'AC', 'Wifi', 'Balcony'],
                areas: ['Downtown', 'Midtown', 'East Village', 'Show', 'Upper East', 'Upper West']
            };

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
)(App)


