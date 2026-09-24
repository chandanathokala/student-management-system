import {
    getStudents,
    updateStudent
} from "./service/studentService.js";

import {
    ValidationException
} from "../exception/validationException.js";


// ==========================================
// GET FORM
// ==========================================

const form =
    document.getElementById(
        "editStudentForm"
    );


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
// LOAD STUDENT
// ==========================================

async function loadStudent() {

    try {

        const students =
            await getStudents();


        const student =
            students.find(
                student =>
                    student.id == studentId
            );


        if (!student) {

            alert(
                "Student not found."
            );

            window.location.href =
                "index.html";

            return;
        }


        // ==========================================
        // FILL FORM WITH EXISTING DATA
        // ==========================================

        document.getElementById(
            "name"
        ).value =
            student.name;


        document.getElementById(
            "email"
        ).value =
            student.email;


        document.getElementById(
            "phone"
        ).value =
            student.phone;


        document.getElementById(
            "age"
        ).value =
            student.age;


        document.getElementById(
            "course"
        ).value =
            student.course;


        document.getElementById(
            "city"
        ).value =
            student.city;

    }

    catch (error) {

        console.error(
            "Error loading student:",
            error
        );


        alert(
            "Unable to load student details."
        );

    }

}


// ==========================================
// UPDATE STUDENT
// ==========================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        try {

            // ==========================================
            // GET FORM VALUES
            // ==========================================

            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const age =
                document.getElementById(
                    "age"
                ).value;


            const course =
                document.getElementById(
                    "course"
                ).value;


            const city =
                document.getElementById(
                    "city"
                ).value.trim();


            // ==========================================
            // VALIDATION
            // ==========================================

            if (name === "") {

                throw new ValidationException(
                    "Student name is required."
                );

            }


            if (email === "") {

                throw new ValidationException(
                    "Student email is required."
                );

            }


            if (phone === "") {

                throw new ValidationException(
                    "Student phone number is required."
                );

            }


            if (age === "") {

                throw new ValidationException(
                    "Student age is required."
                );

            }


            if (course === "") {

                throw new ValidationException(
                    "Please select a course."
                );

            }


            if (city === "") {

                throw new ValidationException(
                    "Student city is required."
                );

            }


            // ==========================================
            // CREATE UPDATED STUDENT OBJECT
            // ==========================================

            const updatedStudent = {

                name: name,

                email: email,

                phone: phone,

                age: Number(age),

                course: course,

                city: city

            };


            // ==========================================
            // UPDATE STUDENT
            // ==========================================

            await updateStudent(
                studentId,
                updatedStudent
            );


            // ==========================================
            // SUCCESS MESSAGE
            // ==========================================

            alert(
                "Student updated successfully!"
            );


            // ==========================================
            // RETURN TO DASHBOARD
            // ==========================================

            window.location.href =
                "index.html";

        }


        // ==========================================
        // ERROR HANDLING
        // ==========================================

        catch (error) {

            if (
                error instanceof
                ValidationException
            ) {

                alert(
                    error.message
                );

                return;

            }


            console.error(
                "Error updating student:",
                error
            );


            alert(
                "Failed to update student. Please try again."
            );

        }

    }
);


// ==========================================
// START
// ==========================================

loadStudent();
