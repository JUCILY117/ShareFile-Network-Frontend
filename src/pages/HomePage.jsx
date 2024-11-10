import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import NotFoundPage from './NotFoundPage';
import './css/HomePage.css';
import { saveAs } from 'file-saver';
import { getPdfThumbnail } from '../utils/pdfUtils';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrashArrowUp, faFileLines, faLink, faShare, faXmark, faUpload, faEye, faDownload, faSun, faMoon, faPlus, faHouse, faFolder, faClock, faUserGroup, faTrash, faCloud, faEllipsisV, faFilePdf, faFileWord, faFileExcel, faFileCsv } from '@fortawesome/free-solid-svg-icons';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('files');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('Untitled Folder');
  const [menuOpen, setMenuOpen] = useState(null);
  const [folders, setFolders] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [viewingFile, setViewingFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [uploadedFilter, setUploadedFilter] = useState('all');
  const [fileThumbnails, setFileThumbnails] = useState({});
  const [thumbnailError, setThumbnailError] = useState(false);
  const [sortOption, setSortOption] = useState('name');
  const [trashFiles, setTrashFiles] = useState([]);
  const [currentSection, setCurrentSection] = useState('home');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [currentPageTrash, setCurrentPageTrash] = useState(1);
  const [totalPagesTrash, setTotalPagesTrash] = useState(1);
  const [pageSizeTrash, setPageSizeTrash] = useState(8);

  const MAX_FILE_SIZE = 500 * 1024 * 1024;

  const extractFileName = (filename) => {
    return filename.split('-').slice(1).join('-');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
 
  //thumbnail logic
  useEffect(() => {
    const fetchThumbnails = async () => {
      const newThumbnails = {};
      for (const file of files) {
        if (file.mimetype === 'application/pdf') {
          newThumbnails[file._id] = await getPdfThumbnail(file.fileUrl);
        }
      }
      setFileThumbnails(newThumbnails);
    };

    fetchThumbnails();
  }, [files]);


  //sort files
  const sortFiles = (files, sortOption) => {
    const sortedFiles = [...files];
  
    switch (sortOption) {
      case 'name-A-Z':
        sortedFiles.sort((a, b) => {
          const nameA = extractFileName(a.filename).toLowerCase();
          const nameB = extractFileName(b.filename).toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
      case 'name-Z-A':
        sortedFiles.sort((a, b) => {
          const nameA = extractFileName(a.filename).toLowerCase();
          const nameB = extractFileName(b.filename).toLowerCase();
          return nameB.localeCompare(nameA);
        });
        break;
      case 'size':
        sortedFiles.sort((a, b) => a.size - b.size);
        break;
      case 'date':
        sortedFiles.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        break;
      default:
        break;
    }
  
    return sortedFiles;
  };
  

  // create folder
  const createFolder = async () => {
    if (!newFolderName.trim()) {
      alert('Folder name cannot be empty.');
      return;
    }
  
    try {
      const response = await axios.post(`${apiBaseUrl}/api/folders/create-folder`, {
        name: newFolderName
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      setFolders(prevFolders => [...prevFolders, response.data]);
      setNewFolderName('');
      setShowFolderModal(false);
      alert('Folder Created Sucessfully!');
    } catch (error) {
      console.error('Failed to create folder:', error);
      alert('Failed to create folder.');
    }
  };
  

  const handleCreateFolderClick = () => {
    setShowFolderModal(true);
  };  

  const handleView = (file) => {
    setViewingFile(file);
  };
  
  const closeView = () => {
    setViewingFile(null);
  };

  //filters
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleFileTypeFilterChange = (event) => {
    setFileTypeFilter(event.target.value);
  };
  
  const handleUploadedFilterChange = (event) => {
    setUploadedFilter(event.target.value);
  };

  
  const isUploadedWithinDays = (dateString, days) => {
    const fileDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = currentDate - fileDate;
    return timeDiff <= days * 24 * 60 * 60 * 1000;
  };
  
  const filteredFiles = files.filter(file => {
    //search filter
    const matchesSearchQuery = file.filename.toLowerCase().includes(searchQuery.toLowerCase());
    
    // type filter
    const matchesFileType = fileTypeFilter === 'all' || (
      (fileTypeFilter === 'application/pdf' && file.mimetype === 'application/pdf') ||
      (fileTypeFilter === 'image/' && file.mimetype.startsWith('image/')) ||
      (fileTypeFilter === 'application/msword' && (file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) ||
      (fileTypeFilter === 'application/vnd.ms-excel' && (file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) ||
      (fileTypeFilter === 'text/csv' && file.mimetype === 'text/csv') ||
      (fileTypeFilter === 'text/plain' && file.mimetype === 'text/plain')
    );
    
    // uploaded filter
    const matchesUploadedDate = uploadedFilter === 'all' || (
      uploadedFilter === 'today' && isUploadedWithinDays(file.uploadedAt, 0) ||
      uploadedFilter === 'last-day' && isUploadedWithinDays(file.uploadedAt, 1) ||
      uploadedFilter === 'last-week' && isUploadedWithinDays(file.uploadedAt, 7) ||
      uploadedFilter === 'last-month' && isUploadedWithinDays(file.uploadedAt, 30)
    );
    
    return matchesSearchQuery && matchesFileType && matchesUploadedDate;
  });
  
  const sortedFiles = sortFiles(filteredFiles, sortOption);
  const totalFiles = sortedFiles.length;
  const totalBinFiles = trashFiles.length;
  const totalFolders = folders.length;
  
  const handleShare = (file) => {
    const subject = encodeURIComponent("Sharing a file with you");
  
    const formattedFileUrl = file.fileUrl.replace(/ /g, '%20');
    
    const body = encodeURIComponent(`Hi,\n\nI wanted to share a file with you. You can download it using the following link:\n\n${formattedFileUrl}\n\nBest regards,\n\n${user.firstName} ${user.lastName}`);
   
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
  
    window.open(mailtoLink, '_blank');
  };
  
  

  
  


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy text: ', err));
  };
  
  useEffect(() => {

    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  
    document.body.className = isDarkMode ? "light-mode" : "dark-mode";
  }, [isDarkMode]);
  

  useEffect(() => {

    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'light-mode');
  
    document.body.className = savedTheme === 'light-mode' ? "light-mode" : "dark-mode";
  }, []);
  

  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const uploadFilesToServer = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(`${apiBaseUrl}/api/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const uploadedFiles = response.data.map(file => ({
        ...file,
        fileUrl: `${apiBaseUrl}/uploads/${file.filename}`
      }));

      setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
  
    const filesToUpload = [];
    const fileSizeExceeded = [];
  
    uploadedFiles.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        fileSizeExceeded.push(file.name);
      } else {
        filesToUpload.push(file);
      }
    });
  
    if (fileSizeExceeded.length > 0) {
      alert(`The following files exceed the size limit of 500MB: ${fileSizeExceeded.join(', ')}`);
    }
  
    if (filesToUpload.length > 0) {
      uploadFilesToServer(filesToUpload);
    }
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
  
    const droppedFiles = Array.from(event.dataTransfer.files);
  
    const filesToUpload = [];
    const fileSizeExceeded = [];
  
    droppedFiles.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        fileSizeExceeded.push(file.name);
      } else {
        filesToUpload.push(file);
      }
    });
  
    if (fileSizeExceeded.length > 0) {
      alert(`The following files exceed the size limit of 500MB: ${fileSizeExceeded.join(', ')}`);
    }
  
    if (filesToUpload.length > 0) {
      uploadFilesToServer(filesToUpload);
    }
  };
  

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleMenuToggle = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  useEffect(() => {
    const dropArea = dropAreaRef.current;
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('drop', handleDrop);

    return () => {
      dropArea.removeEventListener('dragover', handleDragOver);
      dropArea.removeEventListener('drop', handleDrop);
    };
  }, []);

  useEffect(() => {
    const fetchFiles = async (page = 1) => {
      if (!user || !localStorage.getItem('token')) {
        console.error('No user token available');
        return;
      }
      try {
        let endpoint = `${apiBaseUrl}/api/files?page=${page}&limit=${pageSize}`;
        if (view === 'trash') {
          endpoint = `${apiBaseUrl}/api/files/trash?page=${page}&limit=${pageSize}`;
        }
  
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        const filesWithUrls = response.data.files.map(file => ({
          ...file,
          fileUrl: `${apiBaseUrl}/uploads/${file.filename}`
        }));
  
        if (view === 'trash') {
          setTrashFiles(filesWithUrls);
        } else {
          setFiles(filesWithUrls);
        }
  
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to retrieve files:', error);
      }
    };
  
    fetchFiles(currentPage);
  }, [user, view, currentPage]);
  
  
  
  useEffect(() => {
    const fetchFolders = async () => {
      if (!user || !localStorage.getItem('token')) {
        console.error('No user token available');
        return;
      }
      try {
        const response = await axios.get(`${apiBaseUrl}/api/folders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFolders(response.data);
      } catch (error) {
        console.error('Failed to retrieve folders:', error);
      }
    };
  
    if (view === 'folders') {
      fetchFolders();
    }
  }, [user, view]);
 

  const getFileThumbnail = (file) => {
    const fileUrl = file.fileUrl;

    if (file.mimetype.startsWith('image/')) {
      return <img src={fileUrl} alt={file.filename}  onError={()=> setThumbnailError(true)}/> 
    } else if (file.mimetype === 'application/pdf') {
      return fileThumbnails[file._id] ? (
        <img src={fileThumbnails[file._id]} alt={file.filename} className='pdf-thumbnail'/>
      ) : (
        <FontAwesomeIcon icon={faFilePdf} size='3x'/>
      );
    } else if (file.mimetype.startsWith('application/msword') || file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      return (
        <FontAwesomeIcon icon={faFileWord} size='3x'/>
      );
    } else if (file.mimetype.startsWith('application/vnd.ms-excel') || file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      return (
        <FontAwesomeIcon icon={faFileExcel} size='3x'/>
      );
    } else if (file.mimetype === 'text/csv') {
      return <FontAwesomeIcon icon={faFileCsv} size="3x"  className='file-icon'/>;
    } else if (file.mimetype === 'text/plain' ) {
      return <FontAwesomeIcon icon={faFileLines} size="3x" className='file-icon'/>;
    }else {
      return <div className="file-icon">File</div>;
    }
  };


const handleDownload = (fileUrl, fileName) => {
  axios.get(fileUrl, { responseType: 'blob' })
    .then((response) => {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      saveAs(blob, fileName);
    })
    .catch((error) => console.error('File download failed:', error));
};

//trash effect for state
useEffect(() => {
  const fetchTrashFiles = async (page = 1) => {
    if (!user || !localStorage.getItem('token')) {
      console.error('No user token available');
      return;
    }
    try {
      const endpoint = `${apiBaseUrl}/api/files/trash?page=${page}&limit=${pageSizeTrash}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const files = response.data.files || [];
      const filesWithUrls = files.map(file => ({
        ...file,
        fileUrl: `${apiBaseUrl}/uploads/${file.filename}`
      }));

      setTrashFiles(filesWithUrls);
      setCurrentPageTrash(response.data.currentPage);
      setTotalPagesTrash(response.data.totalPages);
    } catch (error) {
      console.error('Failed to retrieve trash files:', error);
    }
  };

  if (view === 'trash') {
    fetchTrashFiles(currentPageTrash);
  }
}, [user, view, currentPageTrash, pageSizeTrash]);



//delete permanently
const handlePermanentlyDelete = async (fileId) => {
  const userConfirmed = window.confirm("Are you sure you want to delete this file?");

  if (userConfirmed) {
    try {
      await axios.delete(`${apiBaseUrl}/api/files/trash/${fileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setTrashFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
      alert("File Deleted Permanently!");
    } catch (error) {
      console.error('Failed to delete file permanently:', error);
    }
  }
};


//restore files
const handleRestore = async (fileId) => {
  const userConfirmed = window.confirm("Do you want to restore this file?");
  if (userConfirmed) {
    try {
      await axios.post(`${apiBaseUrl}/api/files/restore/${fileId}`, { fileId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setTrashFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
      alert("File Restored Successfully!");
    } catch (error) {
      console.error('Failed to restore file:', error);
    }
  }
};

//move file to bin
const handleDelete = async (fileId) => {
  try {
    await axios.delete(`${apiBaseUrl}/api/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
    alert("File Moved to Bin Successfully!");
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
};

//delete a folder
const handleDeleteFolder = async (folderId) => {
  console.log("Deleting folder with ID:", folderId);
  
  const folderIdStr = String(folderId).trim();

  if (!folderIdStr || folderIdStr.length !== 24) {
    console.error('Invalid folder ID:', folderIdStr);
    alert('Invalid folder ID');
    return;
  }

  const userConfirmed = window.confirm("Are you sure you want to permanently delete this folder?");
  
  if (userConfirmed) {
    try {
      await axios.delete(`${apiBaseUrl}/api/folders/${folderIdStr}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setFolders(prevFolders => prevFolders.filter(folder => folder._id !== folderIdStr));
      alert("Folder deleted permanently!");
    } catch (error) {
      console.error('Failed to delete folder:', error);
      alert('Failed to delete folder');
    }
  }
};



useEffect(() => {
  const handleEscKey = (event) => {
    if (event.key === 'Escape') {
      handleEscFunction();
    }
  };

  window.addEventListener('keydown', handleEscKey);

  return () => {
    window.removeEventListener('keydown', handleEscKey);
  };
}, []);

const handleEscFunction = () => {
  setShowFolderModal(null);
  setViewingFile(null);
};

  
  const isActiveLink = (section) => currentSection === section ? 'active' : '';

 
  
  
  return (
    <div className="home-page">
      {loading && <div className="loading">Uploading...</div>}
      <div className="main-container">
        <aside className="sidebar">
          <div className="new-button-container">
            <button className="new-button" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faPlus} size="xl" style={{marginRight:'0.5em'}}/> New
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <label>
                  <input
                    type="file"
                    accept="image/*,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    multiple
                  />
                  <button onClick={() => fileInputRef.current.click()}>
                  <FontAwesomeIcon icon={faUpload} style={{marginRight:'1em', marginLeft:'1.7em'}}/> File Upload</button>
                </label>
                <button className="sidebar-button" onClick={handleCreateFolderClick}>
                  <FontAwesomeIcon icon={faFolder} style={{marginRight:'1em', marginLeft:'1.7em'}}/> New folder
                </button>
              </div>
            )}
          </div>
          <nav className="nav-options">
          <ul>
              <li>
                <Link onClick={()=> setView('files')} className={isActiveLink('/files')}>
                  <FontAwesomeIcon icon={faCloud} size="lg" style={{marginRight:'1em'}}/> Files
                </Link>
              </li>
              <li>
                <Link onClick={()=> setView('folders')} className={isActiveLink('/recent')}>
                  <FontAwesomeIcon icon={faFolder} size="lg" style={{marginRight:'1em'}}/> Folders
                </Link>
              </li>
              <li>
                <Link onClick={() => setView('trash')} className={isActiveLink('trash')}>
                  <FontAwesomeIcon icon={faTrash} size="lg" style={{marginRight:'1em'}}/> Trash
                </Link>
              </li>
              <li>
                <Link to="/support" className={isActiveLink('/support')}>
                  <FontAwesomeIcon icon={faUserGroup} size="lg" style={{marginRight:'1em'}}/> Support
                </Link>
              </li>
            </ul>
          </nav>
          <div className="storage-info">
            <p><FontAwesomeIcon icon={faCloud} /> Storage: 70% used</p>
            <div className="storage-bar">
              <div className="storage-used" style={{ width: '70%' }}></div>
            </div>
            <button className="get-more-storage">Get More Storage</button>
          </div>
        </aside>
        <main className="content" ref={dropAreaRef}>
          {user ? (
            <>
              <div className="top-content">
                <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search files..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div className="filters">
                    <label>
                      Type:
                      <select value={fileTypeFilter} onChange={handleFileTypeFilterChange}>
                      <option value="all">All</option>
                      <option value="application/pdf">PDFs</option>
                      <option value="image/">Images</option>
                      <option value="application/msword">Word Documents</option>
                      <option value="application/vnd.ms-excel">Excel Spreadsheets</option>
                      <option value="text/csv">CSV Files</option>
                      <option value="text/plain">Text Files</option>
                    </select>
                    </label>
                    <label>
                      Uploaded:
                      <select value={uploadedFilter} onChange={handleUploadedFilterChange}>
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="last-day">Last day</option>
                        <option value="last-week">Last week</option>
                        <option value="last-month">Last month</option>
                      </select>
                    </label>
                    <label>
                      Sort by:
                      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="name-A-Z">Name (A→Z)</option>
                        <option value="name-Z-A">Name (Z→A)</option>
                        <option value="size">File Size</option>
                        <option value="date">Upload Date</option>
                      </select>
                    </label>
                    <label>
                      Shared with:
                      <input type="text" placeholder="Enter name or email" />
                    </label>
                  </div>
                </div>
              </div>
                <div className="toggle-buttons">
                  <button onClick={() => setView('files')} className={view === 'files' ? 'active' : ''}>
                    Files
                  </button>
                  <button onClick={() => setView('folders')} className={view === 'folders' ? 'active' : ''}>
                    Folders
                  </button>
                  <button onClick={() => setView('trash')} className={view === 'trash' ? 'active' : ''}>
                    Trash
                  </button>
                </div>
                <div className="files-container">
                    {view === 'files' ? (
                      <div className='files-section'>
                        <h2>Files</h2>
                        <p>Total Files: {totalFiles}</p>
                        <div className="files-grid">
                          {sortedFiles.length > 0 ? (
                            sortedFiles.map((file, index) => (
                              <div key={index} className="file">
                                <div className="file-header">{extractFileName(file.filename)}</div>
                                <div className="file-thumbnail">
                                  {getFileThumbnail(file)}
                                </div>
                                <div className="icon-menu">
                                  <FontAwesomeIcon icon={faDownload} className='menu-icons' onClick={() => handleDownload(file.fileUrl, file.filename)} />
                                  <FontAwesomeIcon icon={faTrash} className='menu-icons' onClick={() => handleDelete(file._id)} />
                                  <FontAwesomeIcon icon={faEye} className='menu-icons' onClick={() => handleView(file)} />
                                  <FontAwesomeIcon icon={faEllipsisV} size="lg" onClick={() => handleMenuToggle(index)} className='menu-icons' />
                                  {menuOpen === index && (
                                    <div className="icon-menu-dropdown icon-menu">
                                      <FontAwesomeIcon icon={faShare} onClick={() => handleShare(file)} className='menu-icons' />
                                      <FontAwesomeIcon icon={faLink} className='menu-icons' onClick={() => copyToClipboard(file.fileUrl)} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No files found</p>
                          )}
                        </div>

                        {sortedFiles.length > 0 && totalPages > 1 && (
                          <div className="pagination-controls">
                            <button
                              onClick={() => setCurrentPage(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                              onClick={() => setCurrentPage(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    ) : view === 'trash' ? (
                      <div className="trash-section">
                        <h2>Trash</h2>
                        <p className='bin-heading'>Total Files in Bin: {totalBinFiles}</p>
                        <div className="files-grid">
                          {trashFiles.length > 0 ? (
                            trashFiles.map((file, index) => (
                              <div key={index} className="file">
                                <div className="file-header">{extractFileName(file.filename)}</div>
                                <div className="file-thumbnail">
                                  {getFileThumbnail(file)}
                                </div>
                                <div className="icon-menu">
                                  <FontAwesomeIcon icon={faTrashArrowUp} className='menu-icons' onClick={() => handleRestore(file._id)} />
                                  <FontAwesomeIcon icon={faTrash} className='menu-icons' onClick={() => handlePermanentlyDelete(file._id)} />
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className='trash-no'>No items in trash</p>
                          )}
                        </div>

                        {trashFiles.length > 0 && totalPagesTrash > 1 && (
                          <div className="pagination-controls">
                            <button
                              onClick={() => setCurrentPageTrash(currentPageTrash - 1)}
                              disabled={currentPageTrash === 1}
                            >
                              Previous
                            </button>
                            <span>Page {currentPageTrash} of {totalPagesTrash}</span>
                            <button
                              onClick={() => setCurrentPageTrash(currentPageTrash + 1)}
                              disabled={currentPageTrash === totalPagesTrash}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    ) : null}
                {view === 'folders' && (
                  <div className="folders-container">
                    <h2>Folders</h2>
                    <p>Total Folders: {totalFolders}</p>
                    <div className="folders-grid" >
                      {folders.map((folder, index) => (
                        <div key={index} className="folder">
                          <div className="folder-header">
                          <div className="folder-header">{extractFileName(folder.name)}</div>
                          </div>
                          <FontAwesomeIcon icon={faFolder} size="3x" className='icon'/>
                          <div className="folder-footer">
                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteFolder(folder._id)}/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            </>
          ) : (
            <p>Please log in to access your files.</p>
          )}
        </main>
        <aside className='sidebar1'>
          <FontAwesomeIcon
            icon={isDarkMode ? faMoon : faSun}
            size='xl'
            onClick={() => setIsDarkMode(!isDarkMode)}
            className='theme-toggle-button'
          />
        </aside>
      </div>

      {viewingFile && (
                <div className="view-modal" onClick={closeView}>
                  <div className="view-modal-content">
                    {viewingFile.mimetype.startsWith('image/') ? (
                      <img src={viewingFile.fileUrl} alt={viewingFile.filename} />
                    ) : (
                      <iframe src={viewingFile.fileUrl} title={viewingFile.filename} />
                    )}
                  </div>
                </div>
              )}

              {showFolderModal && (
                      <div className="modal-overlay">
                        <div className="folder-modal-content">
                          <h4>New Folder</h4>
                          <div className="folder-create-form">
                          <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Enter folder name"
                          />
                          <div className="folder-create-buttons">
                          <button onClick={createFolder}>Create</button>
                          <button onClick={() => setShowFolderModal(false)}>Cancel</button>
                          </div>
                          </div>
                        </div>
                      </div>
                    )}
    </div>
  );
}

export default HomePage;