import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ThirdPartyServices from './ThirdPartyServices';
import AddThirdParty from './AddThirdParty';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { thirdPartyServicesInitialState } from '../initialState';
Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

const store = mockStore(thirdPartyServicesInitialState);

describe('Third Party Services component', () => {
   test('TPS render', () => {
      const wrapper = shallow(<ThirdPartyServices store={store} />);
      expect(wrapper.exists()).toBe(true);
      // const component = wrapper.dive();
      // expect(toJson(component)).toMatchSnapshot();
   });

   test('Hote list render', () => {
      const wrapper = shallow(<AddThirdParty store={store} />);
      expect(wrapper.exists()).toBe(true);
   });
});
