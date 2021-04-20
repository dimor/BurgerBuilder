import * as actionTypes from './actionTypes';


export const authStart = () =>{
    return{
    type: actionTypes.AUTH_START
    };
};


export const authSuccess = (token,userId) =>{
    return{
    type: actionTypes.AUTH_SUCCESS,
    idToken:token,
    userId:userId
    };
};


export const authFail = (error)=>{
        return{
            type: actionTypes.AUTH_FAIL,
            error:error
        };
};



export const logout =()=>{
    return{
        type: actionTypes.SAGA_AUTH_LOGOUT
    }
}


export const logoutSucceed =()=>{
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};
 



export const checkAuthTimeout = (expirationTime)=>{
    return{
     type:actionTypes.SAGA_CHECK_AUTH_TIMEOUT,
     expirationTime:expirationTime
    }
}

export const auth = (email,password,isSignup)=>{
    return {
        type: actionTypes.SAGA_AUTH,
        email:email,
        password:password,
        isSignup:isSignup
    }
}


export const setAuthRedirectPath = (path)=>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}


export const authCheckState=()=>{
    return{
        type:actionTypes.SAGA_AUTH_CHECK_STATE
    }
};