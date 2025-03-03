/**
 * Hämtar kursdata från API och skickar de 6 mest populära kurserna till createChart().
 * @async
 * @function fetchData
 * @throws {Error} Om API-anropet misslyckas.
 */


async function fetchData() {
  try {
      const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
      
      if (!response.ok) {
          throw new Error("Fel vid anslutning!");
      }
      
      const data = await response.json();

      /**
       * Filtrerar ut kurser från API:n.
       * @returns {string} Kurser.
       */
      const courses = data.filter(item => item.type === "Kurs");

      const topSix = courses 
        .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
        .slice(0, 6);

      const programs = data.filter(item => item.type === "Program");

      const topSix2 = programs 
        .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
        .slice(0, 6);


      createChart(topSix, topSix2);

  } catch (error) {
      console.error(error);
  }
}


function createChart(courses, programs) {
  const ctx = document.getElementById('myChart');
  const ctx2 = document.getElementById('myChart2');
  

  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: courses.map(item => item.name),
          datasets: [{
              label: 'Totalt antal sökande i respektive kurs',
              data: courses.map(item => item.applicantsTotal),
          }]
      },
  });
  new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: programs.map(item => item.name), 
        datasets: [{
            label: 'Totalt antal sökande i respektive program',
            data: programs.map(item => item.applicantsTotal),
        }]
    },
});
}

// Hämta data och skapa diagrammet
fetchData();