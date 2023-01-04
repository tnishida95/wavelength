import { useState } from 'react';
import './App.css';
import {
    Box, Button,
    createTheme, Dialog,
    Divider,
    Paper,
    Slider, Table, TableBody, TableCell, TableHead, TableRow,
    TextField,
    ThemeProvider, ToggleButton, ToggleButtonGroup,
    Typography
} from "@mui/material";

function App() {

    const theme = createTheme({
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    });

    const [realValue, setRealValue] = useState(50);
    const [guessValue, setGuessValue] = useState(50);
    const [leftOrRight, setLeftOrRight] = useState("left");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [scoreMarks, setScoreMarks] = useState([]);
    const [leftScore, setLeftScore] = useState(0);
    const [rightScore, setRightScore] = useState(0);

    const calculatePsychicPoints = (difference) => {
        if (difference <= 2) {
            return 4;
        }
        if (difference <= 7) {
            return 3;
        }
        if (difference <= 12) {
            return 2;
        }
        return 0;
    };

    const calculateOtherPoints = () => {
        if (leftOrRight === "left" && (realValue - guessValue) < 0) {
            return 1;
        }
        if (leftOrRight === "right" && (realValue - guessValue) > 0) {
            return 1;
        }
        return 0;
    }

    const prepareScore = async () => {
        const realAsInt = parseInt(realValue);
        await setScoreMarks([
            {
                value: realAsInt - 2,
                label: 4
            },
            {
                value: realAsInt + 2,
                label: 4
            },
            {
                value: realAsInt - 7,
                label: 3
            },
            {
                value: realAsInt + 7,
                label: 3
            },
            {
                value: realAsInt - 12,
                label: 2
            },
            {
                value: realAsInt + 12,
                label: 2
            },
        ]);
        console.log(scoreMarks);

        setIsDialogOpen(true);
    };

    function ScoreDialog() {

        return (
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <Box sx={{minWidth: "500px", padding: "16px"}}>
                    <Typography gutterBottom variant="h4">Round Results</Typography>

                    <Slider id="scoreSlider" track={false} marks={scoreMarks} value={[guessValue, realValue]} valueLabelDisplay="on" />

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Psychic's Number</TableCell>
                                <TableCell>Team's Guess</TableCell>
                                <TableCell>Difference</TableCell>
                                <TableCell>Psychic Team Scores</TableCell>
                                <TableCell>Left/Right</TableCell>
                                <TableCell>Other Team Scores</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{realValue}</TableCell>
                                <TableCell>{guessValue}</TableCell>
                                <TableCell>{Math.abs(realValue - guessValue)}</TableCell>
                                <TableCell>{calculatePsychicPoints(Math.abs(realValue - guessValue))}</TableCell>
                                <TableCell>{leftOrRight}</TableCell>
                                <TableCell>{calculateOtherPoints(realValue, guessValue)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Dialog>
        );
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ScoreDialog />
                <Typography gutterBottom variant="h3">Wavelength</Typography>
                <Box sx={{maxWidth: "1280px", display: "grid", gridTemplateColumns: "1fr 15fr 1fr", gap: "20px"}}>
                    <Box sx={{maxHeight: "500px"}}>
                        <Typography gutterBottom>Left</Typography>
                        <Slider orientation="vertical" marks steps={1} min={0} max={10} value={leftScore} onChange={(event, newValue) => setLeftScore(newValue)}/>
                    </Box>
                    <Box>
                        <Paper elevation={8} sx={{padding: "16px"}}>
                            <Divider>Psychic Phase</Divider>
                            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px"}}>
                                <TextField placeholder="Left" variant="outlined" sx={{width: "100%"}} />
                                <p>&nbsp;</p>
                                <TextField placeholder="Right" variant="outlined" sx={{width: "100%"}} inputProps={{style: { textAlign: "right" }}} />
                            </Box>
                            <TextField label="Give a clue..." variant="outlined" sx={{width: "100%"}} inputProps={{style: { textAlign: "center" }}}/>
                        </Paper>
                        <br />

                        <Paper elevation={8} sx={{padding: "16px"}}>
                            <Divider>Team Phase</Divider>
                            <br />
                            <Slider id="teamSlider" defaultValue={50} marks={[{value: 0}, {value: 25}, {value: 50}, {value: 75}, {value: 100}]} track={false} valueLabelDisplay="on"
                                    value={guessValue} onChange={(event, newValue) => setGuessValue(newValue)} />
                        </Paper>
                        <br />

                        <Paper elevation={8} sx={{padding: "16px"}}>
                            <Divider>Left/Right Phase</Divider>
                            <ToggleButtonGroup value={leftOrRight} exclusive onChange={(event, newLeftOrRight) => {setLeftOrRight(newLeftOrRight)}}>
                                <ToggleButton value="left">Left</ToggleButton>
                                <ToggleButton value="right">Right</ToggleButton>
                            </ToggleButtonGroup>
                        </Paper>
                        <br />

                        <Paper elevation={8} sx={{padding: "16px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <TextField placeholder="Real Value" variant="outlined" type="number" onChange={(event) => setRealValue(event.target.value)} />
                            &nbsp;&nbsp;
                            <Button variant="contained" onClick={prepareScore} sx={{height: "100%"}}>Score</Button>
                        </Paper>
                    </Box>
                    <Box sx={{maxHeight: "500px"}}>
                        <Typography gutterBottom>Right</Typography>
                        <Slider orientation="vertical" marks steps={1} min={0} max={10} value={rightScore} onChange={(event, newValue) => setRightScore(newValue)}/>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default App;
