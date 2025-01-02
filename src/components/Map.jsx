// Map.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Map = () => {
  const [places, setPlaces] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 偏移量
  const [dragging, setDragging] = useState(false); // 是否正在拖动
  const [startPos, setStartPos] = useState({ x: 0, y: 0 }); // 鼠标按下时的位置
  const [initialClick, setInitialClick] = useState({ x: 0, y: 0 }); // 初始点击位置
  const [threshold, setThreshold] = useState(5); // 阈值（单位：像素）

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await api.get('/api/places');
      setPlaces(response.data);
    };
    fetchPlaces();
  }, []);

  // 计算最大和最小的拖动边界
  const limitBounds = (newOffset) => {
    const minX = -200; // 设置最小X偏移量
    const maxX = 200;  // 设置最大X偏移量
    const minY = -200; // 设置最小Y偏移量
    const maxY = 200;  // 设置最大Y偏移量

    return {
      x: Math.min(Math.max(newOffset.x, minX), maxX),
      y: Math.min(Math.max(newOffset.y, minY), maxY),
    };
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setInitialClick({ x: e.clientX, y: e.clientY }); // 记录鼠标按下时的位置
    setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const dx = e.clientX - initialClick.x; // 计算与初始点击位置的偏移量
      const dy = e.clientY - initialClick.y;

      // 如果偏移量超过阈值，开始拖动
      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
        const newOffset = {
          x: offset.x + 0.07 * dx, // 更新偏移量，调整比例
          y: offset.y + 0.07 * dy,
        };
        setOffset(limitBounds(newOffset)); // 限制在指定范围内
        setStartPos({ x: e.clientX, y: e.clientY }); // 更新鼠标位置
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%', // 让容器宽度自适应父级
        height: '100%', // 让容器高度自适应父级
        overflow: 'hidden', // 防止显示超出的部分
        boxSizing: 'border-box', // 包括内边距和边框
        border: '2px solid #ccc', // 为地图容器添加边框
        borderRadius: '10px', // 可以设置圆角
      }}
    >
      <svg
        width="100%" // 适应容器宽度
        height="100%" // 适应容器高度
        style={{
          cursor: dragging ? 'move' : 'default',
          display: 'block', // 移除SVG默认的间隙
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${offset.x}, ${offset.y})`}>
          {places.map((place, index) => (
            <g key={index}>
              {/* 圆点 */}
              <circle
                cx={place.coordinates.x}
                cy={place.coordinates.y}
                r="10"
                fill="blue"
              />
              {/* 场所名称 */}
              <text
                x={place.coordinates.x}
                y={place.coordinates.y + 20} // 文本位于圆点下方
                fontSize="12"
                fill="black"
                textAnchor="middle" // 使文本居中
              >
                {place.name}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Map;
