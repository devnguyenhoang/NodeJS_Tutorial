const express = require("express");
const mongo = require("mongoose");
const Blog = require("./models/blog");

//express app
const app = express();
//dia chi mongo
const dbURL =
  "mongodb+srv://express:express@node.jcnwq.mongodb.net/<Node>?retryWrites=true&w=majority";
//ket noi mongo
mongo
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));//cai nay de lam gi thi chua biet




//trang chu
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//them blog
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    name: "thai",
    skill: "deptrai",
    body: "tai nang",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

//hien thi tat ca
app.get("/add-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

//hien thi theo Id
app.get("/single-blog", (req, res) => {
  Blog.findById("5f0fff55c637a2203ca15d52")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//hien thi co sap xep
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//gui thong tin len mongo
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});
//tao create
app.get("/blogs/create", (req, res) => {
  res.render("create");
});
//phai de create truoc blogs vi co :id khong the load
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

//xoa
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use((req, res) => {
  res.status(404).render("404");
});
