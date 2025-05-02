export const USER_PROGRAMS = [
  {
    id: 1,
    first_name: "Ava",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    fitness_goal: "Endurance Training",
    height: "5'5\"",
    weight: "140 lbs",
    age: 29,
    workout_days: 5,
    injuries: "Shin splints",
    fitness_level: "Intermediate",
    equipment_access: "Outdoor trails & minimal equipment",
    dietary_restrictions: "Gluten-free",
    workout_plan: {
      title: "Endurance Boost Program",
      weekly_schedule: [
        { day: "Monday", focus: "Long Distance Run", duration: "50 min" },
        { day: "Tuesday", focus: "Strength & Core", duration: "30 min" },
        { day: "Thursday", focus: "Interval Sprints", duration: "40 min" },
        { day: "Saturday", focus: "Cross Training (Cycling)", duration: "60 min" },
        { day: "Sunday", focus: "Yoga & Stretching", duration: "30 min" },
      ],
      description:
        "Designed to enhance stamina and build resilience while minimizing stress on the joints. Alternates running with strength training to improve full-body endurance.",
    },
    diet_plan: {
      title: "Gluten-Free Energy Plan",
      daily_calories: "2,200 calories",
      macros: { protein: "25%", carbs: "55%", fats: "20%" },
      meal_examples: [
        { meal: "Breakfast", example: "Gluten-free oatmeal with berries and seeds" },
        { meal: "Lunch", example: "Quinoa salad with grilled chicken and avocado" },
        { meal: "Dinner", example: "Grilled fish with roasted sweet potatoes and asparagus" },
        { meal: "Snacks", example: "Rice cakes with almond butter, trail mix" },
      ],
      description:
        "A high-carb, gluten-free plan supporting endurance workouts. Focuses on energy availability and gut health for long training sessions.",
    },
  },
  {
    id: 2,
    first_name: "James",
    profilePic: "https://randomuser.me/api/portraits/men/52.jpg",
    fitness_goal: "Strength Building",
    height: "6'1\"",
    weight: "200 lbs",
    age: 32,
    workout_days: 4,
    injuries: "Previous shoulder dislocation",
    fitness_level: "Advanced",
    equipment_access: "Full gym and home weights",
    dietary_restrictions: "None",
    workout_plan: {
      title: "Strength and Powerlifting Plan",
      weekly_schedule: [
        { day: "Monday", focus: "Squats & Deadlifts", duration: "60 min" },
        { day: "Wednesday", focus: "Bench Press & Rows", duration: "55 min" },
        { day: "Friday", focus: "Overhead Press & Pull-ups", duration: "50 min" },
        { day: "Saturday", focus: "Accessory Work & Core", duration: "45 min" },
      ],
      description:
        "Power-based program designed to maximize absolute strength. Focuses on heavy compound lifts and technique improvement, with shoulder-friendly modifications.",
    },
    diet_plan: {
      title: "High-Protein Strength Diet",
      daily_calories: "3,000 calories",
      macros: { protein: "35%", carbs: "40%", fats: "25%" },
      meal_examples: [
        { meal: "Breakfast", example: "Egg scramble with turkey sausage and spinach" },
        { meal: "Lunch", example: "Steak and sweet potato with green beans" },
        { meal: "Dinner", example: "Grilled chicken thighs with brown rice" },
        { meal: "Snacks", example: "Beef jerky, protein smoothie with oats" },
      ],
      description:
        "This high-protein, calorie-dense plan supports heavy lifting sessions and muscle recovery, ensuring strength gains without excessive fat gain.",
    },
  },
  {
    id: 3,
    first_name: "Isabella",
    profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
    fitness_goal: "Flexibility & Mobility",
    height: "5'7\"",
    weight: "145 lbs",
    age: 39,
    workout_days: 3,
    injuries: "Tight hips",
    fitness_level: "Beginner",
    equipment_access: "Yoga mat and resistance bands",
    dietary_restrictions: "Vegan",
    workout_plan: {
      title: "Mobility & Recovery Routine",
      weekly_schedule: [
        { day: "Tuesday", focus: "Full-Body Stretching", duration: "30 min" },
        { day: "Thursday", focus: "Balance & Stability", duration: "35 min" },
        { day: "Sunday", focus: "Deep Yoga Flow", duration: "45 min" },
      ],
      description:
        "A gentle program emphasizing increased flexibility, improved joint mobility, and reduced muscular tension. Ideal for beginners seeking better movement patterns.",
    },
    diet_plan: {
      title: "Vegan Flexibility Meal Plan",
      daily_calories: "2,000 calories",
      macros: { protein: "20%", carbs: "60%", fats: "20%" },
      meal_examples: [
        { meal: "Breakfast", example: "Smoothie with spinach, banana, and pea protein" },
        { meal: "Lunch", example: "Quinoa bowl with chickpeas and avocado" },
        { meal: "Dinner", example: "Lentil stew with whole grain bread" },
        { meal: "Snacks", example: "Vegan protein bars, edamame, mixed fruit" },
      ],
      description:
        "This plant-based meal plan supports joint health, flexibility, and recovery through anti-inflammatory foods rich in micronutrients and protein.",
    },
  },
  {
    id: 4,
    first_name: "Noah",
    profilePic: "https://randomuser.me/api/portraits/men/77.jpg",
    fitness_goal: "Fat Loss and Toning",
    height: "5'9\"",
    weight: "185 lbs",
    age: 31,
    workout_days: 5,
    injuries: "Ankle sprain history",
    fitness_level: "Intermediate",
    equipment_access: "Commercial gym",
    dietary_restrictions: "Pescatarian",
    workout_plan: {
      title: "Fat Burn and Toning Regimen",
      weekly_schedule: [
        { day: "Monday", focus: "Upper Body Strength", duration: "40 min" },
        { day: "Tuesday", focus: "Lower Body Strength", duration: "40 min" },
        { day: "Thursday", focus: "HIIT & Core", duration: "35 min" },
        { day: "Friday", focus: "Full Body Circuit", duration: "45 min" },
        { day: "Sunday", focus: "Cardio Endurance", duration: "50 min" },
      ],
      description:
        "Combines strength training and high-intensity intervals to promote fat loss while preserving lean muscle mass. Exercises are modified for ankle support.",
    },
    diet_plan: {
      title: "Pescatarian Weight Loss Meal Plan",
      daily_calories: "2,000 calories",
      macros: { protein: "30%", carbs: "45%", fats: "25%" },
      meal_examples: [
        { meal: "Breakfast", example: "Greek yogurt with chia seeds and mixed berries" },
        { meal: "Lunch", example: "Tuna salad with quinoa and spinach" },
        { meal: "Dinner", example: "Grilled salmon with wild rice and broccoli" },
        { meal: "Snacks", example: "Carrot sticks with hummus, boiled eggs" },
      ],
      description:
        "A balanced pescatarian plan high in protein and healthy fats to aid fat loss and muscle definition without restrictive dieting.",
    },
  },
  
  {
    id: 5,
    first_name: "Liam",
    profilePic: "https://randomuser.me/api/portraits/men/70.jpg",
    fitness_goal: "Athletic Performance",
    height: "6'0\"",
    weight: "190 lbs",
    age: 26,
    workout_days: 6,
    injuries: "Minor wrist pain",
    fitness_level: "Advanced",
    equipment_access: "Full athletic facility",
    dietary_restrictions: "Nut allergy",
    workout_plan: {
      title: "Athlete Performance Training",
      weekly_schedule: [
        { day: "Monday", focus: "Explosive Power & Plyometrics", duration: "60 min" },
        { day: "Tuesday", focus: "Speed & Agility Drills", duration: "50 min" },
        { day: "Wednesday", focus: "Upper Body Strength", duration: "55 min" },
        { day: "Thursday", focus: "Lower Body Strength", duration: "55 min" },
        { day: "Friday", focus: "Active Recovery (Swimming)", duration: "40 min" },
        { day: "Saturday", focus: "Endurance and Core", duration: "45 min" },
      ],
      description:
        "High-intensity, sports-specific training designed to maximize speed, agility, and strength. Focuses on athletic conditioning with wrist-friendly modifications.",
    },
    diet_plan: {
      title: "Performance Nutrition (Nut-Free)",
      daily_calories: "3,200 calories",
      macros: { protein: "30%", carbs: "50%", fats: "20%" },
      meal_examples: [
        { meal: "Breakfast", example: "Egg white omelet with veggies and gluten-free toast" },
        { meal: "Lunch", example: "Turkey sandwich on whole grain with side salad" },
        { meal: "Dinner", example: "Baked cod with couscous and grilled vegetables" },
        { meal: "Snacks", example: "Sunflower seed butter with apple slices, protein bars (nut-free)" },
      ],
      description:
        "This meal plan fuels intense athletic sessions with high-quality proteins and carbohydrates while avoiding nuts to cater to allergies.",
    },
  }  
];
