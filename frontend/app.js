function showTab(name) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.getElementById(name).style.display = 'block';
}

function triggerSOS() {
    document.getElementById('sos-msg').style.display = 'block';
    document.body.style.backgroundColor = '#ffebee';
    alert("Blockchain Alert: Unauthorized stop recorded for current Batch.");
}

function search() {
    const id = document.getElementById('searchId').value;
    const res = document.getElementById('results');
    res.style.display = 'block';
    
    if(id == "1") {
        document.getElementById('resStatus').innerHTML = "Verified ✅";
        document.getElementById('resAlert').innerHTML = "Safe Path 🟢";
    } else {
        document.getElementById('resStatus').innerHTML = "No Records Found";
    }
}