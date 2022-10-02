import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {

  state = {
    search: ""
  }

  handleChange = (search) => {
    this.setState({
      search 
    })
  }

  render() {
    return (
      <>
        <SearchForm onChange={this.handleChange} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
