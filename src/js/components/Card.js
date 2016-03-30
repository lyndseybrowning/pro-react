import React from 'react';
import CheckList from './CheckList';

export default React.createClass({

  getInitialState() {
    return ({
      showDetails: false
    });
  },

  toggleDetails() {
    this.setState({ showDetails: !this.state.showDetails });
  },

  render() {
    let title = this.props.title,
        description = this.props.description,
        id = this.props.id,
        tasks = this.props.tasks,
        cardTitleClass = 'card__title',
        cardDetails, sideColor;

   if(this.state.showDetails) {
     cardDetails = (
       <div className='card__details'>
         {description}
         <CheckList cardId={id} tasks={tasks} />
       </div>
     );

     cardTitleClass += ' card__title--is-open';
  }

  sideColor = {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    bottom: 0,
    left: 0,
    width: 7,
    backgroundColor: this.props.color
  };

  return (
    <div className='card'>
      <div style={sideColor} />
      <div className={cardTitleClass} onClick={this.toggleDetails}>{title}</div>
      {cardDetails}
    </div>
  );
  }
});
