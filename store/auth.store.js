import { create } from "zustand";
import { getCurrentUser } from "../lib/appwrite";

const useAuthStore = create((set)=>({
    isAuthenticated:false,
    user:null,
    isLoading:true,

    setIsAuthenticated:(value)=>set({isAuthenticated:value}),
    setUser:(user)=>set({user}),
    setLoading:(value)=>set({isLoading:value}),

    fetchAuthenticatedUser:async () =>{
        set({isLoading:true});

        try {
            const user = await getCurrentUser();

            if(user){
                set({isAuthenticated:true,user})
            }else{
                set({isAuthenticated:false,user:null})
            }
        } catch (error) {
            console.log('fetchAuthenticatedUser error',error)
            set({isAuthenticated:false,user:null})
        }finally{
            set({isLoading:false})
        }
    }
}))

useAuthStore.getState().fetchAuthenticatedUser();
export default useAuthStore