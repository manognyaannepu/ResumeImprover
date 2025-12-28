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

export const simulateJobAnalysis = async (jobTitle, currentSkills, yearsOfExperience = 0, currentStatus = '', education = '') => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const normalizedTitle = jobTitle.toLowerCase();
            let roleKey = Object.keys(JOB_ROLES).find(k => normalizedTitle.includes(k));

            // Default if role not found
            if (!roleKey) roleKey = "fullstack";

            let recommendedSkills = [...JOB_ROLES[roleKey]];
            const experience = parseInt(yearsOfExperience) || 0;

            // DYNAMIC ADJUSTMENT BASED ON EXPERIENCE
            if (experience === 0) {
                // Entry Level: Focus on basics and portfolios
                recommendedSkills.push("Git/Version Control", "Problem Solving");
            } else if (experience >= 3 && experience < 5) {
                // Mid Level: Focus on architecture/process
                recommendedSkills.push("System Design", "Code Review", "Mentorship");
            } else if (experience >= 5) {
                // Senior Level: Focus on leadership/strategy
                recommendedSkills.push("Team Leadership", "Strategic Planning", "Architecture Patterns");
            }

            const userSkillsList = currentSkills.split(',').map(s => s.trim().toLowerCase());

            // 1. Identify Gaps
            const missingSkills = recommendedSkills.filter(req =>
                !userSkillsList.some(user => user.includes(req.split(' ')[0].toLowerCase()))
            );

            // 2. Calculate Score
            const totalSkills = recommendedSkills.length;
            const matchedCount = totalSkills - missingSkills.length;
            let baseScore = Math.round((matchedCount / totalSkills) * 100);

            // Experience Bonus: Experience boosts confidence in the candidate
            if (baseScore > 0) {
                const experienceBonus = Math.min(experience * 5, 20); // 5 points per year, max 20
                baseScore += experienceBonus;
            }

            // Cap at 100
            const finalScore = Math.min(100, baseScore);

            // 3. Optimize Existing Skills
            const optimizedSkills = currentSkills.split(',').map(skill => {
                const s = skill.trim();
                const polished = polishSentence(s);
                return polished.startsWith("Demonstrated") ? polished.replace("Demonstrated Technical Proficiency in: ", "") : polished;
            });

            // 4. Dynamic Learning Path based on Experience
            const learningPath = missingSkills.map(skill => {
                let resource = "";
                if (experience < 2) {
                    resource = `Start a foundational project using ${skill} or check official docs.`;
                } else if (experience >= 2 && experience < 5) {
                    resource = `Dive deeper into ${skill} best practices and design patterns.`;
                } else {
                    resource = `Lead a ${skill} initiative or write documentation for the team.`;
                }
                return { skill, resource };
            });

            resolve({
                roleDetected: (experience > 5 ? "Senior " : experience === 0 ? "Junior " : "") + roleKey.charAt(0).toUpperCase() + roleKey.slice(1),
                matchScore: finalScore,
                optimizedSkills: optimizedSkills,
                missingSkills: missingSkills,
                learningPath: learningPath
            });
        }, 1500);
    });
};

export const simulateImpactScore = async (resumeStats) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock scoring logic based on input (or random if minimal input)
            // In a real app, this would analyze the text content.

            const vocabScore = Math.floor(Math.random() * (95 - 70) + 70);
            const keywordScore = Math.floor(Math.random() * (98 - 60) + 60);
            const formatScore = Math.floor(Math.random() * (100 - 80) + 80);
            const totalScore = Math.round((vocabScore + keywordScore + formatScore) / 3);

            resolve({
                overallScore: totalScore,
                breakdown: {
                    vocabulary: {
                        score: vocabScore,
                        feedback: vocabScore > 85 ? "Excellent use of action verbs!" : "Try using more strong action verbs like 'Orchestrated' or 'Engineered'.",
                        details: ["Avoid passive voice", "Use industry specific terms"]
                    },
                    keywords: {
                        score: keywordScore,
                        feedback: keywordScore > 80 ? "Great keyword density." : "Missing some common industry keywords.",
                        details: ["Add more technical skills", "Include tool names"]
                    },
                    formatting: {
                        score: formatScore,
                        feedback: "Clean and readable structure.",
                        details: ["Bullet points are consistent", "Good use of whitespace"]
                    }
                }
            });
        }, 2000);
    });
};


