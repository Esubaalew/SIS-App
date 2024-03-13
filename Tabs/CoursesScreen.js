import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

// Import your courses data from a JSON file
import coursesData from '../coursesData.json';

const CoursesScreen = () => {
    const [years, setYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedYear, setSelectedYear] = useState('1');
    const [selectedSemester, setSelectedSemester] = useState('1');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Extract unique years and semesters from the imported courses data
        const uniqueYears = [...new Set(coursesData.map(course => course.year.toString()))];
        const uniqueSemesters = [...new Set(coursesData.map(course => course.semester.toString()))];
        setYears(uniqueYears);
        setSemesters(uniqueSemesters);
    }, []);

    useEffect(() => {
        // Filter courses based on selected year and semester
        const filteredCourses = coursesData.filter(course =>
            course.year.toString() === selectedYear && course.semester.toString() === selectedSemester
        );
        setCourses(filteredCourses);
    }, [selectedYear, selectedSemester]);

    const navigation = useNavigation();

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleSemesterChange = (semester) => {
        setSelectedSemester(semester);
    };

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
                {courses.length === 0 && isLoading ? (
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
