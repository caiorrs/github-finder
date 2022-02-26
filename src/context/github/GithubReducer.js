const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default githubReducer;
