import AppBarWidget from "../Component/AppBar";
import SearchBarWidget from '../Component/SearchBar';
import './styles/SalesDashboard.css';

function SalesDashboard() {
    return (
        <div style={{background: 'white', height: '100vh'}}>
            <AppBarWidget />
            <SearchBarWidget additionTitle="Add Deal" />
        </div>
    );
}
export default SalesDashboard;