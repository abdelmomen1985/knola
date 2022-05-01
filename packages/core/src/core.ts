type User = {
  id: string;
  name: string;
  age?: number;
}

export function logUser(user: User) {
  console.log(`${user.id} -> ${user.name} (${user.age? user.age : 'age unknown'})`+`.`);
}
