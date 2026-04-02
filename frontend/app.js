const ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = [
    "function registerHarvest(string c, uint256 w, string d, string l) public returns (uint256)",
    "function verifyQuality(uint256 id) public",
    "function updateLogistics(uint256 id, uint256 dist) public",
    "function finalizeDelivery(uint256 id) public",
    "function getBatchData(uint256 id) public view returns (tuple(uint256 id, string crop, uint256 weight, string date, string landId, uint8 stage, address farmer, address auditor, bool isVerified, uint256 distance, uint256 ts))",
    "function totalBatches() public view returns (uint256)"
];

const core = {
    con: null, id: 0, map: null, marker: null,

    async init() {
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        await prov.send("eth_requestAccounts", []);
        this.con = new ethers.Contract(ADDR, ABI, prov.getSigner());
        this.render(1);
    },

    render(s) {
        document.querySelectorAll('.stage-container').forEach((v, i) => v.classList.toggle('hidden', i+1 !== s));
        document.querySelectorAll('.track-item').forEach((t, i) => t.classList.toggle('active', i+1 <= s));
        if(s === 3) {
            this.loadMap();
            this.generateFleetData();
        }
    },

    generateFleetData() {
        const names = ["Ramesh Kumar", "Suresh Raina", "Abdul Khan", "Vikram Singh"];
        const vehicles = ["KA-01-EF-4421", "KA-05-GH-8890", "KA-03-MK-1122"];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        
        document.getElementById('driverName').innerText = `Driver: ${randomName}`;
        document.getElementById('vehicleNum').innerText = `Vehicle: ${randomVehicle}`;
        
        // Save these to localStorage so the Consumer can see them later too
        localStorage.setItem(`fleet_driver_${this.id}`, randomName);
        localStorage.setItem(`fleet_veh_${this.id}`, randomVehicle);
    },

    async mint() {
        try {
            const tx = await this.con.registerHarvest(
                document.getElementById('cName').value,
                document.getElementById('cWgt').value,
                document.getElementById('cDate').value,
                document.getElementById('cLand').value
            );
            await tx.wait();
            this.id = await this.con.totalBatches();
            
            const imgData = document.getElementById('imgPrev').src;
            localStorage.setItem(`batch_img_${this.id}`, imgData);
            
            document.getElementById('auditImg').src = imgData;
            document.getElementById('curIdText').innerText = this.id;
            this.render(2);
        } catch (e) { alert("Execution Halted: Block Error."); }
    },

    async verify() {
        await (await this.con.verifyQuality(this.id)).wait();
        this.render(3);
    },

    loadMap() {
        if(this.map) return;
        this.map = L.map('map').setView([12.9716, 77.5946], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        this.marker = L.marker([12.9716, 77.5946]).addTo(this.map);
    },

    async startLogistics() {
        let lat = 12.9716; let dist = 0;
        document.getElementById('shipBtn').disabled = true;
        const move = setInterval(() => {
            lat += 0.0025; dist += 22;
            this.marker.setLatLng([lat, 77.5946]);
            this.map.panTo([lat, 77.5946]);
            document.getElementById('distText').innerText = `Odometer: ${dist} km`;
        }, 300);

        setTimeout(async () => {
            clearInterval(move);
            await (await this.con.updateLogistics(this.id, dist)).wait();
            await (await this.con.finalizeDelivery(this.id)).wait();
            this.render(4);
        }, 3000);
    },

    // Add this to your core object in app.js

async search() {
    const sid = document.getElementById('searchId').value;
    if (!sid) return alert("Enter a valid ID");

    try {
        const b = await this.con.getBatchData(sid);
        const savedImg = localStorage.getItem(`batch_img_${sid}`);
        const dName = localStorage.getItem(`fleet_driver_${sid}`);
        const dVeh = localStorage.getItem(`fleet_veh_${sid}`);
        
        // --- QR CODE GENERATION ---
        const qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = ""; // Clear old QR
        new QRCode(qrContainer, {
            text: `https://advaya-vtu.pro/audit/${sid}`, // Simulated URL
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff"
        });
        document.getElementById('qr-wrapper').classList.remove('hidden');

        // --- UPDATE LEDGER UI ---
        const res = document.getElementById('finalLedger');
        res.classList.remove('hidden');
        res.innerHTML = `
            <div class="ledger-box" style="margin-top:20px;">
                <img src="${savedImg}" style="width:100%; border-radius:15px; margin-bottom:20px;">
                <h4 style="color:var(--neon)">SECURE AUDIT: BATCH #${sid}</h4>
                <div class="audit-details">
                    <p><strong>CROP:</strong> ${b.crop} ✅</p>
                    <p><strong>LAND ID:</strong> ${b.landId}</p>
                    <p><strong>DRIVER:</strong> ${dName}</p>
                    <p><strong>VEHICLE:</strong> ${dVeh}</p>
                    <p><strong>LOGISTICS:</strong> ${b.distance} KM</p>
                </div>
                <p style="font-size:9px; color:#444; margin-top:15px; word-break:break-all;">
                    ETH-HASH: ${ethers.utils.id(sid + b.crop)}
                </p>
            </div>
        `;
    } catch (e) { 
        alert("Batch ID not found on the Ethereum Ledger."); 
    }
}
};

const ui = {
    preview: (e, target) => {
        const reader = new FileReader();
        reader.onload = () => {
            const p = document.getElementById(target);
            p.src = reader.result; p.classList.remove('hidden');
        };
        reader.readAsDataURL(e.target.files[0]);
    }
};

window.addEventListener('load', () => core.init());
