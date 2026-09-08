/* ============================================================
   CampusFind - forms.js
   Form validation, submission, file preview, contact form,
   login / register demo authentication
   ============================================================ */

/* ── Generic Validator ─────────────────────────────────────── */
function validateField(input, rules = {}) {
    const val = (input.value || '').trim();
    let error = '';

    if (rules.required && !val) { error = 'This field is required.'; }
    else if (rules.email && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { error = 'Enter a valid email address.'; }
    else if (rules.minLen && val.length < rules.minLen) { error = `Minimum ${rules.minLen} characters required.`; }
    else if (rules.maxLen && val.length > rules.maxLen) { error = `Maximum ${rules.maxLen} characters allowed.`; }
    else if (rules.phone && val && !/^[\d\s\+\-\(\)]{7,15}$/.test(val)) { error = 'Enter a valid phone number.'; }
    else if (rules.match && val !== rules.match) { error = 'Passwords do not match.'; }

    const errorEl = input.closest('.form-group')?.querySelector('.form-error');
    input.classList.toggle('error', !!error);
    if (errorEl) { errorEl.textContent = error; errorEl.classList.toggle('visible', !!error); }
    return !error;
}

function validateForm(formEl, fieldRules) {
    let valid = true;
    Object.entries(fieldRules).forEach(([id, rules]) => {
        const input = formEl.querySelector(`#${id}`);
        if (input && !validateField(input, rules)) valid = false;
    });
    return valid;
}

/* ── File Image Preview ────────────────────────────────────── */
function initFileUpload(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;

    input.addEventListener('change', () => {
        preview.innerHTML = '';
        Array.from(input.files).slice(0, 3).forEach((file, index) => {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'file-preview-item';
                div.innerHTML = `
                    <img src="${e.target.result}" alt="Preview ${index + 1}">
                    <button type="button" class="preview-remove" title="Remove" onclick="this.parentElement.remove()">✕</button>
                `;
                preview.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    });
}

/* ── Report Lost / Found form submission ───────────────────── */
let reportRedirectTimer = null;

function initReportForm(formId, type) {
    const form = document.getElementById(formId);
    if (!form) return;

    initFileUpload('item-image', 'image-preview');

    // Auto-fill contact details if user is logged in
    const user = getCurrentUser();
    if (user) {
        const nameInput = form.querySelector('#contact-name');
        const emailInput = form.querySelector('#contact-email');
        if (nameInput && !nameInput.value) nameInput.value = user.name || '';
        if (emailInput && !emailInput.value) emailInput.value = user.email || '';
    }

    // Set max date to today so future dates cannot be selected
    const dateInput = form.querySelector('#item-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('max', today);
    }

    const fieldRules = {
        'item-name': { required: true, minLen: 2 },
        'item-category': { required: true },
        'item-desc': { required: true, minLen: 10 },
        'item-location': { required: true },
        'item-date': { required: true },
        'contact-name': { required: true, minLen: 2 },
        'contact-email': { required: true, email: true }
    };

    // Live validation
    Object.keys(fieldRules).forEach(id => {
        const el = form.querySelector(`#${id}`);
        if (el) {
            el.addEventListener('blur', () => validateField(el, fieldRules[id]));
            el.addEventListener('input', () => {
                if (el.classList.contains('error')) validateField(el, fieldRules[id]);
            });
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(form, fieldRules)) {
            showToast('Validation Error', 'Please fill in all required fields correctly.', 'error');
            form.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const item = {
            id: (type === 'lost' ? 'L_' : 'F_') + Date.now(),
            type,
            name: form.querySelector('#item-name')?.value.trim(),
            category: form.querySelector('#item-category')?.value,
            description: form.querySelector('#item-desc')?.value.trim(),
            location: form.querySelector('#item-location')?.value.trim(),
            date: form.querySelector('#item-date')?.value,
            time: form.querySelector('#item-time')?.value || '',
            postedBy: form.querySelector('#contact-name')?.value.trim(),
            contactEmail: form.querySelector('#contact-email')?.value.trim(),
            contactPhone: form.querySelector('#contact-phone')?.value.trim() || '',
            additionalInfo: form.querySelector('#additional-info')?.value.trim() || '',
            status: type,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        const key = `${type}_items`;
        const existing = LS.get(key) || [];
        existing.unshift(item);
        LS.set(key, existing);

        // Show success modal
        openModal('success-modal');

        // Navigate after delay
        if (reportRedirectTimer) clearTimeout(reportRedirectTimer);
        reportRedirectTimer = setTimeout(() => {
            closeModal('success-modal');
            window.location.href = type === 'lost' ? 'lost-items.html' : 'found-items.html';
        }, 3500);
    });

    // Reset button
    const resetBtn = form.querySelector('[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(el => {
                el.classList.remove('error');
            });
            form.querySelectorAll('.form-error').forEach(el => {
                el.classList.remove('visible');
                el.textContent = '';
            });
            document.getElementById('image-preview')?.replaceChildren();
        });
    }
}

/* ── Contact Form ──────────────────────────────────────────── */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const rules = {
        'contact-name': { required: true, minLen: 2 },
        'contact-email': { required: true, email: true },
        'contact-subject': { required: true },
        'contact-message': { required: true, minLen: 20 }
    };

    Object.keys(rules).forEach(id => {
        const el = form.querySelector(`#${id}`);
        if (el) el.addEventListener('blur', () => validateField(el, rules[id]));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(form, rules)) {
            showToast('Validation Error', 'Please fill in all required fields.', 'error');
            return;
        }
        showToast('Message Sent!', 'We have received your message and will reply within 24 hours.', 'success', 5000);
        form.reset();
    });
}

