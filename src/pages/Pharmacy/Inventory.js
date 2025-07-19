import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './Pharmacy.css';
import {
    FaPills,
    FaPlus,
    FaMinus,
    FaSearch,
    FaBoxOpen,
    FaClipboardCheck,
    FaExclamationTriangle
} from 'react-icons/fa';

function InventoryManagement() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [showDispenseForm, setShowDispenseForm] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState(null);

    const crumbs = [
        { label: 'Dashboard'}
    ];

    // Sample inventory data - in a real app, this would come from an API
    useEffect(() => {
        const sampleInventory = [
            { id: 1, name: 'Amoxicillin 500mg', quantity: 124, category: 'Antibiotic', threshold: 30, lastOrdered: '2023-06-15' },
            { id: 2, name: 'Lisinopril 10mg', quantity: 86, category: 'Hypertension', threshold: 20, lastOrdered: '2023-06-18' },
            { id: 3, name: 'Atorvastatin 20mg', quantity: 45, category: 'Cholesterol', threshold: 25, lastOrdered: '2023-06-10' },
            { id: 4, name: 'Metformin 1000mg', quantity: 12, category: 'Diabetes', threshold: 15, lastOrdered: '2023-06-20' },
            { id: 5, name: 'Albuterol Inhaler', quantity: 32, category: 'Respiratory', threshold: 10, lastOrdered: '2023-06-12' },
            { id: 6, name: 'Ibuprofen 200mg', quantity: 8, category: 'Pain Relief', threshold: 20, lastOrdered: '2023-06-22' },
        ];
        setInventory(sampleInventory);
        setFilteredInventory(sampleInventory);
    }, []);

    // Filter inventory based on search term
    useEffect(() => {
        const results = inventory.filter(drug =>
            drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drug.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInventory(results);
    }, [searchTerm, inventory]);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleRequestStock = (drug) => {
        setSelectedDrug(drug);
        setShowRequestForm(true);
    };

    const handleDispenseDrug = (drug) => {
        setSelectedDrug(drug);
        setShowDispenseForm(true);
    };

    const submitStockRequest = (e) => {
        e.preventDefault();
        const quantity = parseInt(e.target.quantity.value);
        // In a real app, this would call an API
        alert(`Order requested for ${quantity} units of ${selectedDrug.name}`);
        setShowRequestForm(false);
    };

    const submitDispenseRecord = (e) => {
        e.preventDefault();
        const quantity = parseInt(e.target.quantity.value);
        const patientId = e.target.patientId.value;

        // Update inventory
        const updatedInventory = inventory.map(drug =>
            drug.id === selectedDrug.id
                ? { ...drug, quantity: drug.quantity - quantity }
                : drug
        );

        setInventory(updatedInventory);
        alert(`${quantity} units of ${selectedDrug.name} dispensed to patient ${patientId}`);
        setShowDispenseForm(false);
    };

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>

            <div className='scrollable-content'>
                <div className="inventory-management-container">
                    <div className="inventory-header">
                        <h1>Drug Inventory</h1>
                        <div className="search-bar">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by drug name or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="inventory-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowRequestForm(true)}
                        >
                            <FaBoxOpen /> Request New Stock
                        </button>
                    </div>

                    <div className="inventory-table-container">
                        <table className="inventory-table">
                            <thead>
                                <tr>
                                    <th>Drug Name</th>
                                    <th>Category</th>
                                    <th>Available Quantity</th>
                                    <th>Status</th>
                                    <th>Last Ordered</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInventory.map(drug => (
                                    <tr key={drug.id} className={drug.quantity <= drug.threshold ? 'low-stock' : ''}>
                                        <td>{drug.name}</td>
                                        <td>{drug.category}</td>
                                        <td>
                                            {drug.quantity}
                                            {drug.quantity <= drug.threshold && (
                                                <FaExclamationTriangle className="warning-icon" />
                                            )}
                                        </td>
                                        <td>
                                            {drug.quantity <= drug.threshold ? (
                                                <span className="status-warning">Low Stock</span>
                                            ) : (
                                                <span className="status-ok">In Stock</span>
                                            )}
                                        </td>
                                        <td>{drug.lastOrdered}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn btn-request"
                                                    onClick={() => handleRequestStock(drug)}
                                                >
                                                    <FaPlus /> Request
                                                </button>
                                                <button
                                                    className="btn btn-dispense"
                                                    onClick={() => handleDispenseDrug(drug)}
                                                >
                                                    <FaMinus /> Dispense
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Request Stock Modal */}
                    {showRequestForm && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <div className="modal-header">
                                    <h2>Request Stock</h2>
                                    <button
                                        className="close-btn"
                                        onClick={() => setShowRequestForm(false)}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <form onSubmit={submitStockRequest}>
                                    <div className="form-group">
                                        <label>Drug Name</label>
                                        <input
                                            type="text"
                                            value={selectedDrug?.name || ''}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Current Stock</label>
                                        <input
                                            type="text"
                                            value={selectedDrug?.quantity || ''}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity to Order</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            required
                                        />
                                    </div>
                                    <div className="modal-actions">
                                        <button type="button" className="btn btn-cancel" onClick={() => setShowRequestForm(false)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-submit">
                                            Submit Order
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Dispense Drug Modal */}
                    {showDispenseForm && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <div className="modal-header">
                                    <h2>Record Dispensed Medication</h2>
                                    <button
                                        className="close-btn"
                                        onClick={() => setShowDispenseForm(false)}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <form onSubmit={submitDispenseRecord}>
                                    <div className="form-group">
                                        <label>Drug Name</label>
                                        <input
                                            type="text"
                                            value={selectedDrug?.name || ''}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Current Stock</label>
                                        <input
                                            type="text"
                                            value={selectedDrug?.quantity || ''}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Patient ID</label>
                                        <input
                                            type="text"
                                            name="patientId"
                                            required
                                            placeholder="Enter patient ID"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity Dispensed</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            max={selectedDrug?.quantity || 1}
                                            required
                                        />
                                    </div>
                                    <div className="modal-actions">
                                        <button type="button" className="btn btn-cancel" onClick={() => setShowDispenseForm(false)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-submit">
                                            <FaClipboardCheck /> Record Dispense
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default InventoryManagement;