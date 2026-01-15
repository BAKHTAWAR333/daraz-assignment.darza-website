import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, ShoppingBag, 
  Heart, Package, LogOut, Shield, CreditCard, Settings, 
  Award, TrendingUp, Clock, CheckCircle, X
} from 'lucide-react';

const ProfileSection = () => {
  const { user, logout, updateProfile, addDummyOrder, addToWishlist } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });
  const [activeTab, setActiveTab] = useState('overview');

  // Handle edit save
  const handleSave = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      alert('Update failed');
    }
  };

  // Add sample wishlist item
  const handleAddWishlist = () => {
    const product = {
      id: Date.now(),
      name: 'Wireless Bluetooth Headphones',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics'
    };
    addToWishlist(product);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Profile Found</h2>
          <p className="text-gray-600 mb-6">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#FF6600] to-orange-500 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white/50"
            />
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              <Edit2 size={16} className="text-[#FF6600]" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-white/90 mb-4">{user.email}</p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  <span>{user.orders?.length || 0} Orders</span>
                </div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Heart size={18} />
                  <span>{user.wishlist?.length || 0} Wishlist</span>
                </div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Award size={18} />
                  <span>Member Since {new Date(user.createdAt).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="bg-white text-[#FF6600] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200">
              {['overview', 'orders', 'wishlist', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-[#FF6600] border-b-2 border-[#FF6600]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User size={20} />
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={20} className="text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone size={20} className="text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{user.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar size={20} className="text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">
                            {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin size={20} className="text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{user.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Package size={20} />
                      Recent Orders
                    </h3>
                    {user.orders && user.orders.length > 0 ? (
                      <div className="space-y-3">
                        {user.orders.slice(0, 3).map((order) => (
                          <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <p className="font-medium">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="font-bold text-lg">Rs. {order.total.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-600">No orders yet</p>
                        <button
                          onClick={addDummyOrder}
                          className="mt-4 text-[#FF6600] hover:text-[#e55a00] font-medium"
                        >
                          Add Sample Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">My Orders</h3>
                    <button
                      onClick={addDummyOrder}
                      className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#e55a00]"
                    >
                      Add Dummy Order
                    </button>
                  </div>
                  
                  {user.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <div>
                              <p className="font-bold">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">Rs. {order.total.toLocaleString()}</p>
                              <p className="text-sm">
                                Tracking: <span className="font-medium">{order.trackingNumber}</span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">Items ({order.items.length})</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'Processing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                <CheckCircle size={14} className="inline mr-1" />
                                {order.status}
                              </span>
                            </div>
                            
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-600">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-bold">Rs. {item.price.toLocaleString()}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package size={64} className="mx-auto text-gray-300 mb-4" />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">No Orders Yet</h4>
                      <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                      <button
                        onClick={addDummyOrder}
                        className="bg-[#FF6600] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e55a00]"
                      >
                        Add Sample Order
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">My Wishlist</h3>
                    <button
                      onClick={handleAddWishlist}
                      className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#e55a00]"
                    >
                      Add Sample Item
                    </button>
                  </div>
                  
                  {user.wishlist && user.wishlist.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {user.wishlist.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg mb-3"
                          />
                          <h4 className="font-semibold text-gray-800 mb-2">{item.name}</h4>
                          <p className="text-[#FF6600] font-bold mb-3">Rs. {item.price.toLocaleString()}</p>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">{item.category}</span>
                            <button className="text-red-500 hover:text-red-600">
                              <Heart size={20} className="fill-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Your Wishlist is Empty</h4>
                      <p className="text-gray-600 mb-6">Save items you love for later</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="font-bold">
                      Rs. {user.orders?.reduce((sum, order) => sum + order.total, 0).toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completed Orders</p>
                    <p className="font-bold">
                      {user.orders?.filter(o => o.status === 'Delivered').length || 0}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-bold">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Shield size={20} className="text-gray-600" />
                <span>Account Security</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <CreditCard size={20} className="text-gray-600" />
                <span>Payment Methods</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
                <span>Account Settings</span>
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={editData.address}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600]"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-[#FF6600] text-white py-3 rounded-lg font-semibold hover:bg-[#e55a00]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;