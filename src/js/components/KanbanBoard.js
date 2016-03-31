import React, {PropTypes} from 'react';
import List from './List';

export default React.createClass({

  propTypes: {
    cards: PropTypes.arrayOf(PropTypes.object)
  },

  render() {
    let cards = this.props.cards;

    return (
      <div className='app'>
        <List id='todo' title='To Do' cards={cards.filter((card) => card.status === 'todo')} />
        <List id='in-progress' title='In Progress' cards={cards.filter((card) => card.status === 'in-progress')} />
        <List id='done' title='Done' cards={cards.filter((card) => card.status === 'done')} />
      </div>
    );
  }
});
