const API_URL = 'http://localhost:3000/api';

// Load data saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
    loadMahasiswa();
    loadTopStudents();
});

// Form Tambah Mahasiswa
document.getElementById('formMahasiswa').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nim = document.getElementById('nim').value;
    const nama = document.getElementById('nama').value;
    const jurusan = document.getElementById('jurusan').value;
    
    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nim: nim,
                name: nama,
                major: jurusan
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Mahasiswa berhasil ditambahkan!', 'success');
            document.getElementById('formMahasiswa').reset();
            loadMahasiswa();
            loadTopStudents();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        showNotification('Gagal menambahkan mahasiswa', 'error');
        console.error(error);
    }
});

// Load Mahasiswa
async function loadMahasiswa() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        
        const tbody = document.getElementById('bodyMahasiswa');
        
        if (data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">Belum ada data mahasiswa</td></tr>';
            return;
        }
        
        tbody.innerHTML = data.data.map(mhs => `
            <tr>
                <td>${mhs.nim}</td>
                <td>${mhs.name}</td>
                <td>${mhs.major}</td>
                <td><strong>${mhs.gpa.toFixed(2)}</strong></td>
                <td><span class="badge ${getStatusBadge(mhs.status)}">${mhs.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-success" onclick="openModalNilai(${mhs.id}, '${mhs.name}', '${mhs.nim}')">
                            + Nilai
                        </button>
                        <button class="btn btn-danger" onclick="hapusMahasiswa(${mhs.id})">
                            Hapus
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading mahasiswa:', error);
    }
}

// Load Top Students
async function loadTopStudents() {
    try {
        const response = await fetch(`${API_URL}/students/top?limit=5`);
        const data = await response.json();
        
        const container = document.getElementById('topStudents');
        
        if (data.data.length === 0) {
            container.innerHTML = '<p class="text-center">Belum ada data</p>';
            return;
        }
        
        container.innerHTML = data.data.map((mhs, index) => `
            <div class="top-student-card">
                <div class="top-student-rank">#${index + 1}</div>
                <div class="top-student-info">
                    <div class="top-student-name">${mhs.name}</div>
                    <div class="top-student-major">${mhs.major} - ${mhs.nim}</div>
                </div>
                <div class="top-student-gpa">${mhs.gpa.toFixed(2)}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading top students:', error);
    }
}

// Open Modal Nilai
function openModalNilai(id, name, nim) {
    document.getElementById('studentId').value = id;
    document.getElementById('studentInfo').textContent = `${name} (${nim})`;
    document.getElementById('modalNilai').style.display = 'block';
}

// Close Modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modalNilai').style.display = 'none';
    document.getElementById('formNilai').reset();
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('modalNilai');
    if (e.target === modal) {
        modal.style.display = 'none';
        document.getElementById('formNilai').reset();
    }
});

// Form Tambah Nilai
document.getElementById('formNilai').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const mataKuliah = document.getElementById('mataKuliah').value;
    const nilai = document.getElementById('nilai').value;
    
    try {
        const response = await fetch(`${API_URL}/students/${studentId}/grades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: mataKuliah,
                score: parseInt(nilai)
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Nilai berhasil ditambahkan!', 'success');
            document.getElementById('modalNilai').style.display = 'none';
            document.getElementById('formNilai').reset();
            loadMahasiswa();
            loadTopStudents();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        showNotification('Gagal menambahkan nilai', 'error');
        console.error(error);
    }
});

// Hapus Mahasiswa
async function hapusMahasiswa(id) {
    if (!confirm('Yakin ingin menghapus mahasiswa ini?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Mahasiswa berhasil dihapus!', 'success');
            loadMahasiswa();
            loadTopStudents();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        showNotification('Gagal menghapus mahasiswa', 'error');
        console.error(error);
    }
}

// Helper Functions
function getStatusBadge(status) {
    const badges = {
        'Cumlaude': 'badge-success',
        'Sangat Memuaskan': 'badge-info',
        'Memuaskan': 'badge-info',
        'Cukup': 'badge-warning',
        'Kurang': 'badge-danger'
    };
    return badges[status] || 'badge-info';
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
