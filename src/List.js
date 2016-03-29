import React from 'react';

export default React.createClass({
  render() {
    let title = this.props.title;
    let cards = this.props.cards.map((card) => {
      return (
        <Card id={card.id}
              title={card.title}
              description={card.description}
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
