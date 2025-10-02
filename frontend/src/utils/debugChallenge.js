// Debug script for challenge creation
import { challengesAPI } from '../services/api';

export const debugChallengeCreation = async () => {
  console.log('🔍 Debugging Challenge Creation...');
  
  // Check if user is logged in
  const token = localStorage.getItem('authToken');
  console.log('🔑 Auth Token:', token ? 'Present' : 'Missing');
  
  // Check if backend is reachable
  try {
    const response = await fetch('http://localhost:8000/api/challenges');
    console.log('🌐 Backend reachable:', response.ok);
    console.log('📊 Response status:', response.status);
  } catch (error) {
    console.error('❌ Backend not reachable:', error.message);
  }
  
  // Test challenge creation with sample data
  const sampleChallenge = {
    title: 'Test Challenge',
    description: 'This is a test challenge',
    type: 'Daily',
    days_left: 7,
    theme: 'blue'
  };
  
  try {
    console.log('🧪 Testing challenge creation...');
    const result = await challengesAPI.createChallenge(sampleChallenge);
    console.log('✅ Challenge created successfully:', result);
  } catch (error) {
    console.error('❌ Challenge creation failed:', error.message);
    console.error('📋 Full error:', error);
  }
};

// Run debug when imported
if (typeof window !== 'undefined') {
  debugChallengeCreation();
}
