import React, { Component } from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'ProReact-Lyndsey'
};

class KanbanBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/cards`, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ cards: responseData });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  addTask(cardId, taskName) {
    // store reference to current state before we change it
    let prevState = this.state;

    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    // create a new task with the given name and a temporary Id
    let newTask = {
      id: Date.now(),
      name: taskName,
      done: false
    };

    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });

    this.setState({ cards: nextState });

    // call api to add task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error("Server response wasn't OK");
    })
    .then((responseData) => {
      // when the server returns the definitive Id
      // used for the new task, update it in React
      newTask.id = responseData.id;
      this.setState({ cards: nextState });
    })
    .catch((error) => {
      this.setState(prevState);
    });
  }

  deleteTask(cardId, taskId, taskIndex) {
    // keep reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;

    // find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    // create a new object without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });

    this.setState({ cards: nextState });

    // call API to remove task on server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error("Server response wasn't OK");
      }
    })
    .catch((error) => {
      console.eror("Fetch error:", error);
      this.setState(prevState);
    });
  }

  toggleTask(cardId, taskId, taskIndex) {
      let prevState = this.state;
      
      let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
      // save a reference to the tasks done value
      let newDoneValue;
      // using the $apply command, we can change the done value to its opposite
      let nextState = update(this.state.cards, {
        [cardIndex]: {
          tasks: {
            [taskIndex]: {
              done: { $apply: (done) => {
                  newDoneValue = !done;
                  return newDoneValue;
                }
              }
            }
          }
        }
      });

      this.setState({ cards: nextState });

      // call API to update task status on server
      fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
        method: 'put',
        headers: API_HEADERS,
        body: JSON.stringify({ done: newDoneValue })
      })
      .then((response) => {
        if(!response.ok) {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch((error) => {
        console.eror("Fetch error:", error);
        this.setState(prevState);
      });
  }

  render() {
    return <KanbanBoard cards={this.state.cards}
                        taskCallbacks={{
                          toggle: this.toggleTask.bind(this),
                          delete: this.deleteTask.bind(this),
                          add: this.addTask.bind(this) }} />
  }
}

export default KanbanBoardContainer;
