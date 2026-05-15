// ================================================
// tech-badges.js
// Advanced Technology Badges for JobsPortal
// ================================================

/**
 * Tech Badges Manager
 * Displays beautiful technology badges with animations,
 * tooltips, and GitHub language stats integration.
 */

class TechBadgesManager {
    constructor() {
        this.badges = [
            {
                name: "HTML5",
                color: "#E34F26",
                logo: "html5",
                percentage: 33.4,
                description: "Structure & Semantics"
            },
            {
                name: "CSS3",
                color: "#1572B6",
                logo: "css3",
                percentage: 42.1,
                description: "Styling & Responsiveness"
            },
            {
                name: "JavaScript",
                color: "#F7DF1E",
                logo: "javascript",
                textColor: "#000000",
                percentage: 24.5,
                description: "Interactivity & Logic"
            },
            {
                name: "Git",
                color: "#F05032",
                logo: "git",
                description: "Version Control"
            },
            {
                name: "GitHub",
                color: "#181717",
                logo: "github",
                description: "Repository Hosting"
            }
        ];

        this.containerId = 'tech-badges';
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderBadges();
            this.addEventListeners();
            this.fetchGitHubLanguages(); // Optional: fetch real data
        });
    }

    createBadge(badge) {
        const badgeHTML = `
            <div class="tech-badge" 
                 data-tooltip="${badge.description}"
                 style="background-color: ${badge.color}; color: ${badge.textColor || '#ffffff'}">
                <img src="https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.color.replace('#', '')}?style=for-the-badge&logo=${badge.logo}&logoColor=${(badge.textColor || '#ffffff').replace('#', '')}" 
                     alt="${badge.name}" 
                     class="badge-image">
                ${badge.percentage ? 
                    `<span class="badge-percentage">${badge.percentage}%</span>` : ''}
            </div>
        `;

        return badgeHTML;
    }

    renderBadges() {
        const container = document.getElementById(this.containerId);
        
        if (!container) {
            console.warn(`Container with id "${this.containerId}" not found. Creating one.`);
            this.createFallbackContainer();
            return;
        }

        let html = `
            <div class="badges-section">
                <h3 class="badges-title">🛠️ Technologies Used</h3>
                <div class="badges-container">
        `;

        this.badges.forEach(badge => {
            html += this.createBadge(badge);
        });

        html += `
                </div>
                
                <div class="github-stats" id="github-stats">
                    <!-- Dynamic GitHub stats will be loaded here -->
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    createFallbackContainer() {
        const fallback = document.createElement('div');
        fallback.id = this.containerId;
        fallback.style.margin = '30px 0';
        
        document.body.appendChild(fallback);
        this.renderBadges();
    }

    addEventListeners() {
        // Hover animation enhancement
        const style = document.createElement('style');
        style.textContent = `
            .tech-badge {
                display: inline-flex;
                align-items: center;
                padding: 6px 12px;
                border-radius: 9999px;
                margin: 6px 8px 6px 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                position: relative;
            }
            
            .tech-badge:hover {
                transform: translateY(-4px) scale(1.05);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            
            .badges-title {
                text-align: center;
                margin-bottom: 16px;
                color: #333;
                font-size: 1.4rem;
            }
            
            .badges-container {
                text-align: center;
            }
            
            .badge-percentage {
                margin-left: 8px;
                font-size: 0.85rem;
                font-weight: 600;
                opacity: 0.9;
            }
            
            .github-stats {
                margin-top: 24px;
                text-align: center;
                font-size: 0.95rem;
            }
        `;
        document.head.appendChild(style);
    }

    async fetchGitHubLanguages() {
        const statsContainer = document.getElementById('github-stats');
        if (!statsContainer) return;

        try {
            // Using GitHub API (public data, no token needed)
            const response = await fetch('https://api.github.com/repos/soft-syntax/Jobsportal/languages');
            
            if (!response.ok) throw new Error('Failed to fetch');

            const languages = await response.json();
            const total = Object.values(languages).reduce((a, b) => a + b, 0);

            let statsHTML = `<p><strong>Repository Language Breakdown:</strong></p><div class="lang-bars">`;

            for (const [lang, bytes] of Object.entries(languages)) {
                const percent = ((bytes / total) * 100).toFixed(1);
                statsHTML += `
                    <div style="margin: 8px 0;">
                        <span>${lang}:</span>
                        <span style="float: right; font-weight: 600;">${percent}%</span>
                    </div>
                `;
            }

            statsHTML += `</div>`;
            statsContainer.innerHTML = statsHTML;

        } catch (error) {
            console.log("Could not fetch live GitHub stats:", error);
            // Fallback static stats
            statsContainer.innerHTML = `
                <p><strong>Built with:</strong> HTML • CSS • JavaScript</p>
            `;
        }
    }

    // Public method to add new badge dynamically
    addBadge(newBadge) {
        this.badges.push(newBadge);
        this.renderBadges();
    }
}

// Initialize the badges
const techBadges = new TechBadgesManager();

// Export for module usage (if you switch to modules later)
window.TechBadgesManager = TechBadgesManager;
