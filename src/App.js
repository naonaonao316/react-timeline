import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';
import generateFakeData from './generate-fake-data';

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end"
};

class App extends Component {
  constructor(props) {
    super(props);

    const { groups, items } = generateFakeData();

    const newGroups = groups.map(group => {
      const isRoot = (parseInt(group.id) - 1) % 3 === 0;
      console.log("is root");
      console.log(isRoot);

      console.log("parent")
      console.log(Math.floor((parseInt(group.id) - 1) / 3) * 3 + 1)
      const parent = isRoot
       ? null
       : Math.floor((parseInt(group.id) - 1) / 3) * 3 + 1;

      return Object.assign({}, group, {
        root: isRoot,
        parent: parent
      });
    });

    this.state = {
     groups: newGroups,
     items: items
   };
  }

  render() {
    const { groups, items } = this.state;
    console.log(groups);
    return (
      <div className="App">
        <Timeline
              groups={groups}
              items={items}
              keys={keys}
              defaultTimeStart={moment().add(-5, 'days')}
              defaultTimeEnd={moment().add(5, 'days')}
              />
      </div>
    );
  }
}

export default App;
