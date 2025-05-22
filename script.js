// Theme Toggle
const themeToggle = document.getElementById('theme-toggle')
const html = document.documentElement

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme')
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (savedTheme) {
  html.setAttribute('data-theme', savedTheme)
  updateThemeIcon(savedTheme)
} else if (systemPrefersDark) {
  html.setAttribute('data-theme', 'dark')
  updateThemeIcon('dark')
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme')
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  
  html.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  updateThemeIcon(newTheme)
})

// Update theme icon
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i')
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'
}

// Experience Slider
const track = document.querySelector('.experience-track')
const prevButton = document.querySelector('.slider-nav.prev')
const nextButton = document.querySelector('.slider-nav.next')
let currentPosition = 0
const cardWidth = document.querySelector('.experience-card').offsetWidth
const gap = 30 // Gap between cards

function updateSliderPosition() {
  track.style.transform = `translateX(${currentPosition}px)`
}

prevButton.addEventListener('click', () => {
  const maxPosition = 0
  currentPosition = Math.min(currentPosition + cardWidth + gap, maxPosition)
  updateSliderPosition()
})

nextButton.addEventListener('click', () => {
  const minPosition = -(cardWidth + gap) * (track.children.length - 3)
  currentPosition = Math.max(currentPosition - cardWidth - gap, minPosition)
  updateSliderPosition()
})

// Update slider on window resize
window.addEventListener('resize', () => {
  const newCardWidth = document.querySelector('.experience-card').offsetWidth
  const scale = newCardWidth / cardWidth
  currentPosition = currentPosition * scale
  updateSliderPosition()
})

// Handle project image loading
document.querySelectorAll('.project-image img').forEach(img => {
  img.addEventListener('load', function() {
    this.classList.add('loaded')
  })

  img.addEventListener('error', function() {
    // Fallback to a placeholder if image fails to load
    this.src = 'https://via.placeholder.com/800x600?text=Project+Preview'
    this.classList.add('loaded')
  })
}) 