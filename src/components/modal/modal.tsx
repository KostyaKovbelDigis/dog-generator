import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Modal } from "@mui/material"

import { RootState } from "../../redux/store";
import { getBreeds } from '../../utils/api';
import styles from './styles.module.scss';

type ImageModalType = {
    isOpen: boolean;
    handleClose: () => void;
}

type PayloadData = {
    id: string,
    subbreed: string,
    breed: string,
    count: number,
};

const ImageModal: React.FC<ImageModalType> = ({ isOpen, handleClose }) => {
    const [images, setImages] = useState<string[]>([])
    const breedList: PayloadData[] = useSelector<RootState>(state => state.userData) as PayloadData[];
    const getImages = useCallback(async (data: PayloadData) => {
        const result = data.subbreed
            ? await getBreeds(`breed/${data.breed}/${data.subbreed}/images/random/${data.count}`)
            : await getBreeds(`breed/${data.breed}/images/random/${data.count}`);
        if (result.status === 'success') {
            setImages((prev) => [...prev, ...result.message])
        }
    }, []);

    const resetImages = () => {
        setImages([]);
    }

    const reloadImages = () => {
        setImages([]);
        breedList.forEach((el) => {
            getImages(el);
        });
    };

    useEffect(() => {
        if (isOpen) {
            breedList.forEach((el) => {
                getImages(el);
            });
        };
    }, [breedList, getImages, isOpen]);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <Box className={styles.wrapper}>
                <Box className={styles.modal}>
                    {images.map((el, index) => <img src={el} key={index} alt='' />)}
                </Box>
                <Box className={styles.buttons}>
                    <Button color="error" variant="contained" onClick={resetImages}>Clear</Button>
                    <Button color="success" variant="contained" onClick={reloadImages}>Upload new!</Button>
                    <Button variant="contained" onClick={handleClose} >Close</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default React.memo(ImageModal);
