import React from 'react';
import { mount } from 'enzyme';
import { ResultsList } from '../components';

describe('UsersSearch ResultsList tests', () => {
  const results = [
    {
      metadata: {
        email: 'admin@test.ch',
        name: 'admin',
        ccid: '10101010',
        id: 3,
        links: {
          self: 'https://localhost:5000/api/users/3',
        },
      },
    },
  ];

  let component;
  afterEach(() => {
    component.unmount();
  });

  it('should not render when empty results', () => {
    component = mount(
      <ResultsList results={[]} viewDetailsClickHandler={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render a list of results', () => {
    component = mount(
      <ResultsList results={results} viewDetailsClickHandler={() => {}} />
    );
    expect(component).toMatchSnapshot();
    const firstResult = results[0].metadata;
    const resultRows = component
      .find('TableRow')
      .filterWhere(element => element.prop('data-test') === firstResult.id);
    expect(resultRows).toHaveLength(1);

    let mappedStatusElements = resultRows
      .find('TableCell')
      .filterWhere(
        element => element.prop('data-test') === 'Email-' + firstResult.id
      );
    expect(mappedStatusElements).toHaveLength(1);

    expect(mappedStatusElements.text()).toEqual(firstResult.email);

    mappedStatusElements = resultRows
      .find('TableCell')
      .filterWhere(
        element => element.prop('data-test') === 'Name-' + firstResult.id
      );
    expect(mappedStatusElements).toHaveLength(1);

    expect(mappedStatusElements.text()).toEqual(firstResult.name);

    mappedStatusElements = resultRows
      .find('TableCell')
      .filterWhere(
        element => element.prop('data-test') === 'CCID-' + firstResult.id
      );
    expect(mappedStatusElements).toHaveLength(1);

    expect(mappedStatusElements.text()).toEqual(firstResult.ccid);
  });

  it('should call click handler on view details click', () => {
    const mockedClickHandler = jest.fn();
    component = mount(
      <ResultsList
        results={results}
        viewDetailsClickHandler={mockedClickHandler}
      />
    );
    const firstId = results[0].metadata.id;
    const button = component
      .find('TableRow')
      .filterWhere(element => element.prop('data-test') === firstId)
      .find('button');
    button.simulate('click');
    expect(mockedClickHandler).toHaveBeenCalledWith(firstId);
  });
});
