// Clases de licencia y las unidades que estudia cada curso.
(function () {
  const RB = window.RB = window.RB || {};
  RB.licenses = [
    { id: 'A1', course: 'AP', t: 'Taxis' },
    { id: 'A2', course: 'AP', t: 'Taxis, ambulancias y transporte de 10 a 17 asientos' },
    { id: 'A3', course: 'AP', t: 'Buses, transporte escolar y ambulancias' },
    { id: 'A4', course: 'AC', t: 'Camiones simples de más de 3.500 kg' },
    { id: 'A5', course: 'AC', t: 'Camiones articulados y todo tipo de carga pesada' },
    { id: 'B', course: 'B', t: 'Autos, camionetas y furgones particulares' },
    { id: 'C', course: 'C', t: 'Motos, motonetas y bicimotos' },
    { id: 'D', course: 'D', t: 'Tractores, grúas y otra maquinaria' },
    { id: 'E', course: 'E', t: 'Vehículos de tracción animal' },
    { id: 'F', course: 'F', t: 'FF.AA., Carabineros, PDI y Gendarmería' },
  ];
  RB.courses = {
    B: { name: 'Clase B', sub: 'Autos y camionetas', units: ['sen', 'sem', 'nor', 'pre', 'vul', 'rie', 'seg', 'def', 'emer', 'mec', 'doc', 'haz'] },
    C: { name: 'Clase C', sub: 'Motocicletas', units: ['motoA', 'sen', 'sem', 'nor', 'pre', 'motoB', 'motoC', 'rie', 'emer', 'doc', 'haz'] },
    AP: { name: 'Profesional de pasajeros', sub: 'Clases A1, A2 y A3', units: ['profA', 'pas', 'pesado', 'jor', 'sen', 'sem', 'nor', 'pre', 'vul', 'rie', 'def', 'emer', 'doc'] },
    AC: { name: 'Profesional de carga', sub: 'Clases A4 y A5', units: ['profA', 'carga', 'art', 'pesado', 'peligrosas', 'jor', 'sen', 'nor', 'pre', 'vul', 'rie', 'emer', 'doc'] },
    D: { name: 'Clase D', sub: 'Maquinaria automotriz', units: ['maq1', 'maq2', 'sen', 'nor', 'pre', 'rie', 'emer', 'doc'] },
    E: { name: 'Clase E', sub: 'Tracción animal', units: ['tra1', 'tra2', 'sen', 'pre', 'emer'] },
    F: { name: 'Clase F', sub: 'Institucional', units: ['emerv', 'sen', 'sem', 'nor', 'pre', 'vul', 'rie', 'def', 'emer', 'doc'] },
  };
})();
