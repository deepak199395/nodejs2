import express from "express";
import UserModels from "../models/UserModels.js";

export const userController = async (req, res) => {
    try {
        const { name, lastname, email, password, phone } = req.body;

        // Validation
        if (!name) {
            return res.status(400).send("Name is required");
        }
        if (!lastname) {
            return res.status(400).send("Lastname is required");
        }
        if (!email) {
            return res.status(400).send("Email is required");
        }
        if (!password) {
            return res.status(400).send("Password is required");
        }
        if (!phone) {
            return res.status(400).send("Phone is required");
        }

        // Check existing user
        const existingUser = await UserModels.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists. You can login.");
        }

        // Create a new user
        const newUser = await UserModels.create({
            name,
            lastname,
            email,
            password,
            phone
        });

        res.status(201).send({
            status: "success",
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send("Internal Server Error");
    }
};

export const getuserdetailsControlller=async(req,res)=>{
try {
    const getuser= await UserModels.find({})
    if (!users || users.length === 0) {
        return res.status(404).send("No users found");
    }


    res.status(500).send({
        status:"succse",
        message:"get all data succsessfully",
        getuser,
    })
} catch (error) {
    console.log(`error is api ${error}`);
    res.status(200).send("internal server Error")
}
}



export const userUpdateController = async (req, res) => {
    try {
        const user = await UserModels.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.lastname = req.body.lastname || user.lastname;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            
            // Check if password is provided in the request body
            if (req.body.password) {
                user.password = req.body.password;
            }
            
            const updateUser = await user.save();
            res.status(200).send({
                status: "success",
                message: "User updated successfully",
                _id: updateUser._id,
                name: updateUser.name,
                lastname: updateUser.lastname,
                email: updateUser.email,
                password: updateUser.password
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "User not found"
            });
        }
    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error"
        });
    }
};



export const deleteUserController = async (req, res) => {
    try {
        const user = await UserModels.findById(req.params.id);
        if (user) {
            await user.deleteOne(); // Use deleteOne() method to remove the document
            res.status(200).send({
                success: true,
                message: "User deleted successfully",
            });
        } else {
            res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        console.log("Internal server error:", error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};