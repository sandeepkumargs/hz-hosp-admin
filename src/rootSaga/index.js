import { all } from 'redux-saga/effects';
import loginWatcher from '../components/UserManagement/sagas';
import { hotelsWatcher, themesWatcher, postCodesWatcher } from '../components/Hotel/sagas';
import thirdPartyServicesWatcher from '../components/ThirdPartyServices/sagas';
export default function* rootSaga() {
   yield all([
      loginWatcher(),
      hotelsWatcher(),
      thirdPartyServicesWatcher(),
      themesWatcher(),
      postCodesWatcher(),
   ]);
}
