    document.getElementById('contact-inquiry-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('submit-inquiry');
        btn.textContent = 'Inquiry Sent Successfully';
        btn.style.background = 'var(--success-color)';
        btn.disabled = true;
        this.reset();

        setTimeout(() => {
            btn.textContent = 'Submit Inquiry';
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
