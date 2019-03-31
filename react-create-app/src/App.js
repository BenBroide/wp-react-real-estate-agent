import React, { Component } from 'react';
import { Widget , addResponseMessage, isWidgetOpened, chatOpen } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import MaterialIcon, {colorPalette} from 'material-icons-react';

const Launcher = ( handleToggle ) => {
    return (
        <button className={'rwre-toggle-button'} onClick={ () => { console.log('hi'); handleToggle() } }>
            <MaterialIcon icon={  'chat'}  color='#fff' size='large' />
        </button>
    )
};

class App extends Component {
    constructor(){
        super();

    }

    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
    }

    render() {
        return (
            <div className="App">
                <Widget
                    title="Real Bot"
                    subtitle="Your real estate Agent"
                    fullScreenMode={true}
                    launcher={Launcher}
                    showCloseButton={true}
                />
            </div>
    )
    }
}

export default App;
