const Classroom = require('../models/classrooms');

const generateClassroomCode = (lenght) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefijklmnopqstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < lenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const generateClassroomCodeMethod = async () => {
    let UniqueCode = false;
    let code;
    while (!UniqueCode) {
        code = generateClassroomCode(8);
        const classroom = await Classroom.findOne({ where: { classroom_code: code } });
        if (!classroom) {
            UniqueCode = true;
        }
    }
    return code;
}

module.exports = generateClassroomCodeMethod;