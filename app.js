const express = require("express"); 
const app = express(); 
const body_parser = require ("body-parser"); 
const mongoose = require("mongoose"); 


mongoose.connect('mongodb://localhost/yelp_camp'); 
app.use(body_parser.urlencoded({extended: true })); 
app.set("view engine", "ejs"); 

let campground_Schema = new mongoose.Schema({ 
  name: String, 
  image: String
}); 

let Campground = mongoose.model("Campground", campground_Schema); 
app.get ("/", (req, res) => { 
    res.render("landing");
});

// Campground.create({ 
//     name:"Walnut Hill", 
//     image:"https://pixabay.com/get/54e5d4454f5aae14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg"
    
// },(err, campground) => { 
//     if (err){ 
//         console.log (err); 
//     } else { 
//         console.log("newly created campground"); 
//         console.log(campground); 
//     }
// }); 

// houses the form that sends the data to the post route
app.get("/campgrounds/new", (req, res) => { 
    res.render("new.ejs"); 

})
app.get ("/campgrounds", (req, res) => { 
// get all campgrounds from DB 
  Campground.find({}, (err, all_campgrounds) => { 
    if(err){ 
        console.log(err);
    } else { 
    res.render("campgrounds", {campgrounds_key: all_campgrounds});
    }
  });
});

//this is a different route than the app.get campground
app.post("/campgrounds", (req, res) => { 
    //get data from form and add to campgrounds array
    let name = req.body.name; 
    let image = req.body.image; 
    // make a new variable as a separate step that combines the name and image in one object
    let new_campground = { name: name, image: image}; 
    Campground.create(new_campground, (err, newly_created) => { 
        if (err) { 
        console.log(err); 
        } else { 
        //redirect back to the campgrounds page and should see a new entry
        res.redirect("/campgrounds"); 
        }
    });
}); 

app.listen(3000, () => { 
    console.log("yelp server has started"); 
});