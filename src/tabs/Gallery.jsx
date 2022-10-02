import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    items: [],
    search: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if ((search && prevState.search !== search) || prevState.page !== page) {
      const data = await ImageService.getImages(search, page);
      console.log(data);

      this.setState(prev => ({
        items: [...prev.items, ...data.photos],
      }));
    }
  }

  handleChange = search => {
    this.setState({
      search,
    });
  };

  render() {
    return (
      <>
        <SearchForm onChange={this.handleChange} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
