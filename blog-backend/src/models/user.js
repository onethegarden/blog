import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const { Schema } = mongoose;

const UserSchema = new Schema({
    username : String,
    hashedPassword : String,
});
//비밀번호 hashedPassword로 설정
UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}
//비밀번호 검증
UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; //true, false
}
//userName으로 데이터 찾기
UserSchema.statics.findByUsername = function(username){
    return this.findOne({ username });
}
//hashed데이터가 응답되지 않도록 삭제해줌
UserSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}

const User = mongoose.model('User', UserSchema);
export default User;