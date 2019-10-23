const express = require("express"); 
const app = express(); 
const body_parser = require ("body-parser"); 

/*taken out of app.get so that post route can push new campgrounds into the array
and to have access to it in the post route */
let campgrounds_values = [ 
    {name:"Salmon Creek", image:"https://pixabay.com/get/57e2d1424253ab14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg"}, 
    {name:"Walnut Hill", image:"https://pixabay.com/get/54e5d4454f5aae14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg"}, 
    {name:"Cherry Mounds", image:"https://pixabay.com/get/53e2dc434b51b108f5d084609620367d1c3ed9e04e50744e742872d0954cc1_340.jpg"},
    {name:"Salmon Creek", image:"https://pixabay.com/get/57e2d1424253ab14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg"}, 
    {name:"Walnut Hill", image:"https://pixabay.com/get/54e5d4454f5aae14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg"}, 
    {name:"Cherry Mounds", image:"https://pixabay.com/get/53e2dc434b51b108f5d084609620367d1c3ed9e04e50744e742872d0954cc1_340.jpg"},
    {name:"Salmon Creek", image:"https://pixabay.com/get/57e2d1424253ab14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg"}, 
    {name:"Walnut Hill", image:"https://pixabay.com/get/54e5d4454f5aae14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg"}, 
    {name:"Cherry Mounds", image:"https://pixabay.com/get/53e2dc434b51b108f5d084609620367d1c3ed9e04e50744e742872d0954cc1_340.jpg"}
                  ]; 

app.use(body_parser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

app.get ("/", (req, res) => { 
    res.render("landing");
});

// houses the form that sends the data to the post route
app.get("/campgrounds/new", (req, res) => { 
    res.render("new.ejs"); 

})
app.get ("/campgrounds", (req, res) => { 

res.render("campgrounds", {campgrounds_key: campgrounds_values});
});

//this is a different route than the app.get campground
app.post("/campgrounds", (req, res) => { 
    //get data from form and add to campgrounds array
    let name = req.body.name; 
    let image = req.body.image; 
    let new_campground = { name: name, image: image}; 
    campgrounds_values.push(new_campground); 
    //redirect back to same app.get campgrounds page
    res.redirect("/campgrounds"); 
}); 

app.listen(3000, () => { 
    console.log("yelp server has started"); 
});