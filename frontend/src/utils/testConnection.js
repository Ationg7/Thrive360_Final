// Test API connection
export const testAPIConnection = async () => {
  console.log('🔍 Testing API Connection...');
  
  try {
    // Test basic connection
    const response = await fetch('http://localhost:8000/api/challenges');
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', response.headers);
    
    const contentType = response.headers.get('content-type');
    console.log('📄 Content-Type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('✅ API is working! Data:', data);
    } else {
      const text = await response.text();
      console.log('❌ API returned HTML instead of JSON:', text.substring(0, 200));
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
};

// Run test
if (typeof window !== 'undefined') {
  testAPIConnection();
}
