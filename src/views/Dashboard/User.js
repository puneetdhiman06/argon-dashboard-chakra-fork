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
const UserComplaint = lazy(() => import('components/Users/UserComplaint'));
const NewComplaint = lazy(() => import('components/Complaint/NewComplaint'));

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import NewComplaint from 'components/Complaint/NewComplaint';

const User = () => {

  return (
    <Box mx="auto" mt={{ base: '130px', md: '70px' }}>
      <Card>
        <CardBody>
          <Heading as="h2" size="lg" textAlign="center" mb="6">Add User</Heading>
          <Tabs isFitted>
            <TabList>
              <Tab>New User</Tab>
              <Tab>New Installation</Tab>
              <Tab>User list</Tab>
              <Tab>User Complaint</Tab>
              <Tab>New Complaint</Tab>
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
          <TabPanel>
            <Suspense fallback={<div>Loading User Complaint...</div>}>
              <UserComplaint />
            </Suspense>
          </TabPanel>
          <TabPanel>
            <Suspense fallback={<div>Loading New Complaint...</div>}>
              < NewComplaint/>
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
