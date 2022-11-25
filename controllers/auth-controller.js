import { generateJWT } from '../helpers/jwt.js';
import User from '../models/user-model.js';

export const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)  return res.status(400).json({ error: "El usuario ya existe." });
    user = new User(req.body);
    await user.save();
    const token = await generateJWT(user.id, user.name);
    return res.status(201).json({ ok: true,
      uid: usuario.id,
      name: usuario.name,
      token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Upsss, algo salió mal en el servidor.' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: 'El usuario no existe' });
    const requestPassword = await user.comparePassword(password);
    if (!requestPassword) return res.status(403).json({ error: 'Las credenciales no son correctas.' });
    const token = await generateJWT(user.id, user.name);
    return res.json({  uid: user.id, name: user.name ,token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Upsss, algo salió mal en el servidor.' })
  }
}

export const renewToken = async (req, res) => {
  const {uid, name }= req
  const token = await generateJWT(uid, name);
  res.json({  ok: true, uid, name})
}