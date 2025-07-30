import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

export function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
const [isVerified,setIsVerified] =useState(false)

 const onSubmit = async (e) => {
 e.preventDefault()
    const formData = new FormData(e.target);

  

   
    const payload = Object.fromEntries(formData.entries());
  const fullData = { ...payload, token };
 console.log(fullData);
  try {
    const res = await fetch('http://localhost:3000/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify(fullData),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || 'Verification failed.');
      return;
    }

    setIsVerified(true); 
    alert("email verified, please login")
  } catch (error) {
    console.error('Verification failed:', error);
    alert('Something went wrong. Please try again later.');
  }
};


  return (
    <div className="max-w-md border-1 dark:border-gray-400 border-gray-700 mx-auto mt-16 px-6 py-8 rounded-2xl shadow-lg dark:bg-[#181a20] bg-white">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
    {isVerified ? '✅ Verification Complete!' : '🔒 Verify Your Account'}
  </h2>

  {!isVerified && (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <input
          type="text"
          placeholder="Username"
          name='name'
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 dark:bg-[#2a2e39] dark:text-white outline-none"
        />
       
      </div>

      {/* Phone */}
      <div>
        <input
          type="text"
          placeholder="Phone"
          name='tel'
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 dark:bg-[#2a2e39] dark:text-white outline-none"
        />
    
      </div>

      {/* Address */}
      <div>
        <input
          type="text"
          placeholder="Address"
          name="adresse"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 dark:bg-[#2a2e39] dark:text-white outline-none"
        />
        
      </div>

      {/* Gender */}
      <div>
        <select
        name='gender'
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 dark:bg-[#2a2e39] dark:text-white outline-none"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
       
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition duration-300"
      >
        ✅ Verify & Submit
      </button>
    </form>
  )}

  {isVerified && (
    <div className="text-green-500 text-center text-lg font-medium">
      🎉 Your account has been verified successfully!
    </div>
  )}
</div>

  );
}
