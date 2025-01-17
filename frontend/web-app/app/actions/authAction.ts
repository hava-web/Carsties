'use server'
import { auth } from '../../auth'

const getCurrentUser = async () => {
    try {
        const session = await auth();
        if (!session) return null;

        return session.user
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export default getCurrentUser;