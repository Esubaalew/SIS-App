import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IntroductionScreen = ({ navigation }) => {
    const handleExplorePress = () => {
        navigation.navigate('SISApp');
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <Text style={styles.title}>Department of Information Systems</Text>
                <Text style={styles.description}>
                    Societies in the modern age depend on information. Information is vital for rational decision-making in all areas at all
                    levels. Information is used as a strategic tool to increase efficiency, stimulate innovation, and allow organizations to gain
                    competitive advantages. All sectors of society and the activities of individuals depend on the efficient handling of
                    information. Quality of life, social change, and economic development depend increasingly on information. There is a rapidly
                    growing demand for information by an ever-wide range of users - educators, researchers, planners, policy makers, managers,
                    technicians, and the public at large - for their successful functioning.
                </Text>
                <Button
                    mode="contained"
                    onPress={handleExplorePress}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                    icon={() => <Icon name="arrow-forward" size={20} color="white" />}
                >
                    Start Exploring
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    backgroundContainer: {
        padding: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333333',
        textShadowOffset: { width: 2, height: 2 },
        textShadowColor: '#555555',
        textShadowRadius: 6,
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 24,
        color: '#555555',
    },
    button: {
        marginTop: 24,
        borderRadius: 8,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default IntroductionScreen;
