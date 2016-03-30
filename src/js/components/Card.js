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
        cardDetails;

   if(this.state.showDetails) {
     cardDetails = (
       <div className='card__details'>
         {description}
         <CheckList cardId={id} tasks={tasks} />
       </div>
     );
   }

  return (
    <div className='card'>
      <div className='card__title' onClick={this.toggleDetails}>{title}</div>
      {cardDetails}
    </div>
  );
  }
});
