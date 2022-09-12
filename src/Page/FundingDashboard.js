import { Typography } from "@mui/material";
import AppBarWidget from "../Component/AppBar";
import SearchBarWidget from '../Component/SearchBar';

function FundingDashboard() {
    return (
        <div>
            <AppBarWidget />
            <SearchBarWidget />
            <Typography>Funding Dashboard</Typography>
        </div>
    );
}
export default FundingDashboard;