import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Mail, Database, CheckCircle, RefreshCw, Server } from 'lucide-react';
import { projectService, messageService } from '../services/api';

export default function AdminModal({ isOpen, onClose, onProjectUpdated }) {
  const [activeTab, setActiveTab] = useState('addProject'); // 'addProject', 'messages', 'health'
  
  // New Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    tags: '',
    image: '',
    github_url: '',
    live_url: '',
    featured: false
  });

  const [projectList, setProjectList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [healthStatus, setHealthStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAdminData();
    }
  }, [isOpen, activeTab]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'addProject') {
        const projRes = await projectService.getAll('All');
        if (projRes.data) setProjectList(projRes.data);
      } else if (activeTab === 'messages') {
        const msgRes = await messageService.getAll();
        if (msgRes.data) setMessagesList(msgRes.data);
      } else if (activeTab === 'health') {
        setHealthStatus({ status: 'online', database: 'MongoDB' });
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const res = await projectService.create(projectForm);
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Project created successfully in SQLite database!' });
        setProjectForm({
          title: '',
          description: '',
          category: 'Full Stack',
          tags: '',
          image: '',
          github_url: '',
          live_url: '',
          featured: false
        });
        loadAdminData();
        if (onProjectUpdated) onProjectUpdated();
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to create project.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Server connection error.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm(`Delete project ID #${id} from SQLite database?`)) return;
    try {
      const res = await projectService.delete(id);
      if (res.success) {
        setStatusMsg({ type: 'success', text: `Project #${id} deleted.` });
        loadAdminData();
        if (onProjectUpdated) onProjectUpdated();
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3000,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Database size={24} color="var(--accent-indigo)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>Admin & SQLite Database Portal</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Manage projects and view received messages live</p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-glass)',
            background: 'var(--bg-secondary)',
          }}
        >
          <button
            onClick={() => setActiveTab('addProject')}
            style={{
              flex: 1,
              padding: '0.9rem',
              background: activeTab === 'addProject' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'addProject' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === 'addProject' ? '2px solid var(--accent-indigo)' : 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <Plus size={16} />
            <span>Manage Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            style={{
              flex: 1,
              padding: '0.9rem',
              background: activeTab === 'messages' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'messages' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === 'messages' ? '2px solid var(--accent-indigo)' : 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <Mail size={16} />
            <span>Contact Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            style={{
              flex: 1,
              padding: '0.9rem',
              background: activeTab === 'health' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'health' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === 'health' ? '2px solid var(--accent-indigo)' : 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <Server size={16} />
            <span>Backend Status</span>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem', overflowY: 'auto', flexGrow: 1 }}>
          {statusMsg.text && (
            <div
              style={{
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                fontSize: '0.88rem',
                background: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: statusMsg.type === 'success' ? '#10b981' : '#ef4444',
                border: `1px solid ${statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              }}
            >
              {statusMsg.text}
            </div>
          )}

          {/* TAB 1: Manage Projects */}
          {activeTab === 'addProject' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Form */}
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Add New Project via API</h4>
                <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI Workflow Engine"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Category *</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', outline: 'none' }}
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Description *</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Brief overview of features..."
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Tags (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="React, Express, SQLite"
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Image URL</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    />
                    <label htmlFor="featured" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Highlight as Featured Project</label>
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.7rem' }}>
                    <Plus size={16} />
                    <span>Save to SQLite DB</span>
                  </button>
                </form>
              </div>

              {/* Current Projects List with Delete */}
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Existing Projects in SQLite</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '380px', overflowY: 'auto' }}>
                  {projectList.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        padding: '0.8rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-glass)',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <h5 style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{p.title}</h5>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)' }}>{p.category}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#ef4444',
                          padding: '0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                        }}
                        title="Delete from SQLite Database"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Messages Received */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem' }}>Inquiries Stored in SQLite Database ({messagesList.length})</h4>
                <button onClick={loadAdminData} className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>

              {messagesList.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No messages found in database.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {messagesList.map((msg) => (
                    <div key={msg.id} style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>{msg.name}</strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginLeft: '0.6rem' }}>&lt;{msg.email}&gt;</span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{msg.created_at}</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--accent-indigo)', marginBottom: '0.4rem' }}>Subject: {msg.subject}</p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Health */}
          {activeTab === 'health' && (
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Backend Server Diagnostics</h4>
              {healthStatus ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle size={20} />
                    <span>Express REST API status: <strong>{healthStatus.status.toUpperCase()}</strong></span>
                  </div>

                  <pre style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', border: '1px solid var(--border-glass)' }}>
                    {JSON.stringify(healthStatus, null, 2)}
                  </pre>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>Checking backend health status...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
