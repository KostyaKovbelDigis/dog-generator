import { useDispatch } from 'react-redux';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import styles from './styles.module.scss';
import { userDataAction } from '../../redux/actions/dataActions';
import AddButton from '../common/buttons/add-button';

type formItem = {
    breeds: {
        [key: string]: string[],
    },
    data: {
        id: string,
        count: number,
        breed: string,
        subbreed: string,
    },
    isLast: boolean,
};

export const Item: React.FC<formItem> = ({ breeds, data, isLast }) => {
    const { id, count, breed, subbreed } = data;
    const dispatch = useDispatch();

    const addNewField = () => {
        dispatch(userDataAction.addNewField())
    };

    return (
        <Box className={styles.item}>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label2">Breed</InputLabel>
                     <Select
                        label='Breed'
                        data-testid="breed"
                        value={breed}
                        onChange={(e) => dispatch(userDataAction.updateBreed(e.target.value, id))}
                    >
                        {Object.keys(breeds).map((el) => (
                            <MenuItem key={el} value={el} id={el}>{el}</MenuItem>
                        ))}
                     </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                 <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label2">Sub breed</InputLabel>
                     <Select
                        disabled={!breeds[breed]?.length}
                        label='Sub breed'
                        value={subbreed}
                        onChange={(e) => dispatch(userDataAction.updateSubbreed(e.target.value, id))}
                        >
                            {breeds[breed] && breeds[breed].map((el) => (
                                <MenuItem key={el} value={el} id={el}>{el}</MenuItem>
                            ))}
                     </Select>
                 </FormControl>
            </Box>
            <Box sx={{ minWidth: 200, display: 'flex' }}>
                <FormControl fullWidth>
                    <TextField
                        type='number'
                        label='Count'
                        InputProps={{
                            inputProps: {
                                max: 100, min: 1
                            }
                        }}
                        value={count}
                        onChange={(e) => dispatch(userDataAction.updateCount(+e.target.value, id))}
                    />
                </FormControl>
                <AddButton isLast={isLast} onClick={addNewField} />
            </Box>
        </Box>
        )
    }

export default Item;