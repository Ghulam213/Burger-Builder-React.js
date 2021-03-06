import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('test auth reducer', () => {
    let initialState = {
        token: null,
        userId: null,
        loading: false,
        error: null
    }

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should set valid token', () => {
        const action = {
            type: actionTypes.SET_AUTH_DATA,
            idToken: 'some-token',
            userId: 'some-user-id'
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            token: 'some-token',
            userId: 'some-user-id'
        })
    })

})