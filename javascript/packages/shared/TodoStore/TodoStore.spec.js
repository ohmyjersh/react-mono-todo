import React from 'react';
import TodoStore from './index';
import renderer from 'react-test-renderer';

test('should render the TodoStore', () => {
    const tree = renderer
    .create(<TodoStore />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});