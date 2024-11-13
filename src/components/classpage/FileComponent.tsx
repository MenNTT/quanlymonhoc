import React from 'react';

const FileComponent: React.FC = () => {
    // Sample files for demonstration; you can replace this with actual data or logic.
    const sampleFiles = [
        { id: 1, name: 'Document1.pdf', size: '2 MB' },
        { id: 2, name: 'Presentation.pptx', size: '1.5 MB' },
        { id: 3, name: 'Spreadsheet.xlsx', size: '500 KB' },
    ];

    return (
        <div>
            <h3>Files</h3>
            <div className="list-group">
                {sampleFiles.length === 0 ? (
                    <p>No files uploaded yet.</p>
                ) : (
                    sampleFiles.map(file => (
                        <a key={file.id} href="#" className="list-group-item list-group-item-action">
                            {file.name} <span className="text-muted" style={{ fontSize: 'small' }}>({file.size})</span>
                        </a>
                    ))
                )}
            </div>
            <div className="mt-3">
                <button className="btn btn-primary">Upload File</button>
            </div>
        </div>
    );
};

export default FileComponent;
