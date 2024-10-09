import React, { useState, useEffect } from 'react';
import { 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  Button, Avatar, Box, Text, IconButton, useDisclosure, 
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, 
  DrawerBody, DrawerFooter
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import GeneralForm from 'components/Forms/GeneralForm';

const data = [
  {
    serial: "ALCLB3AF1D19", name: "Test For Onu", phone: "9999999999", 
    address: "Test Address", aadhar: "8777-8888-8888", 
    customerImage: "customer-image-url", 
    frontImage: "front-image-url", backImage: "back-image-url",
    plan: "Entertainment 12M 400Mbps", ip: "100.64.41.237", 
    engineer: "Deepak", engineerPhone: "8006522508", deleteLink: "#"
  },
  {
    serial: "44953B102450", name: "Dheeraj rathi", phone: "8920668691", 
    address: "B-119 buddh vih", aadhar: "4365-6089-8351", 
    customerImage: "customer-image-url", 
    frontImage: "front-image-url", backImage: "back-image-url",
    plan: "Standard 1M 200Mbps", ip: "100.64.29.212", 
    engineer: "Abhishek", engineerPhone: "9555525943", deleteLink: "#"
  },
  // Add more data entries as necessary
];

const NewInstall = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    name: "",
    phoneNumber: "",
    aadharCardNumber: "",
    customerPhoto: "",
    idFrontImage: "",
    idBackImage: "",
    address: "",
    plan: ""
  });

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        location: selectedRow?.location,
        name: selectedRow?.name,
        phoneNumber: selectedRow?.phone,
        aadharCardNumber: selectedRow?.aadhar,
        customerPhoto: selectedRow?.customerImage,
        idFrontImage: selectedRow?.frontImage,
        idBackImage: selectedRow?.backImage,
        address: selectedRow?.address,
        plan: selectedRow?.plan
      });
    }
    console.log(selectedRow)
  }, [selectedRow]);

  const handleDetailClick = (row) => {
    setSelectedRow(row);
    onOpen(); // Open the drawer
  };

  const [validateForm, setValidateForm] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendValidation = (validateFn, formData, setLoadingFn) => {
    setValidateForm(() => validateFn);
    setFormData(formData);
    setLoading(() => setLoadingFn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submit New Install");
  };

  return (
    <>
      {/* Table with Data */}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>SET DETAIL</Th>
              <Th>SERIAL NUMBER</Th>
              <Th>PROVISION</Th>
              <Th>NAME</Th>
              <Th>PHONE</Th>
              <Th>ADDRESS</Th>
              <Th>AADHAR CARD</Th>
              <Th>CUSTOMER IMAGE</Th>
              <Th>FRONT IMAGE URL</Th>
              <Th>BACK IMAGE URL</Th>
              <Th>PLAN NAME</Th>
              <Th>IP ADDRESS</Th>
              <Th>ENGINEER NAME</Th>
              <Th>ENGINEER PHONE</Th>
              <Th>DELETE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <Tr key={index}>
                {/* Detail Button to open the Drawer */}
                <Td>
                  <Button 
                    colorScheme="teal" 
                    size="sm"
                    onClick={() => handleDetailClick(row)}
                  >
                    Detail
                  </Button>
                </Td>
                <Td>{row.serial}</Td>
                <Td>Provision</Td>
                <Td maxWidth="150px" isTruncated>{row.name}</Td>
                <Td>{row.phone}</Td>
                <Td maxWidth="150px" isTruncated>{row.address}</Td>
                <Td>{row.aadhar}</Td>
                <Td><Avatar src={row.customerImage} size="sm" /></Td>
                <Td><Avatar src={row.frontImage} size="sm" /></Td>
                <Td><Avatar src={row.backImage} size="sm" /></Td>
                <Td>{row.plan}</Td>
                <Td>{row.ip}</Td>
                <Td>{row.engineer}</Td>
                <Td>{row.engineerPhone}</Td>
                <Td>
                  <IconButton
                    aria-label="Delete Installation"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => window.location.href = row.deleteLink}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Drawer to show detailed information */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Details of {selectedRow?.name}</DrawerHeader>

          <DrawerBody>
            {selectedRow && (
              <Box>
                <GeneralForm handleSubmit={handleSubmit} sendValidation={sendValidation}/>
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NewInstall;
