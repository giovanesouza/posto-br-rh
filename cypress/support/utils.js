export function todayBR() {
  const d = new Date()
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
};

// Register employee
export const newEmployee = {
  name: "Cicrano Developer Senior",
  cpf: "51764289110",
  admissionDate: todayBR()
};