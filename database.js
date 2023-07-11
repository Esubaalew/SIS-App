import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('staffs.db');

// Create the staffs table if it doesn't exist
// const handleDelete = () => {
//     db.transaction((tx) => {
//         tx.executeSql('DELETE FROM staffs ', [], (txObj, resultSet) => {
//             if (resultSet.rowsAffected > 0) {
//                 console.log('Row deleted successfully.');
//             } else {
//                 console.log('No rows deleted.');
//             }
//         });
//     });
// };
// db.transaction((tx) => {
//     tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS staffs (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       fullName TEXT,
//       role TEXT,
//       qualifications TEXT,
//       specialist TEXT,
//       profileImage TEXT,
//       additionalInfo TEXT
//     )`,
//         [],
//         () => {
//             console.log('Table created successfully');
//         },
//         (error) => {
//             console.error('Failed to create table:', error);
//         }
//     );
// });

// const insertStaffData = (staff) => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             'INSERT INTO staffs (fullName, role, qualifications, specialist, profileImage, additionalInfo) VALUES (?, ?, ?, ?, ?, ?)',
//             [
//                 staff.fullName,
//                 staff.role,
//                 staff.qualifications,
//                 staff.specialist,
//                 staff.profileImage,
//                 staff.additionalInfo,
//             ],
//             () => {
//                 console.log('Data inserted successfully');
//             },
//             (error) => {
//                 console.error('Failed to insert data:', error);
//             }
//         );
//     });
// };
// const staffs = [
//     {
//         id: 1,
//         fullName: 'Teshome Alemu',
//         role: 'Lecturer',
//         qualifications: 'Ph.D. in Computer Science',
//         specialist: 'Information Systems',
//         profileImage: 'https://media.licdn.com/dms/image/D4D03AQEJaUKYWiBUgQ/profile-displayphoto-shrink_800_800/0/1664869486456?e=1692835200&v=beta&t=uHXTkkUqHRi3096_bE7xX7PIpj7XKSGwX5_SlOjSBC8',
//         additionalInfo: 'More than 16 years of experience in teaching, training, data,, research and app development..',
//     },
//     {
//         id: 2,
//         fullName: 'Aminu Mohammod',
//         role: 'Lecture',
//         qualifications: 'M.Sc. in Information Technology',
//         specialist: 'Data Science',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: `I am a faculty at the School of Information Science (SIS), College of Natural and Computational Sciences, Addis Ababa University (AAU), experienced in university teaching, academic administration, research and development in the broad areas of information systems, data-driven solutions, digital transformation, machine-learning and AI, security & privacy, socio-technical systems, precision (digital) agriculture and more.

//             I have had excellent opportunities to work with people of diverse background in a number of research projects in the intersection of information systems and socio-technical systems and digital societies. Over the years, I have developed wonderful skills in problem solving, communication and teamwork.
//             I am an optimist, result oriented, responsible and smart-working person capable of working both independently and in a team.

//             My current research and development interests are in the areas of digital transformation, digital services, systems security and privacy, socio-technical systems, digital agriculture, data driven solutions, applied machine/deep learning, applied AI`,
//     },
//     {
//         id: 3,
//         fullName: 'Tibebe Beshah',
//         role: 'Associate Professor',
//         qualifications: 'PhD. in Software Engineering',
//         specialist: 'Web Development',
//         profileImage: 'https://media.licdn.com/dms/image/C5603AQGOcummwdcWDA/profile-displayphoto-shrink_800_800/0/1516304285153?e=1692835200&v=beta&t=qBUtHkNNu9FKzPdJ-LsjkUiWreaP8sJ3lO9u0TPXhdY',
//         additionalInfo: `I am an Associate  Professor  in Information Systems at the School of Information Science, Addis Ababa University, Addis Ababa, Ethiopia.

