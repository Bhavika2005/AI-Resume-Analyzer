// =====================================
// GET ANALYSIS DATA
// =====================================

const ats =
    Number(
        localStorage.getItem("atsScore")
    ) || 0;


const skills =
    JSON.parse(
        localStorage.getItem("skills")
    ) || [];


const sections =
    JSON.parse(
        localStorage.getItem("sections")
    ) || {};


const certifications =
    JSON.parse(
        localStorage.getItem("certifications")
    ) || [];


const missingSkills =
    JSON.parse(
        localStorage.getItem("missingSkills")
    ) || [];


const jobs =
    JSON.parse(
        localStorage.getItem("jobMatches")
    ) || [];


// =====================================
// RESUME NAME
// =====================================

const resumeName =
    localStorage.getItem("currentResumeName")
    || "Resume";


document.getElementById(
    "resumeName"
).innerText =
    "Resume: " + resumeName;


// =====================================
// ATS SCORE
// =====================================

document.getElementById(
    "reportATS"
).innerText =
    ats + "%";


// =====================================
// SKILLS
// =====================================

const skillsPanel =
    document.getElementById(
        "reportSkills"
    );


if (skills.length === 0) {

    skillsPanel.innerHTML =
        "<p>No skills detected.</p>";

} else {

    skills.forEach(skill => {

        skillsPanel.innerHTML += `

            <div class="item">
                ✅ ${skill}
            </div>

        `;

    });

}


// =====================================
// SECTIONS
// =====================================

const sectionPanel =
    document.getElementById(
        "reportSections"
    );


for (const section in sections) {

    sectionPanel.innerHTML += `

        <div class="item">

            ${sections[section] ? "✅" : "❌"}

            ${section}

        </div>

    `;

}


// =====================================
// CERTIFICATIONS
// =====================================

const certPanel =
    document.getElementById(
        "reportCertifications"
    );


if (certifications.length === 0) {

    certPanel.innerHTML =
        "<p>No certifications detected.</p>";

} else {

    certifications.forEach(cert => {

        certPanel.innerHTML += `

            <div class="item">
                🏆 ${cert}
            </div>

        `;

    });

}


// =====================================
// MISSING SKILLS
// =====================================

const missingPanel =
    document.getElementById(
        "reportMissingSkills"
    );


if (missingSkills.length === 0) {

    missingPanel.innerHTML =
        "<p>No missing target skills.</p>";

} else {

    missingSkills.forEach(skill => {

        missingPanel.innerHTML += `

            <div class="item">
                ❌ ${skill}
            </div>

        `;

    });

}


// =====================================
// JOB MATCHES
// =====================================

const jobsPanel =
    document.getElementById(
        "reportJobs"
    );


if (jobs.length === 0) {

    jobsPanel.innerHTML =
        "<p>No job matches available.</p>";

} else {

    jobs.forEach(job => {

        const matched =
            job.matchedSkills || [];

        const missing =
            job.missingSkills || [];


        jobsPanel.innerHTML += `

            <div class="item">

                <h3>
                    ${job.title}
                    — ${job.percentage}%
                </h3>

                <p>
                    <strong>Matched:</strong>

                    ${
                        matched.length
                        ? matched.join(", ")
                        : "None"
                    }
                </p>

                <p>
                    <strong>Missing:</strong>

                    ${
                        missing.length
                        ? missing.join(", ")
                        : "None"
                    }
                </p>

            </div>

        `;

    });

}