import React from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Select, Checkbox, Input } from "@chakra-ui/react";
import Card from 'components/Card/Card';

const UserList = () => {

  // Sample data
  const users = [
    {
      location: "chetanOLT",
      time: "12-Oct 09:28",
      serialNumber: "ZTEGCDF58018",
      onuId: "4.29",
      condition: "los",
      engineer: "q",
      ponPower: "",
      action: "Click"
    },
    {
      location: "HighSpeed",
      time: "04-Nov 15:58",
      serialNumber: "ALCLb3de802f",
      onuId: "4.20",
      condition: "offLine",
      engineer: "a",
      ponPower: "",
      action: "Click"
    }
  ];

  return (
    <Box>
      {/* Header with Buttons */}
      <Box display="flex" justifyContent="space-between" mb={10}>
        <Button colorScheme="red">Delete Selected</Button>
        <Button colorScheme="blue">Refresh All</Button>
        <Button colorScheme="blue">Delete Working ONU</Button>
      </Box>

    <Table variant="simple" size="md">
        <Thead bg="blue.100">
        <Tr>
            <Th>
            <Select placeholder="Location" variant="filled" bg="white" color="black">
                <option value="all">All</option>
            </Select>
            </Th>
            <Th>TIME</Th>
            <Th>SERIAL NUMBER</Th>
            <Th>ONU ID</Th>
            <Th>
            <Select placeholder="Condition" variant="filled" bg="white" color="black">
                <option value="all">All</option>
            </Select>
            </Th>
            <Th>
            <Select placeholder="Engineer" variant="filled" bg="white" color="black">
                <option value="all">All</option>
            </Select>
            </Th>
            <Th>PON POWER</Th>
            <Th>PON BUTTON</Th>
            <Th>ACTION</Th>
        </Tr>
        </Thead>
        <Tbody>
        {/* Dynamic Data Rows */}
        {users.map((user, index) => (
            <Tr key={index}>
            <Td>{user.location}</Td>
            <Td>{user.time}</Td>
            <Td>{user.serialNumber}</Td>
            <Td>{user.onuId}</Td>
            <Td color={user.condition === "los" ? "red" : "black"}>{user.condition}</Td>
            <Td>{user.engineer}</Td>
            <Td>
                <Button size="xs" variant="ghost">{user.action}</Button>
            </Td>
            <Td>
                <Checkbox />
            </Td>
            <Td>
                <Button colorScheme="red" size="xs">Delete</Button>
            </Td>
            </Tr>
        ))}
        </Tbody>
    </Table>
    </Box>
  );
};

export default UserList;
