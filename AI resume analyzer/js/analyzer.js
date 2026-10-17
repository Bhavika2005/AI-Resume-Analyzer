// =====================================
// PDF TEXT EXTRACTION
// =====================================

async function extractPDFText(file) {

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

        const page = await pdf.getPage(pageNumber);

        const content = await page.getTextContent();

        const pageText = content.items
            .map(item => item.str)
            .join(" ");

        text += pageText + " ";
    }

    return text;
}


// =====================================
// SKILLS DATABASE
// =====================================

const skillsDatabase = [

    // =========================
    // TECHNOLOGY & ENGINEERING
    // =========================

    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "SQL",
    "PostgreSQL",

    // AI / DATA

    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "NLP",
    "Natural Language Processing",
    "Computer Vision",
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Data Science",
    "Data Analysis",
    "Statistics",
    "Power BI",
    "Tableau",
    "Excel",

    // CLOUD / DEVOPS

    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "Linux",

    // CYBERSECURITY

    "Cybersecurity",
    "Network Security",
    "Ethical Hacking",
    "Penetration Testing",
    "Cryptography",

    // =========================
    // BUSINESS & MANAGEMENT
    // =========================

    "Business Analysis",
    "Business Strategy",
    "Project Management",
    "Operations Management",
    "Risk Management",
    "Supply Chain Management",
    "Business Development",
    "Management",
    "Leadership",

    // =========================
    // MARKETING & SALES
    // =========================

    "Digital Marketing",
    "Marketing",
    "Content Marketing",
    "Social Media Marketing",
    "Email Marketing",
    "SEO",
    "SEM",
    "Google Ads",
    "Meta Ads",
    "Market Research",
    "Brand Management",
    "Sales",
    "Lead Generation",
    "Customer Relationship Management",
    "CRM",

    // =========================
    // HUMAN RESOURCES
    // =========================

    "Human Resources",
    "Recruitment",
    "Talent Acquisition",
    "Employee Relations",
    "HR Operations",
    "Payroll",
    "Performance Management",
    "Training and Development",

    // =========================
    // FINANCE & ACCOUNTING
    // =========================

    "Accounting",
    "Financial Analysis",
    "Financial Modeling",
    "Financial Planning",
    "Investment Analysis",
    "Banking",
    "Auditing",
    "Taxation",
    "Bookkeeping",
    "Tally",
    "QuickBooks",

    // =========================
    // DESIGN & CREATIVE
    // =========================

    "UI/UX Design",
    "User Experience",
    "User Interface Design",
    "Graphic Design",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Figma",
    "Canva",
    "Video Editing",
    "Photography",
    "Animation",

    // =========================
    // HEALTHCARE
    // =========================

    "Nursing",
    "Patient Care",
    "Healthcare Management",
    "Clinical Research",
    "Medical Research",
    "Pharmacy",
    "Public Health",

    // =========================
    // EDUCATION & RESEARCH
    // =========================

    "Teaching",
    "Training",
    "Curriculum Development",
    "Academic Research",
    "Research",
    "Lesson Planning",
    "Classroom Management",

    // =========================
    // LAW & COMPLIANCE
    // =========================

    "Legal Research",
    "Contract Management",
    "Compliance",
    "Corporate Law",
    "Litigation",
    "Legal Writing",

    // =========================
    // HOSPITALITY & SERVICE
    // =========================

    "Customer Service",
    "Hotel Management",
    "Hospitality",
    "Event Management",
    "Event Planning",
    "Travel Management",

    // =========================
    // GENERAL PROFESSIONAL SKILLS
    // =========================

    "Communication",
    "Verbal Communication",
    "Written Communication",
    "Public Speaking",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Critical Thinking",
    "Creativity",
    "Adaptability",
    "Negotiation",
    "Presentation",
    "Organization"
];


// =====================================
// SKILL DETECTION
// =====================================

function detectSkills(text) {

    const detected = [];

    const lowerText = text.toLowerCase();

    skillsDatabase.forEach(skill => {

        const skillLower = skill.toLowerCase();

        // Special handling for one-letter C
        if (skill === "C") {

            const regex = /(^|[\s,.;:()\/+\-])c([\s,.;:()\/+\-]|$)/i;

            if (regex.test(text)) {
                detected.push(skill);
            }

            return;
        }

        // Word/phrase boundary matching
        const escapedSkill =
            skillLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(
            "(^|[^a-z0-9+#])" +
            escapedSkill +
            "([^a-z0-9+#]|$)",
            "i"
        );

        if (regex.test(lowerText)) {
            detected.push(skill);
        }

    });

    return detected;
}


