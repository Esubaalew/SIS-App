import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

const WebviewScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
        return () => unsubscribe();
    }, []);

    const handleConnectivityChange = (state) => {
        setIsConnected(state.isConnected);
    };

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Website...</Text>
        </View>
    );

    const renderErrorScreen = () => (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No Internet Connection</Text>
        </View>
    );

    const handleShouldStartLoadWithRequest = (event) => {
        const { url, navigationType } = event;

        if (navigationType === 'click' || navigationType === 'formsubmit') {

            if (Linking.canOpenURL(url)) {
                Linking.openURL(url);
            } else {
                console.warn('Cannot open URL:', url);
            }
            return false;
        }

        return true;
    };

    return (
        <View style={styles.container}>
            {!isConnected && renderErrorScreen()}
            {isConnected && (
                <WebView
                    source={{ uri: 'http://www.aau.edu.et/cns/school-of-information-science/' }}
                    style={styles.webview}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                    renderLoading={renderLoadingIndicator}
                    startInLoadingState={true}
                    onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
});

export default WebviewScreen;
