
// import classNames from "classnames/bind";
// import styles from "./Detail.module.scss";
// import { avatarIcon } from "../List/image";

// const cx = classNames.bind(styles);

// function Detail() {
//   return (
//     <div className={cx('detail')}>
//       <div className={cx('top')}>
//         <h2>Thông tin hội thoại</h2>
//       </div>
//       <div className={cx('l_1')}>
//         <img src={avatarIcon} alt=""/>
//       </div>
//       <div className={cx('l_2')}></div>
//       <div className={cx('l_3')}></div>
//       <div className={cx('bottom')}></div>
//     </div>
//   );
// }

// export default Detail;


import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { avatarIcon } from '../List/image';


import { 
  ChevronDown, 
  Bell, 
  Users, 
  Edit, 
  AlertTriangle, 
  Trash2, 
  MoreHorizontal, 
  Play, 
  FileText, 
  Link, 
  ArrowLeft 
} from 'lucide-react';

const cx = classNames.bind(styles);

function Detail({ friend }) {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'media', 'files', 'links'

  console.log("Detail Friend:", friend);

  const mediaItems = [
    { id: 1, type: 'image' },
    { id: 2, type: 'image' },
    { id: 3, type: 'image' },
    { id: 4, type: 'image' },
    { id: 5, type: 'image' },
    { id: 6, type: 'image' },
    { id: 7, type: 'image' },
    { id: 8, type: 'image' }
  ];

  const allMediaItems = [
    ...mediaItems,
    { id: 9, type: 'image' },
    { id: 10, type: 'video' },
    { id: 11, type: 'image' },
    { id: 12, type: 'video' },
    { id: 13, type: 'image' },
    { id: 14, type: 'image' },
    { id: 15, type: 'video' },
    { id: 16, type: 'image' }
  ];

  const files = [
    {
      type: 'video',
      name: 'HelloScene.mp4',
      size: '65.32 KB',
      date: '13/08/2025',
      icon: Play,
      bgColor: 'purple'
    },
    {
      type: 'document',
      name: 'N06CHPfin.docx',
      size: '24.99 KB',
      date: '24/07/2025',
      icon: FileText,
      bgColor: 'blue'
    },
    {
      type: 'pdf',
      name: 'TuHOnTap.pdf',
      size: '6.38 MB',
      date: '19/07/2025',
      icon: FileText,
      bgColor: 'red'
    }
  ];

  const allFiles = [
    ...files,
    {
      type: 'video',
      name: 'Meeting_Record.mp4',
      size: '120.5 MB',
      date: '15/07/2025',
      icon: Play,
      bgColor: 'purple'
    },
    {
      type: 'document',
      name: 'Report.docx',
      size: '1.2 MB',
      date: '10/07/2025',
      icon: FileText,
      bgColor: 'blue'
    }
  ];

  const links = [
    {
      name: 'Google Drive: Sign-in',
      url: 'drive.google.com',
      date: '22/08'
    },
    {
      name: 'http://maven.apache.org/POM/4.0.0',
      url: 'maven.apache.org',
      date: '29/07'
    },
    {
      name: 'TuHOnTap.pdf',
      url: 'drive.google.com',
      date: '19/07'
    }
  ];

  const allLinks = [
    ...links,
    {
      name: 'GitHub Repository',
      url: 'github.com/project',
      date: '15/07'
    },
    {
      name: 'Stack Overflow Question',
      url: 'stackoverflow.com',
      date: '12/07'
    }
  ];

  const renderMainView = () => (
    <div className={cx('main-content')}>
      {/* Avatar Section */}
      <div className={cx('avatar-section')}>
        <div className={cx('avatar')}>
          <img 
            src={friend ? `http://localhost:5000${friend.avatar}` : avatarIcon}
            alt="Avatar" 
            className={cx('avatar-img')}
          />
        </div>
      </div>

      {/* Chat Name */}
      <div className={cx('chat-name')}>
        <h3>{friend ? friend.name : 'Unknown User'}</h3>
      </div>

      {/* Action Button */}
      <div className={cx('action-section')}>
        <div className={cx('action-container')}>
          <button className={cx('action-btn')}>
            <div className={cx('action-icon')}>
              <Bell size={20} />
            </div>
            <span>Tắt thông báo</span>
          </button>
        </div>
      </div>

      {/* Images/Videos Section */}
      <div className={cx('section')}>
        <div className={cx('section-header')}>
          <span>Ảnh/Video</span>
          <ChevronDown size={16} />
        </div>
        <div className={cx('media-grid')}>
          {mediaItems.map((item) => (
            <div key={item.id} className={cx('media-item')}>
              <div className={cx('media-placeholder')}></div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setCurrentView('media')}
          className={cx('view-all-btn')}
        >
          Xem tất cả
        </button>
      </div>

      {/* Files Section */}
      <div className={cx('section')}>
        <div className={cx('section-header')}>
          <span>File</span>
          <ChevronDown size={16} />
        </div>
        <div className={cx('files-list')}>
          {files.map((file, index) => {
            const IconComponent = file.icon;
            return (
              <div key={index} className={cx('file-item')}>
                <div className={cx('file-icon', file.bgColor)}>
                  <IconComponent size={20} />
                </div>
                <div className={cx('file-info')}>
                  <p className={cx('file-name')}>{file.name}</p>
                  <p className={cx('file-size')}>{file.size}</p>
                </div>
                <div className={cx('file-date')}>
                  {file.date}
                </div>
              </div>
            );
          })}
        </div>
        <button 
          onClick={() => setCurrentView('files')}
          className={cx('view-all-btn')}
        >
          Xem tất cả
        </button>
      </div>

      {/* Links Section */}
      <div className={cx('section')}>
        <div className={cx('section-header')}>
          <span>Link</span>
          <ChevronDown size={16} />
        </div>
        <div className={cx('links-list')}>
          {links.map((link, index) => (
            <div key={index} className={cx('link-item')}>
              <div className={cx('link-icon')}>
                <Link size={20} />
              </div>
              <div className={cx('link-info')}>
                <p className={cx('link-name')}>{link.name}</p>
                <p className={cx('link-url')}>{link.url}</p>
              </div>
              <div className={cx('link-date')}>
                {link.date}
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setCurrentView('links')}
          className={cx('view-all-btn')}
        >
          Xem tất cả
        </button>
      </div>

      {/* Warning Section */}
      <div className={cx('section')}>
        <button className={cx('warning-btn')}>
          <AlertTriangle size={20} />
          <span>Báo xấu</span>
        </button>
      </div>

      {/* Delete Chat Section */}
      <div className={cx('section')}>
        <div className={cx('delete-actions')}>
          <button className={cx('delete-btn')}>
            <Trash2 size={20} />
            <span>Xóa lịch sử trò chuyện</span>
          </button>
          
          <button className={cx('member-btn')}>
            <div className={cx('member-content')}>
              <Users size={20} />
              <span>Thành viên</span>
            </div>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediaView = () => (
    <div className={cx('media-view')}>
      <div className={cx('media-grid-full')}>
        {allMediaItems.map((item) => (
          <div key={item.id} className={cx('media-item-full')}>
            <div className={cx('media-placeholder')}></div>
            {item.type === 'video' && (
              <div className={cx('video-indicator')}>
                <Play size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFilesView = () => (
    <div className={cx('files-view')}>
      <div className={cx('files-list-full')}>
        {allFiles.map((file, index) => {
          const IconComponent = file.icon;
          return (
            <div key={index} className={cx('file-item-full')}>
              <div className={cx('file-icon-large', file.bgColor)}>
                <IconComponent size={24} />
              </div>
              <div className={cx('file-info')}>
                <p className={cx('file-name')}>{file.name}</p>
                <p className={cx('file-size')}>{file.size}</p>
              </div>
              <div className={cx('file-date')}>
                {file.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderLinksView = () => (
    <div className={cx('links-view')}>
      <div className={cx('links-list-full')}>
        {allLinks.map((link, index) => (
          <div key={index} className={cx('link-item-full')}>
            <div className={cx('link-icon-large')}>
              <Link size={24} />
            </div>
            <div className={cx('link-info')}>
              <p className={cx('link-name')}>{link.name}</p>
              <p className={cx('link-url')}>{link.url}</p>
            </div>
            <div className={cx('link-date')}>
              {link.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getViewTitle = () => {
    switch (currentView) {
      case 'media': return 'Ảnh/Video';
      case 'files': return 'File';
      case 'links': return 'Link';
      default: return 'Thông tin hội thoại';
    }
  };

  return (
    <div className={cx('detail')}>
      {/* Header */}
      <div className={cx('header')}>
        {currentView !== 'main' && (
          <button 
            onClick={() => setCurrentView('main')}
            className={cx('back-btn')}
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <h2 className={cx('title')}>{getViewTitle()}</h2>
        {currentView === 'main' && (
          <button className={cx('edit-btn')}>
            <Edit size={16} />
          </button>
        )}
      </div>

      {currentView === 'main' && renderMainView()}
      {currentView === 'media' && renderMediaView()}
      {currentView === 'files' && renderFilesView()}
      {currentView === 'links' && renderLinksView()}
    </div>
  );
}

export default Detail;