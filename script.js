// Sidemenu collapse/expand toggle
function toggleSidemenu() {
    const sidemenu = document.getElementById('sidemenu');
    sidemenu.classList.toggle('collapsed');
    
    // Save state to localStorage
    const isCollapsed = sidemenu.classList.contains('collapsed');
    localStorage.setItem('sidemenuCollapsed', isCollapsed);
}

// Restore sidemenu state on page load
document.addEventListener('DOMContentLoaded', () => {
    const sidemenu = document.getElementById('sidemenu');
    const isCollapsed = localStorage.getItem('sidemenuCollapsed') === 'true';
    
    if (isCollapsed) {
        sidemenu.classList.add('collapsed');
    }
});

// Modal functions
function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'none';
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Toast function with position parameter
function showToast(type, position = 'top-right') {
    const toast = document.getElementById('toast');
    
    // Set message and style based on type
    let message = '';
    let bgColor = '';
    
    switch(type) {
        case 'success':
            message = '✓ Success! Operation completed successfully.';
            bgColor = 'var(--success)';
            break;
        case 'error':
            message = '✗ Error! Something went wrong.';
            bgColor = 'var(--error)';
            break;
        case 'warning':
            message = '⚠ Warning! Please review your action.';
            bgColor = 'var(--warning)';
            break;
        case 'info':
        default:
            message = 'ℹ Info: This is a notification!';
            bgColor = 'var(--info)';
            break;
    }
    
    toast.textContent = message;
    toast.style.backgroundColor = bgColor;
    toast.className = `toast ${position} show`;
    
    setTimeout(() => {
        toast.className = `toast ${position}`;
    }, 3000);
}

// Accordion
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.accordion-icon');
    const isOpen = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    icon.className = isOpen ? 'bi bi-chevron-down accordion-icon' : 'bi bi-chevron-up accordion-icon';
}

