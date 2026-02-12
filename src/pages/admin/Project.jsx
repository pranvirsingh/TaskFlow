import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import * as projectService from '../../services/project.service';
import { validateProjectName, validateDescription } from '../../utils/validators';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
    });
    const [blur, setBlur] = useState(false);


    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = projects.filter(project =>
                (project.projectName && project.projectName.toLowerCase().includes(lowerQuery)) ||
                (project.description && project.description.toLowerCase().includes(lowerQuery))
            );
            setFilteredProjects(filtered);
        } else {
            setFilteredProjects(projects);
        }
    }, [searchQuery, projects]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const result = await projectService.getAllProjects();
            setProjects(result.data || result);
            setFilteredProjects(result.data || result);
        } catch (error) {
            toast.error("Failed to fetch projects");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        const projectNameError = validateProjectName(formData.projectName);
        const descriptionError = validateDescription(formData.description);

        if (projectNameError) newErrors.projectName = projectNameError;
        if (descriptionError) newErrors.description = descriptionError;

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
            projectName: '',
            description: ''
        });
        setErrors({});
        setEditingProject(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditingProject(project);
        setFormData({
            projectName: project.projectName || '',
            description: project.description || '',
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
            if (editingProject) {
                const updateData = {
                    ...formData,
                    id: editingProject.id,
                    isActive: true
                };

                await projectService.updateProject(updateData);
                toast.success("Project updated successfully");
            } else {
                await projectService.addProject(formData);
                toast.success("Project added successfully");
            }
            fetchProjects();
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
                    Are you sure you want to delete this project?
                </span>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            setBlur(false);
                        }}
                        className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            setBlur(false);
                            onConfirm();
                        }}
                        className="px-3 py-1 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity,
            position: "top-center",
            style: {
                minWidth: '300px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }
        });
    };


    const handleDelete = async (id) => {
        confirmDelete(async () => {
            try {
                await projectService.deleteProject(id);
                toast.success("Project deleted successfully");
                fetchProjects();
            } catch (error) {
                toast.error("Failed to delete project");
                console.error(error);
            }
        });
    };

    const columns = [
        { header: 'Sr. No.', accessor: 'id' },
        { header: 'Project Name', accessor: 'projectName' },
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
                        placeholder="Search projects..."
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
                    <span>Add Project</span>
                </button>
            </div>

            <Table
                columns={columns}
                data={filteredProjects}
                actions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProject ? "Edit Project" : "Add New Project"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.projectName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200'} focus:ring-opacity-50 transition-all outline-none`}
                            placeholder="Project Name"
                        />
                        {errors.projectName && <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200'} focus:ring-opacity-50 transition-all outline-none`}
                            placeholder="Description"
                            rows="3"
                        />
                        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
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
                            {editingProject ? "Update Project" : "Add Project"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Project;
