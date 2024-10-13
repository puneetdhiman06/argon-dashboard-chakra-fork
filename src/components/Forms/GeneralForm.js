import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  Select,
  Textarea,
  Stack,
  FormErrorMessage,
  Box,HStack
} from '@chakra-ui/react';

const GeneralForm = ({ handleSubmit, sendValidation, initialFormData, photoUpload=true, children }) => {
  const [formData, setFormData] = useState(initialFormData || {
    location: '',
    name: '',
    phoneNumber: '',
    aadharCardNumber: '',
    customerPhoto: null,
    idFrontImage: null,
    idBackImage: null,
    address: '',
    plan: '',
  }); // Provide fallback default values

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
    if (photoUpload && !formData.customerPhoto) newErrors.customerPhoto = 'Customer photo is required';
    if (photoUpload && !formData.idFrontImage) newErrors.idFrontImage = 'ID front image is required';
    if (photoUpload && !formData.idBackImage) newErrors.idBackImage = 'ID back image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    sendValidation(validateForm, formData, setLoading); // Send validation function and form data to the parent
  }, [formData]);
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

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Search performed with:", formData);
      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
      <FormControl isInvalid={errors.location}>
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

      <FormControl isInvalid={errors.name}>
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

      <FormControl isInvalid={errors.phoneNumber}>
        <FormLabel>Phone Number:</FormLabel>
        <Input
          type="number"
          name="phoneNumber"
          placeholder="Customer Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          isDisabled={loading}
        />
        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.aadharCardNumber}>
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
{children}
{photoUpload&&
<>
    <FormControl isInvalid={errors.customerPhoto}>
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

    <FormControl isInvalid={errors.idFrontImage}>
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

    <FormControl isInvalid={errors.idBackImage}>
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
</>}

      <FormControl isInvalid={errors.address}>
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

      <FormControl isInvalid={errors.plan}>
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

       {!photoUpload && (
          <>
            <FormControl>
              <FormLabel>IP Address:</FormLabel>
              <Input
                type="text"
                name="ipAddress"
                value={formData.ipAddress}
                onChange={handleChange}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Serial Number:</FormLabel>
              <Input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ont Serial Number:</FormLabel>
              <Input
                type="text"
                name="ontSerialNumber"
                value={formData.ontSerialNumber}
                onChange={handleChange}
                isDisabled={loading}
              />
            </FormControl>
            
            <Box
              p={4}
              border="2px solid"
              borderColor="gray.300"
              borderRadius="md"
              boxShadow="lg"
            >
              <HStack spacing={4} justifyContent="center">
                <FormControl isDisabled={loading}>
                  <FormLabel fontSize="md" fontWeight="bold" color="gray.700">
                    Unique Box ID:
                  </FormLabel>
                  <Input
                    type="text"
                    name="uniqueBoxId"
                    value={formData.uniqueBoxId}
                    onChange={handleChange}
                    borderColor="gray.300"
                    focusBorderColor="teal.400"
                    size="md"
                  />
                </FormControl>
                <Button
                  size="md"
                  bg="green.400"
                  color="white"
                  _hover={{ bg: "green.500" }}
                  onClick={handleSearch}
                  isLoading={loading}
                >
                  Search
                </Button>
              </HStack>

              <Stack mt={4} spacing={4} direction="row" justifyContent="center">
                <FormControl isDisabled={loading}>
                  <FormLabel fontSize="sm" fontWeight="medium" color="gray.600">
                    Box No:
                  </FormLabel>
                  <Input
                    type="text"
                    name="boxNo"
                    value={formData.boxNo}
                    onChange={handleChange}
                    borderColor="gray.300"
                    focusBorderColor="teal.400"
                    size="sm"
                    placeholder="Box No"
                  />
                </FormControl>

                <FormControl isDisabled={loading}>
                  <FormLabel fontSize="sm" fontWeight="medium" color="gray.600">
                    Box Port:
                  </FormLabel>
                  <Input
                    type="text"
                    name="boxPort"
                    value={formData.boxPort}
                    onChange={handleChange}
                    borderColor="gray.300"
                    focusBorderColor="teal.400"
                    size="sm"
                    placeholder="Box Port"
                  />
                </FormControl>
              </Stack>
            </Box>

            <FormControl>
              <FormLabel>OLT IP:</FormLabel>
              <Input
                type="text"
                name="oltIp"
                value={formData.oltIp}
                onChange={handleChange}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>ONU ID:</FormLabel>
              <Input
                type="text"
                name="onuId"
                value={formData.onuId}
                onChange={handleChange}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Engineer Name:</FormLabel>
              <Input
                type="text"
                name="engineerName"
                value={formData.engineerName}
                onChange={handleChange}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Engineer Phone:</FormLabel>
              <Input
                type="text"
                name="engineerPhone"
                value={formData.engineerPhone}
                onChange={handleChange}
                isDisabled={loading}
              />
            </FormControl>
          </>
        )}

      <Button colorScheme="teal" type="submit" mt="4" isLoading={loading}>
        Submit
      </Button>
    </Stack>
  </form>
  )
}

export default GeneralForm