import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Divider, Provider as PaperProvider, List, useTheme, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CourseDetailsScreen = ({ route }) => {
    const { course } = route.params;
    const [selectedSection, setSelectedSection] = useState('courseInfo');
    const theme = useTheme();

    const sections = [
        { label: 'Course Info', value: 'courseInfo' },
        { label: 'Description', value: 'description' }
    ];
    const CustomPickerIcon = () => {
        return <Icon name="arrow-down-drop-circle" size={24} color="#0055FF" />;
    };

    const renderSectionContent = () => {
        switch (selectedSection) {
            case 'courseInfo':
                return <CourseInfoSection course={course} />;
            case 'description':
                return <DescriptionSection course={course} />;
            default:
                return null;
        }
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedSection}
                        onValueChange={(itemValue) => setSelectedSection(itemValue)}
                        style={styles.picker}
                        mode="dropdown"
                        dropDownIconComponent={CustomPickerIcon} // Custom icon component
                    >
                        {sections.map((section) => (
                            <Picker.Item key={section.value} label={section.label} value={section.value} />
                        ))}
                    </Picker>
                </View>
                <Divider />

                {renderSectionContent()}
            </View>
        </PaperProvider>
    );
};

const CourseInfoSection = ({ course }) => {
    return (
        <View style={styles.sectionContent}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>Course Name</Text>
                    <Divider style={styles.divider} />
                    <Text style={styles.courseName}>{course.name}</Text>
                </Card.Content>
            </Card>

            <View style={styles.infoContainer}>
                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text style={styles.infoLabel}>Code:</Text>
                        <Text style={styles.infoValue}>{course.code}</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text style={styles.infoLabel}>Credit Hours:</Text>
                        <Text style={styles.infoValue}>{course.creditHours}</Text>
                    </Card.Content>
                </Card>
            </View>

            <Card style={styles.teacherCard}>
                <Card.Content>
                    <Text style={styles.infoLabel}>Teacher:</Text>
                    <Text style={styles.infoValue}>{course.teacher}</Text>
                </Card.Content>
            </Card>
        </View>
    );
};

const DescriptionSection = ({ course }) => {
    return (
        <View style={styles.sectionContent}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>Description</Text>
                    <Divider style={styles.divider} />
                    <Text style={styles.description}>{course.description}</Text>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    pickerContainer: {
        marginBottom: 16,
    },
    picker: {
        height: 50,
        color: '#0055FF',
    },
    sectionContent: {
        flex: 1,
        marginTop: 16,
    },
    card: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
    },
    courseName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoCard: {
        flex: 1,
        marginRight: 8,
    },
    teacherCard: {
        marginTop: 16,
    },
    infoLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'black',
    },
    infoValue: {
        color: 'black',
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 24,
        color: '#555555',
    },
});

export default CourseDetailsScreen;
