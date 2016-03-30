import React from 'react';
import Card from './Card';

export default React.createClass({
  render() {
    let title = this.props.title;
    let cards = this.props.cards.map((card) => {
      return (
        <Card key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              color={card.color}
              tasks={card.tasks}
        />
      );
    });

    return (
      <div className='list'>
        <h1>{title}</h1>
        {cards}
      </div>
    );
  }
});
