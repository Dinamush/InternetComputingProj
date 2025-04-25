class DocumentManager {
    constructor() {
        this.documents = [];
        this.uploadForm = document.getElementById('uploadForm');
        this.documentTable = document.getElementById('documentTable');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
        
        // Search functionality
        document.querySelector('.filter-controls input')
            .addEventListener('input', (e) => this.filterDocuments(e.target.value));
        
        // Type filter
        document.querySelector('.filter-controls select')
            .addEventListener('change', (e) => this.filterByType(e.target.value));
    }

    async handleUpload(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        try {
            // Simulated upload - replace with actual API call
            await this.uploadDocument(formData);
            this.refreshDocumentList();
            this.uploadForm.reset();
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }

    async uploadDocument(formData) {
        // Implement actual upload logic here
        return new Promise((resolve) => {
            setTimeout(() => {
                this.documents.push({
                    id: Date.now(),
                    title: formData.get('docTitle'),
                    type: formData.get('docType'),
                    grade: formData.get('gradeLevel'),
                    uploaded: new Date().toISOString()
                });
                resolve();
            }, 1000);
        });
    }

    refreshDocumentList() {
        const tbody = this.documentTable.querySelector('tbody');
        tbody.innerHTML = this.documents.map(doc => `
            <tr>
                <td>${doc.title}</td>
                <td>${doc.type}</td>
                <td>${doc.grade}</td>
                <td>${new Date(doc.uploaded).toLocaleDateString()}</td>
                <td>
                    <button onclick="documentManager.editDocument(${doc.id})">Edit</button>
                    <button onclick="documentManager.deleteDocument(${doc.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    filterDocuments(query) {
        const filtered = this.documents.filter(doc => 
            doc.title.toLowerCase().includes(query.toLowerCase())
        );
        this.renderFilteredDocuments(filtered);
    }

    filterByType(type) {
        const filtered = type ? 
            this.documents.filter(doc => doc.type === type) : 
            this.documents;
        this.renderFilteredDocuments(filtered);
    }

    renderFilteredDocuments(docs) {
        const tbody = this.documentTable.querySelector('tbody');
        tbody.innerHTML = docs.map(doc => `
            <tr>
                <td>${doc.title}</td>
                <td>${doc.type}</td>
                <td>${doc.grade}</td>
                <td>${new Date(doc.uploaded).toLocaleDateString()}</td>
                <td>
                    <button onclick="documentManager.editDocument(${doc.id})">Edit</button>
                    <button onclick="documentManager.deleteDocument(${doc.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    editDocument(id) {
        // Implement edit functionality
    }

    deleteDocument(id) {
        if (confirm('Are you sure you want to delete this document?')) {
            this.documents = this.documents.filter(doc => doc.id !== id);
            this.refreshDocumentList();
        }
    }
}

// Initialize document manager
const documentManager = new DocumentManager();
