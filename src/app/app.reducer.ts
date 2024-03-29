

import {ActionReducerMap} from '@ngrx/store';
import * as auth from './auth/auth.reducer';
import { State } from './interfaces/ui.interface';
import * as ui from './shared/ui.reducer';

export interface AppState{

    ui: ui.State,
    user:auth.State
}

export const appReducer:ActionReducerMap<any> = {

    ui:ui.uiReducer,
    user: auth.authReducer,

}