const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Mock database with all teachers
const teachers = {
    'teacher1': {
        username: 'Adedoyin Mary',
        password: 'adedoyin310',
        accessKey: '2801',
        name: 'Adedoyin Mary',
        courses: [
            { name: 'ECE 207', venue: 'Engineering Lecture Hall', time: '10:00 AM', day: 'Monday' },
            { name: 'ENT 202', venue: 'Engineering Lecture Hall', time: '8:00 AM', day: 'Wednesday' },
            { name: 'ECE 206', venue: 'Engineering Lecture Hall', time: '4:00 PM', day: 'Thursday' },
            { name: 'ECE 307', venue: 'Engineering Lecture Hall', time: '2:00 PM', day: 'Friday' },
            { name: 'ECE 303', venue: 'ECE Classroom 3', time: '11:00 AM', day: 'Tuesday' }
        ]
    },
    'teacher2': {
        username: 'Eng Folorunsho',
        password: 'folorunsho210',
        accessKey: '2207',
        name: 'Eng Folorunsho',
        courses: [
            { name: 'ECE 210', venue: 'ECE lab', time: '10:00 AM', day: 'Monday' },
            { name: 'ECE 310', venue: 'ECE lab', time: '8:00 AM', day: 'Wednesday' },
            { name: 'ECE 201', venue: 'ECE lab', time: '4:00 PM', day: 'Friday' },
            { name: 'ECE 310', venue: 'ECE lab', time: '2:00 PM', day: 'Thursday' },
            { name: 'ECE 306', venue: 'ECE lab', time: '11:00 AM', day: 'Tuesday' }
        ]
    },
    'teacher3': {
        username: 'Dr. Adedeji',
        password: 'adedeji212',
        accessKey: '1101',
        name: 'Dr. Adedeji',
        courses: [
            { name: 'ENT 202', venue: 'Engineering Lecture Hall', time: '10:00 AM', day: 'Wednesday' },
            { name: 'MEE 207', venue: 'Engineering Lecture Hall', time: '8:00 AM', day: 'Friday' },
            { name: 'MEE 312', venue: 'CPE classroom 2', time: '4:00 PM', day: 'Tuesday' },
            { name: 'ECE 341', venue: 'CPE classroom 1', time: '11:00 AM', day: 'Thursday' }
        ]
    },
    'teacher4': {
        username: 'Prof. Oyedeko',
        password: 'oyedeko101',
        accessKey: '3501',
        name: 'Prof. Oyedeko',
        courses: [
            { name: 'CPE 201', venue: 'Engineering Lecture Hall', time: '10:00 AM', day: 'Monday' },
            { name: 'CPE 308', venue: 'CPE classroom 3', time: '8:00 AM', day: 'Friday' },
            { name: 'CPE 508', venue: 'CPE classroom 2', time: '8:00 AM', day: 'Thursday' },
            { name: 'CPE 506', venue: 'CPE classroom 1', time: '11:00 AM', day: 'Thursday' }
        ]
    },
    'teacher5': {
        username: 'Engr. Joseph',
        password: 'joseph592',
        accessKey: '3801',
        name: 'Engr. Joseph',
        courses: [
            { name: 'ASE 352', venue: 'ASE classroom 1', time: '10:00 AM', day: 'Monday' },
            { name: 'ASE 306', venue: 'ASE classroom 2', time: '8:00 AM', day: 'Friday' },
            { name: 'ASE 524', venue: 'ASE classroom 1', time: '8:00 AM', day: 'Wednesday' },
            { name: 'ASE 524', venue: 'ASE classroom 1', time: '4:00 PM', day: 'Thursday' }
        ]
    }
};

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/signin', (req, res) => {
    const { username, password, accessKey } = req.body;
    const teacher = Object.values(teachers).find(t => t.username === username);

    if (teacher && teacher.password === password && teacher.accessKey === accessKey) {
        res.json({ success: true, teacherName: teacher.name });
    } else {
        res.json({ success: false, message: 'Invalid credentials or access key' });
    }
});

app.post('/getCourses', (req, res) => {
    const { teacherName } = req.body;
    const teacher = Object.values(teachers).find(t => t.name === teacherName);

    if (teacher) {
        res.json({ courses: teacher.courses });
    } else {
        res.status(404).json({ message: 'Teacher not found' });
    }
});

app.post('/turnOnPower', (req, res) => {
    const { teacherName, courseName } = req.body;
    const teacher = Object.values(teachers).find(t => t.name === teacherName);

    if (teacher) {
        const course = teacher.courses.find(c => c.name === courseName);
        if (course) {
            res.json({ success: true, message: `Power supply turned on for ${courseName}` });
        } else {
            res.json({ success: false, message: `Course not found` });
        }
    } else {
        res.json({ success: false, message: `Teacher not found` });
    }
});

app.post('/turnOffPower', (req, res) => {
    const { teacherName, courseName } = req.body;
    const teacher = Object.values(teachers).find(t => t.name === teacherName);

    if (teacher) {
        const course = teacher.courses.find(c => c.name === courseName);
        if (course) {
            res.json({ success: true, message: `Power supply turned off for ${courseName}` });
        } else {
            res.json({ success: false, message: `Course not found` });
        }
    } else {
        res.json({ success: false, message: `Teacher not found` });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
