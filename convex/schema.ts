import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define DB schema
export default defineSchema({
    // Users table
    users: defineTable({
        name: v.string(),               // User's name
        email: v.string(),              // User's email
        image: v.optional(v.string()),  // Optional profile picture
        clerkId: v.string(),             // Clerk auth ID
    }).index("by_clerk_id", ["clerkId"]), // Find user by clerkId

    // Plans table
    plans: defineTable({
        userId: v.string(),              // Linked user ID
        name: v.string(),                // Plan name

        workoutPlan: v.object({
            schedule: v.array(v.string()), // Workout days
            exercises: v.array(
                v.object({
                    day: v.string(),            // Day label
                    routines: v.array(
                        v.object({
                            name: v.string(),            // Exercise name
                            sets: v.optional(v.number()), // Sets (optional)
                            reps: v.optional(v.number()), // Reps (optional)
                            duration: v.optional(v.string()), // Duration (optional)
                            description: v.optional(v.string()), // Description (optional)
                            exercises: v.optional(v.array(v.string())), // Sub-exercises (optional)
                        })
                    ),
                })
            ),
        }),

        dietPlan: v.object({
            dailyCalories: v.number(),       // Calories per day
            meals: v.array(
                v.object({
                    name: v.string(),             // Meal name
                    foods: v.array(v.string()),   // Foods list
                })
            ),
        }),

        isActive: v.boolean(),              // Is plan active?
    })
        .index("by_user_id", ["userId"])       // Find plans by user
        .index("by_active", ["isActive"]),     // Find active plans
});
