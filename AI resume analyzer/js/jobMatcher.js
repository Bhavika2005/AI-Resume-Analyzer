// =====================================
// JOB DESCRIPTION MATCHER
// =====================================

function matchJob() {

    const jobDescription =
        document.getElementById(
            "jobDescription"
        ).value.trim();


    if (!jobDescription) {

        alert(
            "Please paste a job description."
        );

        return;
    }


    // =================================
    // GET RESUME SKILLS
    // =================================

    const resumeSkills =
        JSON.parse(
            localStorage.getItem("skills")
        ) || [];


    if (resumeSkills.length === 0) {

        alert(
            "Please analyze a resume first."
        );

        return;
    }


    // =================================
    // SKILLS DATABASE
    // =================================

    const skillDatabase = [

        "Python",
        "Java",
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

        "Machine Learning",
        "Deep Learning",

        "TensorFlow",
        "PyTorch",

        "NLP",
        "OpenCV",

        "Flask",
        "Django",

        "AWS",
        "Azure",

        "Docker",
        "Kubernetes",

        "Git",
        "GitHub",

        "Pandas",
        "NumPy",

        "Scikit-learn",

        "Power BI",
        "Excel"

    ];


    const jobText =
        jobDescription.toLowerCase();


    // =================================
    // FIND SKILLS IN JOB DESCRIPTION
    // =================================

    const requiredSkills =
        skillDatabase.filter(skill => {

            const skillLower =
                skill.toLowerCase();

            return jobText.includes(
                skillLower
            );

        });


    // =================================
    // MATCH SKILLS
    // =================================

    const matchedSkills =
        requiredSkills.filter(
            requiredSkill =>

                resumeSkills.some(
                    resumeSkill =>

                        resumeSkill.toLowerCase() ===
                        requiredSkill.toLowerCase()

                )
        );


    const missingSkills =
        requiredSkills.filter(
            requiredSkill =>

                !resumeSkills.some(
                    resumeSkill =>

                        resumeSkill.toLowerCase() ===
                        requiredSkill.toLowerCase()

                )
        );


    // =================================
    // CALCULATE SCORE
    // =================================

    let matchScore = 0;


    if (requiredSkills.length > 0) {

        matchScore =
            Math.round(
                (
                    matchedSkills.length /
                    requiredSkills.length
                ) * 100
            );

    }


    // =================================
    // DISPLAY SCORE
    // =================================

    document.getElementById(
        "matchScore"
    ).innerText =
        matchScore + "%";


    // =================================
    // DISPLAY MATCHED SKILLS
    // =================================

    const matchedPanel =
        document.getElementById(
            "matchedSkills"
        );


    matchedPanel.innerHTML = "";


    if (matchedSkills.length === 0) {

        matchedPanel.innerHTML =
            "<p>No matching skills found.</p>";

    }
    else {

        matchedSkills.forEach(skill => {

            matchedPanel.innerHTML += `

                <div class="item matched">
                    ✓ ${skill}
                </div>

            `;

        });

    }


    // =================================
    // DISPLAY MISSING SKILLS
    // =================================

    const missingPanel =
        document.getElementById(
            "missingSkills"
        );


    missingPanel.innerHTML = "";


    if (missingSkills.length === 0) {

        missingPanel.innerHTML =
            "<p>No missing skills detected.</p>";

    }
    else {

        missingSkills.forEach(skill => {

            missingPanel.innerHTML += `

                <div class="item missing">
                    ✗ ${skill}
                </div>

            `;

        });

    }


    // =================================
    // SHOW RESULT
    // =================================

    document.getElementById(
        "result"
    ).style.display = "block";

}