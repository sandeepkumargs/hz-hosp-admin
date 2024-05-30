import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import HotelDetails from './hotelDetails';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { hotelInitialState } from '../initialState';
import HotelList from './hotelCardList';
Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

const store = mockStore(hotelInitialState);

describe('Hotel component', () => {
   test('Hotel details render', () => {
      const wrapper = shallow(<HotelDetails store={store} />);
      expect(wrapper.exists()).toBe(true);
      // const component = wrapper.dive();
      // expect(toJson(component)).toMatchSnapshot();
   });

   test('Hote list render', () => {
      const wrapper = shallow(<HotelList store={store} />);
      expect(wrapper.exists()).toBe(true);
   });
});
