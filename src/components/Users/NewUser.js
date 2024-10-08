import React, { useState } from 'react';
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  Select,
  Textarea,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';

const NewUser = () => {
    const [formData, setFormData] = useState({
        location: '',
        name: '',
        phoneNumber: '',
        aadharCardNumber: '',
        customerPhoto: null,
        idFrontImage: null,
        idBackImage: null,
        address: '',
        plan: '',
      });
      
      const [errors, setErrors] = useState({});
      const [loading, setLoading] = useState(false);
    
      // Validate form data
      const validateForm = () => {
        const newErrors = {};
    
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!formData.aadharCardNumber || !/^\d{4}-\d{4}-\d{4}$/.test(formData.aadharCardNumber)) {
          newErrors.aadharCardNumber = 'Aadhar number must be in xxxx-xxxx-xxxx format';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.plan) newErrors.plan = 'Please select a plan';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.customerPhoto) newErrors.customerPhoto = 'Customer photo is required';
        if (!formData.idFrontImage) newErrors.idFrontImage = 'ID front image is required';
        if (!formData.idBackImage) newErrors.idBackImage = 'ID back image is required';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'aadharCardNumber') {
          let formattedValue = value.replace(/\D/g, '').slice(0, 12);
          formattedValue = formattedValue.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
          setFormData({
            ...formData,
            [name]: formattedValue,
          });
        } else if (name === 'phoneNumber') {
          const onlyNumbers = value.replace(/\D/g, '').slice(0, 10); // Allow only digits and limit to 10
          setFormData({
            ...formData,
            [name]: onlyNumbers,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };
    
      // Handle file inputs
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
          ...formData,
          [name]: files[0],
        });
      };
    
      // Function to get client location
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setFormData((prevData) => ({
                ...prevData,
                location: `${latitude},${longitude}`,
              }));
            },
            (error) => {
              console.error(error);
              alert('Unable to retrieve your location');
            }
          );
        } else {
          alert('Geolocation is not supported by your browser');
        }
      };
    
      // Handle form submission and send data to the API
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
          console.log("Validation failed");
          return;
        }
    
        setLoading(true);
    
        // Prepare the data to be sent to the API
        const apiBody = {
          franchise_user: {
            user: {
              username: "dharmveer_cus_1",
              password: "Pankaj143@",
              password2: "Pankaj143@",
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
    <form onSubmit={handleSubmit}>
    <Stack spacing={4}>
      <FormControl isInvalid={!!errors.location}>
        <FormLabel>Location:</FormLabel>
        {   
          formData.location === "" ? 
            <Button colorScheme="green" onClick={getLocation} isLoading={loading}>
              Send User Location
            </Button> 
          : formData.location
        }
        <FormErrorMessage>{errors.location}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.name}>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="Customer name.."
          value={formData.name}
          onChange={handleChange}
          isDisabled={loading}
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.phoneNumber}>
        <FormLabel>Phone Number:</FormLabel>
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Customer Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          isDisabled={loading}
        />
        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.aadharCardNumber}>
        <FormLabel>Aadhar Card Number:</FormLabel>
        <Input
          type="text"
          name="aadharCardNumber"
          placeholder="xxxx-xxxx-xxxx"
          value={formData.aadharCardNumber}
          onChange={handleChange}
          isDisabled={loading}
        />
        <FormErrorMessage>{errors.aadharCardNumber}</FormErrorMessage>
      </FormControl>

    <FormControl isInvalid={!!errors.customerPhoto}>
      <FormLabel>Customer Photo:</FormLabel>
      <Input
        type="file"
        name="customerPhoto"
        onChange={handleFileChange}
        variant="unstyled"
        isDisabled={loading}
      />
      <FormErrorMessage>{errors.customerPhoto}</FormErrorMessage>
    </FormControl>

    <FormControl isInvalid={!!errors.idFrontImage}>
      <FormLabel>ID Front Image:</FormLabel>
      <Input
        type="file"
        name="idFrontImage"
        onChange={handleFileChange}
        variant="unstyled"
        isDisabled={loading}
      />
      <FormErrorMessage>{errors.idFrontImage}</FormErrorMessage>
    </FormControl>

    <FormControl isInvalid={!!errors.idBackImage}>
      <FormLabel>ID Back Image:</FormLabel>
      <Input
        type="file"
        name="idBackImage"
        onChange={handleFileChange}
        variant="unstyled"
        isDisabled={loading}
      />
      <FormErrorMessage>{errors.idBackImage}</FormErrorMessage>
    </FormControl>

      <FormControl isInvalid={!!errors.address}>
        <FormLabel>Address:</FormLabel>
        <Textarea
          name="address"
          placeholder="Customer Present Address"
          value={formData.address}
          onChange={handleChange}
          isDisabled={loading}
        />
        <FormErrorMessage>{errors.address}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.plan}>
        <FormLabel>Plan:</FormLabel>
        <Select
          name="plan"
          placeholder="Select a plan"
          value={formData.plan}
          onChange={handleChange}
          isDisabled={loading}
        >
          <option value="Entertainment 12M 400Mbps ₹1200">Entertainment 12M 400Mbps ₹1200</option>
          <option value="Plan 2">Plan 2</option>
        </Select>
        <FormErrorMessage>{errors.plan}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="teal" type="submit" mt="4" isLoading={loading}>
        Submit
      </Button>
    </Stack>
  </form>
  )
}

export default NewUser