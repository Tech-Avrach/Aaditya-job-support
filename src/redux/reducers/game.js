import {
  RETRIEVE_GAME,
  RETRIEVE_GAME_DETAILS,
  CREATE_GAME,
  UPDATE_GAME,
  DELETE_GAME,
  RESTORE_GAME,
} from "../actions/types";

const initialState = { games: [], totalGameCount: 0 };

const gamesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_GAME:
      return {
        games: payload.rows,
        totalGameCount: payload.count,
      };

    case CREATE_GAME:
      return payload;

    case UPDATE_GAME:
      return payload;

    // case UPDATE_SELLER_STATUS:
    //   const updated = state.sellers?.map((item) =>
    //     item.id === payload.id ? { ...item, ...payload } : item
    //   );
    //   return {
    //     sellers: updated,
    //     totalSellerCount: state.totalSellerCount,
    //   };

    case DELETE_GAME:
      const updatedGames = state.games?.map((item) =>
        item.publicId === payload.publicId ? { ...item, ...payload } : item
      );
      return {
        ...state,
        games: updatedGames,
        totalGameCount: state.totalGameCount,
      };

    case RESTORE_GAME:
      const restored = state.games?.map((item) =>
        item.publicId === payload.publicId ? { ...item, ...payload } : item
      );
      return {
        games: restored,
        totalGameCount: state.totalGameCount,
      };

    default:
      return state;
  }
};

export default gamesReducer;
