const passport = require("passport");
const LocalStrategy = require("passport-local");
const sql = require("../../../db");

async function getUserByUsername(username) {
  const user = await sql`SELECT id_user, name, username, password FROM users
        WHERE username = ${username}
    ;`
  return user[0];
}

passport.use(
  new LocalStrategy(async function (username, password, done) {
    //Consultar en DB el user
    const user = await getUserByUsername(username);
    console.log(user);

    //Comparar la contraseña
    if (user && user.password == password) {
      //Decidir si queda logueado o no
      //SI se puede autenticar
      return done(null, user);
    }
    //NO se puede autenticar
    return done(null, false);
  })
);
