import db from "../db.js";
export async function  users(req, res){

     
    try {
      const session = await db.collection("sessions").findOne({ token });
      if (!session) {
        return res.sendStatus(401);
      }
  
      const usuario = await db.collection("users").findOne({ _id: session.idUsuario });
      if (!usuario) {
        return res.sendStatus(401);
      }
  
      res.send(usuario)
    } catch (erro) {
      console.log(erro);
      res.sendStatus(500);
    }
}
  