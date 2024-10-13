// import React, { useState, useEffect } from 'react';
// import { 
//   Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
//   Button, Avatar, Box, IconButton, useDisclosure, 
//   Drawer, DrawerOverlay, DrawerContent, DrawerHeader, 
//   DrawerBody, DrawerFooter,
//   Image,Flex
// } from '@chakra-ui/react';
// import { DeleteIcon } from '@chakra-ui/icons';
// import GeneralForm from 'components/Forms/GeneralForm';

// const data = [
//   {
//     serial: "ALCLB3AF1D19", name: "Test For Onu", phone: "9999999999", 
//     address: "Test Address", aadhar: "8777-8888-8888", 
//     customerImage: "https://ser.xpponet.in/uploads/Dheeraj%20rathi_4365-6089-8351_customer_image.jpg", 
//     frontImage: "https://ser.xpponet.in/uploads/Dheeraj%20rathi_4365-6089-8351_front_image.jpg", 
//     backImage: "https://ser.xpponet.in/uploads/Dheeraj%20rathi_4365-6089-8351_back_image.jpg",
//     plan: "Entertainment 12M 400Mbps ₹1200", ip: "100.64.41.237", 
//     engineer: "Deepak", engineerPhone: "8006522508", deleteLink: "#",
//     location: "22,77"
//   },
//   {
//     serial: "44953B102450", name: "Dheeraj rathi", phone: "8920668691", 
//     address: "B-119 buddh vih", aadhar: "4365-6089-8351", 
//     customerImage: "customer-image-url", 
//     frontImage: "front-image-url", backImage: "back-image-url",
//     plan: "Plan 2", ip: "100.64.29.212", 
//     engineer: "Abhishek", engineerPhone: "9555525943", deleteLink: "#",
//     location: "22,77"
//   },
// ];

// const NewInstall = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [formData, setFormData] = useState({
//     location: "",
//     name: "",
//     phoneNumber: "",
//     aadharCardNumber: "",
//     customerPhoto: "",
//     idFrontImage: "",
//     idBackImage: "",
//     address: "",
//     plan: ""
//   });
//   console.log(selectedRow)
//   useEffect(() => {
//     if (selectedRow) {
//       setFormData({
//         location: selectedRow?.location || "",
//         name: selectedRow?.name || "",
//         phoneNumber: selectedRow?.phone || "",
//         aadharCardNumber: selectedRow?.aadhar || "",
//         customerPhoto: selectedRow?.customerImage || "",
//         idFrontImage: selectedRow?.frontImage || "",
//         idBackImage: selectedRow?.backImage || "",
//         address: selectedRow?.address || "",
//         plan: selectedRow?.plan || ""
//       });
//     }
//   }, [selectedRow]);

//   const handleDetailClick = (row) => {
//     setSelectedRow(row);
//     onOpen(); // Open the drawer
//   };

import React, { useState, useEffect } from 'react';
import { 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  Button, Avatar, IconButton, useDisclosure, 
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, 
  DrawerBody, DrawerFooter, Spinner, Flex, Image
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import GeneralForm from 'components/Forms/GeneralForm';

const NewInstall = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState([]);
  const [formData, setFormData] = useState([]);
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    if (selectedRow) {
      setFormData({
        location: selectedRow?.location || "",
        name: selectedRow?.name || "",
        phoneNumber: selectedRow?.phone || "",
        aadharCardNumber: selectedRow?.aadhar_card || "",
        customerPhoto: selectedRow?.customerImage || "",
        idFrontImage: selectedRow?.frontImage || "",
        idBackImage: selectedRow?.backImage || "",
        address: selectedRow?.address || "",
        plan: selectedRow?.assigned_plan || ""
      });
    }
  }, [selectedRow]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Get token from localStorage
        const response = await fetch('https://vmware.0.staging.xpponet.in/api/customer/customer-installation/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const result = await response.json();
        // Handle missing fields and set default values
        const processedData = result.map(item => ({
          id: item.id || '',
          installation: item.installation || null,
          name: item.name || 'N/A',
          phone: item.phone || 'N/A',
          address: item.address || 'N/A',
          aadhar_card: item.aadhar_card || 'N/A',
          location: item.location || 'N/A',
          customer_image_url: item.customer_image_url || '',
          front_image_url: item.front_image_url || '',
          back_image_url: item.back_image_url || '',
          comments: item.comments || 'N/A',
          message: item.message || 'N/A',
          created_date: item.created_date || '',
          franchise_user: item.franchise_user || '',
          franchise: item.franchise || '',
          assigned_plan: item.assigned_plan || null,
          registration_done_by: item.registration_done_by || ''
        }));
  
        setData(processedData);
      } catch (err) {
        setError(err.message);
      }
      finally{
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const [validateForm, setValidateForm] = useState(null);

  const sendValidation = (validateFn, formData, setLoadingFn) => {
    setValidateForm(() => validateFn);
    setFormData(selectedRow);
    setLoading(() => setLoadingFn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleDetailClick = (row) => {
    setSelectedRow(row);
    onOpen(); // Open the drawer
  };
  console.log(selectedRow)
  return (
    <>
      {/*<TableContainer>
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
      </TableContainer> */}
     {
    //  loading ? (
    //     <Flex justify="center" align="center" minHeight="100vh">
    //       <Spinner size="xl" />
    //     </Flex>
    //   ) : 
      error ? (
        <div>Error fetching data: {error}</div>
      ) : (
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
                  <Td>
                    <Button 
                      colorScheme="teal" 
                      size="sm"
                      onClick={() => handleDetailClick(row)}
                    >
                      Detail
                    </Button>
                  </Td>
                  <Td>{row.serial||"Not Assigned"}</Td>
                  <Td>Provision</Td>
                  <Td maxWidth="150px" isTruncated>{row.name}</Td>
                  <Td>{row.phone}</Td>
                  <Td maxWidth="150px" isTruncated>{row.address}</Td>
                  <Td>{row.aadhar_card}</Td>
                  <Td><Avatar src={row.customer_image_url} size="sm" /></Td>
                  <Td><Avatar src={row.front_image_url} size="sm" /></Td>
                  <Td><Avatar src={row.back_image_url} size="sm" /></Td>
                  <Td>{row.plan||"Not Selected"}</Td>
                  <Td>{row.ip||"Not Assigned"}</Td>
                  <Td>{row.engineer||"Not Assigned"}</Td>
                  <Td>{row.engineerPhone||"Not Assigned"}</Td>
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
      )}
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
                <GeneralForm 
                  handleSubmit={handleSubmit} 
                  sendValidation={sendValidation} 
                  initialFormData={formData}
                  photoUpload={false}
                >
              <Flex
                width="100%"
                justify="center"
                align="center"
                flexDirection="column"
                gap={6}
              >
                <Avatar src={selectedRow?.customerImage} size="3xl" />
                <Image 
                  src={selectedRow?.frontImage} 
                  alt="Front Image"
                  boxSize="350px" // Adjust size as needed
                  objectFit="cover" 
                />
                <Image 
                  src={selectedRow?.backImage} 
                  alt="Back Image"
                  boxSize="350px" // Adjust size as needed
                  objectFit="cover"
                />
                </Flex>
              </GeneralForm>
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
