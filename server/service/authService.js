import { createUserDal,getAllUsersDal} from '../dal/usersDAL.js'




export async function createUser(newUser) {
    
    
    const users = await getAllUsersDal()
    const usersLen = users.length || 0

    console.log(users)
    
    const user = {
        id: usersLen + 1 ,
        ...newUser
    }
    try{
        const userData = await createUserDal(user);
        if(userData){
            return user;
        }else{
            return false;
        }

    }catch(err){
        console.log(err);
        return err;
    }
}