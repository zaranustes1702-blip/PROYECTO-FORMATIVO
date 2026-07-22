const {
    getAllUsers,
    getUserById,
    userCreate,
    UserUpdate,
    userDelete
} = require("../services/userServices");

const Response = require("../functions/response");

const getUsers = async (req, res) => {
    try{
        const users = await getAllUsers();
        
        var response = new Response(
            true, 
            "Usuarios obtenidos exitosamente", 
            users
        ); 
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllUsersById = async (req, res) => {
    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response(false, "Error al obtener el usuario", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const user = await getUserById(id);

        // Validación de existencia del ID
        if (!user) {
            var response = new Response(
                false,
                "El usuario no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }

        var response = new Response(true, "Usuario obtenido exitosamente", user);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo usuario:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            documentId,
            postJob
        } = req.body;

        var errors = [];

        if (!name || name.trim() === "") {
            errors.push("El nombre del usuario es obligatorio");
        }

        if (!email || email.trim() === "") {
            errors.push("El correo del usuario es obligatorio");
        }

        if (!password || password.trim() === "") {
            errors.push("La contraseña es obligatoria");
        }

        if (!documentId || documentId.trim() === "") {
            errors.push("El documento de identidad es obligatorio");
        }

        if (!postJob || postJob.trim() === "") {
            errors.push("El cargo del usuario es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al crear el usuario", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            name,
            email,
            password,
            documentId,
            postJob
        };

        const user = await userCreate(data);

        var response = new Response(true, "Usuario creado exitosamente", user);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear usuario:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            email,
            password,
            documentId,
            postJob
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }

        if (!name || name.trim() === "") {
            errors.push("El nombre del usuario es obligatorio");
        }

        if (!email || email.trim() === "") {
            errors.push("El correo del usuario es obligatorio");
        }

        if (!password || password.trim() === "") {
            errors.push("La contraseña es obligatoria");
        }

        if (!documentId || documentId.trim() === "") {
            errors.push("El documento de identidad es obligatorio");
        }

        if (!postJob || postJob.trim() === "") {
            errors.push("El cargo del usuario es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar el usuario", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            name,
            email,
            password,
            documentId,
            postJob
        };

        const user = await UserUpdate(id, data);

        var response = new Response(true, "Usuario actualizado exitosamente", user);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar usuario:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al eliminar el usuario", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }
        data = { id };
        const user = await userDelete(id);

        var response = new Response(true, "Usuario eliminado exitosamente", user);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en deleteUser:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getUsers,
    getAllUsersById,
    createUser,
    updateUser,
    deleteUser
};