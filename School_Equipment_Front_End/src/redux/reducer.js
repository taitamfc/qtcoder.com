import {SET_CART,SET_SEARCH,SET_MENU} from './action'

let cart = localStorage.getItem('cart')
cart = cart ? JSON.parse(cart) : []
const initialState  = {
    cart: cart,
    search:'',
    showMenu: true
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MENU:
            return { ...state, showMenu: action.payload };
            break;
        case SET_CART:
            return { ...state, cart: action.payload };
            break;
        case SET_SEARCH:
            return { ...state, search: action.payload };
            break;
        default:
            return state;
    }
};

export default rootReducer;