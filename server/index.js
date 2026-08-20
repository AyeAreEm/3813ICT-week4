import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

class User {
  constructor(username = "", birthday = "", age = 0, email = "", password = "", valid = false) {
    this.username = username;
    this.birthday = birthday;
    this.age = age;
    this.email = email;
    this.password = password;
    this.valid = valid;
  }
}

const users = [
  new User("a", "1997-01-01", 18, "a@a.com", "asdf"),
  new User("b", "1997-01-01", 18, "b@b.com", "1234"),
  new User("c", "1997-01-01", 18, "c@c.com", "qwerty"),
];

const checkCredentials = (email, password) =>{
  for (const user of users) {
    if (email === user.email && password === user.password) {
      user.valid = true;
      return user
    }
  }

  return new User();
};

app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;
  const user = checkCredentials(email, password);
  const { password: pw, ...safeUser } = user;
  res.json(safeUser);
});

app.listen(port, () => {
  console.log("running on " + port);
})
