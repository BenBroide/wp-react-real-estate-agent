import React, {Component} from "react";
import {addResponseMessage, renderCustomComponent} from "react-chat-widget";

import ListingList from './ListingList';
import DateField from './DateField';

class DatesResponse extends Component {
    constructor(props){
        super(props);
        this.state = {
            dates: {startDate: '', endDate: ''},
            renderedNext: false,
            defaultStart: '',
            defaultEnd: '',
            selections: props.selections,
            data: props.data
        };
    }

    componentWillMount(){
        let today = new Date();
        let firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().split('T')[0];

        this.setState({
            dates: {startDate: firstDayOfNextMonth, endDate: ''}
        })
    }

    updateInquiry = (event, dateKey) => {
        let selections = this.state.selections;
        if(typeof selections['dates'] === "undefined") {
            selections['dates'] = {};
        } else {
            selections.dates = this.state.dates;
        }

        selections.dates[dateKey] = event.target.value;
        if('endDate' === dateKey) {
            selections.dates.startDate = this.state.dates.startDate;
        }
        this.setState({selections: selections})

        if(!this.state.renderedNext) {
            addResponseMessage('3 Results found');
            renderCustomComponent(ListingList, {data: this.state.data, selectionsInit: {...selections, listings: []}});
        }
    }

    render(){
        return (
            <div>
                <form noValidate>
                    {DateField("Start Date", this.state.dates.startDate, (event) => this.updateInquiry(event, 'startDate'))}
                    {DateField("End Date", this.state.dates.endDate, (event) => this.updateInquiry(event, 'endDate'))}
                </form>
            </div>
        )
    }
}

export default DatesResponse;
