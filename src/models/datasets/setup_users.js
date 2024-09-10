const sequelize = require('../db_engin');
const User = require('../users');
const bcrypt = require('bcrypt');

// User data
const users = [
  { firstname: 'John', lastname: 'Doe', role: 'teacher', email: 'john.doe@example.com', password: 'password1' },
  { firstname: 'Jane', lastname: 'Smith', role: 'student', email: 'jane.smith@example.com', password: 'password2' },
  { firstname: 'Michael', lastname: 'Johnson', role: 'admin', email: 'michael.johnson@example.com', password: 'password3' },
  { firstname: 'Emily', lastname: 'Brown', role: 'student', email: 'emily.brown@example.com', password: 'password4' },
  { firstname: 'David', lastname: 'Wilson', role: 'teacher', email: 'david.wilson@example.com', password: 'password5' },
  { firstname: 'Sarah', lastname: 'Taylor', role: 'student', email: 'sarah.taylor@example.com', password: 'password6' },
  { firstname: 'Robert', lastname: 'Anderson', role: 'teacher', email: 'robert.anderson@example.com', password: 'password7' },
  { firstname: 'Jennifer', lastname: 'Thomas', role: 'student', email: 'jennifer.thomas@example.com', password: 'password8' },
  { firstname: 'William', lastname: 'Jackson', role: 'admin', email: 'william.jackson@example.com', password: 'password9' },
  { firstname: 'Elizabeth', lastname: 'White', role: 'student', email: 'elizabeth.white@example.com', password: 'password10' },
  { firstname: 'Christopher', lastname: 'Harris', role: 'teacher', email: 'christopher.harris@example.com', password: 'password11' },
  { firstname: 'Jessica', lastname: 'Martin', role: 'student', email: 'jessica.martin@example.com', password: 'password12' },
  { firstname: 'Daniel', lastname: 'Thompson', role: 'teacher', email: 'daniel.thompson@example.com', password: 'password13' },
  { firstname: 'Lisa', lastname: 'Garcia', role: 'student', email: 'lisa.garcia@example.com', password: 'password14' },
  { firstname: 'Matthew', lastname: 'Martinez', role: 'admin', email: 'matthew.martinez@example.com', password: 'password15' },
  { firstname: 'Ashley', lastname: 'Robinson', role: 'student', email: 'ashley.robinson@example.com', password: 'password16' },
  { firstname: 'Andrew', lastname: 'Clark', role: 'teacher', email: 'andrew.clark@example.com', password: 'password17' },
  { firstname: 'Nicole', lastname: 'Rodriguez', role: 'student', email: 'nicole.rodriguez@example.com', password: 'password18' },
  { firstname: 'Kevin', lastname: 'Lewis', role: 'teacher', email: 'kevin.lewis@example.com', password: 'password19' },
  { firstname: 'Stephanie', lastname: 'Lee', role: 'student', email: 'stephanie.lee@example.com', password: 'password20' }
];

// Function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Function to import users
async function importUsers() {
  try {

    // Hash passwords and create users
    for (let user of users) {
      user.password = await hashPassword(user.password);
      await User.create(user);
    }

    console.log('Users imported successfully');
  } catch (error) {
    console.error('Error importing users:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the import
importUsers();