

import { createReducer, on } from "@ngrx/store";
// import { State } from "../interfaces/ui.interface";
import { isLoading, stopLoading } from "./ui.actions";


export interface State{

    isLoading:boolean;
}

const initializable:State = {

    isLoading: false
}

export const _uiReducer = createReducer(

    initializable,
    on(isLoading,   (state) => ({...state, isLoading: true}) ),
    on(stopLoading, (state) => ({...state, isLoading:false}))
)



export function uiReducer(state:any, action:any){

    return _uiReducer(state, action)
}