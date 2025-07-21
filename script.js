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

const yearsContainer = document.getElementById('years-container');

function renderCurriculum() {
  yearsContainer.innerHTML = '';
  const totalSemesters = Object.keys(coursesBySemester).length;
  const totalYears = Math.ceil(totalSemesters / 2);

  for (let y = 1; y <= totalYears; y++) {
    const yearRow = document.createElement('div');
    yearRow.classList.add('year-row');

    const yearContainer = document.createElement('div');
    yearContainer.classList.add('year-container');

    const yearDiv = document.createElement('div');
    yearDiv.classList.add('year-column');

    const yearTitle = document.createElement('h2');
    yearTitle.textContent = `Año ${y}`;
    yearDiv.appendChild(yearTitle);

    const semestersDiv = document.createElement('div');
    semestersDiv.classList.add('semesters-container');

    // Semestres en ese año (dos semestres por año)
    for (let s = 1; s <= 2; s++) {
      const semesterNumber = (y - 1) * 2 + s;
      const semesterCourses = coursesBySemester[semesterNumber];

      if (!semesterCourses) continue;

      const semesterDiv = document.createElement('div');
      semesterDiv.classList.add('semester-block');

      const semesterTitle = document.createElement('h3');
      semesterTitle.textContent = `Semestre ${semesterNumber}`;
      semesterDiv.appendChild(semesterTitle);

      semesterCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-card');
        courseDiv.textContent = course.name;
        courseDiv.dataset.id = course.id;

        if (course.requires && course.requires.length > 0) {
          const prereqMet = course.requires.every(reqId => {
            const completed = localStorage.getItem(`course-completed-${reqId}`);
            return completed === 'true';
          });
          if (!prereqMet) {
            courseDiv.classList.add('locked');
          }
        }

        const completed = localStorage.getItem(`course-completed-${course.id}`);
        if (completed === 'true') {
          courseDiv.classList.add('completed');
        }

        courseDiv.addEventListener('click', () => {
          if (courseDiv.classList.contains('locked')) return;

          courseDiv.classList.toggle('completed');
          const isCompleted = courseDiv.classList.contains('completed');
          localStorage.setItem(`course-completed-${course.id}`, isCompleted ? 'true' : 'false');
          renderCurriculum();
        });

        semesterDiv.appendChild(courseDiv);
      });

      semestersDiv.appendChild(semesterDiv);
    }

    yearDiv.appendChild(semestersDiv);
    yearContainer.appendChild(yearDiv);
    yearRow.appendChild(yearContainer);
    yearsContainer.appendChild(yearRow);
  }
}

document.addEventListener('DOMContentLoaded', renderCurriculum);
