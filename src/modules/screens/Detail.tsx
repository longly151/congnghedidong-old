import React, { PureComponent } from 'react';
import {
  Container, Header, Body, QuickView, Text,
} from '@components';

class DetailScreen extends PureComponent<any> {
  render() {
    const { route: { params: { item } } } = this.props;

    return (
      <Container>
        <Header title="Chi tiết" backIcon />
        <Body center fullView>
          <QuickView>
            <Text type="header" center>{item.problem}</Text>
            <Text type="title">{item.answer}</Text>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default DetailScreen;