// =====================================
// RESUME SECTIONS
// =====================================

function analyzeSections(text) {

    const resume = text.toLowerCase();

    return {

        Education:
            /\beducation\b|\bacademic\b/.test(resume),

        Skills:
            /\bskills\b|\btechnical skills\b/.test(resume),

        Projects:
            /\bprojects?\b/.test(resume),

        Experience:
            /\bexperience\b|\bwork experience\b|\binternship\b|\bemployment\b/.test(resume),

        Certifications:
            /\bcertifications?\b|\bcertificates?\b/.test(resume),

        Achievements:
            /\bachievements?\b|\bawards?\b/.test(resume)

    };
}


// =====================================
// CERTIFICATION DETECTION
// =====================================

function extractCertifications(text) {

    const certifications = [];

    const certificationKeywords = [

        "AWS",
        "Coursera",
        "EduSkills",
        "Juniper",
        "Google",
        "Microsoft",
        "Cisco",
        "Oracle",
        "IBM",
        "Udemy"

    ];

    const lowerText = text.toLowerCase();

    certificationKeywords.forEach(cert => {

        if (lowerText.includes(cert.toLowerCase())) {

            certifications.push(cert);

        }

    });

    return certifications;
}


// =====================================
// ATS SCORE
// =====================================

function calculateATS(skills, sections) {

    let score = 0;

    // Skills = maximum 30 points
    score += Math.min(skills.length * 3, 30);

    // Education = 15
    if (sections.Education) {
        score += 15;
    }

    // Skills section = 10
    if (sections.Skills) {
        score += 10;
    }

    // Projects = 15
    if (sections.Projects) {
        score += 15;
    }

    // Experience = 15
    if (sections.Experience) {
        score += 15;
    }

    // Certifications = 10
    if (sections.Certifications) {
        score += 10;
    }

    // Achievements = 5
    if (sections.Achievements) {
        score += 5;
    }

    return Math.min(score, 100);
}

// =====================================
// PROFESSION PROFILES
// =====================================

