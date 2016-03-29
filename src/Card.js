import React from 'react';

export default React.createClass({
  render() {
    let title = this.props.title,
        description = this.props.description,
        id = this.props.id,
        tasks = this.props.tasks;

    return (
      <div className='card'>
        <div className='card__title'>{title}</div>
        <div className='card__details'>
          {description}
          <CheckList cardId={id} tasks={tasks} />
        </div>
      </div>
    );
  }
});
