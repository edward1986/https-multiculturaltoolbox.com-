    document.addEventListener('DOMContentLoaded', function() {
        let currentStep = 1;
        const totalSteps = 8;

        // Pre-select service from query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        if (serviceParam) {
            const serviceSelect = document.getElementById('service-select');
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].value === serviceParam) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
        }

        const nextBtns = document.querySelectorAll('.next-step');
        const prevBtns = document.querySelectorAll('.prev-step');
        const submitBtn = document.getElementById('final-submit-btn');

        function showError(message) {
            const container = document.getElementById('portal-error-container');
            const msgSpan = document.getElementById('portal-error-message');
            msgSpan.textContent = message;
            container.style.display = 'block';
            container.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        function hideError() {
            document.getElementById('portal-error-container').style.display = 'none';
        }

        function updateStep(step) {
            hideError();
            // Hide all steps
            document.querySelectorAll('.portal-step-content').forEach(el => el.style.display = 'none');
            // Show current step
            document.getElementById('step-' + step).style.display = 'block';

            // Update Stepper
            document.querySelectorAll('#portal-stepper .step').forEach(el => {
                const s = parseInt(el.getAttribute('data-step'));
                if (s === step) {
                    el.classList.add('active');
                    el.setAttribute('aria-current', 'step');
                } else if (s < step) {
                    el.classList.add('done');
                    el.classList.remove('active');
                    el.removeAttribute('aria-current');
                } else {
                    el.classList.remove('active');
                    el.classList.remove('done');
                    el.removeAttribute('aria-current');
                }
            });

            // Update Review Page
            if (step === 6) {
                document.getElementById('rev-service').textContent = document.getElementById('service-select').value || 'Not selected';
                document.getElementById('rev-region').textContent = document.getElementById('region-select').value || 'Not selected';
                document.getElementById('rev-name').textContent = (document.getElementById('fname').value + ' ' + document.getElementById('lname').value).trim() || 'Not provided';
                document.getElementById('rev-email').textContent = document.getElementById('email').value || 'Not provided';
                document.getElementById('rev-contact').textContent = document.getElementById('contact').value || 'Not provided';
                document.getElementById('rev-mode').textContent = document.querySelector('input[name="mode"]:checked').value;
            }

            // Scroll to top of portal
            document.querySelector('.apply-portal').scrollIntoView({ behavior: 'smooth' });
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                hideError();
                // Basic validation
                if (currentStep === 1 && !document.getElementById('service-select').value) {
                    showError('Please select a regulatory service to proceed.');
                    return;
                }
                if (currentStep === 2 && !document.getElementById('region-select').value) {
                    showError('Please select a regional office for your application.');
                    return;
                }
                if (currentStep === 4) {
                    const fname = document.getElementById('fname').value.trim();
                    const lname = document.getElementById('lname').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const contact = document.getElementById('contact').value.trim();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!fname || !lname || !email || !contact) {
                        showError('All personal details are required. Please ensure no fields are left empty.');
                        return;
                    }
                    if (!emailRegex.test(email)) {
                        showError('The email address provided appears invalid. Please check the format.');
                        return;
                    }
                }

                if (currentStep < totalSteps - 1) {
                    currentStep++;
                    updateStep(currentStep);

                    // Simulated upload feedback for Step 5
                    if (currentStep === 5) {
                        const uploadStatus = document.querySelector('#mock-upload-list span:last-child');
                        if (uploadStatus) {
                            uploadStatus.textContent = 'Uploading...';
                            uploadStatus.style.color = 'var(--accent-color)';

                            setTimeout(() => {
                                uploadStatus.textContent = 'Ready';
                                uploadStatus.style.color = 'var(--success-color)';
                            }, 1000);
                        }
                    }
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateStep(currentStep);
                }
            });
        });

        submitBtn.addEventListener('click', () => {
            hideError();
            if (!document.getElementById('terms-checkbox-final').checked) {
                showError('You must read and agree to the Terms and Conditions before submitting your application.');
                return;
            }

            // Show success modal then success step
            document.getElementById('success-modal').style.display = 'flex';

            setTimeout(() => {
                currentStep = 8;
                updateStep(8);
            }, 500);
        });

        // Copy ARN function
        document.getElementById('copy-arn-btn').addEventListener('click', function() {
            const arnText = document.getElementById('final-arn').textContent;
            navigator.clipboard.writeText(arnText).then(() => {
                this.textContent = 'Copied!';
                this.classList.add('copied');
                setTimeout(() => {
                    this.textContent = 'Copy to Clipboard';
                    this.classList.remove('copied');
                }, 2000);
            });
        });

        // Mode card interaction
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                this.querySelector('input').checked = true;
            });
        });
    });
