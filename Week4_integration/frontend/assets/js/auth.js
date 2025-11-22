// frontend/assets/js/auth.js
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

function requireRole(allowedRoles) {
    if (!checkAuth()) return false;
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!allowedRoles.includes(user.role)) {
        alert('You do not have permission to access this page');
        logout();
        return false;
    }
    return true;
}