// Form handling for PortfolioPro CMS

class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.initialize();
        }
    }
    
    initialize() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        const formData = this.collectFormData();
        this.showLoading();
        
        // Simulate form submission
        setTimeout(() => {
            this.showSuccess();
            this.form.reset();
        }, 1500);
    }
    
    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.classList.remove('is-invalid');
            
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                this.showError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
                field.classList.add('is-invalid');
                this.showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showError(field, message) {
        let errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
    
    collectFormData() {
        const formData = {};
        const formElements = this.form.elements;
        
        for (let element of formElements) {
            if (element.name && element.type !== 'submit') {
                formData[element.name] = element.value;
            }
        }
        
        return formData;
    }
    
    showLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Store original text for reset
        submitBtn.dataset.originalText = originalText;
    }
    
    showSuccess() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        // Show success message
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Thank you! Your message has been sent successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        this.form.parentNode.insertBefore(alertDiv, this.form.nextSibling);
        
        // Reset button
        submitBtn.innerHTML = submitBtn.dataset.originalText;
        submitBtn.disabled = false;
        
        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Contact form
    if (document.getElementById('contactForm')) {
        new FormHandler('contactForm');
    }
    
    // Admin forms
    if (document.getElementById('adminLoginForm')) {
        new FormHandler('adminLoginForm');
    }
    
    // Newsletter form
    if (document.getElementById('newsletterForm')) {
        new FormHandler('newsletterForm');
    }
});

// Export for use in other files
window.FormHandler = FormHandler;