document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickInsideToggle = sidebarToggle && sidebarToggle.contains(event.target);

        if (!isClickInsideSidebar && !isClickInsideToggle && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });

    // Handle Active Link in Sidebar based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) && href !== 'index.html' && href !== '#') {
            link.classList.add('active');
            // Remove active from home if we are in a subpage
            document.querySelector('a[href="index.html"]').classList.remove('active');
        } else if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
            if (href === 'index.html') link.classList.add('active');
        }
    });
});
