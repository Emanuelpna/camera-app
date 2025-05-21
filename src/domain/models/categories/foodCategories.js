export const FOOD_CATEGORIES = {
    frutas: [
        "fruit", "cuisine", "fast food", "food", "apple", "banana", "orange", "grappe", "strawberry",
        "watermelon", "kiwi", "pinapple"
    ],
    legumes: [
        "carrot", "tomato", "potato", "onion", "lettuce",
        "red pepper", "corn"
    ],
    proteinas: [
        "chicken", "meat", "fish", "egg", "pork",
        "shrimp", "tofu", "beans"
    ],
    graos: [
        "rice", "bread", "pasta"
    ]
};

export const ALL_FOODS = Object.values(FOOD_CATEGORIES).flat();