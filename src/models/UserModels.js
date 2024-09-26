class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Method untuk mengupdate email
  updateEmail(newEmail) {
    this.email = newEmail;
  }

  // Method untuk mengupdate password
  updatePassword(newPassword) {
    this.password = newPassword;
  }

  // Method untuk mengupdate name
  updateName(newName) {
    this.name = newName;
  }

  // Method untuk mendapatkan informasi user
  getUserInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    };
  }
}

export default User;
