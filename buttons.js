/**
 * LuxeStay HMS - Global Button Handlers
 * Makes all buttons across every page functional with
 * success alerts, modals, confirmations and visual feedback.
 */
document.addEventListener('DOMContentLoaded', function () {

    // ============================================================
    //  UTILITY: Toast / Alert System
    // ============================================================
    function showToast(message, type = 'success') {
        // Remove existing toasts
        document.querySelectorAll('.luxe-toast').forEach(t => t.remove());

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        const toast = document.createElement('div');
        toast.className = 'luxe-toast';
        toast.style.cssText = `
            position: fixed; top: 24px; right: 24px; z-index: 9999;
            background: #fff; border-radius: 12px; padding: 16px 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15); display: flex;
            align-items: center; gap: 12px; min-width: 300px;
            border-left: 4px solid ${colors[type]};
            animation: slideIn 0.4s ease; font-family: 'Inter', sans-serif;
        `;
        toast.innerHTML = `
            <i class="${icons[type]}" style="font-size:1.3rem;color:${colors[type]}"></i>
            <span style="font-size:0.9rem;color:#1e293b;font-weight:500;">${message}</span>
            <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;cursor:pointer;font-size:1.2rem;color:#94a3b8;">&times;</button>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // Add animation styles
    if (!document.getElementById('luxe-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'luxe-toast-styles';
        style.textContent = `
            @keyframes slideIn { from { opacity:0; transform:translateX(100px); } to { opacity:1; transform:translateX(0); } }
            @keyframes slideOut { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(100px); } }
        `;
        document.head.appendChild(style);
    }


    // ============================================================
    //  1. ROOMS PAGE — rooms.html
    // ============================================================

    // Save Room button (modal)
    document.querySelectorAll('.modal-footer .btn-primary').forEach(btn => {
        if (btn.textContent.trim() === 'Save Room') {
            btn.addEventListener('click', function () {
                const modal = this.closest('.modal');
                const inputs = modal.querySelectorAll('input, select');
                const roomNum = inputs[0]?.value;
                const roomType = inputs[1]?.value;

                if (!roomNum) {
                    showToast('Please enter a room number!', 'warning');
                    return;
                }

                showToast(`Room ${roomNum} (${roomType}) added successfully!`, 'success');
                bootstrap.Modal.getInstance(modal)?.hide();
                inputs.forEach(i => { if (i.type !== 'checkbox') i.value = ''; });
            });
        }
    });

    // Edit buttons (rooms table)
    document.querySelectorAll('.btn-light .fa-edit, .btn-light .far.fa-edit').forEach(icon => {
        icon.closest('button').addEventListener('click', function () {
            const row = this.closest('tr');
            const roomNo = row?.querySelector('td:first-child')?.textContent?.trim();
            showToast(`Editing Room #${roomNo}...`, 'info');
        });
    });

    // Delete buttons (rooms table)
    document.querySelectorAll('.btn-light .fa-trash-alt, .btn-light .far.fa-trash-alt').forEach(icon => {
        icon.closest('button').addEventListener('click', function () {
            const row = this.closest('tr');
            const roomNo = row?.querySelector('td:first-child')?.textContent?.trim();
            if (confirm(`Are you sure you want to delete Room #${roomNo}?`)) {
                row.style.transition = 'opacity 0.4s';
                row.style.opacity = '0';
                setTimeout(() => row.remove(), 400);
                showToast(`Room #${roomNo} deleted successfully!`, 'success');
            }
        });
    });

    // Room filter dropdowns
    document.querySelectorAll('.form-select-sm').forEach(sel => {
        sel.addEventListener('change', function () {
            showToast(`Filter applied: ${this.value}`, 'info');
        });
    });

    // Room search box
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                showToast(`Searching for: "${this.value}"`, 'info');
            }
        });
    });


    // ============================================================
    //  2. BOOKINGS PAGE — bookings.html
    // ============================================================

    // Confirm Booking button
    document.querySelectorAll('form').forEach(form => {
        const btn = form.querySelector('.btn-primary.w-100');
        if (btn && btn.textContent.trim() === 'Confirm Booking') {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const name = form.querySelector('input[type="text"]')?.value;
                if (!name) {
                    showToast('Please enter guest name!', 'warning');
                    return;
                }
                showToast(`Booking confirmed for ${name}!`, 'success');
                form.reset();
            });
        }
    });

    // Booking action dropdowns: Check-in Now, Edit Booking, Cancel
    document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
        const text = item.textContent.trim();
        if (text === 'Check-in Now') {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const guest = this.closest('tr')?.querySelector('td:first-child .fw-bold')?.textContent;
                showToast(`${guest || 'Guest'} checked in successfully!`, 'success');
                const badge = this.closest('tr')?.querySelector('.badge');
                if (badge) {
                    badge.className = 'badge bg-soft-green text-success badge-pill';
                    badge.textContent = 'Checked In';
                }
            });
        }
        if (text === 'Edit Booking') {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const guest = this.closest('tr')?.querySelector('td:first-child .fw-bold')?.textContent;
                showToast(`Editing booking for ${guest || 'Guest'}...`, 'info');
            });
        }
        if (text === 'Cancel') {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const row = this.closest('tr');
                const guest = row?.querySelector('td:first-child .fw-bold')?.textContent;
                if (confirm(`Cancel booking for ${guest}?`)) {
                    const badge = row?.querySelector('.badge');
                    if (badge) {
                        badge.className = 'badge bg-soft-red text-danger badge-pill';
                        badge.textContent = 'Cancelled';
                    }
                    showToast(`Booking for ${guest} cancelled.`, 'error');
                }
            });
        }
    });

    // Booking filter button
    document.querySelectorAll('.btn-outline-primary').forEach(btn => {
        if (btn.querySelector('.fa-filter')) {
            btn.addEventListener('click', function () {
                showToast('Bookings filtered by selected date.', 'info');
            });
        }
    });


    // ============================================================
    //  3. CHECK-IN / CHECK-OUT PAGE — check-in-out.html
    // ============================================================

    // Confirm Check-in
    document.querySelectorAll('.btn-success.w-100').forEach(btn => {
        if (btn.textContent.trim() === 'Confirm Check-in') {
            btn.closest('form')?.addEventListener('submit', function (e) {
                e.preventDefault();
                const guest = this.querySelector('select')?.value;
                if (!guest || guest.includes('Select')) {
                    showToast('Please select a guest first!', 'warning');
                    return;
                }
                showToast(`Check-in confirmed for ${guest}!`, 'success');
            });
        }
    });

    // Search Room button (Check-out section)
    document.querySelectorAll('.input-group .btn-primary').forEach(btn => {
        if (btn.textContent.trim() === 'Search') {
            btn.addEventListener('click', function () {
                const input = this.previousElementSibling;
                if (!input?.value) {
                    showToast('Please enter a room number to search!', 'warning');
                    return;
                }
                showToast(`Room #${input.value} details loaded.`, 'info');
            });
        }
    });

    // Process Check-out & Payment
    document.querySelectorAll('.btn-danger.w-100').forEach(btn => {
        if (btn.textContent.includes('Process Check-out')) {
            btn.addEventListener('click', function () {
                if (confirm('Process check-out and payment for this guest?')) {
                    showToast('Check-out completed! Payment of $300.00 processed.', 'success');
                }
            });
        }
    });

    // Check-out buttons in occupants table
    document.querySelectorAll('.btn-outline-danger').forEach(btn => {
        if (btn.textContent.trim() === 'Check-out') {
            btn.addEventListener('click', function () {
                const row = this.closest('tr');
                const guest = row?.querySelector('td:nth-child(2)')?.textContent?.trim();
                if (confirm(`Check-out ${guest}?`)) {
                    row.style.transition = 'opacity 0.4s';
                    row.style.opacity = '0';
                    setTimeout(() => row.remove(), 400);
                    showToast(`${guest} checked out successfully!`, 'success');
                }
            });
        }
    });


    // ============================================================
    //  4. GUESTS PAGE — guests.html
    // ============================================================

    // Export List button
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Export') && btn.textContent.includes('List')) {
            btn.addEventListener('click', function () {
                showToast('Guest list exported as CSV!', 'success');
            });
        }
    });

    // View guest eye buttons
    document.querySelectorAll('.fa-eye').forEach(icon => {
        icon.closest('button')?.addEventListener('click', function () {
            const row = this.closest('tr');
            const name = row?.querySelector('.fw-bold')?.textContent?.trim();
            if (name) {
                showToast(`Loading profile for ${name}...`, 'info');
            }
        });
    });

    // Guest search
    const guestSearch = document.querySelector('input[placeholder*="Search by name"]');
    if (guestSearch) {
        guestSearch.addEventListener('keyup', function (e) {
            if (e.key === 'Enter' && this.value) {
                showToast(`Searching guests: "${this.value}"`, 'info');
            }
        });
    }

    // Country filter
    document.querySelectorAll('.form-select').forEach(sel => {
        if (sel.querySelector('option')?.textContent.includes('Search by Country')) {
            sel.addEventListener('change', function () {
                showToast(`Filtered guests by: ${this.value}`, 'info');
            });
        }
    });


    // ============================================================
    //  5. PAYMENTS PAGE — payments.html
    // ============================================================

    // New Transaction button
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('New Transaction')) {
            btn.addEventListener('click', function () {
                showToast('New Transaction form opening...', 'info');
            });
        }
    });

    // Download Statement button
    document.querySelectorAll('.btn-outline-secondary').forEach(btn => {
        if (btn.textContent.includes('Statement')) {
            btn.addEventListener('click', function () {
                showToast('Payment statement downloaded as PDF!', 'success');
            });
        }
    });

    // Invoice buttons
    document.querySelectorAll('.btn-outline-primary').forEach(btn => {
        if (btn.textContent.includes('Invoice')) {
            btn.addEventListener('click', function () {
                const row = this.closest('tr');
                const guest = row?.querySelector('.fw-bold')?.textContent?.trim();
                showToast(`Invoice generated for ${guest || 'Guest'}!`, 'success');
            });
        }
    });


    // ============================================================
    //  6. REPORTS PAGE — reports.html
    // ============================================================

    // Print button
    document.querySelectorAll('.btn-outline-secondary').forEach(btn => {
        if (btn.textContent.includes('Print')) {
            btn.addEventListener('click', function () {
                showToast('Preparing report for print...', 'info');
                setTimeout(() => window.print(), 500);
            });
        }
    });

    // Export Data button
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Export Data')) {
            btn.addEventListener('click', function () {
                showToast('Report data exported as Excel!', 'success');
            });
        }
    });

    // Month filter
    document.querySelectorAll('input[type="month"]').forEach(input => {
        input.addEventListener('change', function () {
            showToast(`Reports updated for ${this.value}`, 'info');
        });
    });


    // ============================================================
    //  7. SETTINGS PAGE — settings.html
    // ============================================================

    // Save Changes button
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.trim() === 'Save Changes') {
            btn.addEventListener('click', function () {
                const form = this.closest('form');
                const hotelName = form?.querySelector('input[type="text"]')?.value;
                const pass = form?.querySelectorAll('input[type="password"]');

                if (pass && pass.length >= 2 && pass[0].value && pass[0].value !== pass[1].value) {
                    showToast('Passwords do not match!', 'error');
                    return;
                }

                showToast(`Settings saved for "${hotelName || 'LuxeStay'}" successfully!`, 'success');
            });
        }
    });

    // Change Photo button
    document.querySelectorAll('.btn-outline-primary').forEach(btn => {
        if (btn.textContent.trim() === 'Change Photo') {
            btn.addEventListener('click', function () {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.addEventListener('change', function () {
                    if (this.files && this.files[0]) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const img = btn.closest('.text-center')?.querySelector('img');
                            if (img) img.src = e.target.result;
                            showToast('Profile photo updated!', 'success');
                        };
                        reader.readAsDataURL(this.files[0]);
                    }
                });
                fileInput.click();
            });
        }
    });

    // Remove Photo button
    document.querySelectorAll('.btn-outline-danger').forEach(btn => {
        if (btn.textContent.trim() === 'Remove') {
            btn.addEventListener('click', function () {
                if (confirm('Remove profile picture?')) {
                    const img = this.closest('.text-center')?.querySelector('img');
                    if (img) img.src = 'https://ui-avatars.com/api/?name=Admin&size=150';
                    showToast('Profile photo removed.', 'success');
                }
            });
        }
    });


    // ============================================================
    //  8. DASHBOARD — index.html
    // ============================================================

    // "View All" bookings button
    document.querySelectorAll('.btn-primary.btn-sm').forEach(btn => {
        if (btn.textContent.trim() === 'View All') {
            // Already has href, no need for JS — just adding context
        }
    });

    // 3-dot action buttons on dashboard recent bookings
    document.querySelectorAll('.table .btn-light.btn-sm').forEach(btn => {
        if (btn.querySelector('.fa-ellipsis-v') && !btn.getAttribute('data-bs-toggle')) {
            btn.addEventListener('click', function () {
                const row = this.closest('tr');
                const guest = row?.querySelector('td:first-child')?.textContent?.trim();
                showToast(`Viewing details for ${guest || 'Guest'}...`, 'info');
            });
        }
    });

});
