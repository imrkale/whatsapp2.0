import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase'

export const getReceipt=(users)=>{
    const [user]=useAuthState(auth);

   return users?.filter(username=>username !== user?.email)[0]
}

