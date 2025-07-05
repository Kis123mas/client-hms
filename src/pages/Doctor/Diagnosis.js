import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import './disgnos.css';
import ChatWidget from "../../components/chatwidget/ChatWidget"

function DiagnosisPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const crumbs = [
    { label: 'Dashboard', path: '/' },
  ];


  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };


  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className="scrollable-content">
        diagnos area
      </div>
      <ChatWidget />
    </MainLayout>
  );
}

export default DiagnosisPage;