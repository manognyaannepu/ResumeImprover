export const simulateAIImprovement = async (text) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                improvedText: text
                    .replace(/responsible for/gi, "Spearheaded")
                    .replace(/helped/gi, "Collaborated with cross-functional teams to")
                    .replace(/worked on/gi, "Engineered and deployed")
                    .replace(/managed/gi, "Orchestrated")
                    .replace(/got/gi, "Achieved") +
                    "\n\n[AI ENHANCEMENT]: Added strong action verbs and quantified impact where possible.",
                feedback: [
                    { type: 'strength', message: 'Good use of technical keywords.' },
                    { type: 'improvement', message: 'Consider adding more metrics (e.g., "Increased efficiency by 20%").' },
                    { type: 'improvement', message: 'Replace passive voice with active voice.' },
                    { type: 'critical', message: 'Ensure formatting is consistent across all sections.' }
                ]
            });
        }, 2000);
    });
};
