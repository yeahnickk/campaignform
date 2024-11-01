'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const [selectedFormType, setSelectedFormType] = useState(null);

  useEffect(() => {
    // Check if there's a pre-selected form type from the landing page
    const formType = sessionStorage.getItem('selectedFormType');
    if (formType) {
      setSelectedFormType(formType);
      sessionStorage.removeItem('selectedFormType'); // Clear it after use
    }
  }, []);

  // Your existing HomePage component logic here
  return (
    <div>
      {/* Your existing app UI */}
      {/* You can use selectedFormType to automatically open the correct form */}
    </div>
  );
};

export default DashboardPage; 