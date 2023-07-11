import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>Department of Information Systems</Text>
                <Text style={styles.subTitle}>Empowering the Future of Information</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'http://www.aau.edu.et/cns/wp-content/uploads/sites/12/2014/01/informationscience.jpg' }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>About Information Systems</Text>
                    <Text style={styles.description}>
                        Societies in the modern age depend on information. Information is vital for rational decision-making in all areas
                        at all levels. Information is used as a strategic tool to increase efficiency, stimulate innovation, and allow
                        organizations to gain competitive advantages. All sectors of society and the activities of individuals depend on the
                        efficient handling of information. Quality of life, social change, and economic development depend increasingly on
                        information. There is a rapidly growing demand for information by an ever-wide range of users - educators,
                        researchers, planners, policymakers, managers, technicians, and the public at large – for their successful
                        functioning.
                    </Text>
                    <Text style={styles.description}>
                        The Department of Information Systems is dedicated to providing high-quality education and fostering research and
                        innovation in the field of Information Systems. We aim to equip our students with the necessary skills and knowledge
                        to navigate the rapidly evolving digital landscape and contribute to the advancement of information technology.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f7f7f7',
        padding: 16,
    },
    titleContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0055FF',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 16,
        color: '#FF4500',
    },
    contentContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    imageContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#dddddd',
        overflow: 'hidden',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
        color: '#555555',
    },
});

export default AboutScreen;
