// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
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
    Textarea,
    useDisclosure, ModalFooter, ModalHeader, Modal, ModalContent, ModalBody,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [file, setFile] = useState(null);
    useNavigate();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update user profile here
        console.log('Updating profile:', {
            firstName,
            lastName,
            email,
            bio,
        });
        // Navigate to a different page or perform other actions after update
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
                    {firstName} {lastName}
                </Heading>

                <Text mt={2}>{email}</Text>
            </Flex>

            <Divider my={6} />

            <Stack spacing={4}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write a short description about yourself"
                    resize="vertical"
                />

                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormLabel>First Name</FormLabel>
                <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <FormLabel>Last Name</FormLabel>
                <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Stack>

            <Button mt={6} colorScheme="blue" onClick={handleSubmit}>
                Update Profile
            </Button>

            <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
            />

            <Button mt={4} onClick={onOpen}>
                Change Profile Picture
            </Button>

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
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>
                        Upload
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Profile;
