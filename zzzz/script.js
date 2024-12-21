// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    disable: window.innerWidth < 768
});

// Mobile Menu Toggle with improved animation
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Improved navbar color change on scroll with throttling
let lastScrollTop = 0;
const nav = document.querySelector('nav');
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
        if (scrollTop > lastScrollTop) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    } else {
        nav.classList.remove('scrolled');
        nav.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
}

// Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 100);
    }
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

if (testimonials.length > 0) {
    testimonials[0].classList.add('active');
    
    function showTestimonial(index) {
        testimonials.forEach(card => {
            card.classList.remove('active', 'next', 'prev');
            card.style.display = 'none';
        });
        
        testimonials[index].style.display = 'block';
        testimonials[index].classList.add('active');
        
        // Add next and prev classes for animation
        const nextIndex = (index + 1) % testimonials.length;
        const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
        
        testimonials[nextIndex].style.display = 'block';
        testimonials[prevIndex].style.display = 'block';
        testimonials[nextIndex].classList.add('next');
        testimonials[prevIndex].classList.add('prev');
    }

    if (prevBtn && nextBtn) {
        let isAnimating = false;
        
        prevBtn.addEventListener('click', () => {
            if (!isAnimating) {
                isAnimating = true;
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
                setTimeout(() => isAnimating = false, 500);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (!isAnimating) {
                isAnimating = true;
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
                setTimeout(() => isAnimating = false, 500);
            }
        });
    }
}

// Smooth parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Enhanced scroll indicator animation
const scrollIndicator = document.querySelector('.hero-scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector('textarea');
        
        // Simple validation
        let isValid = true;
        [name, email, message].forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
}

// Add smooth reveal animation to sections
const revealElements = document.querySelectorAll('.furniture-item, .service-card, .benefit-item');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Enhanced catalog filtering with smooth transitions
const filterButtons = document.querySelectorAll('.filter-btn');
const furnitureItems = document.querySelectorAll('.furniture-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button state with smooth transition
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(1)';
        });
        button.classList.add('active');
        button.style.transform = 'scale(1.1)';
        
        // Filter items with staggered animation
        furnitureItems.forEach((item, index) => {
            const category = item.dataset.category;
            if (filter === 'all' || category === filter) {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '1';
                }, index * 100);
            } else {
                item.style.transform = 'translateY(20px)';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth number counter animation for stats
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('h3');
            const endValue = parseInt(statValue.dataset.value);
            animateValue(statValue, 0, endValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Enhanced hover effects for furniture items
document.querySelectorAll('.furniture-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const bounds = item.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        item.style.transform = `
            scale(1.05)
            perspective(1000px)
            rotateX(${(mouseY - bounds.height/2) * 0.01}deg)
            rotateY(${(mouseX - bounds.width/2) * 0.01}deg)
        `;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Initialize rent buttons with modal
document.querySelectorAll('.rent-button').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.furniture-item');
        const itemName = item.querySelector('h3').textContent;
        const price = item.querySelector('.furniture-price').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'rental-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Rent ${itemName}</h3>
                <p>Price: ${price}</p>
                <form class="rental-form">
                    <div class="form-group">
                        <label>Rental Period</label>
                        <select required>
                            <option value="1">1 Month</option>
                            <option value="3">3 Months</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Delivery Date</label>
                        <input type="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Special Requirements</label>
                        <textarea placeholder="Any special requirements or notes"></textarea>
                    </div>
                    <button type="submit" class="submit-rental">Confirm Rental</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Handle form submission
        const rentalForm = modal.querySelector('.rental-form');
        rentalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your rental request! We will contact you shortly to confirm the details.';
            modal.querySelector('.modal-content').innerHTML = '';
            modal.querySelector('.modal-content').appendChild(successMessage);
            
            setTimeout(() => {
                modal.remove();
            }, 3000);
        });
    });
});

// Handle View Details button
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.furniture-item');
        const itemName = item.querySelector('h3').textContent;
        const price = item.querySelector('.furniture-price').textContent;
        
        const modal = document.createElement('div');
        modal.className = 'details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="details-content">
                    <div class="details-image">
                        <img src="${item.querySelector('img').src}" alt="${itemName}">
                    </div>
                    <div class="details-info">
                        <h3>${itemName}</h3>
                        <p class="price">${price}</p>
                        <div class="details-specs">
                            <h4>Specifications</h4>
                            <ul>
                                <li><i class="fas fa-ruler"></i> Dimensions: 80" x 36" x 34"</li>
                                <li><i class="fas fa-palette"></i> Available Colors: Gray, Beige, Navy</li>
                                <li><i class="fas fa-box"></i> Material: Premium Fabric</li>
                                <li><i class="fas fa-shield-alt"></i> Includes Damage Protection</li>
                            </ul>
                        </div>
                        <button class="rent-button">Rent Now</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Handle rent button in details modal
        modal.querySelector('.rent-button').addEventListener('click', () => {
            modal.remove();
            item.querySelector('.rent-button').click();
        });
    });
});

// Load More functionality
const loadMoreBtn = document.querySelector('.load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading new items
        setTimeout(() => {
            this.innerHTML = 'Load More <i class="fas fa-arrow-right"></i>';
            // Here you would typically load more items from a backend
            alert('More items will be loaded here from the backend.');
        }, 1500);
    });
}

// Add loading skeleton for dynamic content
function addLoadingSkeleton(container, count) {
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'furniture-item skeleton';
        container.appendChild(skeleton);
    }
}

// Remove loading skeletons
function removeLoadingSkeletons() {
    document.querySelectorAll('.skeleton').forEach(skeleton => skeleton.remove());
}

// Smooth scroll with dynamic offset based on navbar height
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top;
    const navHeight = document.querySelector('nav').offsetHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - navHeight;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        window.scrollTo(0, startPosition + progress * distance);
        if (progress < 1) {
            window.requestAnimationFrame(animation);
        }
    }

    window.requestAnimationFrame(animation);
}

// Shopping Cart Functionality
const cartBtn = document.getElementById('cartBtn');
const cartPopup = document.getElementById('cartPopup');
const closeCart = document.getElementById('closeCart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

let cart = [];

// Open cart popup
cartBtn.addEventListener('click', () => {
    cartPopup.classList.add('active');
    body.style.overflow = 'hidden';
});

// Close cart popup
closeCart.addEventListener('click', () => {
    cartPopup.classList.remove('active');
    body.style.overflow = '';
});

// Close cart when clicking outside
cartPopup.addEventListener('click', (e) => {
    if (e.target === cartPopup) {
        cartPopup.classList.remove('active');
        body.style.overflow = '';
    }
});

// Add item to cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
        }
    }
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Initialize cart
loadCart();

// Add to cart button functionality for furniture items
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const furnitureItem = e.target.closest('.furniture-item');
        const item = {
            id: parseInt(furnitureItem.dataset.id || Date.now()),
            name: furnitureItem.querySelector('h3').textContent,
            price: parseFloat(furnitureItem.querySelector('.furniture-price').textContent.replace('$', '')),
            image: furnitureItem.querySelector('img').src
        };
        addToCart(item);
    });
});
