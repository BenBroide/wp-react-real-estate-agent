import React, {useEffect} from 'react';
import {Widget, toggleWidget, addResponseMessage, renderCustomComponent} from 'react-chat-widget';
import CheckboxesResponse from './components/CheckboxesResponse'
import 'react-chat-widget/lib/styles.css';


// const data = {
//     categories: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'],
//     amenities: ['Rooftop', 'Doorman', 'Elevator', 'Laundry', 'TV', 'Gym', 'AC', 'Wifi', 'Balcony'],
//     areas: ['Downtown', 'Midtown', 'East Village', 'Show', 'Upper East', 'Upper West']
// };
var bot_data = window.bot_data;
const categories = bot_data.listing_category.map( category => category.cat_name );
const amenities = bot_data.amenities.map( category => category.name );
const areas =  bot_data.area.map( category => category.name );

const data = {
    categories: categories,
    amenities: amenities,
    areas: areas
};

const App = () => {
    const handleNewUserMessage = (newMessage) => {
    }

    useEffect(() => {
            toggleWidget();
            let selections = {};
            Object.keys(data).map(key =>
                selections[key] = []
            );
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

export default App;
