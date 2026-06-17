import { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, TrendingUp, Trash2 } from 'lucide-react';
import { supabase } from '../../supabase';

export function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPart, setNewPart] = useState({ name: '', category: '', price: '', part_number: '', description: '', condition: 'new' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { window.location.href = '/vendor-login'; return; }
      setUser(user);
      supabase.from('vendors').select('*').eq('id', user.id).single().then(({ data, error }) => {
        console.log('vendor fetch:', data, error);
        setVendor(data);
      });
      supabase.from('parts').select('*').eq('vendor_id', user.id).then(({ data, error }) => {
        console.log('parts fetch:', data, error);
        if (data) setParts(data);
        setLoading(false);
      });
    });
  }, []);

  const addPart = async () => {
    if (!newPart.name || !newPart.price) { setSaveError('Name and price are required'); return; }
    setSaving(true);
    setSaveError('');
    console.log('inserting part with vendor_id:', user.id);
    const { data, error } = await supabase.from('parts').insert({
      name: newPart.name,
      category: newPart.category,
      price: parseFloat(newPart.price),
      part_number: newPart.part_number,
      description: newPart.description,
      condition: newPart.condition,
      vendor_id: user.id,
      in_stock: true,
      rating: 0,
      reviews: 0
    }).select().single();
    console.log('insert result:', data, error);
    if (error) { setSaveError(error.message); }
    else if (data) { setParts([...parts, data]); setNewPart({ name: '', category: '', price: '', part_number: '', description: '', condition: 'new' }); setShowAddForm(false); }
    setSaving(false);
  };

  const deletePart = async (id) => {
    await supabase.from('parts').delete().eq('id', id);
    setParts(parts.filter(p => p.id !== id));
  };

  const totalRevenue = parts.reduce((sum, p) => sum + p.price, 0);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl">Vendor Dashboard</h1>
          <p className="text-muted-foreground text-sm">{vendor?.name || user?.email}</p>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/vendor-login')}
          className="text-sm text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-lg">
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Parts</p>
            <Package className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">{parts.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Active listings</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Combined listing value</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Status</p>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">{vendor?.verified ? 'Yes' : 'Pending'}</p>
          <p className="text-xs text-muted-foreground mt-1">{vendor?.verified ? 'Verified vendor' : 'Pending verification'}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl">
        <div className="border-b border-border">
          <nav className="flex gap-6 px-5">
            {['overview', 'products'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 transition-colors text-sm capitalize ${activeTab === tab ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-5">
          {activeTab === 'overview' && (
            <div>
              <h2 className="mb-4 text-base font-medium">Your Account</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Email</span>
                  <span>{user?.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Business Name</span>
                  <span>{vendor?.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Vendor ID</span>
                  <span className="text-xs text-muted-foreground">{user?.id}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Total Listings</span>
                  <span>{parts.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-medium">Your Parts</h2>
                <button onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  Add Part
                </button>
              </div>

              {showAddForm && (
                <div className="bg-background border border-border rounded-xl p-5 mb-5 space-y-3">
                  <h3 className="text-sm font-medium mb-3">New Part Details</h3>
                  {saveError && (
                    <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg">
                      {saveError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Part Name *</label>
                      <input value={newPart.name} onChange={e => setNewPart({...newPart, name: e.target.value})}
                        placeholder="e.g. Brake Pads" className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Part Number</label>
                      <input value={newPart.part_number} onChange={e => setNewPart({...newPart, part_number: e.target.value})}
                        placeholder="e.g. BP-4521" className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Category</label>
                      <select value={newPart.category} onChange={e => setNewPart({...newPart, category: e.target.value})}
                        className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm">
                        <option value="">Select category</option>
                        {['Engine Parts','Brakes','Suspension','Exhaust','Electrical','Transmission','Body Parts','Interior','Lighting','Wheels & Tires','Filters','Cooling System'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Price (USD) *</label>
                      <input value={newPart.price} onChange={e => setNewPart({...newPart, price: e.target.value})}
                        placeholder="e.g. 49.99" type="number" className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Condition</label>
                      <select value={newPart.condition} onChange={e => setNewPart({...newPart, condition: e.target.value})}
                        className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm">
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="refurbished">Refurbished</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Description</label>
                      <input value={newPart.description} onChange={e => setNewPart({...newPart, description: e.target.value})}
                        placeholder="Brief description" className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={addPart} disabled={saving}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
                      {saving ? 'Saving...' : 'Save Part'}
                    </button>
                    <button onClick={() => setShowAddForm(false)}
                      className="border border-border px-4 py-2 rounded-lg text-sm hover:bg-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {parts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  No parts listed yet. Click "Add Part" to get started.
                </div>
              ) : (
                <div className="space-y-3">
                  {parts.map(part => (
                    <div key={part.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">🔧</div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium mb-0.5">{part.name}</h3>
                        <p className="text-xs text-muted-foreground">{part.category} · #{part.part_number} · {part.condition}</p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <p className="font-bold text-sm">${part.price}</p>
                        <button onClick={() => deletePart(part.id)}
                          className="p-1.5 hover:bg-destructive/10 text-destructive rounded transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
