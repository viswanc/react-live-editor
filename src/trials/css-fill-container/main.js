import React from 'react';
import './main.css';

export default function FlexTrial() {

  return (
    <div class="outer">
      <div class="fill">
      </div>
      <div class="fixed">
        <div class="outer">
            <div class="fill">
            </div>
            <div class="fixed">
            </div>
          </div>
      </div>
    </div>
  );
}
