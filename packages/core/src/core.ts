type User = {
  id: string;
  name: string;
}

export function logUser(user: User) {
  console.log(`${user.id}: ${user.name}`);
}
