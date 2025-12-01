export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmOWZjZTI0Ni1hMzYzLTRmMDAtYmZkMi05YWVkNjM3OGQ3NzEiLCJwcm9maWxlIjpudWxsLCJlbXBsb3llZUlkIjoiODk3YzYzZWQtNjgwYS00NGI1LWJjZDItN2I0NDJhZmMxNDliIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzY0NDY0NTQ0LCJleHAiOjMxNzMwODkwNjk0NH0.uA_IYX5PugDR00amOtqwOFWF0Gff-qDu8w9c56x1HGE";

// Users

export const adminUser = {
  id: "987c36ed-681a-45b4-bdc4-7b442afc149b",
  name: "Giovane Souza",
  profile: "admin",
  isAdmin: true,
  username: "giovanesouza",
  password: "123456",
};

export const employeeUser = {
  name: "Pedro Henrique Ferreira Silva",
  profile: "employee",
  isAdmin: false,
  username: "pedrohenrique",
  password: "123456"
};

export const employeeUserWithVacation = {
  employeeId: "987c63ed-670a-44b5-bcd2-7b452afc148b",
  name: "Maria Clara Souza Oliveira",
  profile: "employee",
  isAdmin: false,
  username: "mariaoliveira",
  password: "407.378.189-80"
};

export const invalidUser = {
  username: "usuario_teste",
  password: "123456"
};

// Register employee
export const newEmployee = {
  name: "Débora Heloisa Fabiana Mendes",
  cpf: "490.669.837-95",
  admissionDate: todayBR(),
  isPendingVacation: false
};


export function todayBR() {
  const d = new Date()
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
};