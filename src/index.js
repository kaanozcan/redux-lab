import { createStore } from "redux"

const defaultOptions = {
  compareAll: false
};
let options, ownStore;

const compare = (prev, curr) => {
  //Todo: find differences
  return curr;
}

const middleware = store => next => action => {
  next(action);

  if(options.compareAll || options.actions[action.type]){
    const prevState = store.getState();

    ownStore.dispatch(action);

    const currState = ownStore.getState();

    const difference = compare(prevState, currState);

    options.onComparison({action, difference});
  }
}

export default function ({rootReducer, config} = {}){
  if(!rootReducer){
    throw("No reducer specified.");
  }

  options = Object.assign({}, defaultOptions, config);
  ownStore = createStore(rootReducer);

  return middleware;
}
