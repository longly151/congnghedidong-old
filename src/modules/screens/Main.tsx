/* eslint-disable no-mixed-operators */
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import {
  Container, Header, Input, Body, Button, Text, QuickView,
} from '@components';
import { Divider } from 'react-native-elements';
import { focusNextField } from '@utils/appHelper';
import Toast from 'react-native-simple-toast';
import NavigationService from '@utils/navigation';
import rootStack from '@modules/routes';

export class Main extends PureComponent<any, any> {
  private a: any;

  private b: any;

  private c: any;

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  renderItem = ({ item }:{item: any}) => {
    const { data } = this.state;
    return (
      <QuickView
        onPress={() => NavigationService.navigate(rootStack.detailScreen, { item })}
        onLongPress={() => this.setState({
          data: data.filter((e: any) => e !== item),
        })}
        marginTop={10}
      >
        <Text>{item.problem}</Text>
        <Text>{item.answer}</Text>
        <Divider style={{ backgroundColor: '#F2F2F2', height: 2 }} />
      </QuickView>
    );
  };

  convertCoefficientToString = (x: number, type: 'FIRST' | 'MIDDLE' | 'LAST') => {
    switch (type) {
      case 'FIRST':
        if (x === 1) return 'x^2';
        if (x === -1) return '-x^2';
        return `${x}x^2`;
      case 'MIDDLE':
        if (x === 1) return 'x';
        if (x === -1) return '-x';
        if (x > 0) return `+${x}x`;
        if (x === 0) return '';
        if (x < 0) return `${x}x`;
        break;
      default:
        if (x > 0) return `+${x}`;
        if (x === 0) return '';
        if (x < 0) return x;
    }
  };

  showProblem = () => {
    if (!this.a.getText()) {
      return Toast.show('Vui lòng nhập a');
    }
    if (Number.parseInt(this.a.getText(), 10) === 0) {
      return Toast.show('a phải khác 0');
    }
    if (!this.b.getText()) {
      return Toast.show('Vui lòng nhập b');
    }
    if (!this.c.getText()) {
      return Toast.show('Vui lòng nhập c');
    }
    const a = Number.parseInt(this.a.getText(), 10);
    const b = Number.parseInt(this.b.getText(), 10);
    const c = Number.parseInt(this.c.getText(), 10);
    const { data } = this.state;

    const delta = b ** 2 - 4 * a * c;
    let answer = '';
    if (delta < 0) answer = 'Phương trình vô nghiệm';
    else if (delta === 0) answer = `x1 = x2 = ${-b / 2 * a}`;
    else answer = `x1 = ${(-b + Math.sqrt(delta)) / (2 * a)}, x2 = ${(-b - Math.sqrt(delta)) / (2 * a)}`;

    return this.setState({
      data: [
        ...data,
        ({
          problem: `${this.convertCoefficientToString(a, 'FIRST')}${
            this.convertCoefficientToString(b, 'MIDDLE')}${
            this.convertCoefficientToString(c, 'LAST')}`,
          answer,
        })],
    });
  };

  render() {
    const { data } = this.state;
    return (
      <Container>
        <Header title="Giải PT bậc 2" />
        <Body>
          <Input
            ref={(ref: any) => {
              this.a = ref;
            }}
            placeholder="a="
            marginBottom={5}
            marginTop={10}
            keyboardType="numbers-and-punctuation"
            onSubmitEditing={() => focusNextField(this, 'b')}
          />
          <Input
            ref={(ref: any) => {
              this.b = ref;
            }}
            placeholder="b="
            marginVertical={5}
            keyboardType="numbers-and-punctuation"
            onSubmitEditing={() => focusNextField(this, 'c')}
          />
          <Input
            ref={(ref: any) => {
              this.c = ref;
            }}
            placeholder="c="
            keyboardType="numbers-and-punctuation"
            marginVertical={5}
          />
          <Button
            marginTop={10}
            titlePaddingHorizontal={20}
            center
            title="Solve"
            onPress={this.showProblem}
          />
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        </Body>
      </Container>
    );
  }
}

export default Main;
