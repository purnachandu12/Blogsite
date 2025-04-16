const express=require('express');
const app=express();
const mongoose =require('mongoose');
const Blog=require('./models/blogs');
app.set('view engine','ejs');
app.listen(9001);
app.use(express.urlencoded({ extended: true }));
const url='mongodb+srv://chandu:abcd1234@cluster0.4xbp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url).then((result)=>{
    console.log("connected sucessfully");
}).catch((err)=>{
    console.log(err);
})
app.use(express.static('public'));

app.get('/add-blog',(req,res)=>{
    res.render('add');
})
app.post('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:req.body.title,
        snippet:req.body.snippet,
        body:req.body.body
    });
    blog.save().then((result)=>{
        res.render('add');
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/show/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('single', { blog: result });
        })
        .catch(err => console.log(err));
});
app.get('/show',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('show',{blogs:result});
    }).catch((err)=>{
        console.log(err);
    })
})
app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/about-us',(req,res)=>{
    res.render('about');
})
app.use((req,res)=>{
    res.status(404).render('404');
});