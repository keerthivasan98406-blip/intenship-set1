import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { projectService, skillService, messageService } from '../services/api';
import { FiPlus, FiTrash2, FiEdit2, FiMail, FiFolder, FiCpu, FiLogOut, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'skills', 'messages'

  // Projects State
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    technologies: '',
    github: '',
    liveDemo: '',
    image: '',
  });
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Skills State
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({
    name: '',
    percentage: 85,
    category: 'Frontend',
  });

  // Messages State
  const [messages, setMessages] = useState([]);

  // Toast / Status Message State
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTabContent();
  }, [activeTab]);

  const loadTabContent = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const res = await projectService.getAll();
        if (res.data) setProjects(res.data);
      } else if (activeTab === 'skills') {
        const res = await skillService.getAll();
        if (res.data) setSkills(res.data);
      } else if (activeTab === 'messages') {
        const res = await messageService.getAll();
        if (res.data) setMessages(res.data);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE or UPDATE Project
  const handleSaveProject = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    try {
      if (editingProjectId) {
        const res = await projectService.update(editingProjectId, projectForm);
        if (res.success) {
          setStatus({ type: 'success', text: 'Project updated in MongoDB successfully!' });
          setEditingProjectId(null);
        }
      } else {
        const res = await projectService.create(projectForm);
        if (res.success) {
          setStatus({ type: 'success', text: 'New project created in MongoDB successfully!' });
        }
      }

      setProjectForm({
        title: '',
        description: '',
        category: 'Full Stack',
        technologies: '',
        github: '',
        liveDemo: '',
        image: '',
      });
      loadTabContent();
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to save project.' });
    }
  };

  const handleEditProjectClick = (proj) => {
    setEditingProjectId(proj._id);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      category: proj.category || 'Full Stack',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
      github: proj.github || '',
      liveDemo: proj.liveDemo || '',
      image: proj.image || '',
    });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.delete(id);
      setStatus({ type: 'success', text: 'Project deleted successfully.' });
      loadTabContent();
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  // CREATE Skill
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      await skillService.create(skillForm);
      setStatus({ type: 'success', text: 'New skill saved into database!' });
      setSkillForm({ name: '', percentage: 85, category: 'Frontend' });
      loadTabContent();
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to create skill.' });
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await skillService.delete(id);
      setStatus({ type: 'success', text: 'Skill removed.' });
      loadTabContent();
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to delete skill.' });
    }
  };

  // DELETE Message
  const handleDeleteMessage = async (id) => {
    try {
      await messageService.delete(id);
      setStatus({ type: 'success', text: 'Message deleted from database.' });
      loadTabContent();
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to delete message.' });
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      {/* Admin Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-xs text-gray-400">Manage MongoDB Projects, Skills, and Visitor Messages</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-colors"
        >
          <FiLogOut size={16} />
          <span>Logout Admin</span>
        </button>
      </div>

      {/* Status Alert Notification */}
      {status.text && (
        <div
          className={`p-4 rounded-xl mb-6 text-xs flex items-center justify-between border ${
            status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <FiCheckCircle size={16} />
            <span>{status.text}</span>
          </div>
          <button onClick={() => setStatus({ type: '', text: '' })} className="font-bold">✕</button>
        </div>
      )}

      {/* Dashboard Navigation Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'projects'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <FiFolder size={18} />
          <span>Manage Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'skills'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <FiCpu size={18} />
          <span>Manage Skills ({skills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'messages'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <FiMail size={18} />
          <span>Contact Messages ({messages.length})</span>
        </button>
      </div>

      {/* TAB 1: MANAGE PROJECTS */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add / Edit Project Form */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6">
              <h3 className="text-lg font-heading font-bold text-white mb-4">
                {editingProjectId ? 'Edit Project' : 'Add New Project'}
              </h3>

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Smart Task Assistant"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Description *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Overview of project features..."
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, Express, MongoDB"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">GitHub URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://demo.app"
                    value={projectForm.liveDemo}
                    onChange={(e) => setProjectForm({ ...projectForm, liveDemo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-1"
                  >
                    <FiPlus size={16} />
                    <span>{editingProjectId ? 'Update Project' : 'Add Project'}</span>
                  </button>

                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({ title: '', description: '', category: 'Full Stack', technologies: '', github: '', liveDemo: '', image: '' });
                      }}
                      className="px-4 py-2.5 rounded-lg bg-white/10 text-gray-300 font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Project List */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6">
              <h3 className="text-lg font-heading font-bold text-white mb-4">Existing MongoDB Projects</h3>

              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img src={proj.image} alt={proj.title} className="w-16 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-semibold text-white text-sm">{proj.title}</h4>
                        <span className="text-[11px] text-indigo-400 font-mono">{proj.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProjectClick(proj)}
                        className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
                        title="Edit Project"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj._id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        title="Delete Project"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE SKILLS */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add Skill Form */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6">
              <h3 className="text-lg font-heading font-bold text-white mb-4">Add New Skill</h3>

              <form onSubmit={handleSaveSkill} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Skill Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. React.js, Python, MongoDB"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Proficiency Percentage ({skillForm.percentage}%)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={skillForm.percentage}
                    onChange={(e) => setSkillForm({ ...skillForm, percentage: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Category *</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Programming">Programming</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-1"
                >
                  <FiPlus size={16} />
                  <span>Add Skill to Database</span>
                </button>
              </form>
            </div>
          </div>

          {/* Skill List */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6">
              <h3 className="text-lg font-heading font-bold text-white mb-4">Existing Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
                {skills.map((s) => (
                  <div key={s._id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{s.name}</h4>
                      <span className="text-[10px] text-indigo-400 font-mono">{s.category} — {s.percentage}%</span>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(s._id)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VIEW CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-bold text-white">Submitted Inquiries ({messages.length})</h3>
            <button onClick={loadTabContent} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 flex items-center gap-1 border border-white/10">
              <FiRefreshCw size={12} />
              <span>Refresh</span>
            </button>
          </div>

          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages found in database.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m._id} className="p-5 rounded-xl bg-white/5 border border-white/10 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                    <div>
                      <strong className="text-white text-base">{m.name}</strong>
                      <span className="text-gray-400 text-xs ml-2">&lt;{m.email}&gt;</span>
                      {m.phone && <span className="text-indigo-400 text-xs ml-2">Phone: {m.phone}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-mono">{new Date(m.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteMessage(m._id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        title="Delete Message"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-indigo-300 font-semibold text-xs mb-2">Subject: {m.subject}</p>
                  <p className="text-gray-300 text-xs whitespace-pre-wrap leading-relaxed">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
