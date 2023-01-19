const initialData = {
    notifications:[]
}

export const notificationsReducer = (state = initialData,action)=>{
    switch(action.type){
        case 'GET_ALL_NOTIFICATIONS' : {
            return {
                ...state,
                notifications : action.payload
            }
        }
        default:return state
    }
} 