/**
 * Funktion som hämtar data, plockar ut top sex kurser och
 * top fem program med flest sökande HT2024. Skickar sedan data
 * till funktion som skapar tabell.
 * 
 * @param {string} response Lagrar datan från APIn.
 * @param {string} courses Bryter ut kurser från APIn.   
 * @param {array} topSix Lagrar de sex mest sökta kurserna i fallande ordning.
 * @param {string} programs Bryter endast program från APIn.
 * @param {array} topFive Lagrar de fem mest sökta programmen i fallande ordning.
 */


async function fetchData() {
  try {
      const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
      
      if (!response.ok) {
          throw new Error("Fel vid anslutning!");
      }
      
      const data = await response.json();

      const courses = data.filter(item => item.type === "Kurs");

      const topSix = courses 
        .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
        .slice(0, 6);

      const programs = data.filter(item => item.type === "Program");

      const topFive = programs 
        .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
        .slice(0, 5);


      createChart(topSix, topFive);

  } catch (error) {
      console.error(error);
  }
}

/**
 * Funktion som hämtar data och skriver ut i form av två stabeldiagram.
 * 
 * @param {array} courses Top sex mest sökta kurser HT2024.
 * @param {array} programs Top fem mest sökta program HT2024.
 * @param {object} ctx Hämtar ID:t från HTML där kurser ska skrivas ut.
 * @param {object} ctx2 Hämtar ID:t från HTML där program ska skrivas ut.
 * @param {object} Chart Skapar stabeldiagram för antal sökande och kurser.
 * @param {object} Chart Skapar stabeldiagram för antal sökande och program.
 * 
 * @returns {object} Skapar tabeller. 
 */

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