// Import necessary modules and functions
import { httpRouter } from "convex/server"; // Import Convex HTTP router for defining routes
import { WebhookEvent } from '@clerk/nextjs/server'; // Import Clerk's webhook event type
import { Webhook } from "svix"; // Import Svix webhook verification library
import { api } from './_generated/api'; // Import API functions (like syncUser, updateUser)
import { httpAction } from './_generated/server'; // Import server-side HTTP actions
// Import Google Generative AI SDK (not used in this file)
import { GoogleGenerativeAI } from '@google/generative-ai';

// Create a new HTTP router instance
const http = httpRouter();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define a new route for handling Clerk webhook events
http.route({
    path: "/clerk-webhook", // Endpoint path
    method: "POST", // HTTP method
    handler: httpAction(async (ctx, request) => { // Define the route handler as an async function

        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET; // Get the Clerk webhook secret from environment variables
        if (!webhookSecret) { // If secret is missing, throw an error
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }

        // Extract Svix headers required for verifying the webhook
        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        // Check if any Svix headers are missing and return an error response if they are
        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("No svix headers found", {
                status: 400, // Bad Request
            });
        }

        // Parse the incoming webhook payload
        const payload = await request.json();
        const body = JSON.stringify(payload); // Stringify the payload for verification

        // Initialize a new Webhook verifier using the secret
        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent; // Declare a variable to store the verified event

        try {
            // Verify the webhook signature and parse the event
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;
        } catch (err) {
            // Log error and return a bad request if verification fails
            console.error("Error verifying webhook:", err);
            return new Response("Error occurred", { status: 400 });
        }

        // Get the type of the webhook event
        const eventType = evt.type;

        // Handle user created event
        if (eventType === "user.created") {
            // Extract relevant user details from the event
            const { id, first_name, last_name, image_url, email_addresses } = evt.data;

            // Get the primary email address
            const email = email_addresses[0].email_address;

            // Construct the full name
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                // Call a mutation to sync (create) the user in your database
                await ctx.runMutation(api.users.syncUser, {
                    email,
                    name,
                    image: image_url,
                    clerkId: id,
                });
            } catch (error) {
                // Log any error during user creation
                console.log("Error creating user:", error);
                return new Response("Error creating user", { status: 500 });
            }
        }

        // Handle user updated event
        if (eventType === "user.updated") {
            // Extract relevant updated user details
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;

            // Get the updated email address
            const email = email_addresses[0].email_address;
            // Construct the updated full name
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                // Call a mutation to update the user information in your database
                await ctx.runMutation(api.users.syncUser, {
                    clerkId: id,
                    email,
                    name,
                    image: image_url,
                });
            } catch (error) {
                // Log any error during user update
                console.log("Error updating user:", error);
                return new Response("Error updating user", { status: 500 });
            }
        }

        // Return a success response after processing the webhook
        return new Response("Webhooks processed successfully", { status: 200 });
    }),
});

// validate and fix workout plan to ensure it has proper numeric types
function validateWorkoutPlan(plan: any) {
    const validatedPlan = {
        schedule: plan.schedule,
        exercises: plan.exercises.map((exercise: any) => ({
            day: exercise.day,
            routines: exercise.routines.map((routine: any) => ({
                name: routine.name,
                sets: typeof routine.sets === "number" ? routine.sets : parseInt(routine.sets) || 1,
                reps: typeof routine.reps === "number" ? routine.reps : parseInt(routine.reps) || 10,
            })),
        })),
    };
    return validatedPlan;
}

// validate diet plan to ensure it strictly follows schema
function validateDietPlan(plan: any) {
    // only keep the fields we want
    const validatedPlan = {
        dailyCalories: plan.dailyCalories,
        meals: plan.meals.map((meal: any) => ({
            name: meal.name,
            foods: meal.foods,
        })),
    };
    return validatedPlan;
}

