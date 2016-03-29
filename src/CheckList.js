import React from 'react';

export default React.createClass({
  render() {
    let cardId = this.props.cardId;
    let tasks = this.props.tasks.map((task) => (
      <li className='checklist__task' key={task.id}>
        <input type='checkbox' defaultChecked={task.done} />
        {task.name}
        <a href='#' className='checklist__task--remove' />
      </li>
    ));

    return (
      <div className='checklist'>
        <ul>{tasks}</ul>
      </div>
    );
  }
});
