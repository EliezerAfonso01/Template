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

// Recipe Cards Carousel
let currentRecipeIndex = 0;

function moveRecipeCarousel(direction) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards[currentRecipeIndex].classList.remove('active');
    currentRecipeIndex = (currentRecipeIndex + direction + recipeCards.length) % recipeCards.length;
    recipeCards[currentRecipeIndex].classList.add('active');
}

// Mini Recipe Cards Grid
function updateMiniRecipeGrid() {
    const track = document.querySelector('.carousel-mini-recipe-track');
    if (!track) return;
    
    const visibleCards = Array.from(track.querySelectorAll('.mini-recipe-card:not(.hidden)'));
    const itemCount = visibleCards.length;
    
    // Set data attribute for CSS grid styling
    track.setAttribute('data-items', itemCount);
}

function filterMiniRecipes(searchTerm) {
    const cards = document.querySelectorAll('.mini-recipe-card');
    searchTerm = searchTerm.toLowerCase();
    
    cards.forEach((card) => {
        const recipeName = card.getAttribute('data-recipe-name').toLowerCase();
        const recipeTitle = card.querySelector('h5').textContent.toLowerCase();
        
        if (recipeName.includes(searchTerm) || recipeTitle.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    updateMiniRecipeGrid();
}

// Dummy functions for backward compatibility (buttons removed but keeping functions)
function moveMiniRecipeCarousel(direction) {
    // No longer needed with grid layout
}

function goToMiniRecipe(index) {
    // No longer needed with grid layout
}

// ================================
// RECIPE CALCULATOR FUNCTIONS
// ================================

// Recipe Data Storage
let selectedRecipeData = {
    id: 'cookies',
    name: 'Cookies de Chocolate',
    totalIngredients: 45.80,
    ingredients: [
        { name: 'Farinha de Trigo', quantity: '2.5 kg', value: 12.50 },
        { name: 'Açúcar', quantity: '1.5 kg', value: 8.25 },
        { name: 'Manteiga', quantity: '500 g', value: 15.00 },
        { name: 'Ovos', quantity: '12 unidades', value: 9.60 },
        { name: 'Chocolate em Gotas', quantity: '300 g', value: 18.90 }
    ]
};

const recipesDatabase = {
    cookies: {
        id: 'cookies',
        name: 'Cookies de Chocolate',
        totalIngredients: 45.80,
        ingredients: [
            { name: 'Farinha de Trigo', quantity: '2.5 kg', value: 12.50 },
            { name: 'Açúcar', quantity: '1.5 kg', value: 8.25 },
            { name: 'Manteiga', quantity: '500 g', value: 15.00 },
            { name: 'Ovos', quantity: '12 unidades', value: 9.60 },
            { name: 'Chocolate em Gotas', quantity: '300 g', value: 18.90 }
        ]
    },
    cake: {
        id: 'cake',
        name: 'Bolo de Cenoura',
        totalIngredients: 32.50,
        ingredients: [
            { name: 'Farinha de Trigo', quantity: '2 kg', value: 10.00 },
            { name: 'Cenoura', quantity: '500 g', value: 4.50 },
            { name: 'Ovos', quantity: '8 unidades', value: 6.40 },
            { name: 'Açúcar', quantity: '1 kg', value: 5.50 },
            { name: 'Óleo', quantity: '200 ml', value: 6.10 }
        ]
    },
    bread: {
        id: 'bread',
        name: 'Pão Francês',
        totalIngredients: 28.90,
        ingredients: [
            { name: 'Farinha de Trigo', quantity: '3 kg', value: 15.00 },
            { name: 'Fermento', quantity: '50 g', value: 4.20 },
            { name: 'Sal', quantity: '100 g', value: 1.50 },
            { name: 'Açúcar', quantity: '100 g', value: 0.55 },
            { name: 'Óleo', quantity: '150 ml', value: 4.60 },
            { name: 'Água', quantity: '1.5 L', value: 3.05 }
        ]
    },
    pizza: {
        id: 'pizza',
        name: 'Pizza Margherita',
        totalIngredients: 52.00,
        ingredients: [
            { name: 'Farinha de Trigo', quantity: '1.5 kg', value: 7.50 },
            { name: 'Queijo Mozzarella', quantity: '800 g', value: 24.00 },
            { name: 'Molho de Tomate', quantity: '500 g', value: 8.50 },
            { name: 'Manjericão', quantity: '50 g', value: 6.00 },
            { name: 'Azeite', quantity: '200 ml', value: 6.00 }
        ]
    }
};

// Select Recipe
function selectRecipe(element, recipeId) {
    // Remove active class from all items
    document.querySelectorAll('.recipe-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected item
    element.classList.add('active');
    
    // Update selected recipe data
    selectedRecipeData = recipesDatabase[recipeId];
    
    // Update ingredients panel
    updateIngredientsPanel();
}

// Update Ingredients Panel
function updateIngredientsPanel() {
    const ingredientsList = document.querySelector('.ingredients-list');
    
    ingredientsList.innerHTML = selectedRecipeData.ingredients.map(ing => `
        <div class="ingredient-item">
            <div class="ingredient-name">${ing.name}</div>
            <div class="ingredient-quantity">${ing.quantity}</div>
            <div class="ingredient-value">R$ ${ing.value.toFixed(2)}</div>
        </div>
    `).join('');
}

// Calculate Recipe
function calculateRecipe() {
    // Show loading
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
    
    setTimeout(() => {
        // Get form values
        const quantity = parseFloat(document.getElementById('quantity').value) || 50;
        const monthlyProduction = parseFloat(document.getElementById('monthlyProduction').value) || 200;
        const margin = parseFloat(document.getElementById('margin').value) || 30;
        
        // Get selected expenses
        let totalExpenses = 0;
        document.querySelectorAll('.expense-checkbox:checked').forEach(checkbox => {
            const expenseItem = checkbox.closest('.expense-item');
            const expenseValueText = expenseItem.querySelector('.expense-value').textContent;
            const expenseValue = parseFloat(expenseValueText.replace('R$', '').replace(',', '.').trim());
            totalExpenses += expenseValue;
        });
        
        // Calculate costs
        const ingredientCostTotal = selectedRecipeData.totalIngredients;
        const ingredientCostUnit = ingredientCostTotal / quantity;
        
        // Calculate total cost per unit
        const totalCostPerUnit = ingredientCostUnit + (totalExpenses / quantity);
        
        // Calculate profit
        const profitPerUnit = totalCostPerUnit * (margin / 100);
        const profitTotal = profitPerUnit * quantity;
        
        // Calculate sale price
        const salePriceUnit = totalCostPerUnit + profitPerUnit;
        const salePriceTotal = salePriceUnit * quantity;
        
        // Update results
        document.getElementById('despesasTotais').textContent = `R$ ${totalExpenses.toFixed(2)}`;
        document.getElementById('custoUnitario').textContent = `R$ ${ingredientCostUnit.toFixed(2)}`;
        document.getElementById('custoTotal').textContent = `R$ ${ingredientCostTotal.toFixed(2)}`;
        document.getElementById('precoPorFatia').textContent = `R$ ${totalCostPerUnit.toFixed(2)}`;
        document.getElementById('lucroUnitario').textContent = `R$ ${profitPerUnit.toFixed(2)}`;
        document.getElementById('lucroTotal').textContent = `R$ ${profitTotal.toFixed(2)}`;
        document.getElementById('precoVendaUnidade').textContent = `R$ ${salePriceUnit.toFixed(2)}`;
        document.getElementById('precoVendaTotal').textContent = `R$ ${salePriceTotal.toFixed(2)}`;
        
        // Hide loading
        loadingIndicator.style.display = 'none';
        
        // Animate result cards
        document.querySelectorAll('.result-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 800);
}

// Refresh Calculator
function refreshCalculator() {
    // Reset form
    document.getElementById('quantity').value = '50';
    document.getElementById('monthlyProduction').value = '200';
    document.getElementById('margin').value = '30';
    
    // Reset checkboxes to default
    document.querySelectorAll('.expense-checkbox').forEach((checkbox, index) => {
        checkbox.checked = (index === 0 || index === 1 || index === 4); // exp1, exp2, exp5
    });
    
    // Reset recipe selection
    document.querySelectorAll('.recipe-item').forEach((item, index) => {
        item.classList.remove('active');
        if (index === 0) item.classList.add('active');
    });
    
    selectedRecipeData = recipesDatabase.cookies;
    updateIngredientsPanel();
    
    // Recalculate
    calculateRecipe();
}

// Create Product (placeholder)
function createProduct() {
    alert('Produto criado com sucesso! Esta funcionalidade salvaria os dados calculados.');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateMiniRecipeGrid();
});

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

// ================================
// FORECAST (PREVISÃO) FUNCTIONS
// ================================

let selectedForecastRecipe = {
    id: 'cookies',
    name: 'Cookies de Chocolate',
    yield: 24,
    ingredients: 5,
    value: 45.80
};

const forecastRecipesDatabase = {
    cookies: {
        id: 'cookies',
        name: 'Cookies de Chocolate',
        yield: 24,
        ingredients: 5,
        value: 45.80
    },
    cake: {
        id: 'cake',
        name: 'Bolo de Cenoura',
        yield: 12,
        ingredients: 5,
        value: 32.50
    },
    bread: {
        id: 'bread',
        name: 'Pão Francês',
        yield: 30,
        ingredients: 6,
        value: 28.90
    }
};

// Select Forecast Recipe
function selectForecastRecipe(element, recipeId) {
    // Remove active class from all cards
    document.querySelectorAll('.recipe-forecast-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    element.classList.add('active');
    
    // Update selected recipe data
    selectedForecastRecipe = forecastRecipesDatabase[recipeId];
    
    console.log('Receita selecionada:', selectedForecastRecipe);
}

// Prever Produção
function preverProducao() {
    const quantidade = parseInt(document.getElementById('quantidadeProducao').value) || 50;
    const loadingForecast = document.getElementById('loadingForecast');
    const forecastResults = document.getElementById('forecastResults');
    const btnLimpar = document.getElementById('btnLimpar');
    const resumoIngredientes = document.getElementById('resumoIngredientes');
    
    // Show loading
    loadingForecast.style.display = 'flex';
    
    setTimeout(() => {
        // Hide loading
        loadingForecast.style.display = 'none';
        
        // Calculate forecast
        const quantidadeMaxima = Math.floor(quantidade * 1.5); // 150% capacity
        const percentagemDisponivel = 83; // 83% available
        const custoUnitario = selectedForecastRecipe.value / selectedForecastRecipe.yield;
        const custoEstimado = custoUnitario * quantidade;
        
        // Update results
        document.getElementById('quantidadeMaxima').textContent = `${quantidadeMaxima} unidades`;
        document.getElementById('quantidadeSolicitada').textContent = quantidade;
        document.getElementById('custoEstimado').textContent = `R$ ${custoEstimado.toFixed(2)}`;
        
        // Determine status
        let statusTexto = 'Produção Viável';
        let statusClass = 'status-text';
        if (percentagemDisponivel < 50) {
            statusTexto = 'Produção Limitada';
            statusClass = 'status-text-warning';
        } else if (percentagemDisponivel < 100) {
            statusTexto = 'Produção Parcial';
            statusClass = 'status-text-partial';
        }
        
        const statusElement = document.getElementById('statusPrevisao');
        statusElement.textContent = statusTexto;
        statusElement.className = statusClass;
        
        document.getElementById('percentagemTexto').textContent = 
            `${percentagemDisponivel}% dos ingredientes disponíveis`;
        
        // Show results and summary
        forecastResults.style.display = 'block';
        btnLimpar.style.display = 'flex';
        resumoIngredientes.style.display = 'flex';
        
        // Animate result cards
        document.querySelectorAll('.forecast-result-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Show ingredients panel (hide empty state)
        const emptyState = document.querySelector('.ingredients-empty-state');
        if (emptyState) {
            emptyState.style.display = 'none';
        }
        
        // Scroll to results
        forecastResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1000);
}

// Limpar Resultados
function limparResultados() {
    const forecastResults = document.getElementById('forecastResults');
    const btnLimpar = document.getElementById('btnLimpar');
    const resumoIngredientes = document.getElementById('resumoIngredientes');
    
    // Hide results
    forecastResults.style.display = 'none';
    btnLimpar.style.display = 'none';
    resumoIngredientes.style.display = 'none';
    
    // Reset input
    document.getElementById('quantidadeProducao').value = '50';
    
    // Reset recipe selection
    document.querySelectorAll('.recipe-forecast-card').forEach((card, index) => {
        card.classList.remove('active');
        if (index === 0) card.classList.add('active');
    });
    
    selectedForecastRecipe = forecastRecipesDatabase.cookies;
}

// Comprar Ingrediente
function comprarIngrediente(codigo) {
    alert(`Redirecionar para compra do ingrediente COD: ${codigo}\nEsta funcionalidade conectaria com fornecedores ou sistema de compras.`);
}
