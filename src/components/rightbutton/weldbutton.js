import React from 'react';
import { Button } from 'antd';
import './index.css';

const WeldButton = () => (
  <div className="weld-button-right">
    <ul>
      <li>
        <Button>焊接<br/>使能</Button>
      </li>
      <li>
        <Button>手动<br/>送气</Button>
      </li>
      <li>
        <Button>手动<br/>送丝</Button>
      </li>
      <li>
        <Button>碰撞<br/>检测</Button>
      </li>
      <li>
        <Button>错误<br/>清除</Button>
      </li>
      <li>
        <Button>送丝</Button>
      </li>
      <li>
        <Button>气检</Button>
      </li>
    </ul>
  </div>
);

export default WeldButton;