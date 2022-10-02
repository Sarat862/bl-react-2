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

  handleClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { items } = this.state;
    return (
      <>
        <SearchForm onChange={this.handleChange} />
        <Grid>
          {items.length > 0 &&
            items.map(({ alt, id, avg_color, src: { large } }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>
        <Button onClick={this.handleClick}>Load more</Button>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
