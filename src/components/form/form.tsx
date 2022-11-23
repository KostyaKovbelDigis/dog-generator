import React, { lazy, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/features/hooks';
import { RootState } from '../../redux/store';

import styles from './styles.module.scss';
import { actionBreeds } from '../../redux/actions/breedsActions';
import { useAppDispatch } from '../../redux/features/hooks';
import { getBreeds } from '../../utils/api';
import RequestButton from '../common/buttons/request-button';


const Item = lazy(() => import('../form-item/item'));
const ImageModal = lazy(() => import('../modal/modal'));

type BreedList = {
    [key: string]: string[],
};

type UserDataType = {
    id: string,
    breed: string,
    subbreed: string,
    count: number,
};

type DogDataType = {
    breeds?: BreedList,
    userData: UserDataType[],
}

export const Form: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const breedList: DogDataType = useAppSelector<RootState>(state => state);

    const dispatch = useAppDispatch()
    useEffect(() => {
      getBreeds('breeds/list/all').then((dataFromServer) => {
        dispatch(actionBreeds.loadBreeds(dataFromServer.message));
      });
    }, [dispatch]);

    const handleModalStatus = () => {
        setIsOpen(!isOpen);
    }
 
    return (
        <Box className={styles.form}>
            <Typography className={styles.title}>Dog generator</Typography>
            {breedList.userData.map((el: UserDataType, index: number) =>
                <Item 
                    key={el.id} 
                    breeds={breedList.breeds as BreedList} 
                    data={el} 
                    isLast={index + 1 !== breedList.userData.length} 
                />
            )}
            <RequestButton onClick={handleModalStatus} isDisabled={breedList.userData.some((el) => !el.breed)} />
            <ImageModal isOpen={isOpen} handleClose={handleModalStatus} />
        </Box>
    )
}


export default React.memo(Form);