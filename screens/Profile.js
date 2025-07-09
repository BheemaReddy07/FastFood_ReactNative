import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/auth.store';
import { logout } from '../lib/appwrite';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import CustomerHeader from '../components/CustomerHeader';

const Profile = () => {
  const navigation = useNavigation();
  const { user, logout: clearUser } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }]
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomerHeader className="mt-5" title="Profile" />
      <View style={styles.profileSection}>
        <Image
          source={{ uri: `https://nyc.cloud.appwrite.io/v1/avatars/initials?name=${user.name}&width=100&height=100` }}
          style={styles.avatar}
        />

        <TouchableOpacity style={styles.editIcon}>
          <Feather name="edit" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Info List */}
      <View style={styles.infoCard}>
        <InfoRow icon="person" label="Full Name" value={user.name} />
        <InfoRow icon="email" label="Email" value={user.email} />
        <InfoRow icon="phone" label="Phone number" value="+1 555 123 4567" />
        <InfoRow icon="location-on" label="Address 1 - (Home)" value="123 Main Street, Springfield, IL 62704" />
        <InfoRow icon="location-on" label="Address 2 - (Work)" value="221B Rose Street, Foodville, FL 12345" />
      </View>

      {/* Buttons */}

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Info row component
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconCircle}>
      <MaterialIcons name={icon} size={20} color="#FE8C00" />
    </View>
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 120,
    backgroundColor: '#FE8C00',
    borderRadius: 15,
    padding: 5,
  },
  infoCard: {
    backgroundColor: '#fff',
    marginVertical: 30,
    padding: 20,
    borderRadius: 12,
    gap: 15,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconCircle: {
    backgroundColor: '#FFF4E5',
    padding: 10,
    borderRadius: 50,
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  editBtn: {
    borderColor: '#FE8C00',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  editBtnText: {
    color: '#FE8C00',
    fontWeight: '600',
  },
  logoutBtn: {
    borderColor: '#FF4D4D',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#FF4D4D',
    fontWeight: '600',
  },
});

export default Profile;
