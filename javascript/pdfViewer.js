// PDF.js integration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

class PDFViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.pdfDoc = null;
        this.pageNum = 1;
        this.scale = 1.5;
    }

    async loadDocument(url) {
        try {
            this.pdfDoc = await pdfjsLib.getDocument(url).promise;
            this.renderPage(this.pageNum);
            this.setupNavigation();
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    }

    async renderPage(num) {
        const page = await this.pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: this.scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await page.render(renderContext).promise;
        
        this.container.innerHTML = '';
        this.container.appendChild(canvas);
    }

    setupNavigation() {
        const controls = document.createElement('div');
        controls.className = 'pdf-controls';
        controls.innerHTML = `
            <button onclick="pdfViewer.prevPage()">Previous</button>
            <span>Page: <span id="page_num">${this.pageNum}</span> / <span id="page_count">${this.pdfDoc.numPages}</span></span>
            <button onclick="pdfViewer.nextPage()">Next</button>
            <button onclick="pdfViewer.zoomIn()">Zoom In</button>
            <button onclick="pdfViewer.zoomOut()">Zoom Out</button>
        `;
        this.container.parentNode.insertBefore(controls, this.container);
    }

    prevPage() {
        if (this.pageNum <= 1) return;
        this.pageNum--;
        this.renderPage(this.pageNum);
    }

    nextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) return;
        this.pageNum++;
        this.renderPage(this.pageNum);
    }

    zoomIn() {
        this.scale *= 1.2;
        this.renderPage(this.pageNum);
    }

    zoomOut() {
        this.scale /= 1.2;
        this.renderPage(this.pageNum);
    }
}
