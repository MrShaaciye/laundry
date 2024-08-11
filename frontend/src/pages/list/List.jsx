import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";

const List = () => {
    return (
        <div className="list">
            <Sidebar />

            <div className="list-content">
                <Navbar />
                <Datatable />
            </div>
        </div>
    );
};

export default List;
