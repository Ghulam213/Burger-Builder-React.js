import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />)
    })

    it('should verify that 2 NavItems are rendered if not Authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    })

    it('should verify that 3 NavItems are rendered if Authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavItem)).toHaveLength(3);
    })

    it('should verify that logout NavItems is rendered if Authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavItem link = "/logout" >Log out</NavItem>)).toEqual(true);
    })

})