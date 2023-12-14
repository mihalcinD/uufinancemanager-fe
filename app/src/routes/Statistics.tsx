//import {useParams} from 'react-router-dom';
import {Container, MenuItem, Paper, Select, Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useState} from "react";
import {AllInclusiveRounded} from "@mui/icons-material";
import {BalanceChart} from "../components/statistics/balanceChart.tsx";
import {IncomeChart} from "../components/statistics/incomeChart.tsx";
import Grid from "@mui/material/Unstable_Grid2";

export interface StatisticsPageProsp {

}

const Statistics = ({}: StatisticsPageProsp) => {
    //const {id} = useParams<{ id: string }>();
    const [timePeriodFilter, setTimePeriodFilter] = useState<number>(-1)
    const [memberFilter, setMemberFilter] = useState<string>("all")
    const [tagFilter, setTagFilter] = useState<string>("all")
    return (
        <>
            <Container maxWidth={"md"}>
                <Stack p={2} direction="row" gap={2} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <Typography fontWeight={700} fontSize={32}>Statistics</Typography>
                    <Paper elevation={8} sx={{p: 1.5, display: "flex", gap: 2, flexWrap: "wrap"}}>
                        <Stack spacing={0.5}>
                            <Typography fontSize={12}>Time period</Typography>
                            <ToggleButtonGroup
                                value={timePeriodFilter}
                                exclusive
                                onChange={(e, value) => setTimePeriodFilter(value)}
                                aria-label="text alignment"
                            >
                                <ToggleButton value={-1}>
                                    <AllInclusiveRounded/>
                                </ToggleButton>
                                <ToggleButton value={7}>
                                    7 dnů
                                </ToggleButton>
                                <ToggleButton value={30}>
                                    30 dnů
                                </ToggleButton>
                                <ToggleButton value={90}>
                                    90 dnů
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                        <Stack spacing={0.5}>
                            <Typography fontSize={12}>Member</Typography>
                            <Select
                                value={memberFilter}
                                sx={{
                                    height: 48,
                                    "& legend": {
                                        color: "white"
                                    }
                                }}
                                onChange={(e) => setMemberFilter(e.target.value)}
                            >
                                <MenuItem value={"all"}>všichni</MenuItem>
                                <MenuItem value={"Jakub"}>Jakub</MenuItem>
                                <MenuItem value={"Tary"}>Tary</MenuItem>
                                <MenuItem value={"David"}>David</MenuItem>
                            </Select>
                        </Stack>
                        <Stack spacing={0.5}>
                            <Typography fontSize={12}>Tag</Typography>
                            <Select
                                value={tagFilter}
                                sx={{
                                    height: 48,
                                    "& legend": {
                                        color: "white"
                                    }
                                }}
                                onChange={(e) => setTagFilter(e.target.value)}
                            >
                                <MenuItem value={"all"}>všechny</MenuItem>
                                <MenuItem value={"tag1"}>Výdaje</MenuItem>
                                <MenuItem value={"tag2"}>Příjmy</MenuItem>
                                <MenuItem value={"tag3"}>Spoření</MenuItem>
                            </Select>
                        </Stack>
                    </Paper>
                </Stack>
                <Stack p={1}>
                    <Grid container spacing={2} m={0} sx={{width: "100%"}}>
                        <Grid xs={12}>
                            <Paper elevation={8} sx={{p: 1.5}}>
                                <Typography fontWeight={700} fontSize={20}>Household balance</Typography>
                                <BalanceChart timePeriod={timePeriodFilter === -1 ? undefined : timePeriodFilter}/>
                            </Paper>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper elevation={8} sx={{p: 1.5}}>
                                <Typography fontWeight={700} fontSize={20}>Income by user</Typography>
                                <IncomeChart member={memberFilter}/>
                            </Paper>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper elevation={8} sx={{p: 1.5}}>
                                <Typography fontWeight={700} fontSize={20}>Outcome by user</Typography>
                                <IncomeChart member={memberFilter}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </>
    )
};

export default Statistics;
