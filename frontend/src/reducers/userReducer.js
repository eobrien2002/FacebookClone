// Desc: user reducer to handle user actions
export function userReducer(state = null, action) {
  //action is an object with a type and a payload. the payload is the data that we want to send to the reducer
  //the reducer will then update the state based on the payload
  //the reducer will then return the updated state
  //the reducer will then send the updated state to the store
  //the store will then update the state
  //the store will then send the updated state to the components
  //the components will then re-render based on the updated state
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    default:
      return state;
  }
}
