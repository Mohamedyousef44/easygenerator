import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    console.log(user);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
                <p className="mt-2 text-gray-600">Email: {user?.email}</p>
                <button
                    onClick={logout}
                    className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