export const simulateATSCheck = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const { description, skills, experience, projects, isFile, fileName } = data;
            const fullText = `${description} ${skills} ${experience} ${projects}`;
            const lowerText = fullText.toLowerCase();

            let score = 100;
            const feedback = [];

            // File-specific structural checks
            if (isFile) {
                feedback.push({
                    section: "File Structure",
                    status: "pass",
                    message: `Successfully parsed ${fileName}. Document structure is compatible with standard ATS parsers.`
                });
                // Slight score variation for file mode
                score += 5;
            }

            // 1. Check for Pronouns (Bad for Resume)
            const pronounMatches = (lowerText.match(/\b(i|me|my|we|our)\b/g) || []);
            if (pronounMatches.length > 0) {
                score -= (pronounMatches.length * 2);
                feedback.push({
                    section: "Formatting",
                    status: "warning",
                    message: `Found ${pronounMatches.length} personal pronouns (${pronounMatches.slice(0, 3).join(", ")}...). Resumes should be written in implied first person (e.g., 'Managed' instead of 'I managed').`
                });
            }

            // 2. Specific Weak Word Detection (Dynamic Feedback)
            const foundWeakWords = [];
            Object.keys(VOCAB_IMPROVEMENTS).forEach(weak => {
                if (lowerText.includes(weak)) {
                    foundWeakWords.push({ weak, strong: VOCAB_IMPROVEMENTS[weak] });
                }
            });

            if (foundWeakWords.length > 0) {
                score -= (foundWeakWords.length * 3);
                const examples = foundWeakWords.slice(0, 3).map(w => `'${w.weak}' → '${w.strong}'`).join(", ");
                feedback.push({
                    section: "Vocabulary",
                    status: "warning",
                    message: `Detected weak verbs. Suggestions: ${examples}.`
                });
            } else {
                feedback.push({
                    section: "Vocabulary",
                    status: "pass",
                    message: "Excellent choice of action verbs! No common weak terms found."
                });
            }

            // 3. Check for Metrics (Numbers/%)
            const metricsRegex = /(\d+%|\$\d+|\d+\s(years|months|users|clients|revenue))/gi;
            const experienceMatches = (experience.match(metricsRegex) || []).length;
            const projectMatches = (projects.match(metricsRegex) || []).length;
            const totalMetrics = experienceMatches + projectMatches;

            if (totalMetrics < 3 && !isFile) {
                score -= 15;
                feedback.push({
                    section: "Impact",
                    status: "warning",
                    message: "Low use of metrics. Employers look for numbers (e.g., 'Hosted 50+ users', 'Reduced costs by 15%')."
                });
            } else if (totalMetrics >= 3) {
                feedback.push({
                    section: "Impact",
                    status: "pass",
                    message: `Good impact! Found ${totalMetrics} metric-based achievements.`
                });
            }

            // 4. Section Length & Formatting Checks (Only if manual)
            if (!isFile) {
                if (description && description.split(' ').length < 15) {
                    score -= 10;
                    feedback.push({ section: "Summary", status: "warning", message: "Summary is too short. Aim for a 2-3 line elevator pitch." });
                }

                // Skill Count Check
                const skillCount = skills.split(',').length;
                if (skillCount > 0 && skillCount < 6) {
                    score -= 10;
                    feedback.push({ section: "Skills", status: "warning", message: "Listing too few skills reduces keyword matches. Aim for 8-10 items." });
                }
            } else {
                // File-mode specific feedback
                feedback.push({
                    section: "Formatting",
                    status: "pass",
                    message: "Standard fonts (Arial/Calibri) detected. No complex graphics found that might block ATS parsing."
                });
            }

            // Cap score
            score = Math.max(10, Math.min(100, Math.round(score)));

            resolve({
                score: score,
                feedback: feedback
            });
        }, 1500);
    });
};

