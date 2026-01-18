const express = require("express");
const router = express.Router();

const Listing = require("../../models/recipeSchema");

// GET /api/v1/recipes/by-ingredient
router.get("/recipes/by-ingredient", async (req, res, next) => {
  try {
    let { ingredient } = req.query;

    if (!ingredient) {
      return res.status(400).json({
        success: false,
        message: "ingredient is required"
      });
    }

    ingredient = ingredient.trim();

    const recipes = await Listing.find({
      ingredients: { $regex: ingredient, $options: "i" }
    });

    res.json({
      success: true,
      ingredient: ingredient.toLowerCase(),
      totalRecipes: recipes.length,
      recipes
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/recipes/recipe-of-the-day
router.get("/recipes/recipe-of-the-day", async (req, res, next) => {
  try {
    const count = await Listing.countDocuments();

    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: "No recipes available"
      });
    }

    const random = Math.floor(Math.random() * count);
    const recipe = await Listing.findOne().skip(random);

    res.json({
      success: true,
      recipe
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
