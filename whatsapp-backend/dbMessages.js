import mongoose from 'mongoose';

const whatsappAchema = mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean
})

export default mongoose.model('messagecontents',whatsappAchema);
