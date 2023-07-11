import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('courses.db');

const CoursesScreen = () => {
    const [years, setYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedYear, setSelectedYear] = useState('1');
    const [selectedSemester, setSelectedSemester] = useState('1');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        db.transaction((tx) => {

            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY AUTOINCREMENT, year INT, semester INT, name TEXT, code TEXT, creditHours INT, description TEXT)'
            );
        });

        // insertSampleData();
    }, []);

    const insertSampleData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO courses (year, semester, name, code, creditHours, description) VALUES (?, ?, ?, ?, ?, ?)',
                [4, 2, 'HISTORY OF ETHIOPIA AND THE HORN', 'HEH402', 3, 'This course covers the history of Ethiopia and the Horn of Africa.']
            );
            tx.executeSql(
                'INSERT INTO courses (year, semester, name, code, creditHours, description) VALUES (?, ?, ?, ?, ?, ?)',
                [4, 2, 'INTRODUCTION TO DATA SCIENCE AND ANALYTICS', 'IDSA402', 3, 'This course covers the fundamentals of data science and analytics.']
            );
            tx.executeSql(
                'INSERT INTO courses (year, semester, name, code, creditHours, description) VALUES (?, ?, ?, ?, ?, ?)',
                [4, 2, 'KNOWLEDGE MANAGEMENT', 'KM401', 3, 'This course covers the principles and techniques of knowledge management.']
            );
            tx.executeSql(
                'INSERT INTO courses (year, semester, name, code, creditHours, description) VALUES (?, ?, ?, ?, ?, ?)',
                [4, 2, 'MANAGEMENT OF INFORMATION SYSTEMS AND SERVICES', 'HCI401', 3, 'This course covers the management of information systems and services in organizations.']
            );
            tx.executeSql(
                'INSERT INTO courses (year, semester, name, code, creditHours, description) VALUES (?, ?, ?, ?, ?, ?)',
                [4, 2, 'ENTERPRISE SYSTEMS', 'ES402', 3, 'This course covers the design and implementation of enterprise systems.']
            );
            tx.executeSql(
                'INSERT INTO courses (year, semester, name, code, creditHours, description) VALUES (?, ?, ?, ?, ?, ?)',
                [4, 2, 'INDUSTRIAL PROJECT II', 'IP402', 3, 'This course is a continuation of Industrial Project I and involves the implementation and evaluation of the project.']
            );
        });
    };

    const fetchYearsAndSemesters = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT DISTINCT year FROM courses',
                [],
                (_, { rows }) => {
                    const years = rows._array.map((item) => item.year.toString());
                    setYears(years);
                },
                (_, error) => {
                    console.log('Error fetching years:', error);
                }
            );

            tx.executeSql(
                'SELECT DISTINCT semester FROM courses',
                [],
                (_, { rows }) => {
                    const semesters = rows._array.map((item) => item.semester.toString());
                    setSemesters(semesters);
                },
                (_, error) => {
                    console.log('Error fetching semesters:', error);
                }
            );
        });
    };

    const fetchCourses = () => {
        db.transaction((tx) => {
            setIsLoading(true);
            tx.executeSql(
                'SELECT * FROM courses WHERE year = ? AND semester = ?',
                [selectedYear, selectedSemester],
                (_, { rows }) => {
                    const courses = rows._array;
                    setCourses(courses);
                    setIsLoading(false);
                },
                (_, error) => {
                    console.log('Error fetching courses:', error);
                    setIsLoading(false);
                }
            );
        });
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleSemesterChange = (semester) => {
        setSelectedSemester(semester);
    };

    useEffect(() => {
        fetchYearsAndSemesters();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [selectedYear, selectedSemester]);

    const navigation = useNavigation();

    const handleCourseSelect = (course) => {
        navigation.navigate('CourseDetails', { course });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Courses</Text>

            <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Year:</Text>
                <Picker
                    selectedValue={selectedYear}
                    style={styles.dropdown}
                    onValueChange={handleYearChange}
                >
                    {years.map((year) => (
                        <Picker.Item key={year} label={`${year}`} value={year} />
                    ))}
                </Picker>

                <Text style={styles.dropdownLabel}>Semester:</Text>
                <Picker
                    selectedValue={selectedSemester}
                    style={styles.dropdown}
                    onValueChange={handleSemesterChange}
                >
                    {semesters.map((semester) => (
                        <Picker.Item key={semester} label={`${semester}`} value={semester} />
                    ))}
                </Picker>
            </View>

            <ScrollView style={styles.coursesContainer}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0055FF" />
                        <Text style={styles.loadingText}>Getting courses...</Text>
                    </View>
                ) : (
                    courses.map((course, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.courseContainer}
                            onPress={() => handleCourseSelect(course)}
                        >
                            <Text style={styles.courseTitle}>{course.name}</Text>
                            <Text style={styles.courseCode}>{course.code}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333333',
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555',
    },
    dropdown: {
        flex: 1,
        marginLeft: 8,
    },
    coursesContainer: {
        flex: 1,
        marginBottom: 8,
    },
    courseContainer: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        marginBottom: 8,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    courseCode: {
        fontSize: 14,
        color: '#555555',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
});

export default CoursesScreen;