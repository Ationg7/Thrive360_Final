// Quick connection test
export const quickTest = async () => {
  console.log('🧪 Quick API Test...');
  
  try {
    const response = await fetch('http://localhost:8000/api/challenges');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is running! Found', data.length, 'challenges');
    } else {
      console.log('❌ Backend responded with status:', response.status);
    }
  } catch (error) {
    console.log('❌ Cannot connect to backend:', error.message);
    console.log('💡 Make sure to run: cd backend && php artisan serve');
  }
};

// Auto-run test
if (typeof window !== 'undefined') {
  quickTest();
}
