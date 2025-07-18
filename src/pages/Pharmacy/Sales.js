import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import {
    FaShoppingCart,
    FaSearch,
    FaHistory,
    FaFileInvoiceDollar,
    FaPrint,
    FaTimes,
    FaPlus,
    FaMinus
} from 'react-icons/fa';
import './Pharmacy.css';

function SalesPage() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('newSale');
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        insurance: ''
    });

    const crumbs = [
        { label: 'Dashboard', path: '/pharmacy/dashboard' },
        { label: 'Sales', path: '/pharmacy/sales' }
    ];

    // Sample drug data
    const drugInventory = [
        { id: 1, name: 'Amoxicillin 500mg', price: 15.99, stock: 124, prescription: true },
        { id: 2, name: 'Ibuprofen 200mg', price: 8.99, stock: 86, prescription: false },
        { id: 3, name: 'Lisinopril 10mg', price: 12.50, stock: 45, prescription: true },
        { id: 4, name: 'Cetirizine 10mg', price: 14.25, stock: 32, prescription: false },
        { id: 5, name: 'Omeprazole 20mg', price: 18.75, stock: 28, prescription: false },
    ];

    // Filter drugs based on search term
    const filteredDrugs = drugInventory.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sample transaction history
    useEffect(() => {
        const sampleTransactions = [
            { id: 1, date: '2023-06-25 09:15', customer: 'John Smith', items: 3, total: 42.48, status: 'Completed' },
            { id: 2, date: '2023-06-25 10:30', customer: 'Sarah Johnson', items: 1, total: 15.99, status: 'Completed' },
            { id: 3, date: '2023-06-24 14:45', customer: 'Michael Brown', items: 2, total: 27.25, status: 'Refunded' },
        ];
        setTransactions(sampleTransactions);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const addToCart = (drug) => {
        const existingItem = cart.find(item => item.id === drug.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === drug.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...drug, quantity: 1 }]);
        }
    };

    const removeFromCart = (drugId) => {
        setCart(cart.filter(item => item.id !== drugId));
    };

    const updateQuantity = (drugId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(cart.map(item =>
            item.id === drugId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const processSale = () => {
        if (cart.length === 0) return;

        // In a real app, this would send data to your backend
        const newTransaction = {
            id: transactions.length + 1,
            date: new Date().toISOString(),
            customer: customerInfo.name || 'Walk-in Customer',
            items: cart.reduce((total, item) => total + item.quantity, 0),
            total: calculateTotal(),
            status: 'Completed'
        };

        setTransactions([newTransaction, ...transactions]);
        setCart([]);
        setCustomerInfo({ name: '', phone: '', insurance: '' });
        alert('Sale processed successfully!');
    };

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>

            <div className='scrollable-content'>
                <div className="sales-page-container">
                    <div className="sales-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'newSale' ? 'active' : ''}`}
                            onClick={() => setActiveTab('newSale')}
                        >
                            <FaShoppingCart /> New Sale
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <FaHistory /> Transaction History
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reports')}
                        >
                            <FaFileInvoiceDollar /> Reports
                        </button>
                    </div>

                    {activeTab === 'newSale' && (
                        <div className="new-sale-container">
                            <div className="sale-column drug-selection">
                                <h2>Select Medications</h2>
                                <div className="search-bar">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search medications..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="drug-list">
                                    {filteredDrugs.map(drug => (
                                        <div key={drug.id} className="drug-item">
                                            <div className="drug-info">
                                                <h3>{drug.name}</h3>
                                                <p>${drug.price.toFixed(2)} • {drug.stock} in stock</p>
                                                {drug.prescription && <span className="rx-label">RX</span>}
                                            </div>
                                            <button
                                                className="add-btn"
                                                onClick={() => addToCart(drug)}
                                            >
                                                <FaPlus /> Add
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sale-column cart-section">
                                <h2>Current Sale</h2>
                                <div className="customer-info">
                                    <h3>Customer Information</h3>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={customerInfo.name}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                            placeholder="Customer name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Insurance</label>
                                        <input
                                            type="text"
                                            value={customerInfo.insurance}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, insurance: e.target.value })}
                                            placeholder="Insurance provider"
                                        />
                                    </div>
                                </div>

                                <div className="cart-items">
                                    {cart.length === 0 ? (
                                        <p className="empty-cart">No items in cart</p>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.id} className="cart-item">
                                                <div className="item-info">
                                                    <h3>{item.name}</h3>
                                                    <p>${item.price.toFixed(2)} each</p>
                                                </div>
                                                <div className="item-quantity">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                        <FaMinus />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                                <div className="item-total">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="cart-summary">
                                    <div className="summary-row">
                                        <span>Subtotal:</span>
                                        <span>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Tax (8%):</span>
                                        <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total:</span>
                                        <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
                                    </div>
                                    <button
                                        className="checkout-btn"
                                        onClick={processSale}
                                        disabled={cart.length === 0}
                                    >
                                        Process Sale
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="transaction-history">
                            <h2>Recent Transactions</h2>
                            <div className="history-filters">
                                <div className="filter-group">
                                    <label>Date Range:</label>
                                    <select>
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last 90 days</option>
                                        <option>Custom range</option>
                                    </select>
                                </div>
                                <div className="filter-group">
                                    <label>Status:</label>
                                    <select>
                                        <option>All</option>
                                        <option>Completed</option>
                                        <option>Refunded</option>
                                    </select>
                                </div>
                            </div>
                            <div className="transaction-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Customer</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map(tx => (
                                            <tr key={tx.id}>
                                                <td>{tx.date}</td>
                                                <td>{tx.customer}</td>
                                                <td>{tx.items}</td>
                                                <td>${tx.total.toFixed(2)}</td>
                                                <td>
                                                    <span className={`status ${tx.status.toLowerCase()}`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="action-btn print-btn">
                                                        <FaPrint /> Receipt
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div className="sales-reports">
                            <h2>Sales Reports</h2>
                            <div className="report-cards">
                                <div className="report-card">
                                    <h3>Today's Sales</h3>
                                    <p className="amount">$1,245.75</p>
                                    <p className="comparison">↑ 12% from yesterday</p>
                                </div>
                                <div className="report-card">
                                    <h3>This Week</h3>
                                    <p className="amount">$5,678.90</p>
                                    <p className="comparison">↑ 8% from last week</p>
                                </div>
                                <div className="report-card">
                                    <h3>Top Selling Items</h3>
                                    <ul className="top-items">
                                        <li>Ibuprofen 200mg <span>48 sold</span></li>
                                        <li>Amoxicillin 500mg <span>35 sold</span></li>
                                        <li>Cetirizine 10mg <span>28 sold</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="report-actions">
                                <button className="report-btn">
                                    <FaFileInvoiceDollar /> Generate Detailed Report
                                </button>
                                <button className="report-btn">
                                    <FaPrint /> Print Summary
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default SalesPage;