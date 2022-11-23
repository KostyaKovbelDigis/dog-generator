import { Button } from '@mui/material';

type RequestButtonProps = {
    onClick: () => void;
    isDisabled: boolean,
}

const RequestButton: React.FC<RequestButtonProps> = ({ onClick, isDisabled }) => (
    <Button
        data-testid="open-modal-button"
        variant="outlined" 
        disabled={isDisabled} 
        onClick={onClick}
        >
            Generate images
    </Button>
);

export default RequestButton;