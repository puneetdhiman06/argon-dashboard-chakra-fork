import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

const NewComplaint = () => {
  const [complaintData, setComplaintData] = useState({
    name: "",
    phone: "",
    customerId: "",
    complaintSource: "Phone",
    complaintType: "",
    comments: "",
    uploadPhoto: null,
    engineerName: "Deepak",
    engineerPhone: "8006522508",
  });

  const [errors, setErrors] = useState({});
  const toast = useToast();

  // Validate inputs
  const validateForm = () => {
    let tempErrors = {};

    if (!complaintData.name) tempErrors.name = "Name is required.";
    if (!complaintData.complaintType) tempErrors.complaintType = "Complaint type is required.";
    if (!complaintData.comments) tempErrors.comments = "Please add comments.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setComplaintData({ ...complaintData, [name]: files[0] });
    } else {
      setComplaintData({ ...complaintData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Complaint Created.",
        description: "Your complaint has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Form Incomplete",
        description: "Please fill all the required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box textAlign="center" fontSize="2xl" fontWeight="bold" mb="6">
        New Complaint
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb="4" isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Type Customer Name"
            name="name"
            value={complaintData.name}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl id="phone" mb="4">
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            placeholder="Automatically Gets Filled"
            name="phone"
            value={complaintData.phone}
            onChange={handleInputChange}
            isReadOnly
          />
        </FormControl>

        <FormControl id="customerId" mb="4">
          <FormLabel>Customer ID</FormLabel>
          <Input
            type="text"
            placeholder="Automatically Get Filled"
            name="customerId"
            value={complaintData.customerId}
            onChange={handleInputChange}
            isReadOnly
          />
        </FormControl>

        <FormControl id="complaintSource" mb="4">
          <FormLabel>Complaint Source</FormLabel>
          <Select
            name="complaintSource"
            value={complaintData.complaintSource}
            onChange={handleInputChange}
            isRequired
          >
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="In-Person">In-Person</option>
          </Select>
        </FormControl>

        <FormControl id="complaintType" mb="4" isInvalid={errors.complaintType}>
          <FormLabel>Complaint Type</FormLabel>
          <Select
            placeholder="Select a Complaint Type"
            name="complaintType"
            value={complaintData.complaintType}
            onChange={handleInputChange}
            isRequired
          >
            <option value="Technical Issue">Technical Issue</option>
            <option value="Billing Issue">Billing Issue</option>
            <option value="Other">Other</option>
          </Select>
          <FormErrorMessage>{errors.complaintType}</FormErrorMessage>
        </FormControl>

        <FormControl id="comments" mb="4" isInvalid={errors.comments}>
          <FormLabel>Comments</FormLabel>
          <Textarea
            placeholder="Write Comments Here"
            name="comments"
            value={complaintData.comments}
            onChange={handleInputChange}
            isRequired
          />
          <FormErrorMessage>{errors.comments}</FormErrorMessage>
        </FormControl>

        <FormControl id="uploadPhoto" mb="4">
          <FormLabel>Upload Photo</FormLabel>
          <Input
            type="file"
            name="uploadPhoto"
            onChange={handleInputChange}
            accept="image/*"
          />
        </FormControl>

        <FormControl id="engineerName" mb="4">
          <FormLabel>Engineer Name</FormLabel>
          <Input
            type="text"
            name="engineerName"
            value={complaintData.engineerName}
            onChange={handleInputChange}
            isReadOnly
          />
        </FormControl>

        <FormControl id="engineerPhone" mb="4">
          <FormLabel>Engineer Phone</FormLabel>
          <Input
            type="text"
            name="engineerPhone"
            value={complaintData.engineerPhone}
            onChange={handleInputChange}
            isReadOnly
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          mt="4"
          size="lg"
          _hover={{ bg: "teal.600" }}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default NewComplaint;
