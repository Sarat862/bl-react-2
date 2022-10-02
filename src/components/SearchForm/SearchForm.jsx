import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {

  state = {
    search: "",
  }

  handleChange = (e) => {
    this.setState(
      {search: e.target.value.trim().toLowerCase()}
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onChange(
      this.state.search
    )
    this.setState(
      {
    search: "",
  }
    )
  }

  render() {
    return <SearchFormStyled onSubmit={this.handleSubmit}>
      <InputSearch onChange={this.handleChange} value={this.state.search} />
      <FormBtn><FiSearch /></FormBtn> 
    </SearchFormStyled>;
  }
}
