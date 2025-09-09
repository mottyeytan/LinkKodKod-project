import { createUserDal,getAllUsersDal} from '../dal/usersDAL.js'




export async function createUser(name, hashedPassword) {
    
    
    const usersLen = getAllUsersDal().length || 0
    
    const player = {
        id: usersLen + 1 ,
        name: name,
        password: hashedPassword,
    }
    try{
        const playerData = await createUserDal(player);
        if(playerData){
            return player;
        }else{
            return false;
        }

    }catch(err){
        console.log(err);
        return err;
    }
}