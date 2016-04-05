import React, {PropTypes} from 'react';
import List from './List';

export default React.createClass({

  propTypes: {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
  },

  render() {
    let cards = this.props.cards;

    return (
      <div className='app'>
        <List id='todo' title='To Do' taskCallbacks={this.props.taskCallbacks} cards={cards.filter((card) => card.status === 'todo')} />
        <List id='in-progress' title='In Progress' taskCallbacks={this.props.taskCallbacks} cards={cards.filter((card) => card.status === 'in-progress')} />
        <List id='done' title='Done' taskCallbacks={this.props.taskCallbacks} cards={cards.filter((card) => card.status === 'done')} />
      </div>
    );
  }
});
