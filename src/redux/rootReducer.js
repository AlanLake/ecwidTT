const initialState = {
  pictures: [],
};

export const addPic = {
  type: "ADDPIC",
};


export default function rootReducer(state = initialState, action){
    if (action.type === "ADDPIC") {
      
     return {pictures: [...state.pictures, action.value]}
    }
    if(action.type === "REMOVEPIC"){
      state.pictures.splice(action.value, 1)
      return {pictures: [...state.pictures]}
    }
    console.log(state)
    return state
}