/* ── FAQ Accordion ─────────────────────────────────────────── */
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isOpen = btn.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-question.active').forEach(b => {
                b.classList.remove('active');
                b.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
            });

            if (!isOpen) {
                btn.classList.add('active');
                answer.classList.add('open');
            }
        });
    });
}

/* ── Login Form ────────────────────────────────────────────── */
function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const rules = {
        'login-email': { required: true, email: true },
        'login-password': { required: true, minLen: 6 }
    };

    Object.keys(rules).forEach(id => {
        const el = form.querySelector(`#${id}`);
        if (el) el.addEventListener('blur', () => validateField(el, rules[id]));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(form, rules)) {
            showToast('Login Failed', 'Please check your credentials.', 'error');
            return;
        }

        const email = form.querySelector('#login-email')?.value.trim();
        const remember = form.querySelector('#remember-me')?.checked;

        // Demo: accept any valid email/password
        const user = {
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            email,
            studentId: 'STD-' + Math.floor(10000 + Math.random() * 90000),
            joinedAt: new Date().toISOString()
        };

        setCurrentUser(user);
        showToast('Welcome Back!', `Logged in as ${user.name}`, 'success');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
    });

    // Demo login
    const demoBtn = document.getElementById('btn-demo-login');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            const demoUser = {
                name: 'Demo Student',
                email: 'demo@student.uni.edu',
                studentId: 'STD-20220001',
                joinedAt: new Date().toISOString()
            };
            setCurrentUser(demoUser);
            showToast('Demo Login', 'Logged in with demo account.', 'info');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
        });
    }

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const inp = btn.previousElementSibling;
            if (!inp) return;
            inp.type = inp.type === 'password' ? 'text' : 'password';
            btn.textContent = inp.type === 'password' ? '👁️' : '🙈';
        });
    });
}

/* ── Register Form ─────────────────────────────────────────── */
function initRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    const rules = {
        'reg-name': { required: true, minLen: 2 },
        'reg-studentid': { required: true, minLen: 4 },
        'reg-email': { required: true, email: true },
        'reg-password': { required: true, minLen: 8 },
        'reg-confirm': { required: true }
    };

    Object.keys(rules).forEach(id => {
        const el = form.querySelector(`#${id}`);
        if (el) el.addEventListener('blur', () => {
            if (id === 'reg-confirm') {
                validateField(el, { required: true, match: form.querySelector('#reg-password')?.value });
            } else {
                validateField(el, rules[id]);
            }
        });
    });

    // Toggle password
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const inp = btn.previousElementSibling;
            if (!inp) return;
            inp.type = inp.type === 'password' ? 'text' : 'password';
            btn.textContent = inp.type === 'password' ? '👁️' : '🙈';
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = validateForm(form, rules);

        const passEl = form.querySelector('#reg-password');
        const confirmEl = form.querySelector('#reg-confirm');
        if (confirmEl && passEl && confirmEl.value !== passEl.value) {
            validateField(confirmEl, { required: true, match: passEl.value });
            valid = false;
        }

        if (!valid) { showToast('Validation Error', 'Please fix the errors and try again.', 'error'); return; }

        const user = {
            name: form.querySelector('#reg-name')?.value.trim(),
            studentId: form.querySelector('#reg-studentid')?.value.trim(),
            email: form.querySelector('#reg-email')?.value.trim(),
            joinedAt: new Date().toISOString()
        };

        setCurrentUser(user);
        showToast('Account Created!', `Welcome to CampusFind, ${user.name}!`, 'success');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
    });
}

/* ── Password strength indicator ──────────────────────────── */
function initPasswordStrength() {
    const passInput = document.getElementById('reg-password');
    const strengthBar = document.getElementById('password-strength');
    if (!passInput || !strengthBar) return;

    passInput.addEventListener('input', () => {
        const val = passInput.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^a-zA-Z0-9]/.test(val)) score++;

        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['', '#DC2626', '#F59E0B', '#2563EB', '#16A34A'];
        strengthBar.style.width = `${score * 25}%`;
        strengthBar.style.background = colors[score] || '#E2E8F0';
        const hint = document.getElementById('strength-hint');
        if (hint) hint.textContent = labels[score] || '';
    });
}

