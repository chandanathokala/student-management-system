import {
    getStudents
} from "./service/studentService.js";


// ==========================================
// GET STUDENT ID FROM URL
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const studentId =
    params.get("id");


// ==========================================
// LOAD STUDENT DETAILS
// ==========================================

async function loadStudentDetails() {

    try {

        const students =
            await getStudents();


        const student =
            students.find(
                student =>
                    student.id == studentId
            );


        // Check whether student exists

        if (!student) {

            alert(
                "Student not found."
            );

            window.location.href =
                "index.html";

            return;
        }


        // ==========================================
        // DISPLAY STUDENT INFORMATION
        // ==========================================

        document.getElementById(
            "studentId"
        ).textContent =
            student.id;


        document.getElementById(
            "studentName"
        ).textContent =
            student.name;


        document.getElementById(
            "studentEmail"
        ).textContent =
            student.email;


        document.getElementById(
            "studentPhone"
        ).textContent =
            student.phone;


        document.getElementById(
            "studentAge"
        ).textContent =
            student.age;


        document.getElementById(
            "studentCourse"
        ).textContent =
            student.course;


        document.getElementById(
            "studentCity"
        ).textContent =
            student.city;

    }

    catch (error) {

        console.error(
            "Failed to load student details:",
            error
        );

    }

}


// ==========================================
// BACK BUTTON
// ==========================================

const backBtn =
    document.getElementById(
        "backBtn"
    );


if (backBtn) {

    backBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );

}


// ==========================================
// START
// ==========================================

loadStudentDetails();
