const coursesBySemester = {
  1: [
    { id: '1-1', name: "Fundamentos de economía", credits: 8 },
    { id: '1-2', name: "Fundamentos de ventas", credits: 8 },
    { id: '1-3', name: "Habilidades de comunicación", credits: 8 },
    { id: '1-4', name: "Herramientas tecnológicas I", credits: 6 },
    { id: '1-5', name: "Introducción al marketing", credits: 8 },
    { id: '1-6', name: "Nivelación matemática", credits: 12 }
  ],
  2: [
    { id: '2-1', name: "Fundamentos de finanzas y presupuestos", credits: 8 },
    { id: '2-2', name: "Fundamentos de gestión de personas", credits: 8 },
    { id: '2-3', name: "Herramientas tecnológicas II", credits: 6, requires: ['1-4'] },
    { id: '2-4', name: "Plan de marketing", credits: 8, requires: ['1-5'] },
    { id: '2-5', name: "Sitios web y landing pages", credits: 8 },
    { id: '2-6', name: "Álgebra", credits: 10, requires: ['1-6'] }
  ],
  3: [
    { id: '3-1', name: "Branding", credits: 4, requires: ['2-4'] },
    { id: '3-2', name: "Estadística descriptiva", credits: 8 },
    { id: '3-3', name: "Fundamentos de antropología", credits: 4 },
    { id: '3-4', name: "Herramientas de marketing digital", credits: 8, requires: ['2-4'] },
    { id: '3-5', name: "Herramientas tecnológicas III", credits: 8, requires: ['2-3'] },
    { id: '3-6', name: "Propuesta de valor y precios", credits: 8, requires: ['2-4'] },
    { id: '3-7', name: "Storytelling", credits: 8 }
  ],
  4: [
    { id: '4-1', name: "Optativo competencias globales", credits: 0 },
    { id: '4-2', name: "Doctrina social de la iglesia", credits: 4 },
    { id: '4-3', name: "Investigación de mercados", credits: 8, requires: ['3-2'] },
    { id: '4-4', name: "Negociación", credits: 8 },
    { id: '4-5', name: "Social media marketing", credits: 8, requires: ['3-4'] },
    { id: '4-6', name: "Taller aplicado I", credits: 12, requires: ['3-6'] },
    { id: '4-7', name: "Ética para el trabajo", credits: 4 }
  ],
  5: [
    { id: '5-1', name: "Optativo competencias globales", credits: 0 },
    { id: '5-2', name: "Formación complementaria", credits: 0 },
    { id: '5-3', name: "Comunicaciones integradas de marketing", credits: 8, requires: ['3-1'] },
    { id: '5-4', name: "Inbound marketing I", credits: 8, requires: ['3-4'] },
    { id: '5-5', name: "Key account management", credits: 8 },
    { id: '5-6', name: "Medios & audiencias", credits: 8 }
  ],
  6: [
    { id: '6-1', name: "Optativo competencias globales", credits: 0 },
    { id: '6-2', name: "Formación complementaria", credits: 0 },
    { id: '6-3', name: "Big data e inteligencias de negocios", credits: 12 },
    { id: '6-4', name: "Cadena de suministros", credits: 8 },
    { id: '6-5', name: "Diseño UX/UI", credits: 8, requires: ['2-5'] },
    { id: '6-6', name: "Inbound marketing II", credits: 8, requires: ['5-4'] },
    { id: '6-7', name: "Taller aplicado II", credits: 20, requires: ['4-6'] }
  ],
  7: [
    { id: '7-1', name: "Optativo competencias globales", credits: 0 },
    { id: '7-2', name: "Formación complementaria", credits: 0 },
    { id: '7-3', name: "Canales de distribución & e-commerce", credits: 8, requires: ['5-5'] },
    { id: '7-4', name: "Gestión de equipos de venta", credits: 8 },
    { id: '7-5', name: "Inbound III", credits: 8, requires: ['6-6'] },
    { id: '7-6', name: "Productos y servicios", credits: 8 },
    { id: '7-7', name: "Ética profesional", credits: 4 }
  ],
  8: [
    { id: '8-1', name: "Optativo competencias globales", credits: 0 },
    { id: '8-2', name: "Formación complementaria", credits: 0 },
    { id: '8-3', name: "Habilidades comunicacionales para el trabajo", credits: 8 },
    { id: '8-4', name: "Taller aplicado III", credits: 30, requires: ['6-7'] }
  ]
};

const totalCredits = 380;
const yearsContainer = document.getElementById('years-container');
const creditCounter = document.getElementById('credit-counter');
const averageGrade = document.getElementById('average-grade');
let chart;

function calculateCompletedCredits() {
  return Object.values(coursesBySemester).flat().reduce((sum, course) => {
    return sum + (localStorage.getItem(`course-completed-${course.id}`) === 'true' ? course.credits : 0);
  }, 0);
}

