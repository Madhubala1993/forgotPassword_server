import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function createUser(username, mailid, hashedPassword) {
  return await client.db("password").collection("users").insertOne({
    username: username,
    mailid: mailid,
    password: hashedPassword,
  });
}

export async function getUserByName(username) {
  return await client
    .db("password")
    .collection("users")
    .findOne({ username: username });
}
