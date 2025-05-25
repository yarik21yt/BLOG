import api from "./axiosConfig";
import apiImage from "./axiosConfigImage";

async function login(email, password) {
    try {
        const response = await api.post("/login", {email, password}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("login error:", error)
        return null
    }
}

async function register(email, username, password, gender, birthday) {
    try {
        const response = await api.post("/register", {email, username, password, gender, birthday}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("register error:", error)
        return null
    }
}

async function logout() {
    try {
        const response = await api.post("/logout", {}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("logout error:", error)
        return null
    }
}

async function add_post(title, description) {
    try {
        const response = await api.post("/add_post", {title, description}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("add_post error:", error)
        return null
    }
}

async function get_profile() {
    try {
        const response = await api.post("/get_profile", {}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("get_profile error:", error)
        return null
    }
}

async function get_user(session_id) {
    try {
        const response = await api.post("/get_profile", {}, {withCredentials: true, headers: session_id ? {Cookie: `session_id=${session_id}`}:{}})
        return response.data
    } catch(error) {
        console.log("get_profile error:", error)
        return null
    }
}

async function get_profile_other(username) {
    try {
        const response = await api.post("/get_profile_other", {username}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("get_profile_other error:", error)
        return null
    }
}


async function get_posts() {
    try {
        const response = await api.get("/get_posts", {}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("get_posts error:", error)
        return null
    }
}

async function get_post(id) {
    try {
        const response = await api.post("/get_post", {id}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("get_post error:", error)
        return null
    }
}

async function changePassword(new_password) {
    try {
        const response = await api.post("/changePassword", {new_password}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("changePassword error:", error)
        return null
    }
}

async function changeUsername(new_username) {
    try {
        const response = await api.post("/changeUsername", {new_username}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("changeUsername error:", error)
        return null
    }
}

async function editDescription(new_description) {
    try{
        const response = await api.post("/edit_description", {new_description}, {withCredentials: true})
        return true
    } catch(error) {
        console.log("editDescription error:", error)
        return null
    }
}

async function editPicture(formData) {
    try{
        const response = await apiImage.post("/edit_picture", formData, {withCredentials: true, 
            headers:{"Content-Type":"multipart/form-data"}
        })
        return true
    } catch(error) {
        console.log("editPicture error:", error)
        return null
    }
}

async function addLike(id) {
    try {
        const response = await api.post("/addLike", {id}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("addLike error:", error)
        return null
    }
}

async function removeLike(id) {
    try {
        const response = await api.post("/removeLike", {id}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("removeLike error:", error)
        return null
    }
}


async function addComment(post_id, text) {
    try {
        const response = await api.post("/addComment", {post_id, text}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("addComment error:", error)
        return null
    }
}

async function getComments(post_id) {
    try {
        const response = await api.post("/getComments", {post_id}, {withCredentials: true})
        return response.data
    } catch(error) {
        console.log("getComments error:", error)
        return []
    }
}

export {login, register, add_post,
    changePassword, changeUsername,
    get_posts, get_post, get_profile,
    get_profile_other, logout, get_user,
    addComment, getComments, editDescription,
    editPicture, addLike, removeLike}