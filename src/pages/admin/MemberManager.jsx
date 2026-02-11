import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import * as userService from '../../services/user.service';
import { validateFullName, validateEmail, validateMobile } from '../../utils/validators';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const MemberManager = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: ''
    });
    const [blur, setBlur] = useState(false);


    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = users.filter(user =>
                (user.fullName && user.fullName.toLowerCase().includes(lowerQuery)) ||
                (user.email && user.email.toLowerCase().includes(lowerQuery)) ||
                (user.mobile && user.mobile.toLowerCase().includes(lowerQuery))
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQuery, users]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const result = await userService.getAllUsers();
            setUsers(result.data || result);
            setFilteredUsers(result.data || result);
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        const fullNameError = validateFullName(formData.fullName);
        const emailError = validateEmail(formData.email);
        const mobileError = validateMobile(formData.mobile);

        if (fullNameError) newErrors.fullName = fullNameError;
        if (emailError) newErrors.email = emailError;
        if (mobileError) newErrors.mobile = mobileError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mobile') {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            mobile: ''
        });
        setErrors({});
        setCurrentUser(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setFormData({
            fullName: user.fullName || '',
            email: user.email || '',
            mobile: user.mobile || ''
        });
        setIsModalOpen(true);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please enter valid details");
            return;
        }

        try {
            if (currentUser) {
                const updateData = {
                    ...formData,
                    id: currentUser.id,
                    isActive: true
                };

                await userService.updateUser(updateData);
                toast.success("User updated successfully");
            } else {
                await userService.addUser(formData);
                toast.success("User added successfully");
            }
            fetchUsers();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Operation failed";
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const confirmDelete = (onConfirm) => {
        setBlur(true);

        toast((t) => (
            <div className="flex flex-col gap-3">
                <span className="font-medium text-gray-800">
                    Are you sure you want to delete this user?
                </span>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            setBlur(false);
                        }}
                        className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            setBlur(false);
                            onConfirm();
                        }}
                        className="px-3 py-1 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity,
            position: "top-center"
        });
    };


    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;
        // confirmDelete(async () => {
        try {
            await userService.deleteUser(id);
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            toast.error("Failed to delete user");
            console.error(error);
        }
        // });
    };

    const columns = [
        { header: 'Full Name', accessor: 'fullName' },
        { header: 'Email', accessor: 'email' },
        { header: 'Mobile', accessor: 'mobile' }
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => openEditModal(row)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit2 size={16} />
            </button>
            <button
                onClick={() => handleDelete(row.id)} // Assuming 'id' is the unique identifier
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    if (loading) {
        return <Loader />
    }

    return (
        <div className="space-y-6">
            {blur && (
                <div className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300" />
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 w-full sm:w-64 transition-all"
                    />
                </div>

                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200 font-medium"
                >
                    <Plus size={20} />
                    <span>Add Member</span>
                </button>
            </div>

            <Table
                columns={columns}
                data={filteredUsers}
                actions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentUser ? "Edit Member" : "Add New Member"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200'} focus:ring-opacity-50 transition-all outline-none`}
                            placeholder="John Doe"
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200'} focus:ring-opacity-50 transition-all outline-none`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.mobile ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200'} focus:ring-opacity-50 transition-all outline-none`}
                            placeholder="10 digit mobile number"
                            maxLength={10}
                        />
                        {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-medium"
                        >
                            {currentUser ? "Update Member" : "Add Member"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MemberManager;
