import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    ToastAndroid,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import db from '../database';
import { theme } from '../theme';
const StaffsScreen = () => {
    const [expandedStaffId, setExpandedStaffId] = useState(null);
    const [selectedButton, setSelectedButton] = useState({});
    const [staffs, setStaffs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStaffs, setFilteredStaffs] = useState([]);

    useEffect(() => {
        const checkInternetConnection = async () => {
            const { isConnected } = await NetInfo.fetch();
            setIsConnected(isConnected);
        };

        checkInternetConnection();

        loadData();

        NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            NetInfo.removeEventListener(state => {
                setIsConnected(state.isConnected);
            });
        };
    }, []);

    useEffect(() => {
        filterStaffs(searchQuery);
    }, [searchQuery]);

    const loadData = () => {
        setIsRefreshing(true);
        setIsLoading(true);

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM staffs',
                [],
                (_, { rows }) => {
                    const data = rows._array;
                    setStaffs(data);
                    setFilteredStaffs(data);
                    setIsLoading(false);
                    setIsRefreshing(false);
                },
                error => {
                    console.error('Failed to fetch staffs:', error);
                    setIsLoading(false);
                    setIsRefreshing(false);
                }
            );
        });

        if (isConnected) {
            ToastAndroid.show("You're connected!", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("You're not connected!", ToastAndroid.SHORT);
        }
    };

    const handleCardPress = staffId => {
        setExpandedStaffId(prevStaffId =>
            prevStaffId === staffId ? null : staffId
        );
        setSelectedButton({});
    };

    const handleButtonClick = (staffId, button) => {
        setSelectedButton(prevSelectedButton => ({
            ...prevSelectedButton,
            [staffId]: button,
        }));
    };

    const renderStaffCard = ({ item }) => {
        const handleImageError = () => {
            ToastAndroid.show("Failed to load profile image", ToastAndroid.SHORT);
        };

        return (
            <TouchableOpacity
                style={[
                    styles.card,
                    expandedStaffId === item.id && styles.expandedCard,
                ]}
                onPress={() => handleCardPress(item.id)}
            >
                <View style={styles.header}>
                    <Image
                        source={{ uri: item.profileImage }}
                        style={styles.profileImage}
                        onError={handleImageError}
                    />
                    <View>
                        <Text style={styles.fullName}>{item.fullName}</Text>
                        <Text style={styles.role}>{`Role: ${item.role}`}</Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.expandButton,
                            expandedStaffId === item.id && styles.expandButtonReversed,
                        ]}
                        onPress={() => handleCardPress(item.id)}
                    >
                        {expandedStaffId === item.id ? (
                            <Icon name="expand-less" size={20} color="#777777" />
                        ) : (
                            <Icon name="expand-more" size={20} color="#777777" />
                        )}
                    </TouchableOpacity>
                </View>
                {expandedStaffId === item.id && (
                    <View style={styles.detailsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.detailsButton,
                                selectedButton[item.id] === 'qualifications' &&
                                styles.selectedButton,
                            ]}
                            onPress={() => handleButtonClick(item.id, 'qualifications')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedButton[item.id] === 'qualifications' &&
                                    styles.selectedButtonText,
                                ]}
                            >
                                Qualifications
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.detailsButton,
                                selectedButton[item.id] === 'specialist' &&
                                styles.selectedButton,
                            ]}
                            onPress={() => handleButtonClick(item.id, 'specialist')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedButton[item.id] === 'specialist' &&
                                    styles.selectedButtonText,
                                ]}
                            >
                                Specialist
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.detailsButton,
                                selectedButton[item.id] === 'additionalInfo' &&
                                styles.selectedButton,
                            ]}
                            onPress={() => handleButtonClick(item.id, 'additionalInfo')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedButton[item.id] === 'additionalInfo' &&
                                    styles.selectedButtonText,
                                ]}
                            >
                                Additional Info
                            </Text>
                        </TouchableOpacity>

                        {selectedButton[item.id] && (
                            <View style={styles.detailsValue}>
                                <Text style={styles.italicText}>
                                    {item[selectedButton[item.id]]}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const handleRefresh = () => {
        loadData();
    };

    const filterStaffs = query => {
        const filteredData = staffs.filter(
            staff =>
                staff.fullName.toLowerCase().includes(query.toLowerCase()) ||
                staff.role.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredStaffs(filteredData);
    };

    return (
        <View style={styles.container}>
            {!isConnected && (
                <View style={styles.networkContainer}>
                    <Text style={styles.networkText}>No internet connection</Text>
                </View>
            )}

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="Search" onPress={() => filterStaffs(searchQuery)} />
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size="large"
                        color="blue"
                        style={styles.loadingIndicator}
                    />
                    <Text style={styles.loadingText}>Loading Staffs...</Text>
                </View>
            ) : filteredStaffs.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No staffs found</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredStaffs}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderStaffCard}
                    contentContainerStyle={styles.listContentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: theme.backgroundColor,
    },
    listContentContainer: {
        paddingBottom: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.cardColor,
        padding: 8,
    },
    expandedCard: {
        paddingVertical: 16,
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    fullName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.primaryColor,
        marginBottom: 4,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#555555',
        textShadowRadius: 6,
    },
    role: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    detailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 8,
    },
    detailsButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.primaryColor,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    selectedButton: {
        backgroundColor: theme.primaryColor,
    },
    buttonText: {
        fontSize: 14,
        color: theme.primaryColor,
    },
    selectedButtonText: {
        color: theme.secondaryColor,
    },
    detailsValue: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.primaryColor,
        padding: 8,
        marginBottom: 8,
        width: '100%',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    italicText: {
        fontStyle: 'italic',
    },
    expandButton: {
        marginLeft: 'auto',
    },
    expandButtonReversed: {
        transform: [{ rotate: '180deg' }],
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textColor,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textColor,
    },
    networkContainer: {
        backgroundColor: theme.networkColor,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    networkText: {
        color: theme.secondaryColor,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#dddddd',
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    searchButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});


export default StaffsScreen;
