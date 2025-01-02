// App.js
import React from 'react';
import Map from './components/Map';
import PlaceList from './components/PlaceList';
import PathFinder from './components/PathFinder';
import './App.css'; // 引入自定义样式

const App = () => {
  return (
    <div className="app-container">
      <h1>高校游览系统</h1>
      <div className="main-content">
        {/* 左边是地图 */}
        <div className="map-container">
          <Map />
        </div>

        {/* 右边包含查询和列表 */}
        <div className="right-container">
          {/* 查询部分 */}
          <div className="path-finder-container">
            <PathFinder />
          </div>

          {/* 列表部分，支持滚动 */}
          <div className="place-list-container">
            <PlaceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
