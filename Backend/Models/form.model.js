import mongoose, { model } from "mongoose";

const formSchema = mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String, required: true}
},{timestamps:true})

const FormModel = mongoose.model('formData', formSchema)

export default FormModel;