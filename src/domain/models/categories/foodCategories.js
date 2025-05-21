export const FOOD_CATEGORIES = {
    frutas: [
        "fruit", "cuisine", "fast food", "food", "maçã", "banana", "laranja", "uva", "morango",
        "melancia", "kiwi", "abacaxi", "manga", "mirtilo",
        "pêra", "limão", "mamão", "goiaba"
    ],
    legumes: [
        "cenoura", "tomate", "batata", "cebola", "alface",
        "pepino", "brócolis", "pimentão", "milho", "abobrinha",
        "berinjela", "abóbora", "beterraba"
    ],
    proteinas: [
        "frango", "carne", "peixe", "ovo", "porco",
        "camarão", "tofu", "feijão", "lentilha"
    ],
    graos: [
        "arroz", "pão", "macarrão", "aveia", "quinoa",
        "trigo", "cevada", "milho"
    ]
};

export const ALL_FOODS = Object.values(FOOD_CATEGORIES).flat();