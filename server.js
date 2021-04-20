const express = require("express");
const mongoose = require("mongoose");
const Answer = require("./model/answer.js");
const Question = require("./model/question.js");
const Project = require("./model/project.js");
var cors = require("cors");
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db =
  "mongodb+srv://Vismay:nlsES0uop6G2zJ4H@cluster0.w3tty.mongodb.net/SE?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.listen(4000);

app.post("/AddQuestion", (req, res) => {
  const que = new Question();
  que.id = req.body.id;
  que.Title = req.body.Title;
  que.Que = req.body.Que;
  que.Author = req.body.Author;
  que.status = req.body.status;
  que.Topic = req.body.Topic;
  que.Cnt = req.body.Cnt;
  que
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/AddAnswer", (req, res) => {
  //done
  const ans = new Answer();
  ans.id = req.body.id;
  ans.Author = req.body.Author;
  ans.Comment = req.body.Comment;
  ans.status = req.body.status;
  ans
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/AddProject", async (req, res) => {
  // done
  console.log(req.body);
  const pro = new Project();
  //   pro.id = req.body.id;
  pro.Author = req.body.Author;
  pro.Title = req.body.Title;
  pro.Description = req.body.Description;

  await pro
    .save()
    .then((result) => {
      console.log("result", result, "body", req.body);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/GetQuestion", (req, res) => {
  //done
  Question.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/GetAnswer", (req, res) => {
  //done
  Answer.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/GetProject", (req, res) => {
  // done

  Project.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
