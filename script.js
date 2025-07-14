// Datos de la malla curricular
const courses = [
    // --- 1er Semestre ---
    { id: 1, name: "Nivelación Matemática", semester: 1, credits: 4, category: "Básicas y de Empleabilidad" },
    { id: 2, name: "Fundamentos de Economía", semester: 1, credits: 4, category: "Básicas y de Empleabilidad" },
    { id: 3, name: "Habilidades Comunicacionales para el Trabajo", semester: 1, credits: 4, category: "Formación Valórica" },
    { id: 4, name: "Introducción al Marketing", semester: 1, credits: 6, category: "Especialidad" },
    { id: 5, name: "Fundamentos de Ventas", semester: 1, credits: 4, category: "Especialidad" },

    // --- 2do Semestre ---
    { id: 6, name: "Álgebra", semester: 2, credits: 4, category: "Básicas y de Empleabilidad" },
    { id: 7, name: "Ética para el Trabajo", semester: 2, credits: 4, category: "Formación Valórica" },
    { id: 8, name: "Plan de Marketing", semester: 2, credits: 6, category: "Especialidad" },
    { id: 9, name: "Medios & Audiencias", semester: 2, credits: 6, category: "Especialidad" },
    { id: 10, name: "Herramientas Tecnológicas I", semester: 2, credits: 4, category: "Especialidad" },

    // --- (Agrega los demás semestres aquí siguiendo el mismo formato) ---
    // Ejemplo para Semestre 3:
    { id: 11, name: "Estadística Descriptiva", semester: 3, credits: 4, category: "Básicas y de Empleabilidad" },
    { id: 12, name: "Fundamentos de Gestión de Personas", semester: 3, credits: 4, category: "Básicas y de Empleabilidad" },
    { id: 13, name: "Branding", semester: 3, credits: 6, category: "Especialidad" },
    { id: 14, name: "Investigación de Mercados", semester: 3, credits: 6, category: "Especialidad" },
    { id: 15, name: "Herramientas de Marketing Digital", semester: 3, credits: 4, category: "Especialidad" }
];

// Función para mostrar las asignaturas
function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course ' + course.category.toLowerCase().replace(/\s+/g, '-');
        courseElement.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Semestre:</strong> ${course.semester}</p>
            <p><strong>Créditos:</strong> ${course.credits}</p>
            <p><strong>Categoría:</strong> ${course.category}</p>
        `;
        grid.appendChild(courseElement);
    });
}

// Buscador
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const courses = document.querySelectorAll('.course');

    courses.forEach(course => {
        const name = course.querySelector('h3').textContent.toLowerCase();
        course.classList.toggle('hidden', !name.includes(searchTerm));
    });
});

// Filtro por semestre
document.getElementById('semester-filter').addEventListener('change', (e) => {
    const semester = e.target.value;
    const courses = document.querySelectorAll('.course');

    courses.forEach(course => {
        const courseSemester = course.querySelector('p:nth-of-type(1)').textContent.split(' ')[1];
        course.classList.toggle('hidden', semester !== 'all' && courseSemester !== semester);
    });
});

// Botón mostrar/ocultar
document.getElementById('toggle-all').addEventListener('click', () => {
    const courses = document.querySelectorAll('.course');
    const allHidden = Array.from(courses).every(c => c.classList.contains('hidden'));

    courses.forEach(course => {
        course.classList.toggle('hidden', !allHidden);
    });
});

// Inicializar
renderGrid();