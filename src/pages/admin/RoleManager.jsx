import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import * as roleService from '../../services/role.service';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const RoleManager = () => {
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        roleName: '',
        description: ''
    });
    const [blur, setBlur] = useState(false);

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = roles.filter(role =>
                (role.roleName && role.roleName.toLowerCase().includes(lowerQuery)) ||
                (role.description && role.description.toLowerCase().includes(lowerQuery))
            );
            setFilteredRoles(filtered);
        } else {
            setFilteredRoles(roles);
        }
    }, [searchQuery, roles]);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const result = await roleService.getAllRoles();
            setRoles(result.data || result);
            setFilteredRoles(result.data || result);
        } catch (error) {
            toast.error("Failed to fetch roles");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.roleName || formData.roleName.trim() === '') {
            newErrors.roleName = "Role Name is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            roleName: '',
            description: ''
        });
        setErrors({});
        setCurrentRole(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (role) => {
        setCurrentRole(role);
        setFormData({
            roleName: role.roleName || '',
            description: role.description || ''
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
            if (currentRole) {
                await roleService.updateRole(currentRole.id, formData);
                toast.success("Role updated successfully");
            } else {
                await roleService.addRole(formData);
                toast.success("Role added successfully");
            }
            fetchRoles();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Operation failed";
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this role?");
        if (!isConfirmed) return;
        try {
            await roleService.deleteRole(id);
            toast.success("Role deleted successfully");
            fetchRoles();
        } catch (error) {
            toast.error("Failed to delete role");
            console.error(error);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Role Name', accessor: 'roleName' },
        { header: 'Description', accessor: 'description' },
        { header: 'Created At', accessor: 'createdAt' }
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
                onClick={() => handleDelete(row.id)}
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
                        placeholder="Search roles..."
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
                    <span>Add Role</span>
                </button>
            </div>

            <Table
                columns={columns}
                data={filteredRoles}
                actions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentRole ? "Edit Role" : "Add New Role"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                        <input
                            type="text"
                            name="roleName"
                            value={formData.roleName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.roleName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200'} focus:ring-opacity-50 transition-all outline-none`}
                            placeholder="e.g. Project Manager"
                        />
                        {errors.roleName && <p className="text-xs text-red-500 mt-1">{errors.roleName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all outline-none"
                            placeholder="Brief description of the role..."
                            rows="3"
                        />
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
                            {currentRole ? "Update Role" : "Add Role"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default RoleManager;
