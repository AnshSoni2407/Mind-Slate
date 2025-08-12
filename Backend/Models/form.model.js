import mongoose, { model } from "mongoose";

const formSchema = mongoose.Schema({
    title:{type:String, required: true},
    body:{type:String, required: true}
},{timestamps:true})

const FormModel = mongoose.model('formData', formSchema)

export default FormModel;