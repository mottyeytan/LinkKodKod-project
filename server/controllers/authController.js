import { hashPassword, comparePassword } from '../utils/password.js';
import { getUserByNameDal} from '../dal/usersDAL.js';
import { createUser } from '../service/authService.js';
import { generateToken } from '../utils/jwt.js';



export const signupController = async (req, res) => {
    try{
        const { name, password} = req.body;
        
        const existingPlayer = await getUserByNameDal(name);

        if (existingPlayer) {
            return res.status(403).json({ message: 'user already exists, please login', loggedIn: false });
        }

        const hashedPassword = await hashPassword(password);

        let imagePath = null;

        if (req.files && req.files.length > 0) {
            const imageFile = req.files[0];
            imagePath = `/uploads/${imageFile.filename}`;
            }

        const newUser = {
            name: name,
            password: hashedPassword,
            profilePic : imagePath
        }
        
        const user = await createUser(newUser);
        
        if(user){
            const token = generateToken(name);
            res.status(201).json({token, user});
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
        const existingPlayer = await getUserByNameDal(name);
        if (!existingPlayer) {
            return res.status(403).json({ message: 'player not found', loggedIn: false });
        }
        const isPasswordValid = await comparePassword(password, existingPlayer.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: 'invalid password' });
        }
        const token = generateToken(name);
        res.status(200).json({token, user: existingPlayer});

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
    }
}


