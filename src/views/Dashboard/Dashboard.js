// Chakra imports
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import React from "react";
import { pageVisits } from "variables/general";

export default function Dashboard() {
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");


  return (
    <Card mt={{ base: "120px", md: "75px" }}>
       <Flex flexDirection='column'>
      <Flex align='center' justify='space-between' p='22px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Page visits
            </Text>
            <Button variant='primary' maxH='30px'>
              SEE ALL
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table>
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color='gray.400' borderColor={borderColor}>
                    Page name
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}>
                    Visitors
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}>
                    Unique users
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}>
                    Bounce rate
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageVisits.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize='sm'
                        fontWeight='bold'
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}>
                        {el.pageName}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize='sm'
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}>
                        {el.visitors}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize='sm'
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}>
                        {el.uniqueUsers}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize='sm'
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}>
                        {el.bounceRate}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
        </Card>
  );
}
