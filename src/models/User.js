import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified()) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
const User = model("User", userSchema);
export default User;
