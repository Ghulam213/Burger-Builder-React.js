import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()})

describe('<BurgerBuilder />', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onFetchIngredients={()=>{}} onFetchIngredientsPrice={()=>{}} />)
    })

    it('should verify that <BuildControls /> are rendered if both ingredients are set and price is set', () => {
        wrapper.setProps({
            ings: {salad: 0}, 
            INGREDIENTS_PRICE: {salad: 0.5}
        })
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

    it('should verify that <BuildControls /> are not rendered if only ingredients are set', () => {
        wrapper.setProps({
            ings: {salad: 0}, 
        })
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    })

    it('should verify that <BuildControls /> are not rendered if only price is set', () => {
        wrapper.setProps({ 
            INGREDIENTS_PRICE: {salad: 0.5}
        })
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    })
    
})