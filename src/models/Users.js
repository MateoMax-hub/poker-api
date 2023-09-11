import mongoose from "mongoose";

const Users = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    membershipUntil: {
        type: Date,
    },
    hasMembership: {
        type: Boolean,
        default: false
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    }
})

const model = mongoose.model('users', Users)
export default model;
