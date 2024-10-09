import React, { Suspense, lazy } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

const NewUser = lazy(() => import('components/Users/NewUser'));
const NewInstall = lazy(() => import('components/Users/NewInstall'));
const UserList = lazy(() => import('components/Users/UserList'));

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import NewComplaint from 'components/Complaint/NewComplaint';

const User = () => {

  return (
<Box mx="auto" mt={{ base: '130px', md: '70px' }}>
  <Card>
    <CardBody>
      <Heading 
        as="h2" 
        size={{ base: 'md', md: 'lg' }} 
        textAlign="center" 
        mb={{ base: '4', md: '6' }}
      >
        User
      </Heading>
      <Tabs isFitted>
        <TabList flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <Tab fontSize={{ base: 'sm', md: 'md' }}>New User</Tab>
          <Tab fontSize={{ base: 'sm', md: 'md' }}>New Installation</Tab>
          <Tab fontSize={{ base: 'sm', md: 'md' }}>User list</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Suspense fallback={<div>Loading New User...</div>}>
              <NewUser />
            </Suspense>
          </TabPanel>
          <TabPanel>
            <Suspense fallback={<div>Loading New Installation...</div>}>
              <NewInstall />
            </Suspense>
          </TabPanel>
          <TabPanel>
            <Suspense fallback={<div>Loading User List...</div>}>
              <UserList />
            </Suspense>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CardBody>
  </Card>
</Box>
  );
};

export default User;
