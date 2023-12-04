const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set up Handlebars.js as your view engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  //helpers, // Add custom Handlebars helpers here
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// preferably move to homeroutes.js //////

app.get("/", (req, res) => {
    res.render("homepage", {
        pageTitle: "Welcome to Fit AF!"
    })
})


app.get("/cart", (req, res) => {
    res.render("cartpage", {
        pageTitle: "Shopping Cart"
    })
})

app.get("/recipesearch", (req, res) => {
    res.render("recipesearchpage", {
        pageTitle: "Recipes"
    })
})

app.get("/login", (req, res) => {
    res.render("login", {
        layout: "forlogin",
        pageTitle: "Login"
    })
})

////////////////////////////


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });