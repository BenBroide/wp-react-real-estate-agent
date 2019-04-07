import React, {useEffect} from 'react';
import {Widget, toggleWidget, addResponseMessage, renderCustomComponent} from 'react-chat-widget';
import CheckboxesResponse from './components/CheckboxesResponse'
import 'react-chat-widget/lib/styles.css';


const data = {
    categories: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'],
    amenities: ['Rooftop', 'Doorma', 'Elevator', 'Laundry', 'TV', 'Gym', 'AC', 'Wifi', 'Balcony'],
    areas: ['Downtown', 'Midtown', 'East Village', 'Show', 'Upper East', 'Upper West']
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