const professionProfiles = {

    software: {

        skills: [
            "Python",
            "Java",
            "JavaScript",
            "HTML",
            "CSS",
            "React",
            "Node.js",
            "SQL",
            "Git",
            "GitHub"
        ],

        jobs: [
            {
                title: "Software Developer",
                skills: [
                    "Python",
                    "Java",
                    "JavaScript",
                    "SQL",
                    "Git"
                ]
            },

            {
                title: "Web Developer",
                skills: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Git"
                ]
            },

            {
                title: "Frontend Developer",
                skills: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React"
                ]
            }
        ]
    },


    aiml: {

        skills: [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "TensorFlow",
            "PyTorch",
            "NLP",
            "OpenCV",
            "NumPy",
            "Pandas",
            "Scikit-learn"
        ],

        jobs: [
            {
                title: "AI Engineer",
                skills: [
                    "Python",
                    "Machine Learning",
                    "TensorFlow",
                    "NLP"
                ]
            },

            {
                title: "ML Engineer",
                skills: [
                    "Python",
                    "Machine Learning",
                    "PyTorch",
                    "Scikit-learn"
                ]
            },

            {
                title: "Computer Vision Engineer",
                skills: [
                    "Python",
                    "Machine Learning",
                    "OpenCV",
                    "Deep Learning"
                ]
            }
        ]
    },


    data: {

        skills: [
            "Python",
            "SQL",
            "Excel",
            "Power BI",
            "Pandas",
            "NumPy",
            "Statistics",
            "Data Analysis"
        ],

        jobs: [
            {
                title: "Data Analyst",
                skills: [
                    "Python",
                    "SQL",
                    "Excel",
                    "Power BI"
                ]
            },

            {
                title: "Business Data Analyst",
                skills: [
                    "SQL",
                    "Excel",
                    "Power BI",
                    "Data Analysis"
                ]
            },

            {
                title: "Data Scientist",
                skills: [
                    "Python",
                    "Machine Learning",
                    "Statistics",
                    "Pandas"
                ]
            }
        ]
    },


    business: {

        skills: [
            "Business Analysis",
            "Business Strategy",
            "Project Management",
            "Communication",
            "Leadership",
            "Problem Solving",
            "Excel",
            "Presentation"
        ],

        jobs: [
            {
                title: "Business Analyst",
                skills: [
                    "Business Analysis",
                    "Excel",
                    "Communication",
                    "Problem Solving"
                ]
            },

            {
                title: "Project Coordinator",
                skills: [
                    "Project Management",
                    "Communication",
                    "Teamwork",
                    "Time Management"
                ]
            },

            {
                title: "Business Development Executive",
                skills: [
                    "Business Development",
                    "Communication",
                    "Negotiation",
                    "Presentation"
                ]
            }
        ]
    },


    marketing: {

        skills: [
            "Marketing",
            "Digital Marketing",
            "SEO",
            "Content Marketing",
            "Social Media Marketing",
            "Email Marketing",
            "Market Research",
            "Google Ads",
            "Communication",
            "Creativity"
        ],

        jobs: [
            {
                title: "Digital Marketing Specialist",
                skills: [
                    "Digital Marketing",
                    "SEO",
                    "Social Media Marketing",
                    "Google Ads"
                ]
            },

            {
                title: "Content Marketing Specialist",
                skills: [
                    "Content Marketing",
                    "Marketing",
                    "Creativity",
                    "Communication"
                ]
            },

            {
                title: "Social Media Manager",
                skills: [
                    "Social Media Marketing",
                    "Content Marketing",
                    "Creativity",
                    "Communication"
                ]
            }
        ]
    },


    finance: {

        skills: [
            "Accounting",
            "Financial Analysis",
            "Financial Modeling",
            "Excel",
            "Financial Planning",
            "Banking",
            "Auditing",
            "Taxation",
            "Statistics"
        ],

        jobs: [
            {
                title: "Financial Analyst",
                skills: [
                    "Financial Analysis",
                    "Excel",
                    "Financial Modeling",
                    "Statistics"
                ]
            },

            {
                title: "Accountant",
                skills: [
                    "Accounting",
                    "Excel",
                    "Auditing",
                    "Taxation"
                ]
            },

            {
                title: "Banking Associate",
                skills: [
                    "Banking",
                    "Financial Analysis",
                    "Communication",
                    "Excel"
                ]
            }
        ]
    },


    hr: {

        skills: [
            "Human Resources",
            "Recruitment",
            "Talent Acquisition",
            "Employee Relations",
            "HR Operations",
            "Communication",
            "Teamwork",
            "Leadership"
        ],

        jobs: [
            {
                title: "HR Specialist",
                skills: [
                    "Human Resources",
                    "Recruitment",
                    "Communication",
                    "Employee Relations"
                ]
            },

            {
                title: "Talent Acquisition Specialist",
                skills: [
                    "Talent Acquisition",
                    "Recruitment",
                    "Communication",
                    "Teamwork"
                ]
            },

            {
                title: "HR Operations Executive",
                skills: [
                    "HR Operations",
                    "Human Resources",
                    "Communication",
                    "Excel"
                ]
            }
        ]
    },


    design: {

        skills: [
            "UI/UX Design",
            "User Experience",
            "User Interface Design",
            "Figma",
            "Canva",
            "Adobe Photoshop",
            "Graphic Design",
            "Creativity"
        ],

        jobs: [
            {
                title: "UI/UX Designer",
                skills: [
                    "UI/UX Design",
                    "Figma",
                    "User Experience",
                    "Creativity"
                ]
            },

            {
                title: "Graphic Designer",
                skills: [
                    "Graphic Design",
                    "Adobe Photoshop",
                    "Canva",
                    "Creativity"
                ]
            },

            {
                title: "Visual Designer",
                skills: [
                    "Graphic Design",
                    "UI/UX Design",
                    "Creativity",
                    "Adobe Photoshop"
                ]
            }
        ]
    },


    education: {

        skills: [
            "Teaching",
            "Training",
            "Communication",
            "Presentation",
            "Lesson Planning",
            "Classroom Management",
            "Research"
        ],

        jobs: [
            {
                title: "Teacher",
                skills: [
                    "Teaching",
                    "Communication",
                    "Lesson Planning",
                    "Classroom Management"
                ]
            },

            {
                title: "Corporate Trainer",
                skills: [
                    "Training",
                    "Communication",
                    "Presentation",
                    "Leadership"
                ]
            },

            {
                title: "Academic Researcher",
                skills: [
                    "Research",
                    "Academic Research",
                    "Communication",
                    "Statistics"
                ]
            }
        ]
    },


    healthcare: {

        skills: [
            "Nursing",
            "Patient Care",
            "Healthcare Management",
            "Clinical Research",
            "Medical Research",
            "Pharmacy",
            "Public Health",
            "Communication"
        ],

        jobs: [
            {
                title: "Healthcare Administrator",
                skills: [
                    "Healthcare Management",
                    "Communication",
                    "Organization",
                    "Problem Solving"
                ]
            },

            {
                title: "Clinical Research Assistant",
                skills: [
                    "Clinical Research",
                    "Medical Research",
                    "Statistics",
                    "Communication"
                ]
            },

            {
                title: "Nursing Professional",
                skills: [
                    "Nursing",
                    "Patient Care",
                    "Communication",
                    "Teamwork"
                ]
            }
        ]
    },


    law: {

        skills: [
            "Legal Research",
            "Contract Management",
            "Compliance",
            "Corporate Law",
            "Litigation",
            "Legal Writing",
            "Communication",
            "Negotiation"
        ],

        jobs: [
            {
                title: "Legal Researcher",
                skills: [
                    "Legal Research",
                    "Legal Writing",
                    "Communication",
                    "Critical Thinking"
                ]
            },

            {
                title: "Compliance Executive",
                skills: [
                    "Compliance",
                    "Contract Management",
                    "Communication",
                    "Legal Research"
                ]
            },

            {
                title: "Legal Associate",
                skills: [
                    "Corporate Law",
                    "Litigation",
                    "Legal Writing",
                    "Negotiation"
                ]
            }
        ]
    },


    hospitality: {

        skills: [
            "Hospitality",
            "Hotel Management",
            "Customer Service",
            "Event Management",
            "Event Planning",
            "Communication",
            "Teamwork",
            "Leadership"
        ],

        jobs: [
            {
                title: "Hotel Manager",
                skills: [
                    "Hotel Management",
                    "Hospitality",
                    "Leadership",
                    "Customer Service"
                ]
            },

            {
                title: "Event Coordinator",
                skills: [
                    "Event Management",
                    "Event Planning",
                    "Communication",
                    "Organization"
                ]
            },

            {
                title: "Guest Relations Executive",
                skills: [
                    "Customer Service",
                    "Hospitality",
                    "Communication",
                    "Teamwork"
                ]
            }
        ]
    },


    research: {

        skills: [
            "Research",
            "Academic Research",
            "Data Analysis",
            "Statistics",
            "Critical Thinking",
            "Communication",
            "Problem Solving"
        ],

        jobs: [
            {
                title: "Research Assistant",
                skills: [
                    "Research",
                    "Data Analysis",
                    "Statistics",
                    "Critical Thinking"
                ]
            },

            {
                title: "Research Analyst",
                skills: [
                    "Research",
                    "Data Analysis",
                    "Problem Solving",
                    "Communication"
                ]
            }
        ]
    },


    other: {

        skills: [
            "Communication",
            "Teamwork",
            "Problem Solving",
            "Leadership",
            "Time Management",
            "Creativity",
            "Adaptability"
        ],

        jobs: [
            {
                title: "Project Coordinator",
                skills: [
                    "Communication",
                    "Teamwork",
                    "Time Management",
                    "Organization"
                ]
            },

            {
                title: "Customer Service Executive",
                skills: [
                    "Customer Service",
                    "Communication",
                    "Problem Solving",
                    "Teamwork"
                ]
            }
        ]
    }

};
// =====================================
// FIELD-SPECIFIC MISSING SKILLS
// =====================================

