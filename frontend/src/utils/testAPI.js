// Test script to verify API connection
import { freedomWallAPI, challengesAPI } from '../services/api';

export const testAPI = async () => {
  console.log('🧪 Testing Thrive360 API Connection...');
  
  try {
    // Test Freedom Wall API
    console.log('📝 Testing Freedom Wall API...');
    const posts = await freedomWallAPI.getPosts();
    console.log('✅ Freedom Wall posts loaded:', posts.length, 'posts');
    
    // Test Challenges API
    console.log('🏆 Testing Challenges API...');
    const challenges = await challengesAPI.getChallenges();
    console.log('✅ Challenges loaded:', challenges.length, 'challenges');
    
    console.log('🎉 All API tests passed!');
    return true;
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.error('💡 Make sure your Laravel backend is running on http://localhost:8000');
    return false;
  }
};

// Run test when imported
if (typeof window !== 'undefined') {
  testAPI();
}
