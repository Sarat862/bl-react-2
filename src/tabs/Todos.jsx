import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos : []
  }

  handleChange = search => {
    const { addTodo } = this;
    addTodo(search);
    };
  
  addTodo = text => {
    const todo = { id: nanoid(), text }
    this.setState(prev =>({
      todos : [...prev.todos, todo]
    }))
  }

  render() {
    return <SearchForm onChange={this.handleChange} />;
  }
}
