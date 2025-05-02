import { UtensilsCrossed, Flame } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

interface DietTabsContentProps {
    currentPlan: any;
}

export function DietTabsContent({ currentPlan }: DietTabsContentProps) {
    return (
        <TabsContent value="diet">
            <div className="space-y-4">
                {/* Calorie Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-sm text-muted-foreground flex items-center gap-1">
                        <Flame className="h-4 w-4 text-primary" />
                        DAILY CALORIE TARGET
                    </span>
                    <div className="font-mono text-xl text-primary">
                        {currentPlan.dietPlan.dailyCalories} KCAL
                    </div>
                </div>

                <div className="h-px w-full bg-border my-4" />

                {/* Meals */}
                <div className="space-y-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                    {currentPlan.dietPlan.meals.map((meal: any, index: number) => (
                        <div
                            key={index}
                            className="border border-border rounded-lg overflow-hidden p-4 bg-background/50 hover:bg-accent/40 transition"
                        >
                            {/* Meal Header */}
                            <div className="flex items-center gap-2 mb-3">
                                <UtensilsCrossed className="w-4 h-4 text-primary" />
                                <h4 className="font-mono text-primary text-base font-semibold">
                                    {meal.name}
                                </h4>
                            </div>

                            {/* Food List */}
                            <ul className="space-y-2 pl-1">
                                {meal.foods.map((food: any, foodIndex: any) => (
                                    <li
                                        key={foodIndex}
                                        className="flex items-start gap-3 text-sm text-muted-foreground"
                                    >
                                        <span className="text-xs font-mono text-primary pt-[2px]">
                                            {String(foodIndex + 1).padStart(2, "0")}
                                        </span>
                                        <span className="leading-snug">{food}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </TabsContent>
    );
}
