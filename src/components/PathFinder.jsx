import React, { useState } from 'react';
import api from '../services/api';

const PathFinder = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [path, setPath] = useState([]);
  const [isHovered, setIsHovered] = useState(false);  // 按钮悬停状态

  const findPath = async () => {
    try {
      const response = await api.post('/api/path', { start, end });
      console.log('Response data:', response.data);  // 打印返回的数据
      if (Array.isArray(response.data.path)) {
        setPath(response.data.path);  // 如果path是数组，更新状态
      } else {
        setPath([]);  // 如果不是数组，设置空路径
        alert('路径数据格式错误');
      }
    } catch (error) {
      console.error('Error fetching path:', error);
      alert('路径查找出错');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
  };

  const titleStyle = {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  };

  const inputStyle = {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    backgroundColor: isHovered ? '#45a049' : '#4CAF50',  // 使用state控制背景色
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
  };

  const listItemStyle = {
    padding: '8px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>路径查找</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="起点"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="终点"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}  // 悬停时修改状态
        onMouseLeave={() => setIsHovered(false)} // 离开时恢复状态
        onClick={findPath}
      >
        查找路径
      </button>
      <ul style={listStyle}>
        {Array.isArray(path) && path.length > 0 ? (
          path.map((step, index) => (
            <li key={index} style={listItemStyle}>{step}</li>
          ))
        ) : (
          <li style={listItemStyle}>未找到路径或数据格式错误</li>
        )}
      </ul>
    </div>
  );
};

export default PathFinder;
