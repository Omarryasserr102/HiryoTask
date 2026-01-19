// screens/PostDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetails'>;

export default function PostDetailsScreen({ route }: Props) {
  // Get the 'post' data passed from the Home screen
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments for THIS specific post ID
  useEffect(() => {
    console.log('PostDetailsScreen: Fetching comments for post', post.id);
    // API pattern: https://gorest.co.in/public/v2/posts/{post_id}/comments
    axios.get(`https://gorest.co.in/public/v2/posts/${post.id}/comments`)
      .then(response => {
        console.log('PostDetailsScreen: Comments fetched', response.data?.length || 0);
        setComments(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('PostDetailsScreen: Error fetching comments', error.message);
        setError('Failed to load comments');
        setLoading(false);
      });
  }, [post.id]);

  return (
    <ScrollView style={styles.container}>
      {/* 1. The Post Section */}
      <View style={styles.postContainer}>
        <View style={styles.header}>
           <View style={styles.avatar}>
             <Text style={styles.avatarText}>{post.user_id.toString().slice(0, 2)}</Text>
           </View>
           <View style={styles.headerInfo}>
             <Text style={styles.username}>User ID: {post.user_id}</Text>
             <Text style={styles.postId}>Post ID: {post.id}</Text>
           </View>
        </View>
        
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
        
        {/* Additional post metadata */}
        <View style={styles.metadataSection}>
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Post Status:</Text>
            <Text style={[styles.metadataValue, { color: post.status === 'published' ? '#27AE60' : '#E74C3C' }]}>
              {post.status || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. The Comments Section */}
      <Text style={styles.sectionHeader}>Comments ({comments.length})</Text>
      
      {loading ? (
        <View style={{ padding: 20, justifyContent: 'center' as const, alignItems: 'center' as const }}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 10, color: '#666' }}>Loading comments...</Text>
        </View>
      ) : error ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'red', textAlign: 'center' as const }}>{error}</Text>
        </View>
      ) : comments && comments.length > 0 ? (
        comments.map((comment: any) => (
          <View key={comment.id} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              {/* Random avatar color for comments */}
              <View style={[styles.avatarSmall, { backgroundColor: '#FF9500' }]}>
                <Text style={{ color: 'white', fontWeight: '700' as const, fontSize: 10 }}>
                  {comment.id.toString().slice(0, 1)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.commentUser}>{comment.name}</Text>
                <Text style={{ fontSize: 12, color: '#999' }}>ID: {comment.id}</Text>
              </View>
            </View>
            <Text style={styles.commentBody}>{comment.body}</Text>
            {comment.email && (
              <Text style={{ fontSize: 12, color: '#0066CC', marginTop: 8 }}>
                Email: {comment.email}
              </Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noComments}>No comments yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  postContainer: { 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row' as const, 
    alignItems: 'flex-start' as const, 
    marginBottom: 15 
  },
  headerInfo: { 
    flex: 1, 
    marginLeft: 0 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#007AFF', 
    justifyContent: 'center' as const, 
    alignItems: 'center' as const, 
    marginRight: 12 
  },
  avatarText: { 
    color: 'white', 
    fontWeight: '700' as const, 
    fontSize: 18 
  },
  username: { 
    fontWeight: '700' as const, 
    fontSize: 18, 
    marginBottom: 4 
  },
  postId: { 
    fontSize: 14, 
    color: '#666' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: '700' as const, 
    marginBottom: 10, 
    color: '#000' 
  },
  body: { 
    fontSize: 16, 
    lineHeight: 24, 
    color: '#333', 
    marginBottom: 15 
  },
  
  metadataSection: { 
    marginTop: 15, 
    backgroundColor: '#f9f9f9', 
    padding: 12, 
    borderRadius: 8 
  },
  metadataItem: { 
    flexDirection: 'row' as const, 
    justifyContent: 'space-between' as const, 
    alignItems: 'center' as const, 
    paddingVertical: 6 
  },
  metadataLabel: { 
    fontSize: 14, 
    fontWeight: '600' as const, 
    color: '#555' 
  },
  metadataValue: { 
    fontSize: 14, 
    fontWeight: '700' as const 
  },
  
  sectionHeader: { 
    fontSize: 20, 
    fontWeight: '700' as const, 
    padding: 20, 
    paddingBottom: 10, 
    backgroundColor: '#f9f9f9' 
  },
  
  commentCard: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0', 
    backgroundColor: '#f9f9f9' 
  },
  commentHeader: { 
    flexDirection: 'row' as const, 
    alignItems: 'center' as const, 
    marginBottom: 8 
  },
  avatarSmall: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    marginRight: 8 
  },
  commentUser: { 
    fontWeight: '700' as const, 
    fontSize: 14 
  },
  commentBody: { 
    fontSize: 14, 
    color: '#555', 
    lineHeight: 20 
  },
  noComments: { 
    padding: 20, 
    fontStyle: 'italic' as const, 
    color: '#888' 
  }
});