SELECT 
    'Recipe ID' AS label, r.id::text AS value
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Recipe Name', r.name
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Image URL', r.image
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Diet Labels', r.diet_labels
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Health Labels', r.health_labels
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Cautions', r.cautions
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Instructions', r.instructions
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Cuisine Type', r.cuisine_type
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Meal Type', r.meal_type
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Dish Type', r.dish_type
FROM 
    recipe_app_recipe r
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Ingredient Name', i.name
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_ingredients ri ON r.id = ri.recipe_id
LEFT JOIN 
    recipe_app_ingredient i ON ri.ingredient_id = i.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Ingredient Quantity', i.quantity::text
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_ingredients ri ON r.id = ri.recipe_id
LEFT JOIN 
    recipe_app_ingredient i ON ri.ingredient_id = i.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Ingredient Measure', i.measure
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_ingredients ri ON r.id = ri.recipe_id
LEFT JOIN 
    recipe_app_ingredient i ON ri.ingredient_id = i.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Ingredient Food', i.food
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_ingredients ri ON r.id = ri.recipe_id
LEFT JOIN 
    recipe_app_ingredient i ON ri.ingredient_id = i.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Ingredient Weight', i.weight::text
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_ingredients ri ON r.id = ri.recipe_id
LEFT JOIN 
    recipe_app_ingredient i ON ri.ingredient_id = i.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Nutrient Label', n.label
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_nutritional_facts rnf ON r.id = rnf.recipe_id
LEFT JOIN 
    recipe_app_nutrient n ON rnf.nutrient_id = n.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Nutrient Quantity', n.quantity::text
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_nutritional_facts rnf ON r.id = rnf.recipe_id
LEFT JOIN 
    recipe_app_nutrient n ON rnf.nutrient_id = n.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Nutrient Unit', n.unit
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_nutritional_facts rnf ON r.id = rnf.recipe_id
LEFT JOIN 
    recipe_app_nutrient n ON rnf.nutrient_id = n.id
WHERE 
    r.id = 81
UNION ALL
SELECT 
    'Category Name', r.name
FROM 
    recipe_app_recipe r
LEFT JOIN 
    recipe_app_recipe_categories rc ON r.id = rc.recipe_id
WHERE 
    r.id = 81;