/* ── Home Page Auth Modals ─────────────────────────────────── */
function initAuthModals() {
    const loginForm = document.getElementById('modal-login-form');
    const registerForm = document.getElementById('modal-register-form');

    // Modal switching links
    document.addEventListener('click', (e) => {
        const switchBtn = e.target.closest('[data-switch-to]');
        if (switchBtn) {
            e.preventDefault();
            const targetId = switchBtn.getAttribute('data-switch-to');
            const currentModal = switchBtn.closest('.modal-backdrop');
            if (currentModal) {
                closeModal(currentModal.id);
            }
            setTimeout(() => {
                openModal(targetId);
            }, 150);
        }
    });

    // Modal Login
    if (loginForm) {
        const rules = {
            'modal-login-email': { required: true, email: true },
            'modal-login-password': { required: true, minLen: 6 }
        };

        Object.keys(rules).forEach(id => {
            const el = loginForm.querySelector(`#${id}`);
            if (el) {
                el.addEventListener('blur', () => validateField(el, rules[id]));
                el.addEventListener('input', () => {
                    if (el.classList.contains('error')) validateField(el, rules[id]);
                });
            }
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(loginForm, rules)) {
                showToast('Login Failed', 'Please enter a valid email and password.', 'error');
                return;
            }

            const email = loginForm.querySelector('#modal-login-email')?.value.trim();
            const user = {
                name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                email,
                studentId: 'STD-' + Math.floor(10000 + Math.random() * 90000),
                joinedAt: new Date().toISOString()
            };

            setCurrentUser(user);
            closeModal('login-modal');
            updateNavAuth();
            showToast('Welcome Back!', `Logged in as ${user.name}`, 'success', 3500);
            loginForm.reset();
        });

        // Modal Demo Login
        const demoBtn = document.getElementById('btn-modal-demo-login');
        if (demoBtn) {
            demoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const demoUser = {
                    name: 'Demo Student',
                    email: 'demo@student.uni.edu',
                    studentId: 'STD-20220001',
                    joinedAt: new Date().toISOString()
                };
                setCurrentUser(demoUser);
                closeModal('login-modal');
                updateNavAuth();
                showToast('Demo Login', 'Logged in as Demo Student.', 'info', 3500);
            });
        }
    }

    // Modal Register
    if (registerForm) {
        const rules = {
            'modal-reg-name': { required: true, minLen: 2 },
            'modal-reg-studentid': { required: true, minLen: 4 },
            'modal-reg-email': { required: true, email: true },
            'modal-reg-password': { required: true, minLen: 8 },
            'modal-reg-confirm': { required: true }
        };

        Object.keys(rules).forEach(id => {
            const el = registerForm.querySelector(`#${id}`);
            if (el) {
                el.addEventListener('blur', () => {
                    if (id === 'modal-reg-confirm') {
                        validateField(el, { required: true, match: registerForm.querySelector('#modal-reg-password')?.value });
                    } else {
                        validateField(el, rules[id]);
                    }
                });
                el.addEventListener('input', () => {
                    if (el.classList.contains('error')) {
                        if (id === 'modal-reg-confirm') {
                            validateField(el, { required: true, match: registerForm.querySelector('#modal-reg-password')?.value });
                        } else {
                            validateField(el, rules[id]);
                        }
                    }
                });
            }
        });

        // Modal Password strength indicator
        const passInput = registerForm.querySelector('#modal-reg-password');
        const strengthBar = registerForm.querySelector('#modal-password-strength');
        const hint = registerForm.querySelector('#modal-strength-hint');
        if (passInput && strengthBar) {
            passInput.addEventListener('input', () => {
                const val = passInput.value;
                let score = 0;
                if (val.length >= 8) score++;
                if (/[A-Z]/.test(val)) score++;
                if (/[0-9]/.test(val)) score++;
                if (/[^a-zA-Z0-9]/.test(val)) score++;

                const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
                const colors = ['', '#DC2626', '#F59E0B', '#2563EB', '#16A34A'];
                strengthBar.style.width = `${score * 25}%`;
                strengthBar.style.background = colors[score] || 'var(--border)';
                if (hint) hint.textContent = labels[score] || '';
            });
        }

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = validateForm(registerForm, rules);

            const passEl = registerForm.querySelector('#modal-reg-password');
            const confirmEl = registerForm.querySelector('#modal-reg-confirm');
            if (confirmEl && passEl && confirmEl.value !== passEl.value) {
                validateField(confirmEl, { required: true, match: passEl.value });
                valid = false;
            }

            if (!valid) {
                showToast('Validation Error', 'Please check the form and fix the highlighted fields.', 'error');
                return;
            }

            const user = {
                name: registerForm.querySelector('#modal-reg-name')?.value.trim(),
                studentId: registerForm.querySelector('#modal-reg-studentid')?.value.trim(),
                email: registerForm.querySelector('#modal-reg-email')?.value.trim(),
                joinedAt: new Date().toISOString()
            };

            setCurrentUser(user);
            closeModal('register-modal');
            updateNavAuth();
            showToast('Account Created!', `Welcome to CampusFind, ${user.name}!`, 'success', 3500);
            registerForm.reset();
        });
    }
}

/* ── DOMContentLoaded ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initReportForm('report-lost-form', 'lost');
    initReportForm('report-found-form', 'found');
    initContactForm();
    initFAQ();
    initLoginForm();
    initRegisterForm();
    initPasswordStrength();
    initAuthModals();
});
