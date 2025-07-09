import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Select, DatePicker, Modal, Tag, Space, Card, Divider } from 'antd';
import { SearchOutlined, FileTextOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './TestRequest.css';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import MainLayout from '../../layouts/MainLayout';

const { Search } = Input;
const { Option } = Select;

const TestRequest = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const crumbs = [{ label: 'Dashboard' }];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        status: null,
        testType: null,
        dateRange: null,
    });

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Mock data - replace with API calls in a real application
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockData = [
                {
                    id: 'TR-2023-001',
                    patientId: 'PT-1001',
                    patientName: 'John Doe',
                    testType: 'Complete Blood Count',
                    requestedBy: 'Dr. Smith',
                    requestDate: '2023-05-15',
                    status: 'pending',
                    priority: 'routine',
                },
                {
                    id: 'TR-2023-002',
                    patientId: 'PT-1002',
                    patientName: 'Jane Smith',
                    testType: 'Lipid Profile',
                    requestedBy: 'Dr. Johnson',
                    requestDate: '2023-05-16',
                    status: 'in-progress',
                    priority: 'urgent',
                },
                {
                    id: 'TR-2023-003',
                    patientId: 'PT-1003',
                    patientName: 'Robert Brown',
                    testType: 'Liver Function Test',
                    requestedBy: 'Dr. Williams',
                    requestDate: '2023-05-17',
                    status: 'completed',
                    priority: 'routine',
                },
                {
                    id: 'TR-2023-004',
                    patientId: 'PT-1004',
                    patientName: 'Emily Davis',
                    testType: 'Thyroid Panel',
                    requestedBy: 'Dr. Anderson',
                    requestDate: '2023-05-18',
                    status: 'pending',
                    priority: 'urgent',
                },
                {
                    id: 'TR-2023-005',
                    patientId: 'PT-1005',
                    patientName: 'Michael Wilson',
                    testType: 'Hemoglobin A1C',
                    requestedBy: 'Dr. Taylor',
                    requestDate: '2023-05-19',
                    status: 'in-progress',
                    priority: 'routine',
                },
            ];
            setRequests(mockData);
            setFilteredRequests(mockData);
            setLoading(false);
        }, 800);
    }, []);

    const handleSearch = (value) => {
        if (!value) {
            setFilteredRequests(requests);
            return;
        }
        const filtered = requests.filter(
            (request) =>
                request.patientName.toLowerCase().includes(value.toLowerCase()) ||
                request.id.toLowerCase().includes(value.toLowerCase()) ||
                request.testType.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredRequests(filtered);
    };

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (filterParams) => {
        let result = [...requests];

        if (filterParams.status) {
            result = result.filter((item) => item.status === filterParams.status);
        }

        if (filterParams.testType) {
            result = result.filter((item) => item.testType === filterParams.testType);
        }

        if (filterParams.dateRange && filterParams.dateRange.length === 2) {
            const [start, end] = filterParams.dateRange;
            result = result.filter((item) => {
                const requestDate = dayjs(item.requestDate);
                return requestDate.isAfter(start) && requestDate.isBefore(end);
            });
        }

        setFilteredRequests(result);
    };

    const resetFilters = () => {
        setFilters({
            status: null,
            testType: null,
            dateRange: null,
        });
        setFilteredRequests(requests);
    };

    const handleTableChange = (newPagination) => {
        setPagination(newPagination);
    };

    const viewRequestDetails = (record) => {
        setSelectedRequest(record);
        setIsModalVisible(true);
    };

    const handleProcessTest = (id) => {
        // In a real app, this would update the status via API
        const updatedRequests = requests.map((req) =>
            req.id === id ? { ...req, status: 'in-progress' } : req
        );
        setRequests(updatedRequests);
        setFilteredRequests(updatedRequests);
    };

    const handleCompleteTest = (id) => {
        // In a real app, this would update the status via API
        const updatedRequests = requests.map((req) =>
            req.id === id ? { ...req, status: 'completed' } : req
        );
        setRequests(updatedRequests);
        setFilteredRequests(updatedRequests);
    };

    const columns = [
        {
            title: 'Request ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            key: 'patientName',
            render: (text, record) => (
                <span>
                    {text} <br />
                    <small className="text-muted">ID: {record.patientId}</small>
                </span>
            ),
            sorter: (a, b) => a.patientName.localeCompare(b.patientName),
        },
        {
            title: 'Test Type',
            dataIndex: 'testType',
            key: 'testType',
            sorter: (a, b) => a.testType.localeCompare(b.testType),
        },
        {
            title: 'Requested By',
            dataIndex: 'requestedBy',
            key: 'requestedBy',
        },
        {
            title: 'Request Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
            sorter: (a, b) => new Date(a.requestDate) - new Date(b.requestDate),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <Tag color={priority === 'urgent' ? 'red' : 'blue'}>
                    {priority.toUpperCase()}
                </Tag>
            ),
            filters: [
                { text: 'Urgent', value: 'urgent' },
                { text: 'Routine', value: 'routine' },
            ],
            onFilter: (value, record) => record.priority === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = '';
                switch (status) {
                    case 'pending':
                        color = 'orange';
                        break;
                    case 'in-progress':
                        color = 'blue';
                        break;
                    case 'completed':
                        color = 'green';
                        break;
                    default:
                        color = 'gray';
                }
                return <Tag color={color}>{status.toUpperCase().replace('-', ' ')}</Tag>;
            },
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'In Progress', value: 'in-progress' },
                { text: 'Completed', value: 'completed' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<FileTextOutlined />}
                        onClick={() => viewRequestDetails(record)}
                    >
                        View
                    </Button>
                    {record.status === 'pending' && (
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => handleProcessTest(record.id)}
                        >
                            Process
                        </Button>
                    )}
                    {record.status === 'in-progress' && (
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => handleCompleteTest(record.id)}
                        >
                            Complete
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const testTypes = [
        'Complete Blood Count',
        'Lipid Profile',
        'Liver Function Test',
        'Thyroid Panel',
        'Hemoglobin A1C',
        'Urinalysis',
        'Blood Glucose',
        'Electrolyte Panel',
    ];

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>
            <div className="scrollable-content">
                <div className="test-requests-container">
                    <Card title="Test Requests Management" bordered={false}>
                        <div className="actions-bar">
                            <div className="search-filter-section">
                                <Search
                                    placeholder="Search by patient, ID, or test type"
                                    allowClear
                                    enterButton={<SearchOutlined />}
                                    size="large"
                                    onSearch={handleSearch}
                                    style={{ width: 350 }}
                                />


                            </div>
                        </div>

                        <Divider />

                        <Table
                            columns={columns}
                            dataSource={filteredRequests}
                            rowKey="id"
                            loading={loading}
                            pagination={pagination}
                            onChange={handleTableChange}
                            scroll={{ x: 'max-content' }}
                        />
                    </Card>

                    {/* Request Details Modal */}
                    <Modal
                        title="Test Request Details"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={[
                            <Button key="back" onClick={() => setIsModalVisible(false)}>
                                Close
                            </Button>,
                            selectedRequest?.status === 'pending' && (
                                <Button
                                    key="process"
                                    type="primary"
                                    onClick={() => {
                                        handleProcessTest(selectedRequest.id);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    Process Test
                                </Button>
                            ),
                            selectedRequest?.status === 'in-progress' && (
                                <Button
                                    key="complete"
                                    type="primary"
                                    onClick={() => {
                                        handleCompleteTest(selectedRequest.id);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    Complete Test
                                </Button>
                            ),
                        ]}
                        width={800}
                    >
                        {selectedRequest && (
                            <div className="request-details">
                                <div className="detail-row">
                                    <span className="detail-label">Request ID:</span>
                                    <span className="detail-value">{selectedRequest.id}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Patient:</span>
                                    <span className="detail-value">
                                        {selectedRequest.patientName} (ID: {selectedRequest.patientId})
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Test Type:</span>
                                    <span className="detail-value">{selectedRequest.testType}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Requested By:</span>
                                    <span className="detail-value">{selectedRequest.requestedBy}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Request Date:</span>
                                    <span className="detail-value">
                                        {dayjs(selectedRequest.requestDate).format('DD/MM/YYYY HH:mm')}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Priority:</span>
                                    <span className="detail-value">
                                        <Tag color={selectedRequest.priority === 'urgent' ? 'red' : 'blue'}>
                                            {selectedRequest.priority.toUpperCase()}
                                        </Tag>
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Status:</span>
                                    <span className="detail-value">
                                        <Tag
                                            color={
                                                selectedRequest.status === 'pending'
                                                    ? 'orange'
                                                    : selectedRequest.status === 'in-progress'
                                                        ? 'blue'
                                                        : 'green'
                                            }
                                        >
                                            {selectedRequest.status.toUpperCase().replace('-', ' ')}
                                        </Tag>
                                    </span>
                                </div>
                                <Divider />
                                <div className="test-instructions">
                                    <h4>Test Instructions:</h4>
                                    <p>
                                        {selectedRequest.testType.includes('Blood')
                                            ? 'Collect 5ml of venous blood in EDTA tube. Process within 2 hours of collection.'
                                            : selectedRequest.testType.includes('Urinalysis')
                                                ? 'Collect mid-stream urine in sterile container. Process within 1 hour of collection.'
                                                : 'Standard collection procedures apply. Follow laboratory protocol.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </MainLayout>
    );
};

export default TestRequest;