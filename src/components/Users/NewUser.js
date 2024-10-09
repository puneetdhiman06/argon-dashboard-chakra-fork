import React, { useState } from 'react';
import GeneralForm from 'components/Forms/GeneralForm';

const NewUser = () => {
  const [validateForm, setValidateForm] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendValidation = (validateFn, formData, setLoadingFn) => {
    setValidateForm(() => validateFn);
    setFormData(formData);
    setLoading(() => setLoadingFn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm || !validateForm()) {
      console.log("Validation failed");
      return;
    }

    setLoading(true);
    const apiBody = {
      franchise_user: {
        user: {
          username: formData.phoneNumber,
          password: "Net@1234",
          password2: "Net@1234",
        },
        user_type: 3,
      },
      name: formData.name,
      address: formData.address,
      location: formData.location,
      photo: formData.customerPhoto.name,
      phone: formData.phoneNumber,
      aadhar_card: formData.aadharCardNumber.replace(/-/g, ''),
      customer_image_url: "https://www.g.com", 
      front_image_url: "https://www.g.com",
      back_image_url: "https://www.g.com",
      plan: formData.plan,
    };

    try {
      const response = await fetch(
        'https://vmware.0.staging.xpponet.in/api/customer/customer-registration/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
          },
          body: JSON.stringify(apiBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        alert('User registration successful');
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert('Error submitting form. Please try again later.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('Error submitting form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneralForm handleSubmit={handleSubmit} sendValidation={sendValidation} />
  );
};

export default NewUser;
