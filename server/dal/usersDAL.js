import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

function getUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error reading users file:', error);
        return [];
    }
}

function saveUsers(users) {
    try {
        
        const dir = path.dirname(usersFilePath);
       
        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir, { recursive: true });
        // }
        
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        
        const savedData = fs.readFileSync(usersFilePath, 'utf8');
        
        return true;
    } catch (error) {
        console.log('Error saving users:', error);
        return false;
    }
}

export async function createUserDal(user) {
    try {
        const users = getUsers();
        users.push(user);
        const saved = saveUsers(users);
        
        if (saved) {
            return user;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

export async function getUserByNameDal(userName) {
    try {
        const users = getUsers();
        const foundUser = users.find(user => user.name === userName);
        
        if (!foundUser) {
            return false;
        }

        return foundUser;
    } catch (e) {
        console.log('Error in getUserByNameDal:', e);
        return false;
    }
}

export async function getAllUsersDal() {
    try {
        return getUsers();
    } catch (e) {
        console.log('Error in getAllUsersDal:', e);
        return [];
    }
}
