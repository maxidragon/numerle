import { Box } from "@chakra-ui/react";

interface NumberBoxProps {
    number: number;
    size: number;
    backgroundColor?: string;
}

const NumberBox: React.FC<NumberBoxProps> = ({ number, size, backgroundColor }): JSX.Element => {
    return (
        <Box width={size} height={size} backgroundColor={backgroundColor || "#4A5568"} borderRadius="20%" fontSize={size / 2} justifyContent="center" alignItems="center" display="flex" margin={2}>
            {number}
        </Box>
    )
};

export default NumberBox;
