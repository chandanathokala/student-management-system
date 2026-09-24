import {
    getStudents,
    deleteStudent
} from "./service/studentService.js";

import {
    ApiException
} from "../exception/apiException.js";


// ==========================================
// STORE ALL STUDENTS
// ==========================================

let allStudents = [];


// ==========================================
// DISPLAY STUDENTS
// ==========================================

function displayStudents(students) {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    tableBody.innerHTML = "";


    // ==========================================
    // NO STUDENTS FOUND
    // ==========================================

    if (students.length === 0) {

        tableBody.innerHTML = `
            <tr>

                <td
                    colspan="8"
                    style="text-align: center;"
                >
                    No students found
                </td>

            </tr>
        `;

        return;
    }


    // ==========================================
    // CREATE STUDENT ROWS
    // ==========================================

    students.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.id}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.phone}
            </td>

            <td>
                ${student.age}
            </td>

            <td>
                ${student.course}
            </td>

            <td>
                ${student.city}
            </td>

            <td>

                <button
                    class="view-btn"
                    data-id="${student.id}"
                >
                    View
                </button>


                <button
                    class="edit-btn"
                    data-id="${student.id}"
                >
                    Edit
                </button>


                <button
                    class="delete-btn"
                    data-id="${student.id}"
                >
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    // ==========================================
    // DELETE BUTTONS
    // ==========================================

    const deleteButtons =
        document.querySelectorAll(
            ".delete-btn"
        );


    deleteButtons.forEach(button => {

        button.addEventListener(
            "click",
            async function () {

                const id =
                    this.dataset.id;


                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete this student?"
                    );


                if (!confirmDelete) {

                    return;

                }


                try {

                    await deleteStudent(id);


                    alert(
                        "Student deleted successfully!"
                    );


                    // Reload student list

                    loadStudents();

                }

                catch (error) {

                    console.error(
                        "Error deleting student:",
                        error
                    );


                    if (
                        error instanceof
                        ApiException
                    ) {

                        alert(
                            error.message
                        );

                    }

                    else {

                        alert(
                            "Failed to delete student. Please try again."
                        );

                    }

                }

            }
        );

    });


    // ==========================================
    // EDIT BUTTONS
    // ==========================================

    const editButtons =
        document.querySelectorAll(
            ".edit-btn"
        );


    editButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const id =
                    this.dataset.id;


                window.location.href =
                    `edit-student.html?id=${id}`;

            }
        );

    });


    // ==========================================
    // VIEW BUTTONS
    // ==========================================

    const viewButtons =
        document.querySelectorAll(
            ".view-btn"
        );


    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const id =
                    this.dataset.id;


                window.location.href =
                    `student-details.html?id=${id}`;

            }
        );

    });

}


// ==========================================
// LOAD STUDENTS
// ==========================================

async function loadStudents() {

    try {

        allStudents =
            await getStudents();


        displayStudents(
            allStudents
        );

    }

    catch (error) {

        console.error(
            "Failed to load students:",
            error
        );


        // ==========================================
        // API EXCEPTION
        // ==========================================

        if (
            error instanceof
            ApiException
        ) {

            const tableBody =
                document.getElementById(
                    "studentTableBody"
                );


            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="8"
                        style="
                            text-align: center;
                            padding: 30px;
                            color: red;
                        "
                    >

                        ⚠️ ${error.message}

                        <br><br>

                        Please make sure JSON Server
                        is running.

                    </td>

                </tr>

            `;

            return;
        }


        // ==========================================
        // UNKNOWN ERROR
        // ==========================================

        alert(
            "Something went wrong. Please try again."
        );

    }

}


// ==========================================
// SEARCH + COURSE FILTER
// ==========================================

function filterStudents() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const courseFilter =
        document.getElementById(
            "courseFilter"
        );


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCourse =
        courseFilter.value;


    const filteredStudents =
        allStudents.filter(student => {


            // ==========================================
            // SEARCH CONDITION
            // ==========================================

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(searchText);


            // ==========================================
            // COURSE CONDITION
            // ==========================================

            const matchesCourse =
                selectedCourse === "" ||
                student.course === selectedCourse;


            // ==========================================
            // BOTH CONDITIONS
            // ==========================================

            return (
                matchesSearch &&
                matchesCourse
            );

        });


    displayStudents(
        filteredStudents
    );

}


// ==========================================
// SEARCH INPUT
// ==========================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterStudents
    );

}


// ==========================================
// COURSE FILTER
// ==========================================

const courseFilter =
    document.getElementById(
        "courseFilter"
    );


if (courseFilter) {

    courseFilter.addEventListener(
        "change",
        filterStudents
    );

}


// ==========================================
// ADD STUDENT BUTTON
// ==========================================

const addStudentBtn =
    document.getElementById(
        "addStudentBtn"
    );


if (addStudentBtn) {

    addStudentBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "add-student.html";

        }
    );

}


// ==========================================
// START APPLICATION
// ==========================================

loadStudents();