http.route({
    path: "/vapi/generate-program",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        try {
            const payload = await request.json();

            const {
                user_id,
                age,
                height,
                weight,
                injuries,
                workout_days,
                fitness_goal,
                fitness_level,
                dietary_restrictions,
            } = payload;

            console.log("Payload is here:", payload);

            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-001",
                generationConfig: {
                    temperature: 0.4, // lower temperature for more predictable outputs
                    topP: 0.9,
                    responseMimeType: "application/json",
                },
            });

            const workoutPrompt = `You are an experienced fitness coach creating a personalized workout plan based on:
            Age: ${age}
            Height: ${height}
            Weight: ${weight}
            Injuries or limitations: ${injuries}
            Available days for workout: ${workout_days}
            Fitness goal: ${fitness_goal}
            Fitness level: ${fitness_level}
            
            As a professional coach:
            - Consider muscle group splits to avoid overtraining the same muscles on consecutive days
            - Design exercises that match the fitness level and account for any injuries
            - Structure the workouts to specifically target the user's fitness goal
            
            CRITICAL SCHEMA INSTRUCTIONS:
            - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
            - "sets" and "reps" MUST ALWAYS be NUMBERS, never strings
            - For example: "sets": 3, "reps": 10
            - Do NOT use text like "reps": "As many as possible" or "reps": "To failure"
            - Instead use specific numbers like "reps": 12 or "reps": 15
            - For cardio, use "sets": 1, "reps": 1 or another appropriate number
            - NEVER include strings for numerical fields
            - NEVER add extra fields not shown in the example below
            
            Return a JSON object with this EXACT structure:
            {
              "schedule": ["Monday", "Wednesday", "Friday"],
              "exercises": [
                {
                  "day": "Monday",
                  "routines": [
                    {
                      "name": "Exercise Name",
                      "sets": 3,
                      "reps": 10
                    }
                  ]
                }
              ]
            }
            
            DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

            const workoutResult = await model.generateContent(workoutPrompt);
            const workoutPlanText = workoutResult.response.text();

            // VALIDATE THE INPUT COMING FROM AI
            let workoutPlan = JSON.parse(workoutPlanText);
            workoutPlan = validateWorkoutPlan(workoutPlan);

            const dietPrompt = `You are an experienced nutrition coach creating a personalized diet plan based on:
              Age: ${age}
              Height: ${height}
              Weight: ${weight}
              Fitness goal: ${fitness_goal}
              Dietary restrictions: ${dietary_restrictions}
              
              As a professional nutrition coach:
              - Calculate appropriate daily calorie intake based on the person's stats and goals
              - Create a balanced meal plan with proper macronutrient distribution
              - Include a variety of nutrient-dense foods while respecting dietary restrictions
              - Consider meal timing around workouts for optimal performance and recovery
              
              CRITICAL SCHEMA INSTRUCTIONS:
              - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
              - "dailyCalories" MUST be a NUMBER, not a string
              - DO NOT add fields like "supplements", "macros", "notes", or ANYTHING else
              - ONLY include the EXACT fields shown in the example below
              - Each meal should include ONLY a "name" and "foods" array
      
              Return a JSON object with this EXACT structure and no other fields:
              {
                "dailyCalories": 2000,
                "meals": [
                  {
                    "name": "Breakfast",
                    "foods": ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
                  },
                  {
                    "name": "Lunch",
                    "foods": ["Grilled chicken salad", "Whole grain bread", "Water"]
                  }
                ]
              }
              
              DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

            const dietResult = await model.generateContent(dietPrompt);
            const dietPlanText = dietResult.response.text();

            // VALIDATE THE INPUT COMING FROM AI
            let dietPlan = JSON.parse(dietPlanText);
            dietPlan = validateDietPlan(dietPlan);

            // save to our DB: CONVEX
            const planId = await ctx.runMutation(api.plans.createPlan, {
                userId: user_id,
                dietPlan,
                isActive: true,
                workoutPlan,
                name: `${fitness_goal} Plan - ${new Date().toLocaleDateString()}`,
            });

            return new Response(
                JSON.stringify({
                    success: true,
                    data: {
                        planId,
                        workoutPlan,
                        dietPlan,
                    },
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );

        } catch (error) {
            console.error("Error generating fitness plan:", error);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: error instanceof Error ? error.message : String(error),
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    })
})

export default http;