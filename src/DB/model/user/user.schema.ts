import { Schema } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { sendMail } from "../../../utils/email";

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        if (this.userAgent == USER_AGENT.google) return false;
        return true;
      },
    },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: {
      type: Number,
      enum: SYS_ROLE,
      default: SYS_ROLE.user,
    },
    gender: {
      type: Number,
      enum: GENDER,
      default: GENDER.male,
    },
    userAgent: {
      type: Number,
      enum: USER_AGENT,
      default: USER_AGENT.local,
    },
    otp: {
      type: String,
    },
    otpExpiryAt: {
      type: Date,
    },
    isVerified:{ 
      type:Boolean ,
       default : false}
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema
  .virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (value) {
    const [fName, lName] = value.split(" ");
    this.firstName = fName as string;
    this.lastName = lName as string;
  });

  userSchema.pre("save",async function(next){
    if(this.userAgent != USER_AGENT.google && this["isNew"] == true)
    await sendMail({
      to: this.email,
      subject:"confirm account",
        html:`<h1> your otp is ${this.otp}</h1>`
    })
    next()
  })
  