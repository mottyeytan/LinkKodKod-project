import users  from '../data/users.json' with { type: 'json' }

export async function createUserDal(user){
    try{
        users.push(user)
        return user
    
    }catch(e){
        console.log(e)
        return e
    }
}

export async function getUserByNameDal(user){

    try{

        const foundUser = users.find(user => user.username === user)
        if(!foundUser || foundUser.length === 0){
            return false;
        }

        return foundUser[0];
    }catch(e){
        console.log(e)
        return e
    }
}


export async function getAllUsersDal(){

    try{
        return users

    }catch(e){
        console.log(e)
        return e
}}