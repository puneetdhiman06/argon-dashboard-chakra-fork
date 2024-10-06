import React, { useState } from 'react';
import { 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  Button, Avatar, Box, Text, IconButton, useDisclosure, 
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, 
  DrawerBody, DrawerFooter
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

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

  const handleDetailClick = (row) => {
    setSelectedRow(row);
    onOpen(); // Open the drawer
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
                <Text><strong>Serial:</strong> {selectedRow.serial}</Text>
                <Text><strong>Phone:</strong> {selectedRow.phone}</Text>
                <Text><strong>Address:</strong> {selectedRow.address}</Text>
                <Text><strong>Aadhar:</strong> {selectedRow.aadhar}</Text>
                <Text><strong>Plan:</strong> {selectedRow.plan}</Text>
                <Text><strong>IP Address:</strong> {selectedRow.ip}</Text>
                <Text><strong>Engineer:</strong> {selectedRow.engineer}</Text>
                <Text><strong>Engineer Phone:</strong> {selectedRow.engineerPhone}</Text>
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