function calculateWeightedAverage() {
  let totalWeighted = 0;
  let totalCredited = 0;

  Object.values(coursesBySemester).flat().forEach(course => {
    const completed = localStorage.getItem(`course-completed-${course.id}`) === 'true';
    const grade = localStorage.getItem(`course-grade-${course.id}`);
    const numericGrade = parseFloat(grade);
    if (completed && grade && !isNaN(numericGrade)) {
      totalWeighted += numericGrade * course.credits;
      totalCredited += course.credits;
    }
  });

  return totalCredited ? (totalWeighted / totalCredited).toFixed(2) : '-';
}

function renderCurriculum() {
  yearsContainer.innerHTML = '';

  for (const [semesterNumber, semesterCourses] of Object.entries(coursesBySemester)) {
    const year = Math.ceil(semesterNumber / 2);
    let yearRow = document.querySelector(`.year-row[data-year="${year}"]`);
    if (!yearRow) {
      yearRow = document.createElement('div');
      yearRow.classList.add('year-row');
      yearRow.dataset.year = year;

      const yearContainer = document.createElement('div');
      yearContainer.classList.add('year-container');

      const yearColumn = document.createElement('div');
      yearColumn.classList.add('year-column');
      yearColumn.innerHTML = `<h2>Año ${year}</h2>`;

      yearContainer.appendChild(yearColumn);
      yearRow.appendChild(yearContainer);
      yearsContainer.appendChild(yearRow);
    }

    const semesterDiv = document.createElement('div');
    semesterDiv.classList.add('semester-block');
    semesterDiv.innerHTML = `<h3>Semestre ${semesterNumber}</h3>`;

    semesterCourses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.classList.add('course-card');
      courseDiv.dataset.id = course.id;

      const isCompleted = localStorage.getItem(`course-completed-${course.id}`) === 'true';
      const savedGrade = localStorage.getItem(`course-grade-${course.id}`);

      if (isCompleted) {
        courseDiv.classList.add('completed');
      }

      if (course.requires) {
        const prerequisitesMet = course.requires.every(reqId =>
          localStorage.getItem(`course-completed-${reqId}`) === 'true'
        );
        if (!prerequisitesMet) courseDiv.classList.add('locked');
      }

      courseDiv.innerHTML = `${course.name}`;
      if (savedGrade) {
        courseDiv.innerHTML += ` <span class="grade-label">${savedGrade}</span>`;
      }

      courseDiv.addEventListener('click', () => {
        if (courseDiv.classList.contains('locked')) return;

        const isNowCompleted = !courseDiv.classList.contains('completed');
        courseDiv.classList.toggle('completed');
        localStorage.setItem(`course-completed-${course.id}`, isNowCompleted ? 'true' : 'false');

        if (isNowCompleted) {
          let newGrade = prompt(`Ingresa la nota final para "${course.name}" (1.0 a 7.0 o "A" si fue aprobado sin nota):`, savedGrade || '');
          if (newGrade !== null) {
            newGrade = newGrade.trim().toUpperCase();
            if (newGrade === 'A') {
              localStorage.setItem(`course-grade-${course.id}`, 'A');
            } else if (!isNaN(newGrade)) {
              const num = Math.max(1.0, Math.min(7.0, parseFloat(newGrade).toFixed(1)));
              localStorage.setItem(`course-grade-${course.id}`, num);
            } else {
              localStorage.removeItem(`course-grade-${course.id}`);
            }
          }
        } else {
          localStorage.removeItem(`course-grade-${course.id}`);
        }

        renderCurriculum();
        updateProgress();
      });

      semesterDiv.appendChild(courseDiv);
    });

    yearRow.querySelector('.year-column').appendChild(semesterDiv);
  }

  updateProgress();
}

function updateProgress() {
  const completedCredits = calculateCompletedCredits();
  const avg = calculateWeightedAverage();

  creditCounter.textContent = `Créditos completados: ${completedCredits} / ${totalCredits}`;
  averageGrade.textContent = `Promedio ponderado: ${avg}`;

  const completionPercent = ((completedCredits / totalCredits) * 100).toFixed(1);

  if (!chart) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completado', 'Restante'],
        datasets: [{
          data: [completedCredits, totalCredits - completedCredits],
          backgroundColor: ['#4fc47a', '#e0e0e0']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `${completionPercent}% completado`
          },
          legend: { display: false }
        },
        cutout: '70%'
      }
    });
  } else {
    chart.data.datasets[0].data = [completedCredits, totalCredits - completedCredits];
    chart.options.plugins.title.text = `${completionPercent}% completado`;
    chart.update();
  }
}
function simularProgreso() {
  Object.values(coursesBySemester).flat().forEach(course => {
    localStorage.setItem(`course-completed-${course.id}`, 'true');
    localStorage.setItem(`course-grade-${course.id}`, 'A');
  });
  renderCurriculum();
  updateProgress();
}

document.addEventListener('DOMContentLoaded', renderCurriculum);
