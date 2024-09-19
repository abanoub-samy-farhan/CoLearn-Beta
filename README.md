# CoLearn Beta

CoLearn is an AI-powered classroom management system designed to facilitate the seamless creation of classrooms, announcements, quizzes, and assignments. It enables teachers to provide AI-driven analytics and performance feedback to students in real-time, making learning more efficient and interactive.

![Colearn Banner](/public/assets/bannar.jpg)

# Table of Content
- [Key Features](#key-features)
- [Usage](#usage)
- [Technologies](#technologies)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [License](#license)

## Key Features
- **Create and Manage Classrooms**: Teachers can create classrooms, set deadlines, and track student performance.
- **AI-Powered Analytics**: Advanced analytics for both teachers and students to monitor progress and performance.
- **Quiz and Assignment Styling**: Teachers can create quizzes with multiple question types and grade students automatically.
Real-Time Interaction: Using Socket.io for real-time communication between users.
- **Announcements and comments Feature**: Teachers can make announcements to keep students updated on classroom activities.
- **AI Feedback**: Automatic feedback on student performance to assist teachers in classroom management, providing them insights about their performance in the exams and the weaknesses they should focus on developing in the future.

## Usage
1. Clone the repository
```bash
git clone https:\\github.com\abanoub-samy-farhan\CoLearn-Beta.git
```
2. Install dependencies
```bash
npm install
```
3. Start the server and the Backend server
```bash
npm start
npm run dev
```
4. Open the browser and navigate to `http://localhost:3000`

## Technologies
- **Frontend**: `React`, `Material-UI`, `Ant Design`
- **Backend**: `Node.js`, `Express.js`
- **Database**: `MySQL`, `Sequelize`
- **AI**: `Not yet implemented`
- **Real-Time Communication**: `Not yet implemented`

## Database Schema
![Database Schema](/public/assets/CoLearn%20DataBase%20Diagram.png)


# API Reference

## Get all Classrooms

```http
  GET /api/v1/classrooms
```

**Description**: Retrieves all classrooms from the database.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None      |          |                            |

---

## Get Classroom by ID

```http
  GET /api/v1/classrooms/:id
```

**Description**: Fetches a specific classroom by its ID.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Classroom ID |

---

## Create a Classroom

```http
  POST /api/v1/classrooms
```

**Description**: Creates a new classroom.

| Parameter        | Type     | Description                            |
| :--------------- | :------- | :------------------------------------- |
| `classroom_name`  | `string` | **Required**. The name of the classroom |
| `teacher_id`      | `number` | **Required**. ID of the teacher         |
| `description`     | `string` | Optional. Description of the classroom  |

**Responses**:  
- `201`: Classroom successfully created  
- `404`: Teacher not found  
- `401`: User is not authorized to create a classroom  
- `500`: Internal server error

---

## Update Classroom

```http
  PUT /api/v1/classrooms/:id
```

**Description**: Updates a specific classroom’s data.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Classroom ID  |

**Body**:  
Provide the data to update in the request body.

**Responses**:  
- `200`: Classroom updated successfully  
- `404`: Classroom not found  
- `500`: Internal server error  
- `400`: Validation error  

---

## Delete Classroom

```http
  DELETE /api/v1/classrooms/:id
```

**Description**: Deletes a specific classroom by its ID.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Classroom ID  |

**Responses**:  
- `200`: Classroom deleted successfully  
- `404`: Classroom not found  
- `500`: Internal server error  

---

## Get Classrooms by Teacher ID

```http
  GET /api/v1/classrooms/teacher
```

**Description**: Retrieves classrooms associated with a specific teacher.

| Parameter    | Type     | Description                |
| :----------- | :------- | :------------------------- |
| `teacher_id` | `number` | **Required**. Teacher ID    |

---

## Get Classrooms Associated to User

```http
  GET /api/v1/classrooms/user
```

**Description**: Fetches all classrooms associated with a specific user.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `number` | **Required**. User ID       |

---

## Get Users Associated to Classroom

```http
  GET /api/v1/classrooms/:classroom_id/users
```

**Description**: Retrieves all users associated with a specific classroom.

| Parameter       | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `classroom_id`  | `number` | **Required**. Classroom ID  |

---

## Remove User from Classroom or Leave a Classroom

```http
  DELETE /api/v1/classrooms/:classroom_id/users/:id
```

**Description**: Removes a specific user from a classroom.

| Parameter       | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `classroom_id`  | `number` | **Required**. Classroom ID  |
| `id`            | `number` | **Required**. User ID       |

---

## Join Classroom

```http
  POST /api/v1/classrooms/join
```

**Description**: Allows a user to join a classroom using a classroom code.

| Parameter           | Type     | Description                           |
| :------------------ | :------- | :------------------------------------ |
| `classroom_code`     | `string` | **Required**. Code of the classroom   |
| `id`                | `number` | **Required**. ID of the user          |

**Responses**:
- `200`: User successfully joined the classroom
- `404`: Classroom not found
- `500`: Internal server error

---

## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. or email here [Email](mailto:abanoubsamy2341@gmail.com)

## License
Copyright © 2024 [Abanoub Samy Farhan](https://github.com/abanoub-samy-farhan) <br/>
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

