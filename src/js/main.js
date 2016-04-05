import '../css/style.css';

import React from 'react';
import {render} from 'react-dom';
import KanbanBoardContainer from './components/KanbanBoardContainer';

render(<KanbanBoardContainer />, document.getElementById('app'));
