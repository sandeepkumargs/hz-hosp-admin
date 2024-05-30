import { put, takeLatest, all, takeEvery } from "redux-saga/effects";
import * as actions from "../actions";

let themes = [
   { logo: "", hotelName: "Kingsbury", themeName: "Darker" },
   { logo: "", hotelName: "Kingsbury", themeName: "BlueBobber" },
   { logo: "", hotelName: "Blah", themeName: "RedTape" },
   { logo: "", hotelName: "Blah", themeName: "yellowCorn" },
   { logo: "", hotelName: "Blah", themeName: "OrangeCandy " },
];
function* setThemes(data) {
   // console.log(data);

   // json.push(data.themes)
   yield put(actions.updateThemesList(data.themes));
}

function* getAllThemes() {
   try {
      yield put(actions.themesReceived(themes));
   } catch (error) {
      // yield put(actions.getAllThemesFailure(error));
   }
}

export default function* themesWatcher() {
   yield takeLatest("GET_THEMES", getAllThemes);
   yield takeLatest("SET_THEMES", setThemes);

   // yield takeEvery("UPDATE_DEVICES", updateThemes);
   // yield takeEvery("DELETE_DEVICES", deletetThemes);
}
