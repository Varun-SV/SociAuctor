import { Typography } from "@mui/material";
import AppBarWidget from "../Component/AppBar";
import SearchBarWidget from '../Component/SearchBar';
import './styles/FundingDashboard.css';

function FundingDashboard() {
    return (
        <div style={{background: 'white', height: '100vh'}}>
            <AppBarWidget />
            <SearchBarWidget additionTitle="Add Activity" />
            <Typography>Funding Dashboard</Typography>
        </div>
    );
}
export default FundingDashboard;