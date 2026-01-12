const app = {
    elements: {
        hero: document.querySelector('.hero'),
        solverApp: document.getElementById('solver-app'),
        video: document.getElementById('video'),
        captureBtn: document.getElementById('capture'),
        solutionView: document.getElementById('solution-view'),
        cameraView: document.getElementById('camera-view'),
        stepsContainer: document.getElementById('steps-container'),
        detectedMath: document.getElementById('detected-math')
    },

    init() {
        console.log("StudyMithraa initialized");
        this.elements.captureBtn.addEventListener('click', () => {
            // Simulate capturing and solving
            this.solveProblem("2x + 5 = 15");
        });

        // Add listeners for dummy buttons
        document.querySelectorAll('.btn-outline, .btn-accent').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showToast("Coming Soon! We are finalizing the app store release. 🚀");
            });
        });

        this.initScrollEffects();
    },

    initScrollEffects() {
        const videos = document.querySelectorAll('.bg-video');
        const sections = [
            document.querySelector('.hero'),
            document.getElementById('features'),
            document.getElementById('how-it-works'),
            document.getElementById('solver-app')
        ];

        window.addEventListener('scroll', () => {
            let currentSectionIndex = 0;
            const scrollPos = window.scrollY + window.innerHeight / 3;

            sections.forEach((section, index) => {
                if (section && scrollPos > section.offsetTop) {
                    currentSectionIndex = index;
                }
            });

            videos.forEach((video, index) => {
                if (index === currentSectionIndex) {
                    video.classList.add('active');
                    if (video.paused) video.play();
                } else {
                    video.classList.remove('active');
                }
            });
        });
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            z-index: 1000;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            white-space: nowrap;
        `;
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        // Remove
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    async showScanner() {
        this.elements.hero.classList.add('hidden');
        this.elements.solverApp.classList.remove('hidden');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            this.elements.video.srcObject = stream;
        } catch (err) {
            console.error("Camera access failed", err);
            // Non-blocking fallback or toast could go here
        }
    },

    solveProblem(math) {
        // Simplified solver logic for demonstration
        // In a real app, this would use an engine or API
        const solutions = {
            "2x + 5 = 15": [
                { title: "Subtract 5 from both sides", result: "2x = 10" },
                { title: "Divide both sides by 2", result: "x = 5" }
            ],
            "x^2 = 9": [
                { title: "Take the square root of both sides", result: "x = ±√9" },
                { title: "Final result", result: "x = 3 or x = -3" }
            ]
        };

        const steps = solutions[math] || [
            { title: "Analyzing problem...", result: "Calculation in progress" },
            { title: "Result found", result: "10" }
        ];

        this.renderSteps(steps);
        this.elements.cameraView.classList.add('hidden');
        this.elements.solutionView.classList.remove('hidden');
    },

    renderSteps(steps) {
        this.elements.stepsContainer.innerHTML = steps.map((step, index) => `
            <div class="step-card animate-fade-in" style="animation-delay: ${index * 0.05}s">
                <div class="step-num">${index + 1}</div>
                <div class="step-content">
                    <h4>${step.title}</h4>
                    <div class="step-math">${step.result}</div>
                </div>
            </div>
        `).join('');
    }
};

window.addEventListener('DOMContentLoaded', () => app.init());

