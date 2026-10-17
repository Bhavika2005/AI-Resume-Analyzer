// ===============================
// LOAD ATS SCORE
// ===============================
console.log("Dashboard Loaded");
console.log(localStorage);
let atsScore = parseInt(localStorage.getItem("atsScore")) || 82;

document.getElementById("atsScore").innerText = atsScore + "%";

// ===============================
// RESUME STRENGTH
// ===============================

let strength = "";

if (atsScore >= 90) {
    strength = "Excellent ⭐⭐⭐⭐⭐";
} else if (atsScore >= 75) {
    strength = "Good ⭐⭐⭐⭐";
} else if (atsScore >= 50) {
    strength = "Average ⭐⭐⭐";
} else {
    strength = "Needs Improvement ⭐⭐";
}

document.getElementById("strength").innerText = strength;

// ===============================
// SKILLS FOUND
// ===============================

let skills =
    JSON.parse(localStorage.getItem("skills")) || [];

document.getElementById("skillsCount").innerText = skills.length;

skillsPanel.innerHTML = "";
skills.forEach(skill => {

    skillsPanel.innerHTML += `
        <div class="list-item">
            ✅ ${skill}
        </div>
    `;

});

// ===============================
// RESUME SECTIONS
// ===============================

const sectionData =
    JSON.parse(localStorage.getItem("sections")) || {};

const sectionContainer =
    document.getElementById("resumeSections");

sectionContainer.innerHTML = "";

if (Object.keys(sectionData).length === 0) {

    sectionContainer.innerHTML =
        "<p>No resume sections found.</p>";

} else {

    for (const section in sectionData) {

        sectionContainer.innerHTML += `

        <div class="list-item">

            <span>${section}</span>

            <span>${sectionData[section] ? "✅" : "❌"}</span>

        </div>

        `;

    }

}
// ===============================
// MISSING SKILLS
// ===============================

let missingSkills =
    JSON.parse(localStorage.getItem("missingSkills")) || [];
let missingPanel =
    document.getElementById("missingSkills");

missingPanel.innerHTML = "";
missingSkills.forEach(skill => {

    missingPanel.innerHTML += `
        <div class="list-item">
            ❌ ${skill}
        </div>
    `;

});

// ===============================
// AI SUGGESTIONS
// ===============================

// =====================================
// DYNAMIC AI SUGGESTIONS
// =====================================

const suggestionPanel =
    document.getElementById("suggestions");

suggestionPanel.innerHTML = "";


// Get resume data

const resumeSections =
    JSON.parse(
        localStorage.getItem("sections")
    ) || {};

const missingSkillsData =
    JSON.parse(
        localStorage.getItem("missingSkills")
    ) || [];


// Store suggestions

let dynamicSuggestions = [];


// =====================================
// CHECK RESUME SECTIONS
// =====================================

if (!resumeSections.Experience) {

    dynamicSuggestions.push(
        "Add internship or work experience to strengthen your resume."
    );

}


if (!resumeSections.Projects) {

    dynamicSuggestions.push(
        "Add academic or personal projects related to your target job."
    );

}


if (!resumeSections.Certifications) {

    dynamicSuggestions.push(
        "Add relevant certifications or online courses."
    );

}


if (!resumeSections.Achievements) {

    dynamicSuggestions.push(
        "Include achievements, awards, or measurable accomplishments."
    );

}


// =====================================
// CHECK MISSING SKILLS
// =====================================

if (missingSkillsData.length > 0) {

    dynamicSuggestions.push(
        "Consider adding these relevant skills: " +
        missingSkillsData.join(", ") +
        "."
    );

}


// =====================================
// GENERAL SUGGESTIONS
// =====================================

dynamicSuggestions.push(
    "Use strong action verbs such as developed, implemented, designed, and analyzed."
);

dynamicSuggestions.push(
    "Add measurable results wherever possible, such as percentages, numbers, or performance improvements."
);


// =====================================
// DISPLAY SUGGESTIONS
// =====================================

dynamicSuggestions.forEach(
    suggestion => {

        suggestionPanel.innerHTML += `

            <div class="item">
                💡 ${suggestion}
            </div>

        `;

    }
);

let suggestionPanel = document.getElementById("suggestions");

suggestions.forEach(item => {

    suggestionPanel.innerHTML += `
        <div class="list-item">
            💡 ${item}
        </div>
    `;

});

// ===============================
// RECOMMENDED JOBS
// ===============================
let jobMatches =

    calculateJobMatches(skills);
let panel =
    document.getElementById("recommendedJobs");
panel.innerHTML = "";

jobMatches.forEach(job => {

    panel.innerHTML += `

<div class="list-item">

<span>${job.title}</span>

<span>${job.percentage}%</span>

</div>

`;

});

// ===============================
// CERTIFICATIONS
// ===============================

let certs =
    JSON.parse(localStorage.getItem("certifications")) || [];

let certPanel =
    document.getElementById("certifications");

certPanel.innerHTML = "";

certs.forEach(cert => {

    certPanel.innerHTML += `

    <div class="list-item">

        🏆 ${cert}

    </div>

    `;

});