//             My research interests includes: Data mining and Machine Learning, IS adoption and readiness, Information Security and Management, Information and Data Architecture, Information Systems Development, IS implementation Success.`,
//     },
//     {
//         id: 4,
//         fullName: 'Betsegaw Dereje',
//         role: 'Lecturer',
//         qualifications: 'M.Sc. Information Science',
//         specialist: 'Machine Learning',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//         id: 5,
//         fullName: 'Tsegaye B',
//         role: 'Lecturer',
//         qualifications: 'M.Sc. in Information Systems',
//         specialist: 'Database Management',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//         id: 6,
//         fullName: 'Melaku Girma',
//         role: 'Lecturer',
//         qualifications: 'M.Sc. in Computer Science',
//         specialist: 'Network Security',
//         profileImage: 'https://media.licdn.com/dms/image/C4D03AQHCzQf8rfQV2w/profile-displayphoto-shrink_800_800/0/1543015349646?e=1692835200&v=beta&t=QY-Zjqjm3MevqYq0iGzU0tjgH4eAcxmrNn2ZvM48qTc',
//         additionalInfo: `Fourteen years of professional Experience in software engineering and testing using state-of-
//             the-art programming languages, Computers Network Installation, ICT Consultancy, and
//             teaching in Universities such as Addis Ababa and Unity Universities. I am the owner and
//             general manager of SLM Educational Aid Materials PLC, which primarily
//             produces learning aid materials that are used in the ECD (Early Childhood Development)
//             Education. In addition, I have volunteered as Chairman of the board of directors of Addis
//             Genet Condominium Dwellers’ Association for the last three years now. I have keen research
//             interests in the area of Agile Development, Large-Scale Agile, Internet governance and Internet Freedom in Africa.`,
//     },
//     // Add more staff data...
//     {
//         id: 7,
//         fullName: 'Dereje Teferi',
//         role: 'Professor',
//         qualifications: 'Ph.D. in Information Science ',
//         specialist: 'Information Science',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/studentphoto/Dereje_Teferi_2022_06_30_2_59_40.jpg',
//         additionalInfo: 'I am an assistant professor at the School of Information Science of Addis Ababa University.',
//     },
//     {
//         id: 8,
//         fullName: 'Amina Abdulkadir ',
//         role: 'Associate Professor',
//         qualifications: 'B.Sc in Infomation Systems',
//         specialist: 'Thermodynamics',
//         profileImage: 'https://media.licdn.com/dms/image/C5603AQEL5fX_1tbjiw/profile-displayphoto-shrink_800_800/0/1610444486231?e=1692835200&v=beta&t=ywkMlkICoGCvD6SRgatwXqnWsd1f9VWnQIZueVXnqgc',
//         additionalInfo: 'A history of working in the information technology and services industry. Skilled in PHP, Databases, C#, SQL, and Laravel. Strong operations professional recently graduated from Addis Ababa University. ',
//     },
//     {
//         id: 9,
//         fullName: 'Gebremichael Meshesha',
//         role: 'Lecturer',
//         qualifications: 'M.Sc. in Civil Engineering',
//         specialist: 'Structural Engineering',
//         profileImage: 'https://media.licdn.com/dms/image/C5603AQHR4LgJ8BMaXQ/profile-displayphoto-shrink_800_800/0/1517437645813?e=1692835200&v=beta&t=rlzFN8P3t8bh_Zcj25xWJFq4NAkwZO_DniRGC0K3sOY',
//         additionalInfo: 'Founder & CEO, Ethio Digital Academy PLC | Instructor at Addis Ababa University.',
//     },
//     // Add more staff data...
//     {
//         id: 10,
//         fullName: 'Mihiret Tibebe',
//         role: 'Assistant Professor',
//         qualifications: 'Ph.D. in Biotechnology',
//         specialist: 'Genetic Engineering',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     // Add more staff data...
//     {
//         id: 11,
//         fullName: 'Bereket Asnake',
//         role: 'Lecturer',
//         qualifications: 'M.Sc. in Mathematics',
//         specialist: 'Number Theory',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//         id: 12,
//         fullName: 'Abenezer Abera',
//         role: `Senior Technical Assistant
//             `,
//         qualifications: 'Diploma',
//         specialist: 'IT',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 13,
//         fullName: 'Adey Edessa',
//         role: `Lecturer`,
//         qualifications: 'MSc',
//         specialist: 'Information Science',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 14,
//         fullName: 'Andargachew Asfaw',
//         role: `Lecturer`,
//         qualifications: 'MSc',
//         specialist: 'Computer Science',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 15,
//         fullName: 'Dagmawit Mohamed',
//         role: `Assistant Lecturer`,
//         qualifications: 'BSc in  Information Systems',
//         specialist: 'Computer Science',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 16,
//         fullName: 'Ermias Abebe',
//         role: `Lecturer`,
//         qualifications: 'MSc in  Information Systems',
//         specialist: 'Information Systems',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 17,
//         fullName: 'Gemeda Erana',
//         role: `Senior Technical Assistant`,
//         qualifications: 'Diploma in  IT',
//         specialist: 'IT',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Senior Technical Assistant',
//     },
//     {
//         id: 18,
//         fullName: 'Getachew H/Mariam',
//         role: `Assistant Professor`,
//         qualifications: 'PhD in  Information Systems',
//         specialist: 'Information Systems',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 19,
//         fullName: 'Kidus Menfes',
//         role: `Assistant Lecturer`,
//         qualifications: 'BSc in  Information Systems',
//         specialist: 'Information Systems',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/Defaultimages.png',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 20,
//         fullName: 'Lemlem Hagos',
//         role: `Lecturer`,
//         qualifications: 'MSc in  Language Technology',
//         specialist: 'Language Technology',
//         profileImage: 'https://media.licdn.com/dms/image/C5603AQEZsKocDxxA2Q/profile-displayphoto-shrink_100_100/0/1649589692503?e=1691625600&v=beta&t=EXta08M4MjTalMBhfczfMYk1msoluJVxuUNfCvi1CXw',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 21,
//         fullName: 'Lemma Lessa',
//         role: `Assistant Professor`,
//         qualifications: 'PhD in  Information Systems',
//         specialist: 'Information Systems',
//         profileImage: 'https://portal.aau.edu.et/ISIMSImg/studentphoto/Lemma_Lessa_2022_06_20_5_52_28.jpg',
//         additionalInfo: 'Teacher School of Information Science',
//     },
//     {
//         id: 22,
//         fullName: 'Martha Yifiru',
//         role: `Assistant Professor`,
//         qualifications: 'PhD in  Language Technology',
//         specialist: 'Language Technology',
//         profileImage: 'https://media.licdn.com/dms/image/C4D03AQEO1rLDQBRyYw/profile-displayphoto-shrink_800_800/0/1595846999441?e=1692835200&v=beta&t=xbd1498mojf_dzCafusf7YafohfkqErI_oprAyN6h5c',
//         additionalInfo: `Successfully completing a research at the Cognitive Systems Lab of the University of Bremen with George Forster Experienced Researchers fellowship. Returned back home with Return Fellowship award of the AvH Foundation.`,
//     },
//     {
//         id: 23,
//         fullName: 'Melkamu Beyene',
//         role: `Assistant Professor`,
//         qualifications: 'PhD in  Information Retrieval',
//         specialist: 'Information Retrieval',
//         profileImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2b4FJUr4Nx5gb1cmvDZEBJ65R9g2BoRlYK7x4elV58tQ1Gmo44yBa8Y9ObC-hOGsmi6s&usqp=CAU`,
//         additionalInfo: `Successfully completing a research at the Cognitive Systems Lab of the University of Bremen with George Forster Experienced Researchers fellowship. Returned back home with Return Fellowship award of the AvH Foundation.`,
//     },
//     {
//         id: 24,
//         fullName: 'Mengisti Berihu',
//         role: `Lecturer`,
//         qualifications: 'Msc in  Information Systems',
//         specialist: 'Information Systems',
//         profileImage: `https://portal.aau.edu.et/ISIMSImg/Defaultimages.png`,
//         additionalInfo: `Successfully completing a research at the Cognitive Systems Lab of the University of Bremen with George Forster Experienced Researchers fellowship. Returned back home with Return Fellowship award of the AvH Foundation.`,
//     },
//     {
//         id: 25,
//         fullName: 'Meseret Ayano',
//         role: `Lecturer`,
//         qualifications: ' MSc in Information Science',
//         specialist: ' Information Science',
//         profileImage: `https://portal.aau.edu.et/ISIMSImg/Defaultimages.png`,
//         additionalInfo: `Successfully completing a research at the Cognitive Systems Lab of the University of Bremen with George Forster Experienced Researchers fellowship. Returned back home with Return Fellowship award of the AvH Foundation.`,
//     },
//     {
//         id: 26,
//         fullName: 'Meseret Hailu',
//         role: `Lecturer`,
//         qualifications: ' MSc in Information Systems',
//         specialist: 'Information Systems',
//         profileImage: `https://portal.aau.edu.et/ISIMSImg/Defaultimages.png`,
//         additionalInfo: `Successfully completing a research at the Cognitive Systems Lab of the University of Bremen with George Forster Experienced Researchers fellowship. Returned back home with Return Fellowship award of the AvH Foundation.`,
//     },
//     {
//         id: 27,
//         fullName: 'Wondwossen Mulugeta',
//         role: `Assistant Professor`,
//         qualifications: 'PhD in  Language Technology',
//         specialist: 'Language Technology',
//         profileImage: `https://portal.aau.edu.et/ISIMSImg/studentphoto/Wondwossen_Mulugeta_2022_08_08_9_16_50.jpg`,
//         additionalInfo: `Dr. Wondwossen Mulugeta is an Assistant Professor at the School of Information Science in Addis Ababa University working on the application of machine learning techniques for different problem areas. He specialized in language technology and data analytics.
//             Wondwossen earned his Bachelor degree in Statistics, his MSc in Information Science and his PhD in Information Technology from Addis Ababa University. Wondwossen has supervised numerous graduate students who worked on machine learning, data mining, data analytics and knowledge mining research problems. Currently Wondwossen is the core team member of APHRREA-DST project that focuses on public health data science and research.
//             Among other responsibilities, Wondwossen has ample experience in project management role where he successfully completed several projects like Transition Strategy development for USAID-Data Health Activity, Health Datawarehouse architecture and requirement development.`,
//     },
//     // Add 30 new staff members with Ethiopian names and realistic additional information
// ];
// handleDelete()
// for (const staff of staffs) {
//     insertStaffData(staff)
// }

export default db;
