// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useContext } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    Divider,
    Stack,
    Input,
    FormLabel,
    useDisclosure,
    ModalFooter,
    ModalHeader,
    Modal,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react';
import { AuthContext } from '../authcontext';
import { updateUser } from '../script/Authenticate';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, updateUser: updateAuthUser } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    useNavigate();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
            name: name,
            email: email,
            password: password,
        };

        try {
            const response = await updateUser(user.id, updatedUser);
            updateAuthUser(response);
            console.log('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Box p={4}>
            <Flex direction="column" align="center">
                <Image
                    src={file || 'https://via.placeholder.com/150'}
                    alt="Profile picture"
                    borderRadius="full"
                    boxSize="150px"
                    cursor="pointer"
                    onClick={onOpen}
                />

                <Heading as="h2" size="lg" mt={4}>
                    {name}
                </Heading>

                <Text mt={2}>{email}</Text>
            </Flex>

            <Divider my={6} />

            <Stack spacing={4}>
                <FormLabel>Name</FormLabel>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Stack>
            <Flex justifyContent={"space-around"}>
                <Button mt={6} colorScheme="blue"  justifyContent="end" onClick={handleSubmit}>
                    Update User
                </Button>

                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileUpload}
                />

                <Button mt={6} onClick={onOpen} px={2} colorScheme="green" justifyContent="end">
                    Change Profile Picture
                </Button>
            </Flex>


            <ProfilePictureUploader isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

// eslint-disable-next-line react/prop-types
const ProfilePictureUploader = ({ isOpen, onClose }) => {
    function handleFileUpload() {
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalContent>
                <ModalHeader>Upload Profile Picture</ModalHeader>
                <ModalBody>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </ModalBody>
                <Flex>
                <ModalFooter justifyContent={"space-around"} display={"flex"} direction={"column"}>s
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={onClose} p={10}>
                        Upload
                    </Button>
                </ModalFooter>
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export default Profile;
