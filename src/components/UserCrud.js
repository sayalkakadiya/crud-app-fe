import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import UserFilter from "./UserFilter";
import Pagination from "./Pagination";
import './UserCrud.css';
import UserView from "./UserView";

const API_URL = "https://crud-app-be-n4kr.onrender.com";

const UserCRUD = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState("desc");
    const [filters, setFilters] = useState({ name: "", email: "" });
    const [isFilter, setIsFilter] = useState(false);
    const [viewUser, setViewUser] = useState(null);

    const fetchUsers = async () => {
        console.log("fetchUsers=====>");
        try {
            const res = await fetch(`${API_URL}/read?page=${page}&limit=${limit}&ts=${Date.now()}`)
            const result = await res.json();
            console.log("Fetched users====>", result)
            setUsers(result.docs || result)
            setTotalPages(result.totalPages || 1)
        } catch (error) {
            console.error("fetchusers error====>:", error)
        }
    };


    const fetchFilteredUsers = async () => {
        try {
            const query = new URLSearchParams({ page, limit })
            if (filters.name.trim()) {
                query.append(
                    "name",
                    filters.name.trim()
                )
            }

            if (filters.email.trim()) {
                query.append(
                    "email",
                    filters.email.trim()
                )
            }

            const res = await fetch(`${API_URL}/filter?${query.toString()}`)
            const result = await res.json()
            setUsers(result.docs || result)
            setTotalPages(result.totalPages || 1)
        } catch (error) {
            console.error("fetch filterusers error====>", error);
        }
    }

    useEffect(() => {

        isFilter ? fetchFilteredUsers() : fetchUsers()

    }, [page, isFilter, JSON.stringify(filters)])

    const viewUserById = async (id) => {
        try {
            const res = await fetch(`${API_URL}/view/${id}`)
            const result = await res.json()
            setViewUser(result)
        } catch (error) {
            console.error("viewuser error====>", error)
        }
    }

    const removeDuplicates = async () => {
        try {
            await fetch(`${API_URL}/duplicate`)
            fetchUsers()
        } catch (error) {
            console.error(
                "duplicates error=====>",
                error
            )
        }
    }

    const resetUsers = async () => {
        try {
            await fetch(`${API_URL}/resetduplicate`, {
                method: "DELETE"
            })
            fetchUsers()
        } catch (error) {
            console.error(
                "resetduplicate error====>",
                error
            )
        }
    }

    const handleSort = async () => {
        const newOrder = sortOrder === "desc" ? "asc" : "desc"
        setSortOrder(newOrder)

        try {
            const res = await fetch(`${API_URL}/sort?page=${page}&limit=${limit}&order=${newOrder}`)
            const result = await res.json()
            setUsers(result.docs || result)
            setTotalPages(result.totalPages || 1)
        } catch (error) {
            console.error("sort error====>", error)
        }
    }


    const resetUsersAll = async () => {
        try {
            const res = await fetch(`${API_URL}/reset`, {
                method: "DELETE"
            })
            const result = await res.json()
            alert(result.message)
            fetchUsers()
        } catch (error) {
            console.error(
                "resett alluser error====>",
                error
            )
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const addUser = async () => {
        try {
            const res = await fetch(`${API_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await res.json()

            if (!res.ok) {
                alert(result.message || "Fail to add user");
                return;
            }

            resetForm();
            setPage(1);
            isFilter ? fetchFilteredUsers() : fetchUsers()
        } catch (error) {
            console.error("adduser error====>", error);
        }
    };


    const updateUser = async () => {
        if (!editingId) {
            console.error(
                "Not editingId set not update====>"
            )
            return;
        }

        try {
            console.log(
                "Update user with id=====>",
                editingId
            )
            const res = await fetch(`${API_URL}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    _id: editingId
                })
            })
            const result = await res.json()
            console.log("Update result===>", result);
            resetForm()
            fetchUsers()
        } catch (error) {
            console.error(
                "updateuser error====>",
                error
            );
        }
    }

    const handleExportCSV = async () => {
        try {
            const response = await fetch(`${API_URL}/export/csv`)
            if (!response.ok) {
                throw new Error("Failed to export CSV");
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement("a")

            link.href = url
            link.setAttribute("download", "users.csv")
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error(
                "export CSVerror=====>",
                error
            )
            alert("Failed to export users as CSV")
        }
    };




    const deleteUser = async (id) => {
        try {
            await fetch(`${API_URL}/delete/${id}`, {
                method: "DELETE"
            });
            setPage(1)
            fetchUsers()

        } catch (error) {
            console.error(
                "deleteuser error====>",
                error
            )
        }
    }

    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            password: ""
        })
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editingId ? updateUser() : addUser()
    }
    const handleFilter = () => {
        setIsFilter(true)
        setPage(1)
    };

    const clearFilter = () => {
        setFilters({
            name: "",
            email: ""
        })
        setIsFilter(false)
        setPage(1)
        fetchUsers()
    }

    const startEdit = (user) => {
        console.log("edituser=====>", user)
        setForm({
            name: user.name,
            email: user.email,
            password: user.password
        })
        setEditingId(user._id)
    }

    return (
        <div>
            <h2>User CRUD</h2>
            <UserForm
                form={form}
                editingId={editingId}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSort={handleSort}
                removeDuplicates={removeDuplicates}
                resetUsers={resetUsers}
                resetUsersAll={resetUsersAll}
                handleExportCSV={handleExportCSV}
            />
            <UserFilter
                filters={filters}
                setFilters={setFilters}
                handleFilter={handleFilter}
                clearFilter={clearFilter}
            />
            <UserTable
                users={users}
                startEdit={startEdit}
                deleteUser={deleteUser}
                viewUserById={viewUserById}
            />
            <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
            <UserView
                viewUser={viewUser}
                setViewUser={setViewUser}
            />
        </div>
    );
};

export default UserCRUD;
