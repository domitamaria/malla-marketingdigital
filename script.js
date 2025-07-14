// Datos COMPLETOS de la malla (8 semestres)
const coursesBySemester = {
    1: [
        { id: '1-1', name: "Introducción al Marketing" },
        { id: '1-2', name: "Fundamentos de Ventas" },
        { id: '1-3', name: "Herramientas Tecnológicas I" },
        { id: '1-4', name: "Fundamentos de Economía" },
        { id: '1-5', name: "Nivelación de Matemáticas" },
        { id: '1-6', name: "Habilidades de Comunicación" }
    ],
    2: [
        { id: '2-1', name: "Plan de Marketing" },
        { id: '2-2', name: "Sitios Web y Landing Pages" },
        { id: '2-3', name: "Herramientas Tecnológicas II" },
        { id: '2-4', name: "Fundamentos de Gestión de Personas", requires: ['1-4'] },
        { id: '2-5', name: "Fundamentos de Finanzas y Presupuestos" },
        { id: '2-6', name: "Álgebra", requires: ['1-5'] }
    ],
    3: [
        { id: '3-1', name: "Branding" },
        { id: '3-2', name: "Storytelling" },
        { id: '3-3', name: "Herramientas de Marketing Digital" },
        { id: '3-4', name: "Propuesta de Valor y Precios" },
        { id: '3-5', name: "Herramientas Tecnológicas III", requires: ['2-3'] },
        { id: '3-6', name: "Estadística Predictiva", requires: ['2-6'] },
        { id: '3-7', name: "Fundamentos de Antropología" }
    ],
    4: [
        { id: '4-1', name: "Investigación de Mercados", requires: ['3-6'] },
        { id: '4-2', name: "Social Media Marketing" },
        { id: '4-3', name: "Taller Aplicado I de Marketing", requires: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7'] },
        { id: '4-4', name: "Negociación" },
        { id: '4-5', name: "Ética para el Trabajo", requires: ['3-7'] },
        { id: '4-6', name: "Formación Cristiana" },
        { id: '4-7', name: "Electivo Competencias Globales" }
    ],
    5: [
        { id: '5-1', name: "Medios y Audiencias" },
        { id: '5-2', name: "Inbound Marketing I" },
        { id: '5-3', name: "Comunicaciones Integradas de Marketing" },
        { id: '5-4', name: "Key Account Management" },
        { id: '5-5', name: "Formación Complementaria" }
    ],
    6: [
        { id: '6-1', name: "Diseño UX/UI" },
        { id: '6-2', name: "Inbound Marketing II", requires: ['5-2'] },
        { id: '6-3', name: "Taller Aplicado II", requires: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '5-1', '5-2', '5-3', '5-4', '5-5'] },
        { id: '6-4', name: "Big Data e Inteligencia de Negocios", requires: ['3-5'] },
        { id: '6-5', name: "Cadena de Suministros" }
    ],
    7: [
        { id: '7-1', name: "Productos y Servicios" },
        { id: '7-2', name: "Inbound Marketing III", requires: ['6-2'] },
        { id: '7-3', name: "Canales de Distribución & E-commerce" },
        { id: '7-4', name: "Gestión de Equipos de Venta" },
        { id: '7-5', name: "Ética Profesional", requires: ['4-5'] },
        { id: '7-6', name: "Formación Complementaria" }
    ],
    8: [
        { id: '8-1', name: "Taller Aplicado Final", requires: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '5-1', '5-2', '5-3', '5-4', '5-5', '6-1', '6-2', '6-3', '6-4', '6-5', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6'] },
        { id: '8-2', name: "Habilidades Comunicacionales para el Trabajo", requires: ['1-6'] },
        { id: '8-3', name: "Electivo Competencias Globales" }
    ]
};

// Funciones principales
function renderSemesters() {
    const container = document.getElementById('semesters-container');
    container.innerHTML = '';

    for (const [semester, courses] of Object.entries(coursesBySemester)) {
        const semesterEl = document.createElement('div');
        semesterEl.className = 'semester';
        semesterEl.innerHTML = `<h2>Semestre ${semester}</h2>`;
        
        courses.forEach(course => {
            const courseEl = document.createElement('div');
            courseEl.className = 'course';
            courseEl.dataset.id = course.id;
            courseEl.innerHTML = `<h3>${course.name}</h3>`;
            semesterEl.appendChild(courseEl);
        });
        
        container.appendChild(semesterEl);
    }
    
    updateLockedStates();
    loadCompletedCourses();
}

function findCourseById(id) {
    for (const semester in coursesBySemester) {
        const course = coursesBySemester[semester].find(c => c.id === id);
        if (course) return course;
    }
    return null;
}

function updateLockedStates() {
    document.querySelectorAll('.course').forEach(courseEl => {
        const courseId = courseEl.dataset.id;
        const course = findCourseById(courseId);
        
        if (course?.requires) {
            const allCompleted = course.requires.every(reqId => {
                const reqEl = document.querySelector(`.course[data-id="${reqId}"]`);
                return reqEl?.classList.contains('completed');
            });
            
            courseEl.classList.toggle('locked', !allCompleted);
        }
    });
}

// Tachado interactivo
document.addEventListener('click', (e) => {
    const courseEl = e.target.closest('.course');
    if (!courseEl || courseEl.classList.contains('locked')) return;
    
    courseEl.classList.toggle('completed');
    saveCompletedState(courseEl);
    updateLockedStates();
});

// Persistencia
function saveCompletedState(courseEl) {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
    completedCourses[courseEl.dataset.id] = courseEl.classList.contains('completed');
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
}

function loadCompletedCourses() {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
    Object.entries(completedCourses).forEach(([id, completed]) => {
        const courseEl = document.querySelector(`.course[data-id="${id}"]`);
        if (courseEl && completed) courseEl.classList.add('completed');
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', renderSemesters);