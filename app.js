const express = require("express"); 
const app = express(); 
const body_parser = require ("body-parser"); 
const mongoose = require("mongoose"); 


mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true }); 
app.use(body_parser.urlencoded({extended: true })); 
app.set("view engine", "ejs"); 

let campground_Schema = new mongoose.Schema({ 
  name: String, 
  image: String, 
  description: String
}); 

let Campground = mongoose.model("Campground", campground_Schema); 
app.get ("/", (req, res) => { 
    res.render("landing");
});

Campground.create({ 
    name:"Walnut Hill", 
    image:"https://pixabay.com/get/54e5d4454f5aae14f6da8c7dda793f7f1636dfe2564c704c722e7cdd934fc45c_340.jpg", 
    description: "this is a huge campground"
    
},(err, campground) => { 
    if (err){ 
        console.log (err); 
    } else { 
        console.log("newly created campground"); 
        console.log(campground); 
    }
}); 

// houses the form that sends the data to the post route
app.get("/campgrounds/new", (req, res) => { 
    res.render("new.ejs"); 

}); 

// SHOW- shows more info about one campground
app.get("/campgrounds/:id", (req, res) => { 
// find the campground with provided ID
Campground.findById(req.params.id, (err, found_campground) => { 
    if(err){ 
        console.log(err); 
    } else { 
    //render show template with that campground 
      res.render("show",{campground: found_campground}); 
    }
  }); 
}); 

app.get ("/campgrounds", (req, res) => { 
// get all campgrounds from DB 
  Campground.find({}, (err, all_campgrounds) => { 
    if(err){ 
        console.log(err);
    } else { 
    res.render("index", {campgrounds_key: all_campgrounds});
    }
  });
});

//this is a different route than the app.get campground
app.post("/campgrounds", (req, res) => { 
    //get data from form and add to campgrounds array
    let camp_name = req.body.name; 
    let camp_image = req.body.image; 
    let camp_desc = req.body.description; 
    // make a new variable as a separate step that combines the name and image in one object
    let new_campground = { name: camp_name, image: camp_image, description: camp_desc}; 
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