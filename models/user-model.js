import {Schema, model} from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true    
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

//~ hashear password
userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next()
    } catch (error) {
        console.log(error);
        throw new Error('Falló el hash de contraseña');
    }
});

//~ comparar las contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password)
}

const User = model('User', userSchema);
export default User;