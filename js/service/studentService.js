import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";

import API_URL from "./apiConfig.js";

import {
    ApiException
} from "../../exception/apiException.js";


// ==========================================
// GET ALL STUDENTS
// ==========================================

export async function getStudents() {

    try {

        const response =
            await axios.get(
                `${API_URL}/students`
            );

        return response.data;

    }

    catch (error) {

        console.error(
            "GET students error:",
            error
        );

        throw new ApiException(
            "Unable to fetch students.",
            error.response?.status
        );

    }

}


// ==========================================
// ADD STUDENT
// ==========================================

export async function addStudent(student) {

    try {

        const response =
            await axios.post(
                `${API_URL}/students`,
                student
            );

        return response.data;

    }

    catch (error) {

        console.error(
            "POST student error:",
            error
        );

        throw new ApiException(
            "Unable to add student.",
            error.response?.status
        );

    }

}


// ==========================================
// DELETE STUDENT
// ==========================================

export async function deleteStudent(id) {

    try {

        const response =
            await axios.delete(
                `${API_URL}/students/${id}`
            );

        return response.data;

    }

    catch (error) {

        console.error(
            "DELETE student error:",
            error
        );

        throw new ApiException(
            "Unable to delete student.",
            error.response?.status
        );

    }

}


// ==========================================
// UPDATE STUDENT
// ==========================================

export async function updateStudent(
    id,
    student
) {

    try {

        const response =
            await axios.put(
                `${API_URL}/students/${id}`,
                student
            );

        return response.data;

    }

    catch (error) {

        console.error(
            "PUT student error:",
            error
        );

        throw new ApiException(
            "Unable to update student.",
            error.response?.status
        );

    }

}
