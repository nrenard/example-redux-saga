import { SET_DRAWS, SET_CURRENT_DRAW } from './actions';

export default function draw(state = {
	current: {},
	list: [],
}, action) {
  switch (action.type) {
		case SET_DRAWS:
			return {
				...state,
				list: action.payload,
			};
		case SET_CURRENT_DRAW:
			return {
				...state,
				current: action.payload,
			};
		default:
			return state;
  }
}