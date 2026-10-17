// =====================================
// RESUME COMPARISON
// =====================================

const container =
    document.getElementById(
        "comparisonContainer"
    );


// Get resume history

const history =
    JSON.parse(
        localStorage.getItem(
            "resumeHistory"
        )
    ) || [];


// =====================================
// CHECK HISTORY
// =====================================

if (history.length < 2) {

    container.innerHTML = `

        <div class="card">

            <h2>Not enough resumes</h2>

            <p>
                Upload at least two resumes
                to compare them.
            </p>

        </div>

    `;

} else {

    // Newest resume
    const newResume = history[0];

    // Previous resume
    const oldResume = history[1];


    // =================================
    // GET VALUES
    // =================================

    const oldScore =
        Number(oldResume.atsScore) || 0;

    const newScore =
        Number(newResume.atsScore) || 0;


    const oldSkills =
        oldResume.skills || [];

    const newSkills =
        newResume.skills || [];


    const scoreDifference =
        newScore - oldScore;


    const skillDifference =
        newSkills.length -
        oldSkills.length;


    // =================================
    // DISPLAY
    // =================================

    container.innerHTML = `

        <div class="comparison">

            <!-- OLD RESUME -->

            <div class="card">

                <h2>
                    📄 Previous Resume
                </h2>

                <p>
                    ${oldResume.fileName}
                </p>

                <div class="score">
                    ${oldScore}%
                </div>

                <p>
                    ATS Score
                </p>

                <h3>
                    Skills: ${oldSkills.length}
                </h3>

                <div>

                    ${
                        oldSkills.length > 0
                        ? oldSkills.map(
                            skill =>
                            `<div class="item">
                                ${skill}
                            </div>`
                          ).join("")
                        : "<p>No skills detected.</p>"
                    }

                </div>

            </div>


            <!-- NEW RESUME -->

            <div class="card">

                <h2>
                    📄 Latest Resume
                </h2>

                <p>
                    ${newResume.fileName}
                </p>

                <div class="score">
                    ${newScore}%
                </div>

                <p>
                    ATS Score
                </p>

                <h3>
                    Skills: ${newSkills.length}
                </h3>

                <div>

                    ${
                        newSkills.length > 0
                        ? newSkills.map(
                            skill =>
                            `<div class="item">
                                ${skill}
                            </div>`
                          ).join("")
                        : "<p>No skills detected.</p>"
                    }

                </div>

            </div>

        </div>


        <!-- IMPROVEMENT -->

        <div class="improvement">

            <h2>
                📈 Resume Improvement
            </h2>


            <div class="${
                scoreDifference >= 0
                ? "positive"
                : "negative"
            }">

                ATS Score:

                ${
                    scoreDifference > 0
                    ? "+" + scoreDifference
                    : scoreDifference
                }

            </div>


            <p>

                ${
                    scoreDifference > 0
                    ? "Your ATS score increased."
                    : scoreDifference < 0
                    ? "Your ATS score decreased."
                    : "Your ATS score remained the same."
                }

            </p>


            <div class="${
                skillDifference >= 0
                ? "positive"
                : "negative"
            }">

                Skills:

                ${
                    skillDifference > 0
                    ? "+" + skillDifference
                    : skillDifference
                }

            </div>


            <p>

                ${
                    skillDifference > 0
                    ? "You added more detected skills."
                    : skillDifference < 0
                    ? "Fewer skills were detected."
                    : "The number of detected skills stayed the same."
                }

            </p>

        </div>

    `;

}