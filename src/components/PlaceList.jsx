import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await api.get('/api/places');
      setPlaces(response.data);
    };
    fetchPlaces();
  }, []);

  // 过滤符合搜索条件的场所
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 样式定义
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

  const listItemStyle = {
    padding: '10px',
    backgroundColor: '#f4f4f4',
    margin: '5px 0',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>场所列表</h2>
      
      {/* 搜索框 */}
      <input
        type="text"
        placeholder="搜索场所..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyle}
      />

      {/* 显示筛选后的场所列表 */}
      <ul style={listStyle}>
        {filteredPlaces.map((place) => (
          <li key={place._id} style={listItemStyle}>
            <span>{place.name} ({place.type})</span>
          </li>
        ))}
        {/* 如果没有匹配的场所 */}
        {filteredPlaces.length === 0 && (
          <li style={listItemStyle}>没有找到匹配的场所</li>
        )}
      </ul>
    </div>
  );
};

export default PlaceList;
