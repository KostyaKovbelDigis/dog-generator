import { Button } from '@mui/material';
import styles from './styles.module.scss';

type AddProps = {
    isLast: boolean,
    onClick: () => void;
}

const AddButton: React.FC<AddProps> = ({ onClick, isLast }) => (
    <Button
        data-testid="add-button"
        className={`${styles.active} ${isLast && styles.hidden}`} 
        onClick={onClick}
    >
        Add
    </Button>
);

export default AddButton;