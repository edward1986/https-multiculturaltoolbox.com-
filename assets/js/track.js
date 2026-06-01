            function showTrackError(message) {
                const container = document.getElementById('track-error-container');
                const msgSpan = document.getElementById('track-error-message');
                msgSpan.textContent = message;
                container.style.display = 'block';
            }

            function hideTrackError() {
                document.getElementById('track-error-container').style.display = 'none';
            }

            document.getElementById('tracking-form-main').addEventListener('submit', function(e) {
                e.preventDefault();
                const arn = document.getElementById('arn-input').value.trim().toUpperCase();
                const trackBtn = document.getElementById('track-btn');

                hideTrackError();

                if (!arn) {
                    showTrackError('Please enter a valid Application Reference Number (ARN).');
                    return;
                }

                // UI Reset
                document.querySelectorAll('.arn-result').forEach(el => el.style.display = 'none');
                document.getElementById('no-results-container').style.display = 'none';
                document.getElementById('loading-container').style.display = 'block';
                trackBtn.disabled = true;

                // Simulate API call delay
                setTimeout(() => {
                    document.getElementById('loading-container').style.display = 'none';
                    trackBtn.disabled = false;

                    const matchingResult = document.querySelector(`.arn-result[data-arn="${arn}"]`);

                    if (matchingResult) {
                        matchingResult.style.display = 'block';
                        matchingResult.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        document.getElementById('no-results-container').style.display = 'block';
                    }
                }, 800);
            });
