const express = require("express"); 
const app = express(); 

app.set("view engine", "ejs"); 

app.get ("/", (req, res) => { 
    res.render("landing");
});

app.get ("/campgrounds", (req, res) => { 
let campgrounds_values = [ {name:"Salmon Creek", image:"https://www.photosforclass.com/download/pixabay-841417?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F5ee4d4474b55b108f5d084609620367d1c3ed9e04e50744e74297bd6954fc3_960.jpg&user=Free-Photos"}, 
                    { name:"Walnut Hill", image:"https://www.photosforclass.com/download/pixabay-963306?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F5fe6d6404a54b108f5d084609620367d1c3ed9e04e50744e74297bd6954fc3_960.jpg&user=ekohernowo"}, 
                    {name:"Cherry Mounds", image:"https://www.photosforclass.com/download/pixabay-2177121?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F54e1d2444b50ad14f6da8c7dda793f7f1636dfe2564c704c722e7dd4954fc75e_960.jpg&user=F119"}
                  ]
res.render("campgrounds", {campgrounds_key: campgrounds_values});
});

app.listen(3000, () => { 
    console.log("yelp server has started"); 
});