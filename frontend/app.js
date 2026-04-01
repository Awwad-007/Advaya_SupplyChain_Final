// Toast Notification System
function showToast(title, message, type = 'success', icon = 'fa-check-circle') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <div class="toast-content">
            <span class="title">${title}</span>
            <span class="desc">${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 4s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// Tab Switching Logic
function showTab(name, btnElement) {
    // Hide all
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => {
        t.style.display = 'none';
        t.classList.remove('fade-in');
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    
    // Show selected
    const selectedTab = document.getElementById(name);
    selectedTab.style.display = 'flex';
    selectedTab.style.flexDirection = 'column';
    
    // Trigger animation
    setTimeout(() => selectedTab.classList.add('fade-in'), 10);
    
    if (btnElement) {
        btnElement.classList.add('active');
    }
    
    document.getElementById('current-role').innerText = name.toUpperCase();
}

// Initialize on first load
document.addEventListener('DOMContentLoaded', () => {
    showTab('farmer', document.querySelector('.tabs button.active'));
});

// Farmer Action
function register() {
    const crop = document.getElementById('crop').value || 'Arabica Coffee';
    showToast('Blockchain Success', `Batch for ${crop} minted with a unique Hash! ⛓️`, 'success', 'fa-link');
}

// Inspector Action
function verify() {
    showToast('Signature Applied', 'Batch #101 is now Certified Grade-A.', 'info', 'fa-certificate');
}

// Distributor Action (The SOS Trigger)
function triggerSOS() {
    const body = document.body;
    body.classList.add('sos-active');
    
    showToast('CRITICAL ALERT', 'SOS Triggered. Unauthorized stop logged at GPS 12.97, 77.59.', 'error', 'fa-triangle-exclamation');
    
    const movingDot = document.querySelector('.moving-dot');
    if (movingDot) movingDot.style.animationPlayState = 'paused';
    
    // Reset after 5s just for demo purposes
    setTimeout(() => {
        body.classList.remove('sos-active');
        if (movingDot) movingDot.style.animationPlayState = 'running';
    }, 5000);
}

// Consumer Audit Search
function search() {
    const id = document.getElementById('searchId').value;
    const res = document.getElementById('results');
    
    // Reset animation
    res.style.display = 'none';
    res.classList.remove('fade-in');
    
    setTimeout(() => {
        res.style.display = 'flex';
        res.classList.add('fade-in');
        
        const cropEl = document.getElementById('resCrop');
        const qualEl = document.getElementById('resQual');
        const alertEl = document.getElementById('resAlert');
        const alertIconBox = document.querySelector('.alert-icon');
        const alertIconEl = document.querySelector('.alert-icon i');

        if(id === "1" || id === "") { // Default safe case
            cropEl.innerText = "Premium Saffron";
            qualEl.innerText = "Verified Grade-A";
            qualEl.style.color = "var(--primary)";
            
            alertEl.innerText = "Safe Transit";
            alertEl.style.color = "var(--primary)";
            
            alertIconBox.style.background = "rgba(0,230,118,0.1)";
            alertIconBox.style.color = "var(--primary)";
            alertIconEl.className = "fa-solid fa-shield";
            
            showToast('Audit Complete', 'Ledger verified. Everything looks good.', 'success', 'fa-check');
        } else {
            // Tampered simulation
            cropEl.innerText = "Basmati Rice";
            qualEl.innerText = "Pending Verification";
            qualEl.style.color = "var(--text-muted)";
            
            alertEl.innerText = "SECURITY BREACH DETECTED";
            alertEl.style.color = "var(--danger)";
            
            alertIconBox.style.background = "rgba(255,23,68,0.1)";
            alertIconBox.style.color = "var(--danger)";
            alertIconEl.className = "fa-solid fa-triangle-exclamation";
            
            showToast('Warning', 'Tampering detected in batch history.', 'error', 'fa-triangle-exclamation');
        }
    }, 100);
}