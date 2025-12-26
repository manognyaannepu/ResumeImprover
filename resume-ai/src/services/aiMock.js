// Comprehensive Dictionary for Professional Resume Language
const VOCAB_IMPROVEMENTS = {
    // Basic Verbs
    "helped": "collaborated with team to",
    "managed": "orchestrated",
    "worked on": "engineered and executed",
    "responsible for": "accountable for",
    "made": "developed",
    "changed": "transformed",
    "got": "achieved",
    "led": "directed",
    "handled": "resolved",
    "fixed": "rectified",
    "created": "pioneered",
    "started": "initiated",
    "talked to": "consulted with",
    "bought": "procured",
    "sold": "generated revenue of",
    "used": "utilized",
    "did": "performed",
    "wrote": "authored",
    "built": "architected",

    // Knowledge/Skills
    "know": "Proficient in",
    "knows": "Proficient in",
    "knowing": "Possessing expertise in",
    "learn": "Acquiring skills in",
    "learning": "Developing expertise in",
    "good at": "Expert in",
    "familiar with": "Adept in",

    // Academic/Student
    "first year": "First-year undergraduate specializing in",
    "student": "scholar",
    "studied": "Pursued comprehensive coursework in",
    "class": "advanced coursework",
    "project": "capstone initiative",

    // Technical Specifics
    "c language": "C programming & system architecture",
    "python": "Python scripting & automation",
    "java": "Java enterprise development",
    "html": "HTML5 semantic markup",
    "css": "CSS3 responsive design",
    "react": "React.js frontend architecture",
    "js": "JavaScript (ES6+)",
    "sql": "SQL database management",
    "excel": "Microsoft Excel data modeling"
};

// Start phrases for short sentences
const OPENING_BOOSTERS = [
    "Successfully",
    "Effectively",
    "Strategically",
    "Proactively",
    "Diligently"
];

// Context-Specific Enhancements
const CONTEXT_RULES = {
    cover_letter: {
        "i want": "I am writing to express my enthusiastic interest in",
        "i have": "My background includes extensive experience in",
        "i did": "During my professional tenure, I successfully",
        "looking for": "seeking to contribute my skills to",
        "good at": "My core competencies include"
    },
    email: {
        "hey": "Dear",
        "hi": "Dear",
        "thanks": "Best regards,",
        "help me": "I would appreciate your assistance with",
        "sorry": "Please accept my apologies for",
        "check": "Please review"
    },
    bio: {
        "i am": "A passionate",
        "student": "Dedicated scholar",
        "working at": "Currently driving innovation at",
        "knows": "With a robust foundation in"
    }
};

const polishSentence = (line, context = 'resume') => {
    let polished = line.trim();
    if (!polished) return "";

    // Rule 0: Critical Punctuation Fixes
    polished = polished.replace(/,(?=[^\s])/g, ", ");

    // Rule 1: Remove "I" / "We" at start (ONLY for Resume)
    if (context === 'resume' && /^(i|we)\s+/i.test(polished)) {
        polished = polished.replace(/^(i|we)\s+/i, "");
    }

    // Rule 2: Capitalize first letter
    polished = polished.charAt(0).toUpperCase() + polished.slice(1);

    // Rule 3: Deep Vocabulary Replacement (General)
    let changed = false;
    Object.entries(VOCAB_IMPROVEMENTS).forEach(([weak, strong]) => {
        const regex = new RegExp(`\\b${weak}\\b`, 'gi');
        if (regex.test(polished)) {
            polished = polished.replace(regex, strong);
            changed = true;
        }
    });

    // Rule 4: Fallback Expander (Resume Only - generic boosters don't fit email/bio well)
    if (context === 'resume' && !changed && polished.split(' ').length < 8 && !polished.includes(':')) {
        const randomBooster = OPENING_BOOSTERS[Math.floor(Math.random() * OPENING_BOOSTERS.length)];
        if (!polished.endsWith('ly')) {
            polished = `${randomBooster} ${polished.charAt(0).toLowerCase() + polished.slice(1)}`;
        }
    }

    return polished;
};

