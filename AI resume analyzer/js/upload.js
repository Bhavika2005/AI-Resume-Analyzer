// =====================================
// ANALYZE RESUME
// =====================================

async function analyzeResume() {
        const profession =
        document.getElementById("profession").value;

    if (!profession) {

        alert(
            "Please select your profession or target field."
        );

        return;
    }

    localStorage.setItem(
        "selectedProfession",
        profession
    );

    const fileInput =
        document.getElementById("resume");

    if (!fileInput) {

        alert("Resume upload field not found.");

        return;
    }


    const file =
        fileInput.files[0];


    if (!file) {

        alert("Please select your PDF resume.");

        return;
    }
    localStorage.setItem(
    "currentResumeName",
    file.name
);


    if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    ) {

        alert("Please select a PDF file.");

        return;
    }


    try {

        console.log(
            "Analyzing:",
            file.name
        );


        const resumeText =
            await extractPDFText(file);


        if (
            !resumeText ||
            resumeText.trim().length === 0
        ) {

            alert(
                "Could not extract text from this PDF."
            );

            return;
        }


        console.log(
            "PDF text extracted successfully."
        );


        analyzeResumeText(
            resumeText
        );

    }

    catch (error) {

        console.error(
            "PDF analysis error:",
            error
        );

        alert(
            "Unable to analyze this PDF."
        );

    }
}


// =====================================
// SHOW FILE NAME
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const fileInput =
            document.getElementById("resume");


        if (!fileInput) {
            return;
        }


        fileInput.addEventListener(
            "change",
            function () {

                if (this.files.length > 0) {

                    const fileName =
                        document.getElementById(
                            "fileName"
                        );


                    if (fileName) {

                        fileName.textContent =
                            this.files[0].name;

                    }

                }

            }
        );

    }
);
// =====================================
// SAVE RESUME TO HISTORY
// =====================================

function saveResumeHistory(
    file,
    resumeText
) {

    const history =
        JSON.parse(
            localStorage.getItem(
                "resumeHistory"
            )
        ) || [];


    const skills =
        JSON.parse(
            localStorage.getItem(
                "skills"
            )
        ) || [];


    const atsScore =
        localStorage.getItem(
            "atsScore"
        ) || 0;


    const newResume = {

        fileName: file.name,

        atsScore: atsScore,

        skills: skills,

        date:
            new Date().toLocaleString(),

        resumeText: resumeText

    };


    history.unshift(
        newResume
    );


    // Keep only latest 10 resumes

    if (history.length > 10) {

        history.pop();

    }


    localStorage.setItem(
        "resumeHistory",
        JSON.stringify(history)
    );

}