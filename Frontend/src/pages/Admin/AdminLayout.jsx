import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Admin.css';

function AdminLayout() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || user?.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;