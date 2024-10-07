import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/Card/Card';

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    address: '',
    phoneNumber: '',
    aadharNumber: '',
    photosForTraining: null,
    photo: null,
    aadharFront: null,
    aadharBack: null,
    policeVerification: null,
    userType: '',
  });

  const [errors, setErrors] = useState({});
  const toast = useToast();

  // Input change handler with formatting for phoneNumber and aadharNumber
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'aadharNumber') {
      let formattedValue = value.replace(/\D/g, '').slice(0, 12);
      formattedValue = formattedValue.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === 'phoneNumber') {
      const onlyNumbers = value.replace(/\D/g, '').slice(0, 10); // Allow only digits and limit to 10
      setFormData({ ...formData, [name]: onlyNumbers });
    } else if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = 'Name is required.';
    if (!formData.username) tempErrors.username = 'Username is required.';
    if (!formData.password) tempErrors.password = 'Password is required.';
    if (!formData.address) tempErrors.address = 'Address is required.';
    if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone number is required.';
    if (!formData.aadharNumber) tempErrors.aadharNumber = 'Aadhar number is required.';
    if (!formData.userType) tempErrors.userType = 'User type is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      toast({
        title: 'Employee Registered.',
        description: 'The employee has been successfully registered.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Form Incomplete',
        description: 'Please fill all the required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card mt={{ base: '130px', md: '70px' }}>
    <Box>
      <form onSubmit={handleSubmit}>
        <Box as="h1" textAlign="center" mb="8" fontSize="2xl" fontWeight="bold">
          Employee Registration Form
        </Box>

        <FormControl mb="4" isInvalid={errors.name}>
          <FormLabel>Name:</FormLabel>
          <Input
            placeholder="Employee name.."
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={errors.username}>
          <FormLabel>Username:</FormLabel>
          <Input
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={errors.password}>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={errors.address}>
          <FormLabel>Address:</FormLabel>
          <Textarea
            placeholder="Employee Present Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={errors.phoneNumber}>
          <FormLabel>Phone Number:</FormLabel>
          <Input
            placeholder="Employee Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={errors.aadharNumber}>
          <FormLabel>Aadhar Number:</FormLabel>
          <Input
            placeholder="Employee Aadhar Number"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.aadharNumber}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Photos For Training (Upload 5 Photos):</FormLabel>
          <Input
            type="file"
            multiple
            name="photosForTraining"
            onChange={handleInputChange}
            accept="image/*"
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Photo:</FormLabel>
          <Input type="file" name="photo" onChange={handleInputChange} accept="image/*" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Aadhar Front:</FormLabel>
          <Input type="file" name="aadharFront" onChange={handleInputChange} accept="image/*" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Aadhar Back:</FormLabel>
          <Input type="file" name="aadharBack" onChange={handleInputChange} accept="image/*" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Police Verification Form:</FormLabel>
          <Input
            type="file"
            name="policeVerification"
            onChange={handleInputChange}
            accept="application/pdf"
          />
        </FormControl>

        <FormControl mb="6" isInvalid={errors.userType}>
          <FormLabel>User Type:</FormLabel>
          <Select
            placeholder="-- Select User Type --"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            isRequired
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </Select>
          <FormErrorMessage>{errors.userType}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full" bg="blue.700">
          Add Employee
        </Button>
      </form>
    </Box>
    </Card>
  );
};

export default EmployeeRegistrationForm;
