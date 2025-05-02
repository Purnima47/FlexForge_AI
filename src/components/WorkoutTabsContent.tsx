import { CalendarIcon, Dumbbell } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const today = new Date().toLocaleString("en-US", { weekday: "long" });

interface WorkoutTabsContentProps {
    currentPlan: any;
}

export function WorkoutTabsContent({ currentPlan }: WorkoutTabsContentProps) {
    return (
        <TabsContent value="workout">
            <div className="space-y-4">
                {/* Workout Schedule */}
                <div className="flex items-center gap-2 mb-4">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    <span className="font-mono text-sm text-muted-foreground">
                        SCHEDULE: {currentPlan.workoutPlan.schedule.join(", ")}
                    </span>
                </div>

                {/* Days Accordion */}
                <Accordion type="multiple" className="space-y-4">
                    {currentPlan.workoutPlan.exercises.map((exerciseDay: any, index: number) => (
                        <AccordionItem
                            key={index}
                            value={exerciseDay.day}
                            className="border rounded-lg overflow-hidden"
                        >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/10 font-mono">
                                <div className="flex justify-between w-full items-center">
                                    <span
                                        className={`text-primary ${exerciseDay.day === today ? "underline font-bold" : ""
                                            }`}
                                    >
                                        {exerciseDay.day}
                                    </span>
                                    <div className="text-xs text-muted-foreground">
                                        {exerciseDay.routines.length} EXERCISES
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="pb-4 px-4">
                                <div className="space-y-3 mt-2">
                                    {exerciseDay.routines.map((routine: any, routineIndex: any) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: routineIndex * 0.03 }}
                                            key={routineIndex}
                                            className="border border-border rounded p-3 bg-background/50 hover:bg-accent/40 transition"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                {/* Name + Icon */}
                                                <div className="flex items-center gap-2">
                                                    <Dumbbell className="w-4 h-4 text-muted-foreground" />
                                                    <h4 className="font-semibold text-foreground">{routine.name}</h4>
                                                </div>

                                                {/* Sets and Reps (Corner) */}
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                                                        {routine.sets} SETS
                                                    </div>
                                                    <div className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono">
                                                        {routine.reps} REPS
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Optional Description */}
                                            {routine.description && (
                                                <p className="text-sm text-muted-foreground">{routine.description}</p>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </TabsContent>
    );
}
