import mongoose from "mongoose";

const Payments = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expiration: {
    type: Date,
    required: true,
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 31);
      return currentDate;
    },
  },
});

const model = mongoose.model("payments", Payments);
export default model;
