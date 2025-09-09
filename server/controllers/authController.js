import { hashPassword, comparePassword } from '../utils/password.js';
import { getUserByNameDal} from '../dal/usersDAL.js';
import { createUser } from '../service/authService.js';
import { generateToken } from '../utils/jwt.js';



export const signupController = async (req, res) => {
    try{
        
        const { name, password} = req.body;
        
        let playerExists = false;
        
        const existingPlayer = await getUserByNameDal(name);

        if (existingPlayer) {
            return res.status(403).json({ message: 'player already exists, please login', loggedIn: false });
        }

        const hashedPassword = await hashPassword(password);
        
        const player = await createUser(name, hashedPassword);
        
        if(player){
            const token = generateToken(name);
            res.status(201).json({token, player});
        }else{
            res.status(403).json({ message: 'user not created' });
        }

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
    }
}

export const loginController = async (req, res) => {
    try{
        
        const { name, password } = req.body;
        const existingPlayer = await getPlayerByNameDal(name);
        if (!existingPlayer) {
            return res.status(403).json({ message: 'player not found', loggedIn: false });
        }
        const isPasswordValid = await comparePassword(password, existingPlayer.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: 'invalid password' });
        }
        const token = generateToken(name, existingPlayer.role);
        res.status(200).json({token, role: existingPlayer.role});

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
    }
}


