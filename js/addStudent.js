import { addStudent } from "./service/studentService.js";

import {
    ValidationException
} from "../exception/validationException.js";


// ==========================================
// GET FORM
// ==========================================

const form =
    document.getElementById("studentForm");


// ==========================================
// CHECK FORM
// ==========================================

if (!form) {

    console.error(
        "Student form not found."
    );

}


// ==========================================
// FORM SUBMIT
// ==========================================

if (form) {

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
                // CREATE STUDENT OBJECT
                // ==========================================

                const student = {

                    name: name,

                    email: email,

                    phone: phone,

                    age: Number(age),

                    course: course,

                    city: city

                };


                console.log(
                    "Student being added:",
                    student
                );


                // ==========================================
                // ADD STUDENT
                // ==========================================

                await addStudent(student);


                // ==========================================
                // SUCCESS
                // ==========================================

                alert(
                    "Student added successfully!"
                );


                // ==========================================
                // GO TO DASHBOARD
                // ==========================================

                window.location.href =
                    "index.html";

            }


            // ==========================================
            // VALIDATION ERROR
            // ==========================================

            catch (error) {

                console.error(
                    "Error adding student:",
                    error
                );


                if (
                    error instanceof
                    ValidationException
                ) {

                    alert(
                        error.message
                    );

                    return;

                }


                alert(
                    "Failed to add student. Please try again."
                );

            }

        }
    );

}
