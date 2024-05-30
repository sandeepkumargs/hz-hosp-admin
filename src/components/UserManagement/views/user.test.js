import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserManagement from './userManagement';
import AddUser from './addUser';
import ChangePassword from './changePassword';
import EditProfileInfo from './editProfileInfo';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { userInitialState } from '../initialState';
Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

const store = mockStore(userInitialState);

describe('User management component', () => {
   test('User management render', () => {
      const wrapper = shallow(<UserManagement store={store} />);
      expect(wrapper.exists()).toBe(true);
      // const component = wrapper.dive();
      // expect(toJson(component)).toMatchSnapshot();
   });
   test('Add user', () => {
      const wrapper = shallow(<AddUser store={store} />);
      expect(wrapper.exists()).toBe(true);
   });
   test('Change  password', () => {
      const wrapper = shallow(<ChangePassword store={store} />);
      expect(wrapper.exists()).toBe(true);
   });
   test('Change  password', () => {
      const wrapper = shallow(<ChangePassword store={store} />);
      expect(wrapper.exists()).toBe(true);
   });
   test('Edit Profile info', () => {
      const wrapper = shallow(<EditProfileInfo store={store} />);
      expect(wrapper.exists()).toBe(true);
   });
});
