import { put, takeLatest, call, all, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import {
   getAllThirdPartyServicesApi,
   addThirdPartyServicesApi,
   updateThirdPartyServicesApi,
   deleteThirdPartyServicesApi,
} from '../api';
import { loginUrl } from '../../../config';

function* getAllThirdPartyServices(data) {
   const result = yield call(getAllThirdPartyServicesApi, data);
   if (result.data) yield put(actions.thirdPartyServicesReceived(result));
   else yield put(actions.tpsError(result));
}

function* addThirdPartyServices(data) {
   const result = yield call(addThirdPartyServicesApi, data);
   yield put(actions.tpsError(result));
}
function* updateThirdPartyServices(data) {
   const result = yield call(updateThirdPartyServicesApi, data);
   yield put(actions.tpsError(result));
}

function* deleteThirdPartyServices(data) {
   const result = yield call(deleteThirdPartyServicesApi, data);
   if (result.status) yield put(actions.getThirdPartyServices());
   else yield put(actions.tpsError(result));
}
export default function* thirdPartyServicesWatcher() {
   yield takeLatest('GET_THIRD_PARTY_SERVICES', getAllThirdPartyServices);
   yield takeLatest('ADD_THIRD_PARTY_SERVICES', addThirdPartyServices);
   yield takeLatest('UPDATE_THIRD_PARTY_SERVICES', updateThirdPartyServices);
   yield takeLatest('DELETE_THIRD_PARTY_SERVICES', deleteThirdPartyServices);
   // yield takeEvery("UPDATE_DEVICES", updateThirdPartyServices);
   // yield takeEvery("DELETE_DEVICES", deletetThirdPartyServices);
}
