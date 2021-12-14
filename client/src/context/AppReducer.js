export default (state, action) => {
  switch (action.type) {
    case "LogSuccess":
      return { user: action.payload, onProcess: false, err: false };
    case "LogInProcess":
      return { user: null, onProcess: true, err: false };
    case "LogFailuire":
      return { user: null, onProcess: false, err: true };
    default:
      return state;
  }
};
