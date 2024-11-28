const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
        role: role,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (user) {
      if (user.password === password) {
        return res.status(200).json({ message: "Login Success" });
      }
      return res.status(400).json({ error: "Invalid Password" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
