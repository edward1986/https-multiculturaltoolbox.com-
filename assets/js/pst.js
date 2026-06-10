function updatePST() {
    const options = {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    };
    const container = document.getElementById('pst-time');
    if (container) {
        container.textContent = new Date().toLocaleString('en-US', options);
    }
}
setInterval(updatePST, 1000);
updatePST();
