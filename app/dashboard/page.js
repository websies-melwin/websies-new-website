'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';

export default function DashboardPage() {
  const { user, profile, loading, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#ffffff', fontSize: '1.25rem' }}>Loading dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="dashboard-sections">
            <div className="dashboard-section">
              <h3 className="dashboard-section-title">
                <i className="fas fa-bolt" style={{ color: '#fbbf24', marginRight: '0.5rem' }}></i>
                Quick Actions
              </h3>
              <button className="dashboard-action-button">
                <div className="dashboard-action-content">
                  <i className="fas fa-eye dashboard-action-icon" style={{ color: '#06b6d4' }}></i>
                  <span>View Live Site</span>
                </div>
                <i className="fas fa-arrow-right dashboard-action-arrow"></i>
              </button>
              <button className="dashboard-action-button">
                <div className="dashboard-action-content">
                  <i className="fas fa-edit dashboard-action-icon" style={{ color: '#8b5cf6' }}></i>
                  <span>Request Changes</span>
                </div>
                <i className="fas fa-arrow-right dashboard-action-arrow"></i>
              </button>
              <button className="dashboard-action-button">
                <div className="dashboard-action-content">
                  <i className="fas fa-headset dashboard-action-icon" style={{ color: '#f59e0b' }}></i>
                  <span>Get Support</span>
                </div>
                <i className="fas fa-arrow-right dashboard-action-arrow"></i>
              </button>
            </div>

            <div className="dashboard-section">
              <h3 className="dashboard-section-title">
                <i className="fas fa-history" style={{ color: '#10b981', marginRight: '0.5rem' }}></i>
                Recent Activity
              </h3>
              <div className="dashboard-activity-item">
                <div className="dashboard-activity-dot dot-green"></div>
                <div className="dashboard-activity-content">
                  <p>Website went live</p>
                  <p>2 days ago</p>
                </div>
              </div>
              <div className="dashboard-activity-item">
                <div className="dashboard-activity-dot dot-blue"></div>
                <div className="dashboard-activity-content">
                  <p>SSL certificate installed</p>
                  <p>3 days ago</p>
                </div>
              </div>
              <div className="dashboard-activity-item">
                <div className="dashboard-activity-dot dot-purple"></div>
                <div className="dashboard-activity-content">
                  <p>Account created</p>
                  <p>1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'website':
        return (
          <div className="dashboard-section">
            <h3 className="dashboard-section-title">Website Management</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Manage your website settings and content.</p>
            <button className="dashboard-action-button">
              <div className="dashboard-action-content">
                <i className="fas fa-globe dashboard-action-icon" style={{ color: '#06b6d4' }}></i>
                <span>View Live Website</span>
              </div>
              <i className="fas fa-external-link-alt dashboard-action-arrow"></i>
            </button>
          </div>
        );
      case 'analytics':
        return (
          <div className="dashboard-section">
            <h3 className="dashboard-section-title">Analytics</h3>
            <div className="dashboard-stats">
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <div className="dashboard-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                    <i className="fas fa-users"></i>
                  </div>
                </div>
                <h4 className="dashboard-stat-title">Monthly Visitors</h4>
                <p style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '700', margin: '0.5rem 0' }}>2,847</p>
                <p className="dashboard-stat-description">↗ 12% vs last month</p>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <div className="dashboard-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
                <h4 className="dashboard-stat-title">Uptime</h4>
                <p style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '700', margin: '0.5rem 0' }}>99.9%</p>
                <p className="dashboard-stat-description">Excellent performance</p>
              </div>
            </div>
          </div>
        );
      case 'requests':
        return (
          <div className="dashboard-section">
            <h3 className="dashboard-section-title">Request Updates</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Submit requests for website changes and updates.</p>
            <button className="dashboard-action-button">
              <div className="dashboard-action-content">
                <i className="fas fa-plus dashboard-action-icon" style={{ color: '#10b981' }}></i>
                <span>New Update Request</span>
              </div>
              <i className="fas fa-arrow-right dashboard-action-arrow"></i>
            </button>
          </div>
        );
      case 'billing':
        return (
          <div className="dashboard-section">
            <h3 className="dashboard-section-title">Billing & Subscription</h3>
            <div className="dashboard-stat-card">
              <h4 className="dashboard-stat-title">Current Plan</h4>
              <p style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '600', margin: '0.5rem 0' }}>
                {profile?.subscription_plan || 'Pro Plan'}
              </p>
              <p className="dashboard-stat-description">
                Status: <span style={{ color: '#22c55e' }}>{profile?.subscription_status || 'Active'}</span>
              </p>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="dashboard-section">
            <h3 className="dashboard-section-title">Support</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Get help with your website and account.</p>
            <button className="dashboard-action-button">
              <div className="dashboard-action-content">
                <i className="fas fa-comments dashboard-action-icon" style={{ color: '#8b5cf6' }}></i>
                <span>Live Chat Support</span>
              </div>
              <i className="fas fa-arrow-right dashboard-action-arrow"></i>
            </button>
            <button className="dashboard-action-button">
              <div className="dashboard-action-content">
                <i className="fas fa-envelope dashboard-action-icon" style={{ color: '#f59e0b' }}></i>
                <span>Email Support</span>
              </div>
              <i className="fas fa-arrow-right dashboard-action-arrow"></i>
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="dashboard-section">
            <h3 className="dashboard-section-title">Settings</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Manage your account settings and preferences.</p>
            <button className="dashboard-action-button" onClick={() => router.push('/account')}>
              <div className="dashboard-action-content">
                <i className="fas fa-user-cog dashboard-action-icon" style={{ color: '#06b6d4' }}></i>
                <span>Account Settings</span>
              </div>
              <i className="fas fa-arrow-right dashboard-action-arrow"></i>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Websies Dashboard</h1>
          <p>Welcome back, {profile?.name || user?.email?.split('@')[0] || 'User'}</p>
        </div>
        <button className="dashboard-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" style={{ marginRight: '0.5rem' }}></i>
          Logout
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
              <i className="fas fa-globe"></i>
            </div>
            <span className="dashboard-stat-status status-active">Live</span>
          </div>
          <h3 className="dashboard-stat-title">Website Status</h3>
          <p className="dashboard-stat-description">Your website is live and running smoothly</p>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
              <i className="fas fa-chart-line"></i>
            </div>
            <span className="dashboard-stat-status status-active">2,847</span>
          </div>
          <h3 className="dashboard-stat-title">Monthly Visitors</h3>
          <p className="dashboard-stat-description">↗ 12% increase from last month</p>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
              <i className="fas fa-server"></i>
            </div>
            <span className="dashboard-stat-status status-active">99.9%</span>
          </div>
          <h3 className="dashboard-stat-title">Uptime</h3>
          <p className="dashboard-stat-description">Excellent server performance</p>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }}>
              <i className="fas fa-clock"></i>
            </div>
            <span className="dashboard-stat-status status-active">2 days ago</span>
          </div>
          <h3 className="dashboard-stat-title">Last Update</h3>
          <p className="dashboard-stat-description">Website deployment completed</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { id: 'overview', icon: 'fas fa-home', label: 'Overview' },
            { id: 'website', icon: 'fas fa-globe', label: 'My Website' },
            { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
            { id: 'requests', icon: 'fas fa-edit', label: 'Request Updates' },
            { id: 'billing', icon: 'fas fa-credit-card', label: 'Billing' },
            { id: 'support', icon: 'fas fa-headset', label: 'Support' },
            { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: activeSection === section.id 
                  ? 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)' 
                  : 'rgba(33, 38, 45, 0.8)',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <i className={section.icon}></i>
              {section.label}
            </button>
          ))}
        </div>
        
        {renderSectionContent()}
      </div>
    </div>
  );
}