// Detailed Skill Breakdown for Skills Analyzer
const DETAILED_JOB_ROLES = {
    "frontend": [
        { skill: "React.js", level: "Advanced", reason: "Standard for building dynamic user interfaces." },
        { skill: "TypeScript", level: "Intermediate", reason: "Crucial for large-scale application scalability." },
        { skill: "CSS/Tailwind", level: "Advanced", reason: "Essential for implementing responsive designs." },
        { skill: "State Management", level: "Intermediate", reason: "Needed for complex data flows (Redux/Zustand)." },
        { skill: "Module Bundlers", level: "Basic", reason: "Understanding Vite/Webpack build processes." }
    ],
    "backend": [
        { skill: "Node.js/Python", level: "Advanced", reason: "Core runtime for server-side logic." },
        { skill: "Database (SQL/NoSQL)", level: "Advanced", reason: "Data persistence and schema design." },
        { skill: "API Design (REST/GraphQL)", level: "Advanced", reason: "Building efficient client-server communication." },
        { skill: "Docker", level: "Intermediate", reason: "Containerization for consistent deployment environments." },
        { skill: "System Design", level: "Intermediate", reason: "Architecting scalable and reliable systems." }
    ],
    "fullstack": [
        { skill: "Frontend Framework", level: "Intermediate", reason: "Building client-side interactions." },
        { skill: "Backend Language", level: "Intermediate", reason: "Handling server logic and DB connections." },
        { skill: "DevOps Basics", level: "Basic", reason: "CI/CD and simple cloud deployment." },
        { skill: "Database Management", level: "Intermediate", reason: "Managing data integrity and queries." }
    ],
    "data scientist": [
        { skill: "Python/R", level: "Advanced", reason: "Primary languages for data manipulation." },
        { skill: "Machine Learning", level: "Advanced", reason: "Building and tuning predictive models." },
        { skill: "Statistics", level: "Advanced", reason: "Foundational mathematical understanding." },
        { skill: "Data Visualization", level: "Intermediate", reason: "Communicating insights (Tableau/Matplotlib)." }
    ],
    "mobile": [
        { skill: "React Native/Flutter", level: "Advanced", reason: "Cross-platform mobile development is high demand." },
        { skill: "iOS/Android Native", level: "Intermediate", reason: "Understanding platform specific nuances." },
        { skill: "Mobile UI/UX", level: "Advanced", reason: "Critical for touch-based user experiences." },
        { skill: "App Store Deployment", level: "Basic", reason: "Publishing and managing app releases." }
    ],
    "devops": [
        { skill: "CI/CD Pipelines", level: "Advanced", reason: "Automating integration and deployment." },
        { skill: "Cloud (AWS/Azure)", level: "Advanced", reason: "Managing cloud infrastructure." },
        { skill: "Docker/Kubernetes", level: "Advanced", reason: "Container orchestration at scale." },
        { skill: "Infrastructure as Code", level: "Intermediate", reason: "Terraform/Ansible for reproducible envs." }
    ],
    "marketing": [
        { skill: "SEO/SEM", level: "Advanced", reason: "Driving organic and paid traffic." },
        { skill: "Content Strategy", level: "Advanced", reason: "Engaging audience through value-driven content." },
        { skill: "Analytics (GA4)", level: "Intermediate", reason: "Measuring campaign performance." },
        { skill: "Social Media", level: "Intermediate", reason: "Building brand presence." }
    ]
};

export const simulateSkillGapAnalysis = async (targetRole, currentSkills) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const normalizedRole = targetRole.toLowerCase();
            // Find role key by checking if known keys are part of the input (e.g. "Senior Backend Dev" matches "backend")
            let roleKey = Object.keys(DETAILED_JOB_ROLES).find(k => normalizedRole.includes(k));

            let requiredSkills;

            if (roleKey) {
                // Use predefined detailed data
                requiredSkills = DETAILED_JOB_ROLES[roleKey];
            } else {
                // DYANMIC FALLBACK GENERATION
                // 1. Detect category keyword
                const isManagement = normalizedRole.includes('manager') || normalizedRole.includes('lead') || normalizedRole.includes('head');
                const isDesign = normalizedRole.includes('design') || normalizedRole.includes('creative') || normalizedRole.includes('art');
                const isSales = normalizedRole.includes('sales') || normalizedRole.includes('account');

                // 2. Generate Skill Names dynamically based on Input Role
                // e.g. "Java Developer" -> "Advanced Java Developer Techniques"
                const coreSkillName = isManagement ? "Team Leadership"
                    : isDesign ? "Design Software (Figma/Adobe)"
                        : `${targetRole.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} Core Skills`;

                requiredSkills = [
                    {
                        skill: coreSkillName,
                        level: "Advanced",
                        reason: `The primary requirement for all ${targetRole} positions.`
                    },
                    {
                        skill: "Industry Tools & Standards",
                        level: "Intermediate",
                        reason: "Proficiency in the specific software ecosystem for this role."
                    },
                    {
                        skill: "Communication & Strategy",
                        level: "Intermediate",
                        reason: "Bridging the gap between technical execution and business goals."
                    },
                    {
                        skill: "Project Management",
                        level: "Basic",
                        reason: "Managing deliverables and timelines effectively."
                    }
                ];
            }

            const userSkillsList = currentSkills.toLowerCase().split(',').map(s => s.trim());

            // Analyze Skills (Loose Matching)
            const gapAnalysis = requiredSkills.map(req => {
                const hasSkill = userSkillsList.some(user =>
                    user.includes(req.skill.toLowerCase().split(' ')[0]) ||
                    req.skill.toLowerCase().includes(user)
                );
                return {
                    ...req,
                    status: hasSkill ? 'acquired' : 'missing'
                };
            });

            const missingSkills = gapAnalysis.filter(s => s.status === 'missing');
            const acquiredCount = gapAnalysis.length - missingSkills.length;
            const matchScore = Math.round((acquiredCount / gapAnalysis.length) * 100);

            // Generate Learning Plan
            const learningPlan = missingSkills.map((item, index) => ({
                step: index + 1,
                action: `Master ${item.skill}`,
                resource: `Recommended: Deep dive into ${item.skill} with a capstone project relevant to ${targetRole}.`,
                timeframe: item.level === 'Advanced' ? '4-6 weeks' : '2-3 weeks'
            }));

            resolve({
                role: targetRole.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), // Capitalize User Input as Title
                score: matchScore,
                breakdown: gapAnalysis,
                plan: learningPlan
            });
        }, 1500);
    });
};
