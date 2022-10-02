import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    items: [],
    search: '',
    page: 1,
    isShow: false,
    isEmpty: false,
    isLoding: false,
    error: false,

  };

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if ((search && prevState.search !== search) || prevState.page !== page) {
      this.setState({
        isLoding: true,
      })

      try {
      const data = await ImageService.getImages(search, page);
      console.log(data);
      if (data.photos.length === 0) {
        this.setState({ isEmpty: true }) 
      }
      this.setState(prev => ({
        items: [...prev.items, ...data.photos],
        isShow: page < Math.ceil(data.total_results/15),
        
      }));
      }

      catch (error) {
        this.setState({ error })
      } finally {
        this.setState({ isLoding: false });
      }
  }
  }

  handleChange = search => {
    this.setState({
      search,
      page: 1,
      items: [],
      isEmpty: false,
      isShow: false,
    });
  };

  handleClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { items, isShow, isEmpty, isLoding } = this.state;
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
        {isShow && <Button onClick={this.handleClick}>{isLoding ? 'Loading...' : "Load more"}</Button>}
        {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
      </>
    );
  }
}
