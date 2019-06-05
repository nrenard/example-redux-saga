import { DrawService } from '../../services';
import { captureException } from '../../containers/ErrorBoundary';

export const SET_DRAWS = 'SET_DRAWS';
export function setDraws(payload) {
  return {
    type: SET_DRAWS,
    payload,
  };
}

export const SET_CURRENT_DRAW = 'SET_CURRENT_DRAW';
export function setCurrentDraw(payload) {
  return {
    type: SET_CURRENT_DRAW,
    payload,
  };
}

export function getDraws() {
	return async dispatch => {
		try {
			const { data } = await DrawService.list();
			dispatch(setDraws(data));
		} catch (err) {
      console.log(err);
      captureException(err, { extra: { origin: 'getDraws' } });
		}
	};
}

export function getCurrentDraw() {
	return async dispatch => {
		try {
			const { data } = await DrawService.get('current');
			dispatch(setCurrentDraw(data));
		} catch (err) {
      console.log(err);
      captureException(err, { extra: { origin: 'getCurrentDraw' } });
		}
	};
}