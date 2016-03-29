import React from 'react';

export default React.createClass({
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