// Tabs
function switchTab(event, tabId) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Carousel
let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    items[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + items.length) % items.length;
    items[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function currentSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    items[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = index;
    items[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Dropdown
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle('show');
}

// Context Menu
function showContextMenu(e) {
    e.preventDefault();
    const menu = document.getElementById('contextMenu');
    menu.style.display = 'block';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
}

// Collapsible
function toggleCollapsible(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.collapsible-icon');
    content.classList.toggle('open');
    icon.className = content.classList.contains('open') ? 'bi bi-chevron-up collapsible-icon' : 'bi bi-chevron-down collapsible-icon';
}

// Lightbox
function openLightbox(imgSrc) {
    document.getElementById('lightbox').classList.add('active');
    document.getElementById('lightbox-img').src = imgSrc;
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// File Upload Handler
function handleFiles(files) {
    console.log('Files uploaded:', files.length);
    // Handle file upload logic here
    alert(`${files.length} file(s) selected!`);
}

// Side Menu Navigation
function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active menu link
    document.querySelectorAll('.sidemenu-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Close mobile menu
    if (window.innerWidth <= 992) {
        document.querySelector('.sidemenu').classList.remove('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Auto-play Carousel
let autoPlayInterval;
let currentAutoIndex = 0;
let isAutoPlaying = true;

function moveCarouselAuto(direction) {
    const items = document.querySelectorAll('#carouselAuto .carousel-item');
    items[currentAutoIndex].classList.remove('active');
    currentAutoIndex = (currentAutoIndex + direction + items.length) % items.length;
    items[currentAutoIndex].classList.add('active');
    
    // Reset auto-play
    if (isAutoPlaying) {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveCarouselAuto(1);
    }, 3000);
}

function toggleAutoPlay() {
    const btn = document.querySelector('.carousel-pause i');
    isAutoPlaying = !isAutoPlaying;
    
    if (isAutoPlaying) {
        btn.className = 'bi bi-pause-fill';
        startAutoPlay();
    } else {
        btn.className = 'bi bi-play-fill';
        clearInterval(autoPlayInterval);
    }
}

// Card Carousel
let currentCardIndex = 0;

function moveCardCarousel(direction) {
    const cards = document.querySelectorAll('.carousel-card');
    cards[currentCardIndex].classList.remove('active');
    currentCardIndex = (currentCardIndex + direction + cards.length) % cards.length;
    cards[currentCardIndex].classList.add('active');
}

// Hamburger Menu
function toggleHamburger() {
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('hamburgerMenu');
    btn.classList.toggle('active');
    menu.classList.toggle('active');
}

// Mega Menu
function toggleMegaMenu() {
    const menu = document.getElementById('megaMenu');
    menu.classList.toggle('active');
}

// Tree Navigation
function toggleTree(element) {
    const toggle = element;
    const parent = toggle.closest('.tree-item');
    const children = parent.querySelector('.tree-children');
    
    if (children) {
        toggle.classList.toggle('expanded');
        children.classList.toggle('expanded');
    }
}

// Event Listeners - Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Side Menu Links
    document.querySelectorAll('.sidemenu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            navigateToSection(sectionId);
        });
    });
    
    // Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidemenu = document.querySelector('.sidemenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidemenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (!sidemenu.contains(e.target) && !menuToggle.contains(e.target)) {
                sidemenu.classList.remove('active');
            }
        }
        
        // Close mega menu when clicking outside
        const megaMenu = document.getElementById('megaMenu');
        const megaMenuContainer = document.querySelector('.mega-menu-container');
        if (megaMenu && megaMenuContainer && !megaMenuContainer.contains(e.target)) {
            megaMenu.classList.remove('active');
        }
        
        // Close hamburger menu when clicking outside
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const hamburgerDemo = document.querySelector('.hamburger-demo');
        if (hamburgerMenu && hamburgerDemo && !hamburgerDemo.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        }
    });
    
    // Start auto-play carousel
    if (document.getElementById('carouselAuto')) {
        startAutoPlay();
    }
    
    // Close context menu on click anywhere
    document.addEventListener('click', (e) => {
        const contextMenu = document.getElementById('contextMenu');
        if (contextMenu && !e.target.closest('.context-menu-trigger')) {
            contextMenu.style.display = 'none';
        }
    });

    // Close alerts
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('alert-close')) {
            e.target.parentElement.style.display = 'none';
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // File Upload Drag & Drop
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('fileInput');

    if (fileUpload && fileInput) {
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.classList.add('dragover');
        });

        fileUpload.addEventListener('dragleave', () => {
            fileUpload.classList.remove('dragover');
        });

        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUpload.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }

    // Close modal when clicking on overlay (outside modal-content)
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Only close if clicking directly on the modal overlay, not on its children
            if (e.target.classList.contains('modal')) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Prevent modal content clicks from closing the modal
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Toggle submenu
    document.querySelectorAll('.sidemenu-item-parent > .sidemenu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.parentElement;
            const isOpen = parent.classList.contains('open');
            
            // Close all other submenus at the same level
            document.querySelectorAll('.sidemenu-item-parent:not(.submenu-nested)').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('open');
                }
            });
            
            // Toggle current submenu
            if (!isOpen) {
                parent.classList.add('open');
            } else {
                parent.classList.remove('open');
            }
        });
    });

    // Toggle nested submenu
    document.querySelectorAll('.submenu-parent-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = link.closest('.submenu-nested');
            const isOpen = parent.classList.contains('open');
            
            // Close all other nested submenus at the same level
            const siblings = parent.parentElement.querySelectorAll('.submenu-nested');
            siblings.forEach(sibling => {
                if (sibling !== parent) {
                    sibling.classList.remove('open');
                }
            });
            
            // Toggle current nested submenu
            if (!isOpen) {
                parent.classList.add('open');
            } else {
                parent.classList.remove('open');
            }
        });
    });
});

// Toggle Blazor Code Visibility
function toggleBlazorCode(button) {
    const parent = button.closest('div');
    const codeContainer = parent.nextElementSibling;
    
    if (codeContainer && codeContainer.classList.contains('blazor-code')) {
        if (codeContainer.style.display === 'none' || codeContainer.style.display === '') {
            // Abrir código
            codeContainer.style.display = 'block';
            button.innerHTML = '<i class="bi bi-x-lg"></i> Fechar Código';
            button.style.background = '#dc3545';
            button.style.color = 'white';
        } else {
            // Fechar código
            codeContainer.style.display = 'none';
            button.innerHTML = '<i class="bi bi-code-slash"></i> Ver Código';
            button.style.background = '#667eea';
            button.style.color = 'white';
        }
    }
}

// Rating functions
let currentRating = 3;

function highlightStars(star, rating) {
    const stars = star.parentElement.querySelectorAll('i');
    stars.forEach((s, index) => {
        if (index < rating) {
            s.classList.remove('bi-star');
            s.classList.add('bi-star-fill');
        } else {
            s.classList.remove('bi-star-fill');
            s.classList.add('bi-star');
        }
    });
}

function setRating(star, rating) {
    currentRating = rating;
    highlightStars(star, rating);
    const ratingValue = document.getElementById('ratingValue');
    if (ratingValue) {
        ratingValue.textContent = `${rating}.0 / 5.0`;
    }
}
