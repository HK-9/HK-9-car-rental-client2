const initialData = {
    dashboard:[]
}

export const dashboardReducer = (state = initialData,action)=>{
    switch(action.type){
        case 'GET_DASHBOARD' : {
            return {
                ...state,
                dashboard : action.payload
            }
        }
        default:return state
    }
} 