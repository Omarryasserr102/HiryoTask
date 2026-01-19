// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// Type definition for navigation props
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch data when the screen loads
  useEffect(() => {
    console.log('HomeScreen: Starting to fetch posts...');
    axios.get('https://gorest.co.in/public/v2/posts')
      .then(response => {
        console.log('HomeScreen: Posts fetched successfully', response.data?.length || 0, 'posts');
        setPosts(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('HomeScreen: Error fetching posts', error.message);
        setError('Failed to load posts. Please check your internet connection.');
        setLoading(false);
      });
  }, []);

  // 2. Define how each "Post Card" looks
  const renderPostCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      // When clicked, navigate to 'PostDetails' and pass the current post data
      onPress={() => navigation.navigate('PostDetails', { post: item })}
    >
      <View style={styles.header}>
        {/* Placeholder Avatar - since API doesn't provide real images */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.user_id.toString().slice(0, 2)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.username}>User ID: {item.user_id}</Text>
          <Text style={styles.postId}>Post #{item.id}</Text>
        </View>
      </View>
      
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text numberOfLines={3} style={styles.body}>{item.body}</Text>
      
      {/* Status indicator */}
      {item.status && (
        <View style={styles.statusBadge}>
          <Text style={[styles.statusText, { color: item.status === 'published' ? '#27AE60' : '#E74C3C' }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' as const, alignItems: 'center' as const }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center' as const, alignItems: 'center' as const }]}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={{ marginTop: 10, color: '#999', textAlign: 'center' as const, paddingHorizontal: 20 }}>
          Please check your internet connection and try again.
        </Text>
      </View>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center' as const, alignItems: 'center' as const }]}>
        <Text style={{ fontSize: 18, color: '#666' }}>No posts available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={posts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderPostCard}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

// 3. Styling for the UI
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f2f5' 
  },
  card: { 
    backgroundColor: 'white', 
    padding: 15, 
    marginVertical: 8, 
    marginHorizontal: 16, 
    borderRadius: 12
  },
  header: { 
    flexDirection: 'row' as const, 
    alignItems: 'flex-start' as const, 
    marginBottom: 12 
  },
  headerInfo: { 
    flex: 1, 
    marginLeft: 10 
  },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#007AFF', 
    justifyContent: 'center' as const, 
    alignItems: 'center' as const
  },
  avatarText: { 
    color: 'white', 
    fontWeight: '700' as const 
  },
  username: { 
    fontWeight: '700' as const, 
    fontSize: 16, 
    marginBottom: 2 
  },
  postId: { 
    fontSize: 12, 
    color: '#888' 
  },
  title: { 
    fontSize: 18, 
    fontWeight: '700' as const, 
    marginBottom: 6, 
    color: '#333' 
  },
  body: { 
    fontSize: 14, 
    color: '#666', 
    lineHeight: 20, 
    marginBottom: 10 
  },
  statusBadge: { 
    marginTop: 10, 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 6, 
    alignSelf: 'flex-start' as const 
  },
  statusText: { 
    fontSize: 12, 
    fontWeight: '600' as const 
  },
  errorText: { 
    fontSize: 16, 
    color: 'red', 
    textAlign: 'center' as const, 
    marginTop: 20, 
    paddingHorizontal: 20 
  }
});