function getMissingSkills(
    skills,
    profession
) {

    const profile =
        professionProfiles[profession] ||
        professionProfiles.other;


    const normalizedSkills =
        skills.map(skill =>
            normalizeSkill(skill)
        );


    return profile.skills.filter(
        requiredSkill => {

            const normalizedRequired =
                normalizeSkill(requiredSkill);

            return !normalizedSkills.includes(
                normalizedRequired
            );

        }
    );

}


// =====================================
// NORMALIZE SKILL NAMES
// =====================================

function normalizeSkill(skill) {

    return skill
        .toLowerCase()
        .replace(/[^a-z0-9+#]+/g, "")
        .trim();

}


// =====================================
// FIELD-SPECIFIC JOB MATCHING
// =====================================

function calculateJobMatches(
    skills,
    profession
) {

    const profile =
        professionProfiles[profession] ||
        professionProfiles.other;


    const normalizedSkills =
        skills.map(skill =>
            normalizeSkill(skill)
        );


    return profile.jobs.map(job => {

        const matchedSkills = [];
        const missingSkills = [];


        job.skills.forEach(
            requiredSkill => {

                const normalizedRequired =
                    normalizeSkill(
                        requiredSkill
                    );


                const isMatched =
                    normalizedSkills.includes(
                        normalizedRequired
                    );


                if (isMatched) {

                    matchedSkills.push(
                        requiredSkill
                    );

                }
                else {

                    missingSkills.push(
                        requiredSkill
                    );

                }

            }
        );


        const percentage =
            job.skills.length > 0
            ? Math.round(
                (
                    matchedSkills.length /
                    job.skills.length
                ) * 100
            )
            : 0;


        return {

            title:
                job.title,

            percentage:
                percentage,

            matchedSkills:
                matchedSkills,

            missingSkills:
                missingSkills

        };

    }).sort(
        (a, b) =>
            b.percentage -
            a.percentage
    );

}

// =====================================
// MAIN RESUME ANALYSIS
// =====================================

function analyzeResumeText(text) {

    console.log("===== RESUME ANALYSIS =====");

    console.log("Resume text:", text);


    const detectedSkills =
        detectSkills(text);

    console.log(
        "Detected skills:",
        detectedSkills
    );


    const sections =
        analyzeSections(text);

    console.log(
        "Sections:",
        sections
    );


    const certifications =
        extractCertifications(text);

    console.log(
        "Certifications:",
        certifications
    );


    const ats =
        calculateATS(
            detectedSkills,
            sections
        );

    console.log(
        "ATS Score:",
        ats
    );


    // =====================================
// SELECTED PROFESSION
// =====================================

const selectedProfession =
    localStorage.getItem(
        "selectedProfession"
    ) || "other";


console.log(
    "Selected profession:",
    selectedProfession
);


// =====================================
// FIELD-SPECIFIC ANALYSIS
// =====================================

const missingSkills =
    getMissingSkills(
        detectedSkills,
        selectedProfession
    );


const jobs =
    calculateJobMatches(
        detectedSkills,
        selectedProfession
    );


    // =================================
    // CLEAR OLD DATA
    // =================================

    localStorage.removeItem("atsScore");
    localStorage.removeItem("skills");
    localStorage.removeItem("sections");
    localStorage.removeItem("missingSkills");
    localStorage.removeItem("jobMatches");
    localStorage.removeItem("certifications");


    // =================================
    // SAVE NEW DATA
    // =================================

    localStorage.setItem(
        "resumeText",
        text
    );

    localStorage.setItem(
        "skills",
        JSON.stringify(detectedSkills)
    );

    localStorage.setItem(
        "sections",
        JSON.stringify(sections)
    );

    localStorage.setItem(
        "atsScore",
        String(ats)
    );

    localStorage.setItem(
        "missingSkills",
        JSON.stringify(missingSkills)
    );

    localStorage.setItem(
        "jobMatches",
        JSON.stringify(jobs)
    );

    localStorage.setItem(
        "certifications",
        JSON.stringify(certifications)
    );


    console.log("===== DATA SAVED =====");

    console.log(
        "ATS:",
        localStorage.getItem("atsScore")
    );

    console.log(
        "Skills:",
        localStorage.getItem("skills")
    );

    console.log(
        "Certifications:",
        localStorage.getItem("certifications")
    );




   // =================================
// SAVE RESUME HISTORY
// =================================

const history =
    JSON.parse(
        localStorage.getItem(
            "resumeHistory"
        )
    ) || [];


const historyItem = {

    fileName:
        localStorage.getItem(
            "currentResumeName"
        ) || "Resume",

    atsScore: ats,

    skills: detectedSkills,

    date:
        new Date().toLocaleString(),

    resumeText: text

};


history.unshift(
    historyItem
);


// Keep latest 10

if (history.length > 10) {

    history.pop();

}


localStorage.setItem(
    "resumeHistory",
    JSON.stringify(history)
);


// =================================
// GO TO DASHBOARD
// =================================

window.location.href =
    "dashboard.html";
}