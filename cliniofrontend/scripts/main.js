import { loadPage, initPageScripts } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    loadPage('login');

    document.querySelectorAll('a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            loadPage(page);
        });
    });
});
