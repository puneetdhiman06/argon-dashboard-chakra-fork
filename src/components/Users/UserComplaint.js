import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const UserComplaint = () => {
    return (
    <Box>
        <Table variant="simple" colorScheme="blue">
        <Thead bg="blue.200">
            <Tr>
            <Th>COMPLAIN NO</Th>
            <Th>SERIAL NUMBER</Th>
            <Th>SOLUTION</Th>
            <Th>STATUS</Th>
            <Th>CUSTOMER NAME</Th>
            <Th>PHONE NO</Th>
            <Th>REASON</Th>
            <Th>DESCRIPTION</Th>
            <Th>ENGINEER ASSIGNED</Th>
            <Th>ENGINEER PHONE</Th>
            </Tr>
        </Thead>
        <Tbody bg="white">
            <Tr>
            <Td>XPPO00003</Td>
            <Td>ALCLB4034D8F</Td>
            <Td>Solution</Td>
            <Td>pending</Td>
            <Td>Anshul Narwar</Td>
            <Td>8882606808</Td>
            <Td>Wifi Range Issue</Td>
            <Td>No Signal</Td>
            <Td>Mitesh</Td>
            <Td>8860936874</Td>
            </Tr>
        </Tbody>
        </Table>
    </Box>
    );
};

export default UserComplaint;

