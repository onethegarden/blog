import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리
//회원정보확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); //로컬스토리지에서 user제거
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout); //logoutAPI호출
    localStorage.removeItem('user'); //localstorgae에서 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({ //리듀서의 스토어의 값을 null로 설정
      ...state,
      user: null,
    }),
  },
  initialState,
);