export const simulateAIImprovement = async (text, context = 'resume') => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Pre-process: Context specific replacements BEFORE general polishing
            let contextText = text;

            if (context !== 'resume' && CONTEXT_RULES[context]) {
                Object.entries(CONTEXT_RULES[context]).forEach(([simple, formal]) => {
                    const regex = new RegExp(`\\b${simple}\\b`, 'gi');
                    contextText = contextText.replace(regex, formal);
                });
            }

            const lines = contextText.split('\n');
            const improvements = [];

            // Process each line
            const processedLines = lines.map(line => {
                if (!line.trim() || line.includes('---')) return line;

                // Apply general polish (capitalization, commas)
                // We pass context to polishSentence to skip "I" removal for non-resumes if needed
                let polished = polishSentence(line, context);

                // For Resume: Format as list if commas exist
                if (context === 'resume') {
                    if ((polished.match(/,/g) || []).length >= 2 && polished.split(' ').length < 10) {
                        if (!polished.toLowerCase().includes("proficiency")) {
                            polished = "Demonstrated Technical Proficiency in: " + polished;
                        }
                    }
                }

                if (line.trim() !== polished) {
                    improvements.push({ original: line.trim(), polished });
                }

                return line.replace(line.trim(), polished);
            });

            // Context-specific wrapper
            let finalText = processedLines.join('\n');

            if (context === 'email' && !finalText.includes('Dear') && !finalText.includes('Hi')) {
                finalText = "Dear [Name],\n\n" + finalText + "\n\nBest regards,\n[Your Name]";
            }

            const feedback = [{ type: 'strength', message: `Optimized tone for ${context.replace('_', ' ')} format.` }];
            if (improvements.length > 0) feedback.push({ type: 'improvement', message: 'Enhanced phrasing for professional impact.' });

            resolve({
                improvedText: finalText,
                feedback: feedback
            });
        }, 1000);
    });
};

// Job Role Data for Analysis
const JOB_ROLES = {
    "frontend": ["React.js", "TypeScript", "Tailwind CSS", "State Management (Redux/Zustand)", "Responsive Design", "Web Performance"],
    "backend": ["Node.js", "Python", "Database Design (SQL/NoSQL)", "API Development (REST/GraphQL)", "Docker/Kubernetes", "System Design"],
    "fullstack": ["React.js", "Node.js", "Database Management", "API Architecture", "Cloud Services (AWS/Azure)", "CI/CD Pipelines"],
    "data scientist": ["Python/R", "Machine Learning", "SQL", "Data Visualization (Tableau/PowerBI)", "Statistics", "Big Data Tools"],
    "product manager": ["Agile/Scrum", "User Research", "Roadmapping", "Data Analysis", "Stakeholder Management", "A/B Testing"]
};

export const simulateJobAnalysis = async (jobTitle, currentSkills) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const normalizedTitle = jobTitle.toLowerCase();
            let roleKey = Object.keys(JOB_ROLES).find(k => normalizedTitle.includes(k));

            // Default if role not found (generic tech suggestions)
            if (!roleKey) roleKey = "fullstack";

            const recommendedSkills = JOB_ROLES[roleKey];
            const userSkillsList = currentSkills.split(',').map(s => s.trim().toLowerCase());

            // 1. Identify Gaps
            const missingSkills = recommendedSkills.filter(req =>
                !userSkillsList.some(user => user.includes(req.split(' ')[0].toLowerCase()))
            );

            // 2. Optimize Existing Skills (Format them)
            const optimizedSkills = currentSkills.split(',').map(skill => {
                const s = skill.trim();
                // Simple lookup in our improvement dictionary
                const polished = polishSentence(s);
                return polished.startsWith("Demonstrated") ? polished.replace("Demonstrated Technical Proficiency in: ", "") : polished; // Keep it short for list
            });

            resolve({
                roleDetected: roleKey.charAt(0).toUpperCase() + roleKey.slice(1),
                optimizedSkills: optimizedSkills,
                missingSkills: missingSkills,
                learningPath: missingSkills.map(skill => ({
                    skill: skill,
                    resource: `Start a project using ${skill} or check documentation.`
                }))
            });
        }, 1500);
    });
};
