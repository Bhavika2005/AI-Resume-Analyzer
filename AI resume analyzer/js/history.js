// =====================================
// RESUME HISTORY
// =====================================

const historyContainer =
    document.getElementById(
        "historyContainer"
    );


// Get saved history

const history =
    JSON.parse(
        localStorage.getItem(
            "resumeHistory"
        )
    ) || [];


// =====================================
// NO HISTORY
// =====================================

if (history.length === 0) {

    historyContainer.innerHTML = `

        <div class="empty">

            <h2>No Resume History</h2>

            <p>
                Analyze a resume to see it here.
            </p>

        </div>

    `;

}


// =====================================
// DISPLAY HISTORY
// =====================================

history.forEach(
    (resume, index) => {

        const skills =
            resume.skills || [];


        historyContainer.innerHTML += `

            <div class="history-card">

                <h2>
                    📄 ${resume.fileName}
                </h2>

                <div class="score">
                    ATS Score:
                    ${resume.atsScore}%
                </div>

                <div class="date">
                    ${resume.date}
                </div>

                <div class="skills">

                    <strong>
                        Skills:
                    </strong>

                    ${
                        skills.length > 0
                        ? skills.join(", ")
                        : "No skills detected"
                    }

                </div>

            </div>

        `;

    }
);
function clearResumeHistory() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear all resume history?"
        );

    if (!confirmClear) {
        return;
    }

    localStorage.removeItem("resumeHistory");

    alert("Resume history cleared successfully.");

    location.reload();
}