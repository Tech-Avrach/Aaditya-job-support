import ThemeOptions from "./ThemeOptions";
import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import backdrops from "./backdrops";
import user from "./users";
import seller from "./sellers";
import game from "./game";
import role from "./roles";
import dispute from "./dispute";
import rules from "./rules";
import faqs from "./faq";
import banners from "./banner";
import insurance from "./insurance";
import cms from "./cms";
import boosterPlan from "./boosterPlan";
const reducers = combineReducers({
  auth,
  message,
  backdrops,
  ThemeOptions,
  user,
  seller,
  game,
  role,
  dispute,
  rules,
  faqs,
  banners,
  insurance,
  cms,
  boosterPlan,
});

export default reducers;
