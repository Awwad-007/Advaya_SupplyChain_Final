// Tab Switching Logic
function showTab(name) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.getElementById(name).style.display = 'block';
    document.getElementById('current-role').innerText = name.toUpperCase();
}

// Farmer Action
function register() {
    alert("Blockchain Success: Batch created with unique Hash! ⛓️");
}

// Inspector Action
function verify() {
    alert("Digital Signature Applied: Batch #101 is now Certified Grade-A. 🛡️");
}

// Distributor Action (The SOS Trigger)
function triggerSOS() {
    document.body.style.backgroundColor = "#ffebee";
    alert("CRITICAL: SOS Triggered. Unauthorized stop logged to Ledger at GPS 12.97, 77.59.");
}

// Consumer Audit Search
function search() {
    const id = document.getElementById('searchId').value;
    const res = document.getElementById('results');
    res.style.display = 'block';

    if(id == "1") {
        document.getElementById('resCrop').innerText = "Premium Saffron";
        document.getElementById('resQual').innerText = "Verified Grade-A ✅";
        document.getElementById('resAlert').innerText = "Safe Transit 🟢";
    } else {
        // This is the simulation for a "Tampered" batch
        document.getElementById('resCrop').innerText = "Basmati Rice";
        document.getElementById('resQual').innerText = "Pending";
        document.getElementById('resAlert').innerText = "⚠️ SECURITY BREACH DETECTED";
        document.getElementById('resAlert').style.color = "red";
    }
}